import { useNavigate } from 'react-router-dom';

export const Profile = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display overflow-hidden h-full flex flex-col relative w-full">
            <style>{`
                .safe-area-top {
                    padding-top: env(safe-area-inset-top, 20px);
                }
                .safe-area-bottom {
                    padding-bottom: env(safe-area-inset-bottom, 20px);
                }
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>

            <header className="w-full z-40 bg-background-dark/95 backdrop-blur-md sticky top-0">
                <div className="flex items-center px-4 py-3 justify-between border-b border-white/5">
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-full hover:bg-white/5 transition-colors text-white -ml-2"
                    >
                        <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                    </button>
                    <h2 className="text-white text-lg font-bold tracking-tight">Profile</h2>
                    <button className="p-2 rounded-full hover:bg-white/5 transition-colors text-white -mr-2">
                        <span className="material-symbols-outlined text-[24px]">settings</span>
                    </button>
                </div>
            </header>

            <main className="flex-1 overflow-y-auto w-full relative pb-24 bg-background-dark">
                <div className="h-36 w-full relative overflow-hidden bg-surface-dark">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-purple-900/40 to-background-dark/80"></div>
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                </div>
                <div className="px-5 relative">
                    <div className="flex justify-between items-end -mt-12 mb-4">
                        <div className="relative group">
                            <div className="bg-center bg-no-repeat bg-cover rounded-full size-24 border-[4px] border-background-dark shadow-xl" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAWt4-Rx7aIk4Ck0O6k17rbTK8NhZdzsUBAvGgZwMF2ARj6f2XxYArNpN7VslyZCcTMBFp91TF3OcQ0O5Ib-zL7iwY_PH9m8ueJqWLNxT_xFV7YVVT1T9oDLbp60xJlUxNvbvovb3dOyV8rDHWhYKFnf1Fn07hoGBR4yo1QGm0RZNQNQ4hqJixT36oxNu-fZmjkPQ_tpL5BIpotSRYmpxs_wh7W5T3HGY3aGQAnfhLAbRdFczkIpKyURqSzL4kBKvJ38c7Yd-7oB5c")' }}>
                            </div>
                            <div className="absolute bottom-1 right-1 bg-background-dark rounded-full p-1">
                                <span className="material-symbols-outlined text-blue-400 text-[18px] bg-background-dark rounded-full leading-none">verified</span>
                            </div>
                        </div>
                        <button className="mb-1 rounded-full border border-white/20 bg-surface-dark/50 px-5 py-2 text-sm font-semibold text-white hover:bg-white/10 transition-colors backdrop-blur-sm">
                            Edit Profile
                        </button>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h1 className="text-2xl font-bold text-white leading-tight">HyperScale Inc.</h1>
                        <p className="text-gray-500 text-sm font-medium">@hyperscale_ceo</p>
                    </div>
                    <div className="mt-4">
                        <p className="text-[15px] text-gray-200 leading-relaxed font-normal">
                            Disrupting the AI Toaster industry one slice at a time. 🍞🤖 Series A funded. We move fast and break bread. <span className="text-primary">#Tech</span> <span className="text-primary">#StartupLife</span>
                        </p>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-500">
                        <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[18px]">category</span>
                            <span>Niche: <span className="text-gray-300">AI Home Appliances</span></span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="material-symbols-outlined text-[18px]">calendar_month</span>
                            <span>Joined Q1 2024</span>
                        </div>
                    </div>
                    <div className="mt-5 flex gap-8 border-b border-white/10 pb-5">
                        <div className="flex flex-col">
                            <span className="text-lg font-bold text-white">12.5K</span>
                            <span className="text-xs text-gray-500 font-medium">Followers</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-bold text-white">420</span>
                            <span className="text-xs text-gray-500 font-medium">Following</span>
                        </div>
                        <div className="flex flex-col group cursor-pointer">
                            <span className="text-lg font-bold text-green-400 flex items-center gap-1">
                                89
                                <span className="material-symbols-outlined text-[14px]">arrow_upward</span>
                            </span>
                            <span className="text-xs text-gray-500 font-medium group-hover:text-green-400 transition-colors">Reputation</span>
                        </div>
                    </div>
                    <div className="mt-6 mb-8">
                        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Company Status</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="bg-surface-dark border border-white/5 rounded-xl p-4 flex flex-col gap-2 shadow-sm">
                                <div className="flex items-center gap-2 text-gray-400 mb-1">
                                    <span className="material-symbols-outlined text-primary text-[20px]">monetization_on</span>
                                    <span className="text-xs font-semibold uppercase tracking-wide">Valuation</span>
                                </div>
                                <span className="text-xl font-bold text-white">$4.2M</span>
                                <span className="text-xs text-green-500 font-medium flex items-center gap-0.5">
                                    <span className="material-symbols-outlined text-[14px]">trending_up</span> 12% vs last month
                                </span>
                            </div>
                            <div className="bg-surface-dark border border-white/5 rounded-xl p-4 flex flex-col gap-2 shadow-sm">
                                <div className="flex items-center gap-2 text-gray-400 mb-1">
                                    <span className="material-symbols-outlined text-orange-500 text-[20px]">local_fire_department</span>
                                    <span className="text-xs font-semibold uppercase tracking-wide">Hype Level</span>
                                </div>
                                <span className="text-xl font-bold text-white">Viral</span>
                                <span className="text-xs text-gray-500 font-medium">Global Rank #45</span>
                            </div>
                            <div className="bg-surface-dark border border-white/5 rounded-xl p-4 flex flex-col gap-2 shadow-sm">
                                <div className="flex items-center gap-2 text-gray-400 mb-1">
                                    <span className="material-symbols-outlined text-blue-400 text-[20px]">rocket_launch</span>
                                    <span className="text-xs font-semibold uppercase tracking-wide">Product</span>
                                </div>
                                <span className="text-xl font-bold text-white">Beta v2.0</span>
                                <span className="text-xs text-blue-400 font-medium">Launch in 3 days</span>
                            </div>
                            <div className="bg-surface-dark border border-white/5 rounded-xl p-4 flex flex-col gap-2 shadow-sm">
                                <div className="flex items-center gap-2 text-gray-400 mb-1">
                                    <span className="material-symbols-outlined text-red-400 text-[20px]">trending_down</span>
                                    <span className="text-xs font-semibold uppercase tracking-wide">Burn Rate</span>
                                </div>
                                <span className="text-xl font-bold text-white">$45k/mo</span>
                                <span className="text-xs text-red-400 font-medium">Runway: 8 months</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-2 mb-6">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Badges</h3>
                            <button className="text-xs text-primary font-medium">View All</button>
                        </div>
                        <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
                            <div className="shrink-0 size-14 rounded-lg bg-surface-dark border border-white/10 flex items-center justify-center text-2xl" title="First Funding">🦄</div>
                            <div className="shrink-0 size-14 rounded-lg bg-surface-dark border border-white/10 flex items-center justify-center text-2xl" title="Viral Post">🔥</div>
                            <div className="shrink-0 size-14 rounded-lg bg-surface-dark border border-white/10 flex items-center justify-center text-2xl" title="Market Survivor">📉</div>
                            <div className="shrink-0 size-14 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center border-dashed">
                                <span className="material-symbols-outlined text-gray-600">lock</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
