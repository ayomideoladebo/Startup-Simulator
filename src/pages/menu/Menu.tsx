import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Menu = () => {
    const navigate = useNavigate();
    const [isAwardsModalOpen, setIsAwardsModalOpen] = useState(false);

    return (
        <div className="relative flex h-full w-full flex-col overflow-x-hidden pb-20">
            {/* TopAppBar - Only visible in this component context if needed, but the layout usually provides a header. 
                However, looking at the design, this screen has a custom header "Startup Simulator" + User Status. 
                I will stick to the provided design but verify if it conflicts with global headers. 
                The routes.tsx shows TopHeader is only for Dashboard. So this custom header is fine here.
            */}

            <header className="sticky top-0 z-10 flex items-center justify-between bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm p-4 pb-2 border-b border-transparent dark:border-white/5">
                <div className="text-primary flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <span className="material-symbols-outlined text-[24px]">sports_esports</span>
                </div>
                <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 pl-3 text-slate-900 dark:text-white">Startup Simulator</h2>
                {/* User Status Mini-Summary */}
                <div className="flex items-center gap-2 rounded-full bg-slate-200 dark:bg-[#2f2839]/50 px-3 py-1">
                    <span className="material-symbols-outlined text-green-500 dark:text-green-400 text-[16px]">trending_up</span>
                    <span className="text-xs font-bold text-slate-700 dark:text-white">$1.2M</span>
                </div>
            </header>

            {/* Headline & Meta */}
            <div className="px-4 pt-6 pb-2">
                <h1 className="text-[32px] font-bold leading-tight tracking-tight text-slate-900 dark:text-white">Command Center</h1>
                <p className="mt-2 text-sm font-medium text-slate-500 dark:text-[#a89db9]">
                    Level 5 CEO • Series A Funding Round
                </p>
            </div>

            {/* Main Grid Navigation */}
            <main className="flex-1 p-4">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {/* Card 1: FoundersFeed */}
                    <button
                        onClick={() => navigate('/social')}
                        className="group relative flex flex-col items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all active:scale-95 dark:border-[#2f2839] dark:bg-[#201c27] dark:shadow-none hover:border-primary/50 dark:hover:border-primary/50"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[28px]">dynamic_feed</span>
                        </div>
                        <h2 className="text-sm font-bold leading-tight text-slate-900 dark:text-white">FoundersFeed</h2>
                    </button>

                    {/* Card 2: Awards */}
                    <button
                        onClick={() => setIsAwardsModalOpen(true)}
                        className="group relative flex flex-col items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all active:scale-95 dark:border-[#2f2839] dark:bg-[#201c27] dark:shadow-none hover:border-primary/50 dark:hover:border-primary/50"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[28px]">emoji_events</span>
                        </div>
                        <h2 className="text-sm font-bold leading-tight text-slate-900 dark:text-white">Awards</h2>
                    </button>

                    {/* Card 3: Investors */}
                    <button
                        onClick={() => navigate('/finance/inquiries')}
                        className="group relative flex flex-col items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all active:scale-95 dark:border-[#2f2839] dark:bg-[#201c27] dark:shadow-none hover:border-primary/50 dark:hover:border-primary/50"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[28px]">briefcase_meal</span>
                        </div>
                        <h2 className="text-sm font-bold leading-tight text-slate-900 dark:text-white">Investors</h2>
                    </button>

                    {/* Card 4: News */}
                    <button
                        onClick={() => navigate('/market/news')}
                        className="group relative flex flex-col items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all active:scale-95 dark:border-[#2f2839] dark:bg-[#201c27] dark:shadow-none hover:border-primary/50 dark:hover:border-primary/50"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10 text-purple-500 group-hover:bg-purple-500 group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[28px]">newspaper</span>
                        </div>
                        {/* Notification Badge */}
                        <div className="absolute top-3 right-3 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white dark:ring-[#201c27] animate-pulse"></div>
                        <h2 className="text-sm font-bold leading-tight text-slate-900 dark:text-white">News</h2>
                    </button>

                    {/* Card 5: Products */}
                    <button
                        onClick={() => navigate('/product')}
                        className="group relative flex flex-col items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all active:scale-95 dark:border-[#2f2839] dark:bg-[#201c27] dark:shadow-none hover:border-primary/50 dark:hover:border-primary/50"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/10 text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[28px]">rocket_launch</span>
                        </div>
                        <h2 className="text-sm font-bold leading-tight text-slate-900 dark:text-white">Products</h2>
                    </button>

                    {/* Card 6: Market Insights */}
                    <button
                        onClick={() => navigate('/market/insights')}
                        className="group relative flex flex-col items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all active:scale-95 dark:border-[#2f2839] dark:bg-[#201c27] dark:shadow-none hover:border-primary/50 dark:hover:border-primary/50"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[28px]">query_stats</span>
                        </div>
                        <h2 className="text-sm font-bold leading-tight text-slate-900 dark:text-white">Insights</h2>
                    </button>

                    {/* Card 7: Finances */}
                    <button
                        onClick={() => navigate('/finance')}
                        className="group relative flex flex-col items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all active:scale-95 dark:border-[#2f2839] dark:bg-[#201c27] dark:shadow-none hover:border-primary/50 dark:hover:border-primary/50"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10 text-green-500 group-hover:bg-green-500 group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[28px]">payments</span>
                        </div>
                        <h2 className="text-sm font-bold leading-tight text-slate-900 dark:text-white">Finances</h2>
                    </button>

                    {/* Card 8: Settings */}
                    <button
                        onClick={() => navigate('/settings')}
                        className="group relative flex flex-col items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all active:scale-95 dark:border-[#2f2839] dark:bg-[#201c27] dark:shadow-none hover:border-primary/50 dark:hover:border-primary/50"
                    >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-500/10 text-slate-500 dark:text-slate-400 group-hover:bg-slate-500 group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[28px]">settings</span>
                        </div>
                        <h2 className="text-sm font-bold leading-tight text-slate-900 dark:text-white">Settings</h2>
                    </button>
                </div>
            </main>

            {/* Awards Selection Modal */}
            {
                isAwardsModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                        <div
                            className="w-full max-w-sm bg-white dark:bg-[#1e1826] rounded-2xl p-6 shadow-2xl scale-100 animate-in zoom-in-95 duration-200 border border-gray-200 dark:border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Awards & Recognition</h3>
                                <button
                                    onClick={() => setIsAwardsModalOpen(false)}
                                    className="size-8 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-gray-400 hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
                                >
                                    <span className="material-symbols-outlined">close</span>
                                </button>
                            </div>

                            <div className="grid gap-4">
                                <button
                                    onClick={() => navigate('/awards/upcoming')}
                                    className="group relative flex flex-col gap-3 p-4 rounded-xl border border-gray-200 dark:border-white/10 hover:border-primary/50 dark:hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-white/5 transition-all text-left"
                                >
                                    <div className="absolute top-4 right-4 text-gray-300 dark:text-gray-600 group-hover:text-primary transition-colors">
                                        <span className="material-symbols-outlined">arrow_forward</span>
                                    </div>
                                    <div className="size-12 rounded-xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 text-indigo-500 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-3xl">event_upcoming</span>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Upcoming Awards</h4>
                                        <p className="text-sm text-slate-500 dark:text-gray-400">View schedule and nomination requirements.</p>
                                    </div>
                                </button>

                                <button
                                    onClick={() => navigate('/awards/my-awards')}
                                    className="group relative flex flex-col gap-3 p-4 rounded-xl border border-gray-200 dark:border-white/10 hover:border-gold/50 dark:hover:border-gold/50 hover:bg-slate-50 dark:hover:bg-white/5 transition-all text-left"
                                >
                                    <div className="absolute top-4 right-4 text-gray-300 dark:text-gray-600 group-hover:text-gold transition-colors">
                                        <span className="material-symbols-outlined">arrow_forward</span>
                                    </div>
                                    <div className="size-12 rounded-xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 text-gold flex items-center justify-center">
                                        <span className="material-symbols-outlined text-3xl">emoji_events</span>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">My Awards</h4>
                                        <p className="text-sm text-slate-500 dark:text-gray-400">Your trophy cabinet and achievements.</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    );
};
