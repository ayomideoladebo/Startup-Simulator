
import { useNavigate } from 'react-router-dom';

export const MarketNews = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-background-light dark:bg-background-dark font-display antialiased text-gray-900 dark:text-white h-[100dvh] flex flex-col relative overflow-hidden w-full max-w-md md:max-w-full mx-auto shadow-2xl transition-colors duration-300 border-x border-white/5">
            <style>{`.no-scrollbar::-webkit-scrollbar {
                display: none;
            }
            .no-scrollbar {
                -ms-overflow-style: none; /* IE and Edge */
                scrollbar-width: none; /* Firefox */
            }
            .mask-gradient {
                mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
                -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
            }
            `}</style>

            {/* Header */}
            <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-200 dark:border-white/10 shrink-0">
                <div className="flex items-center p-4 justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center justify-center rounded-full h-10 w-10 bg-transparent text-gray-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors mr-2"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <h2 className="text-xl font-bold leading-tight tracking-tight flex-1">Market Intelligence</h2>
                    <div className="flex items-center justify-end gap-3">
                        <button className="flex items-center justify-center rounded-full h-10 w-10 bg-transparent text-gray-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                            <span className="material-symbols-outlined">search</span>
                        </button>
                    </div>
                </div>
                {/* Ticker */}
                <div className="w-full overflow-hidden whitespace-nowrap bg-white dark:bg-surface-dark py-2 border-b border-gray-200 dark:border-white/5">
                    <div className="inline-block animate-scroll px-4">
                        <span className="inline-flex items-center gap-2 mr-8">
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">TECH</span>
                            <span className="text-sm font-bold">12,450</span>
                            <span className="text-xs font-bold text-green-500">▲ 2.4%</span>
                        </span>
                        <span className="inline-flex items-center gap-2 mr-8">
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">VC FLOW</span>
                            <span className="text-sm font-bold">8.2B</span>
                            <span className="text-xs font-bold text-red-500">▼ 5.1%</span>
                        </span>
                        <span className="inline-flex items-center gap-2 mr-8">
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">CRYPTO</span>
                            <span className="text-sm font-bold">45k</span>
                            <span className="text-xs font-bold text-green-500">▲ 0.8%</span>
                        </span>
                        <span className="inline-flex items-center gap-2 mr-8">
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">SAAS</span>
                            <span className="text-sm font-bold">2,103</span>
                            <span className="text-xs font-bold text-gray-500">− 0.0%</span>
                        </span>
                        <span className="inline-flex items-center gap-2 mr-8">
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">TECH</span>
                            <span className="text-sm font-bold">12,450</span>
                            <span className="text-xs font-bold text-green-500">▲ 2.4%</span>
                        </span>
                    </div>
                </div>
                {/* Chips Navigation */}
                <div className="flex gap-2 p-3 overflow-x-auto no-scrollbar mask-gradient">
                    <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-primary px-4 shadow-lg shadow-primary/25">
                        <span className="text-white text-xs font-semibold">Top Stories</span>
                    </button>
                    <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 px-4 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                        <span className="text-gray-700 dark:text-gray-300 text-xs font-medium">Economy</span>
                    </button>
                    <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 px-4 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                        <span className="text-gray-700 dark:text-gray-300 text-xs font-medium">Tech</span>
                    </button>
                    <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 px-4 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                        <span className="text-gray-700 dark:text-gray-300 text-xs font-medium">Competitors</span>
                    </button>
                    <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/10 px-4 hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
                        <span className="text-gray-700 dark:text-gray-300 text-xs font-medium">Regulation</span>
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col p-4 gap-6 pb-24 overflow-y-auto w-full no-scrollbar relative z-10">
                {/* Hero Card */}
                <section aria-label="Featured Story">
                    <div className="relative overflow-hidden rounded-xl bg-white dark:bg-surface-dark shadow-sm border border-gray-200 dark:border-white/5 group cursor-pointer">
                        {/* Image Area */}
                        <div className="relative h-48 w-full overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-surface-dark to-transparent z-10 opacity-90"></div>
                            <div className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAElvDIi-Effep-1EIjDafuJbGJAUkFSs7BUB1kS0KW5rDfJ0g5tS0SBVCXRvjy2k8fr8TFFiG3APEDZTEPBLE4YiSb1Z74JCi4X9rPY-WR44IW8dXMZElnWgpBTJDVdC-c0h1xtC18pYc38aC1COb0tGtSng3hOdXqGBfSthBHMwZU1fv0uBs7P1_rptVTl3wwUFXBqdPOHr2XHJXi2je8-4TfigezSdzHkEMo2OkjmSEA9m2CWgnYQmhD8qcmZ73xVKGjhKbLGRY")' }}>
                            </div>
                            <div className="absolute top-3 left-3 z-20">
                                <span className="inline-flex items-center rounded-md bg-red-500/90 px-2 py-1 text-xs font-bold text-white shadow-sm backdrop-blur-sm">
                                    <span className="material-symbols-outlined text-[14px] mr-1">bolt</span> BREAKING
                                </span>
                            </div>
                        </div>
                        {/* Content Area */}
                        <div className="p-5 relative z-20 -mt-12">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-gray-300 text-xs font-medium flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                    Policy
                                </span>
                                <span className="text-gray-500 text-xs">•</span>
                                <span className="text-gray-400 text-xs">1h ago</span>
                            </div>
                            <h3 className="text-xl font-bold leading-tight mb-2 text-white group-hover:text-primary transition-colors">
                                Government Announces AI Subsidy Program
                            </h3>
                            <p className="text-gray-300 text-sm leading-relaxed mb-4 line-clamp-2">
                                A new $50B fund has been approved to support early-stage AI startups. Expect increased competition and lowered barriers to entry in the sector.
                            </p>
                            <div className="flex items-center justify-between pt-4 border-t border-white/10">
                                <span className="text-primary text-xs font-bold uppercase tracking-wider">High Impact</span>
                                <button className="text-gray-400 hover:text-white transition-colors">
                                    <span className="material-symbols-outlined">bookmark_border</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Quick Stats Row */}
                <section aria-label="Market Snapshot" className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1 p-4 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wider">Global VC</span>
                            <span className="material-symbols-outlined text-gray-400 text-lg">monetization_on</span>
                        </div>
                        <div className="flex items-end gap-2 mt-1">
                            <span className="text-xl font-bold text-gray-900 dark:text-white">8.2B</span>
                            <span className="text-xs font-bold text-red-500 mb-1">▼ 5.1%</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1 p-4 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/5 shadow-sm">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-500 dark:text-gray-400 text-xs font-medium uppercase tracking-wider">Tech Index</span>
                            <span className="material-symbols-outlined text-gray-400 text-lg">show_chart</span>
                        </div>
                        <div className="flex items-end gap-2 mt-1">
                            <span className="text-xl font-bold text-gray-900 dark:text-white">12.4k</span>
                            <span className="text-xs font-bold text-green-500 mb-1">▲ 2.4%</span>
                        </div>
                    </div>
                </section>

                {/* Standard News List */}
                <section aria-label="News Feed" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Card 1 */}
                    <article className="flex flex-col gap-3 rounded-xl bg-white dark:bg-surface-dark p-4 shadow-sm border border-gray-200 dark:border-white/5 hover:border-primary/30 transition-colors cursor-pointer group">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-orange-500/10 text-orange-500">Economy</span>
                                    <span className="text-gray-400 text-xs">3h ago</span>
                                </div>
                                <h4 className="text-base font-bold text-gray-900 dark:text-white leading-snug mb-2 group-hover:text-primary transition-colors">Interest Rates Hike: VC Slowdown</h4>
                                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-2">Central banks raise rates by 0.5%, signaling a tightening of venture capital flow for the next quarter.</p>
                            </div>
                            <div className="shrink-0 w-20 h-20 rounded-lg bg-cover bg-center bg-gray-800 border border-gray-700" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAi63B4AGvL6jrs3QcmGKdl-AJJ6AEx60ImOXDhFEokKnxUH5CLUhTqt7rVDW0EexINosowq7raWSlEKvTBla8Gl0qTyFMDz5dV5WhOlLsUTM2WMm_I7zSk7POgWpG8VyHvas04VgjjJJoKbhB1CD1ty2f1LR9zfs3zgtg_R2xHdiGuk74g3EwWrjyjuA-1mja0U--ptljZUoPlZ1BTyWG6KnrltzB0akfRsDXGxocTncoCn5TwyssC1RQoCfpcIyyup7KJsd0FDLk")' }}>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 mt-1 border-t border-gray-100 dark:border-white/5 pt-3">
                            <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                                <span className="material-symbols-outlined text-[16px]">trending_down</span>
                                <span>Market Sentiment: Bearish</span>
                            </div>
                        </div>
                    </article>
                    {/* Card 2 */}
                    <article className="flex flex-col gap-3 rounded-xl bg-white dark:bg-surface-dark p-4 shadow-sm border border-gray-200 dark:border-white/5 hover:border-primary/30 transition-colors cursor-pointer group">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-primary/10 text-primary">Competitor Intel</span>
                                    <span className="text-gray-400 text-xs">5h ago</span>
                                </div>
                                <h4 className="text-base font-bold text-gray-900 dark:text-white leading-snug mb-2 group-hover:text-primary transition-colors">Unicorn Inc. Files for IPO</h4>
                                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-2">Major competitor Unicorn Inc. has filed paperwork for a public listing, shaking up market valuations.</p>
                            </div>
                            <div className="shrink-0 w-20 h-20 rounded-lg bg-surface-dark border border-white/10 flex items-center justify-center bg-gradient-to-br from-indigo-900/50 to-purple-900/50">
                                <span className="material-symbols-outlined text-3xl text-indigo-400">rocket_launch</span>
                            </div>
                        </div>
                    </article>
                    {/* Card 3 */}
                    <article className="flex flex-col gap-3 rounded-xl bg-white dark:bg-surface-dark p-4 shadow-sm border border-gray-200 dark:border-white/5 hover:border-primary/30 transition-colors cursor-pointer group">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-blue-500/10 text-blue-500">Tech</span>
                                    <span className="text-gray-400 text-xs">8h ago</span>
                                </div>
                                <h4 className="text-base font-bold text-gray-900 dark:text-white leading-snug mb-2 group-hover:text-primary transition-colors">Quantum Computing Milestone</h4>
                                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-2">Research labs achieve stable qubits at room temperature. Encryption standards may need review.</p>
                            </div>
                            <div className="shrink-0 w-20 h-20 rounded-lg bg-cover bg-center bg-gray-800 border border-gray-700" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAPrx97VGq3gMDJaU1qOvT1YO_tx3BmetJoexeuZfr3mXr3I5MlTHtkRZ_BhUASJ-N2Lg1aFp7JX5Nqr7YbrlxNwpTIvMOs-v5131VmTGgJaqscqy1Eb3LQ0Q_988PV1A5nQHIvQ0n2HKlxKbZNxBHhzmMKt8V_X8tr4D3abkXBIO0m0ho__vt8dt-xvoe-h8Bc_JBDtzDziBklu_5ynkVn7BpcNVQFCWLy2ELxTaVQH6-PfM0QDsKJ1CTgdiDrYQ8VAsxDQN_q8Kk")' }}>
                            </div>
                        </div>
                    </article>
                    {/* Card 4 (Crisis) */}
                    <article className="flex flex-col gap-3 rounded-xl bg-white dark:bg-surface-dark p-4 shadow-sm border border-red-500/20 hover:border-red-500/40 transition-colors cursor-pointer group relative overflow-hidden">
                        <div className="absolute inset-0 bg-red-500/5 pointer-events-none"></div>
                        <div className="flex items-start justify-between gap-4 relative z-10">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1.5">
                                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-red-500 text-white animate-pulse">CRISIS</span>
                                    <span className="text-gray-400 text-xs">12h ago</span>
                                </div>
                                <h4 className="text-base font-bold text-gray-900 dark:text-white leading-snug mb-2 group-hover:text-red-400 transition-colors">Global Server Outages</h4>
                                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-2">Widespread outages reported affecting SaaS revenues and cloud infrastructure reliability globally.</p>
                            </div>
                            <div className="shrink-0 w-20 h-20 rounded-lg bg-surface-dark border border-red-500/20 flex items-center justify-center bg-gradient-to-br from-red-900/20 to-orange-900/20">
                                <span className="material-symbols-outlined text-3xl text-red-500">warning</span>
                            </div>
                        </div>
                    </article>
                </section>
            </main>


        </div>
    );
};
