
import { useNavigate } from 'react-router-dom';

export const MyAwards = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display antialiased selection:bg-gold selection:text-black h-[100dvh] flex flex-col relative overflow-hidden w-full max-w-md md:max-w-full mx-auto shadow-2xl">
            <style>{`.no-scrollbar::-webkit-scrollbar {
                display: none;
            }
            .no-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
            }
            .mask-gradient-right {
                mask-image: linear-gradient(to right, black 85%, transparent 100%);
            }
            .text-gold-gradient {
                background: linear-gradient(to bottom, #fde047, #eab308);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
            }
            `}</style>

            <div className="sticky top-0 z-50 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-4 pb-2 justify-between border-b border-gray-200 dark:border-white/5 shrink-0">
                <button onClick={() => navigate(-1)} className="text-slate-900 dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-2xl">arrow_back</span>
                </button>
                <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">My Competitive Awards</h2>
            </div>

            <div className="flex-1 flex flex-col pb-6 overflow-y-auto no-scrollbar">
                <div className="flex flex-wrap gap-3 px-4 py-4">
                    <div className="flex min-w-[111px] flex-1 basis-[fit-content] flex-col gap-1 rounded-xl border border-gray-200 dark:border-card-border bg-white dark:bg-card-dark p-4 items-center text-center shadow-sm">
                        <div className="relative size-12 mb-1 flex items-center justify-center rounded-full bg-gold/10 text-gold">
                            <span className="material-symbols-outlined text-3xl drop-shadow-sm">trophy</span>
                        </div>
                        <p className="text-slate-900 dark:text-white tracking-tight text-2xl font-bold leading-tight">24</p>
                        <p className="text-slate-500 dark:text-text-secondary text-xs font-medium uppercase tracking-wider">Trophies Won</p>
                    </div>
                    <div className="flex min-w-[111px] flex-1 basis-[fit-content] flex-col gap-1 rounded-xl border border-gray-200 dark:border-card-border bg-white dark:bg-card-dark p-4 items-center text-center shadow-sm">
                        <div className="relative size-12 mb-1 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                            <span className="material-symbols-outlined text-3xl">workspace_premium</span>
                        </div>
                        <p className="text-slate-900 dark:text-white tracking-tight text-2xl font-bold leading-tight">#1</p>
                        <p className="text-slate-500 dark:text-text-secondary text-xs font-medium uppercase tracking-wider">Industry Rank</p>
                    </div>
                </div>



                <div className="pt-6 pb-2 px-4">
                    <h2 className="text-slate-900 dark:text-white tracking-tight text-lg font-bold leading-tight flex items-center gap-2">
                        <span className="material-symbols-outlined text-gold">stars</span>
                        Latest Major Victory
                    </h2>
                </div>

                <div className="px-4">
                    <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-[#2c2438] to-[#140e1b] shadow-xl border border-gold/30 ring-1 ring-gold/10">
                        <div className="absolute inset-0 bg-trophy-sheen opacity-30 pointer-events-none"></div>
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <span className="material-symbols-outlined text-8xl text-gold rotate-12">emoji_events</span>
                        </div>
                        <div className="p-6 relative z-10">
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex flex-col gap-3">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="bg-gold-gradient text-black text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider shadow-md">Winner</span>
                                            <p className="text-gold/80 text-xs font-semibold uppercase tracking-wider">Annual Industry Awards</p>
                                        </div>
                                        <h3 className="text-white text-2xl font-bold leading-tight mb-2 drop-shadow-md">Company of the Year 2024</h3>
                                        <p className="text-slate-300 text-xs leading-relaxed max-w-[200px]">
                                            Awarded for unparalleled market disruption, surpassing "Unicorp" and capturing 40% of the global user base.
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="text-[10px] text-slate-400 font-medium">Earned: Oct 24, 2024</span>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center justify-center gap-2">
                                    <div className="size-16 shrink-0 rounded-full bg-gold-gradient p-0.5 shadow-lg shadow-gold/20 flex items-center justify-center">
                                        <div className="size-full rounded-full bg-black/80 flex items-center justify-center backdrop-blur-sm">
                                            <span className="material-symbols-outlined text-gold text-4xl drop-shadow-lg">trophy</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8 pb-3 px-4 flex justify-between items-end">
                    <h2 className="text-slate-900 dark:text-white tracking-tight text-lg font-bold leading-tight">Trophy Cabinet</h2>
                    <span className="text-xs font-medium text-slate-500 dark:text-text-secondary">Sorted by Date</span>
                </div>

                <div className="px-4 flex flex-col gap-3">
                    <div className="flex items-center gap-2 mt-1 mb-1">
                        <div className="h-px bg-slate-200 dark:bg-white/10 flex-1"></div>
                        <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 dark:text-white/30">Niche Victories</span>
                        <div className="h-px bg-slate-200 dark:bg-white/10 flex-1"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-center gap-4 rounded-xl bg-white dark:bg-card-dark p-4 border border-gray-200 dark:border-card-border shadow-sm relative overflow-hidden group">
                            <div className="absolute inset-y-0 left-0 w-1 bg-emerald-500"></div>
                            <div className="size-12 shrink-0 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
                                <span className="material-symbols-outlined text-2xl">smart_toy</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <h4 className="text-slate-900 dark:text-white font-bold text-sm truncate">Best AI Implementation</h4>
                                    <span className="text-[10px] text-slate-400 dark:text-white/40 font-mono">Sep 12, 2023</span>
                                </div>
                                <p className="text-slate-500 dark:text-text-secondary text-[11px] leading-snug mt-1">
                                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">1st Place:</span> Outperformed "CyberDyne Systems" in model efficiency benchmarks by 300%.
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 rounded-xl bg-white dark:bg-card-dark p-4 border border-gray-200 dark:border-card-border shadow-sm relative overflow-hidden group">
                            <div className="absolute inset-y-0 left-0 w-1 bg-blue-500"></div>
                            <div className="size-12 shrink-0 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center border border-blue-500/20">
                                <span className="material-symbols-outlined text-2xl">pie_chart</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <h4 className="text-slate-900 dark:text-white font-bold text-sm truncate">Market Leader: Fintech</h4>
                                    <span className="text-[10px] text-slate-400 dark:text-white/40 font-mono">Aug 30, 2023</span>
                                </div>
                                <p className="text-slate-500 dark:text-text-secondary text-[11px] leading-snug mt-1">
                                    <span className="text-blue-600 dark:text-blue-400 font-semibold">Top Ranking:</span> Secured 51% of total market cap in the Financial sector.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 mt-4 mb-1">
                        <div className="h-px bg-slate-200 dark:bg-white/10 flex-1"></div>
                        <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400 dark:text-white/30">Special Recognition</span>
                        <div className="h-px bg-slate-200 dark:bg-white/10 flex-1"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="flex flex-col gap-3 rounded-xl bg-white dark:bg-card-dark p-3 border border-gray-200 dark:border-card-border shadow-sm relative overflow-hidden h-full">
                            <div className="absolute top-0 right-0 p-2 opacity-10">
                                <span className="material-symbols-outlined text-4xl">verified</span>
                            </div>
                            <div className="flex items-start justify-between z-10">
                                <div className="size-8 rounded bg-purple-500/10 text-purple-500 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-lg">psychology</span>
                                </div>
                            </div>
                            <div className="z-10 flex flex-col h-full">
                                <h4 className="text-slate-900 dark:text-white font-bold text-xs mb-1">Innovator '23</h4>
                                <p className="text-slate-500 dark:text-text-secondary text-[10px] leading-tight line-clamp-3">
                                    Voted "Most Creative" by industry peers at TechSummit.
                                </p>
                                <span className="text-[9px] text-slate-400 mt-auto pt-2">Jul 15, 2023</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 rounded-xl bg-white dark:bg-card-dark p-3 border border-gray-200 dark:border-card-border shadow-sm relative overflow-hidden h-full">
                            <div className="absolute top-0 right-0 p-2 opacity-10">
                                <span className="material-symbols-outlined text-4xl">bolt</span>
                            </div>
                            <div className="flex items-start justify-between z-10">
                                <div className="size-8 rounded bg-orange-500/10 text-orange-500 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-lg">rocket_launch</span>
                                </div>
                            </div>
                            <div className="z-10 flex flex-col h-full">
                                <h4 className="text-slate-900 dark:text-white font-bold text-xs mb-1">Fastest IPO</h4>
                                <p className="text-slate-500 dark:text-text-secondary text-[10px] leading-tight line-clamp-3">
                                    Record breaking time to public offering (18 mos).
                                </p>
                                <span className="text-[9px] text-slate-400 mt-auto pt-2">Jun 02, 2023</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-2">
                        <div className="flex items-center gap-4 rounded-xl bg-slate-100 dark:bg-white/5 p-4 border border-transparent dark:border-white/5 opacity-60">
                            <div className="size-12 rounded-lg bg-slate-200 dark:bg-white/10 text-slate-400 dark:text-white/20 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-2xl">lock</span>
                            </div>
                            <div className="flex-1">
                                <h4 className="text-slate-500 dark:text-white/50 font-bold text-sm">Titan of Industry</h4>
                                <p className="text-slate-400 dark:text-white/30 text-[10px]">Reach $100B Valuation to unlock this legendary trophy.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};
