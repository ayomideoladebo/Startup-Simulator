// import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Valuation = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white overflow-x-hidden min-h-screen relative pb-20">
            <style>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .donut-segment {
                    transition: stroke-dasharray 0.3s ease;
                }
            `}</style>

            {/* Top App Bar */}
            <div className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-black/5 dark:border-white/5 p-4 flex items-center justify-between">
                <button
                    onClick={() => navigate(-1)}
                    className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-900 dark:text-white pb-1"
                >
                    <span className="material-symbols-outlined">arrow_back_ios_new</span>
                </button>
                <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">Valuation & Cap Table</h2>
            </div>

            <div className="flex flex-col w-full max-w-md md:max-w-full mx-auto">
                <div className="flex flex-col items-center justify-center pt-6 pb-6 px-4 relative text-center">
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Pre-Money Valuation</p>
                    <h1 className="text-slate-900 dark:text-white tracking-tighter text-[42px] font-bold leading-none">$12,500,000</h1>
                    <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400">
                            <span className="material-symbols-outlined text-sm">trending_up</span>
                            <span className="text-xs font-bold">+15.4%</span>
                        </div>
                        <p className="text-xs text-slate-400">Since last round</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 mb-6">
                    <div className="bg-white dark:bg-surface-dark p-4 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Valuation History</h3>
                            <div className="flex gap-2">
                                <button className="text-[10px] font-medium px-2 py-1 rounded bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300">1Y</button>
                                <button className="text-[10px] font-medium px-2 py-1 rounded bg-primary text-white">ALL</button>
                            </div>
                        </div>
                        <div className="h-32 w-full flex items-end justify-between gap-1 relative px-1 pt-4">
                            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10">
                                <div className="w-full border-t border-slate-900 dark:border-white"></div>
                                <div className="w-full border-t border-slate-900 dark:border-white"></div>
                                <div className="w-full border-t border-slate-900 dark:border-white"></div>
                                <div className="w-full border-t border-slate-900 dark:border-white"></div>
                            </div>
                            <div className="w-1/6 flex flex-col items-center gap-1 group">
                                <div className="h-10 w-2 bg-primary/30 rounded-full group-hover:bg-primary transition-colors"></div>
                                <span className="text-[9px] text-slate-400">Seed</span>
                            </div>
                            <div className="w-1/6 flex flex-col items-center gap-1 group">
                                <div className="h-14 w-2 bg-primary/40 rounded-full group-hover:bg-primary transition-colors"></div>
                                <span className="text-[9px] text-slate-400">Q1</span>
                            </div>
                            <div className="w-1/6 flex flex-col items-center gap-1 group">
                                <div className="h-16 w-2 bg-primary/50 rounded-full group-hover:bg-primary transition-colors"></div>
                                <span className="text-[9px] text-slate-400">Q2</span>
                            </div>
                            <div className="w-1/6 flex flex-col items-center gap-1 group">
                                <div className="h-20 w-2 bg-primary/70 rounded-full group-hover:bg-primary transition-colors"></div>
                                <span className="text-[9px] text-slate-400">Q3</span>
                            </div>
                            <div className="w-1/6 flex flex-col items-center gap-1 group">
                                <div className="h-24 w-2 bg-primary/80 rounded-full group-hover:bg-primary transition-colors"></div>
                                <span className="text-[9px] text-slate-400">Q4</span>
                            </div>
                            <div className="w-1/6 flex flex-col items-center gap-1 group">
                                <div className="h-28 w-2 bg-primary rounded-full shadow-[0_0_10px_rgba(109,19,236,0.6)]"></div>
                                <span className="text-[9px] text-white font-bold">Now</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-surface-dark p-5 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm flex flex-col gap-6">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-500">Equity Distribution</h3>
                        </div>
                        <div className="flex items-center gap-6">
                            <div className="relative size-32 min-w-[128px]">
                                <div className="absolute inset-0 rounded-full" style={{
                                    background: `conic-gradient(
                                        #6d13ec 0% 55%, 
                                        #3b82f6 55% 75%, 
                                        #10b981 75% 90%, 
                                        #f59e0b 90% 100%
                                    )`
                                }}></div>
                                <div className="absolute inset-2 bg-white dark:bg-surface-dark rounded-full flex items-center justify-center flex-col z-10">
                                    <span className="text-xs text-slate-400">Total Shares</span>
                                    <span className="text-base font-bold text-slate-900 dark:text-white">10.0M</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 w-full">
                                <div className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-2">
                                        <div className="size-2 rounded-full bg-primary"></div>
                                        <span className="text-slate-600 dark:text-slate-300">Founders</span>
                                    </div>
                                    <span className="font-bold text-slate-900 dark:text-white">55%</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-2">
                                        <div className="size-2 rounded-full bg-blue-500"></div>
                                        <span className="text-slate-600 dark:text-slate-300">Investors</span>
                                    </div>
                                    <span className="font-bold text-slate-900 dark:text-white">20%</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-2">
                                        <div className="size-2 rounded-full bg-emerald-500"></div>
                                        <span className="text-slate-600 dark:text-slate-300">Option Pool</span>
                                    </div>
                                    <span className="font-bold text-slate-900 dark:text-white">15%</span>
                                </div>
                                <div className="flex items-center justify-between text-xs">
                                    <div className="flex items-center gap-2">
                                        <div className="size-2 rounded-full bg-amber-500"></div>
                                        <span className="text-slate-600 dark:text-slate-300">Advisors</span>
                                    </div>
                                    <span className="font-bold text-slate-900 dark:text-white">10%</span>
                                </div>
                            </div>
                        </div>
                        <div className="h-px bg-slate-100 dark:bg-white/5 w-full"></div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs text-slate-500 mb-1">Share Price</p>
                                <p className="text-lg font-bold text-slate-900 dark:text-white">$1.25</p>
                            </div>
                            <div>
                                <p className="text-xs text-slate-500 mb-1">Last Round</p>
                                <p className="text-lg font-bold text-slate-900 dark:text-white">Seed</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-4 mb-8">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-500 ml-1 mb-3">Stakeholders</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col rounded-xl overflow-hidden bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/5 divide-y divide-slate-100 dark:divide-white/5">
                            <div className="flex items-center justify-between p-4">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-full bg-gradient-to-br from-primary to-purple-400 flex items-center justify-center text-white text-sm font-bold shadow-md">
                                        JD
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900 dark:text-white">Jane Doe (CEO)</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Founder Class</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">35.0%</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">3.5M Shares</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-4">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-full bg-gradient-to-br from-indigo-500 to-blue-400 flex items-center justify-center text-white text-sm font-bold shadow-md">
                                        JS
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900 dark:text-white">John Smith (CTO)</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Founder Class</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">20.0%</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">2.0M Shares</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col rounded-xl overflow-hidden bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/5 divide-y divide-slate-100 dark:divide-white/5">
                            <div className="flex items-center justify-between p-4 bg-slate-50/50 dark:bg-white/[0.02]">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-lg bg-white dark:bg-white/10 flex items-center justify-center border border-slate-200 dark:border-white/5">
                                        <span className="material-symbols-outlined text-blue-500">apartment</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900 dark:text-white">Venture Capital A</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Preferred Stock</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">15.0%</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">1.5M Shares</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-slate-50/50 dark:bg-white/[0.02]">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-lg bg-white dark:bg-white/10 flex items-center justify-center border border-slate-200 dark:border-white/5">
                                        <span className="material-symbols-outlined text-amber-500">star</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-semibold text-slate-900 dark:text-white">Angel Syndicate</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Convertible Note</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">5.0%</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">500k Shares</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-4 flex flex-col gap-3 mb-8">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-500 ml-1">Tools</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <button className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/5 shadow-sm group active:scale-[0.98] transition-all">
                            <div className="flex items-center gap-4">
                                <div className="size-12 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                    <span className="material-symbols-outlined text-2xl">calculate</span>
                                </div>
                                <div className="text-left">
                                    <p className="text-base font-bold text-slate-900 dark:text-white">Funding Simulator</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Simulate Series A dilution impact</p>
                                </div>
                            </div>
                            <div className="size-8 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </div>
                        </button>
                        <button className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/5 shadow-sm group active:scale-[0.98] transition-all">
                            <div className="flex items-center gap-4">
                                <div className="size-12 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                                    <span className="material-symbols-outlined text-2xl">download</span>
                                </div>
                                <div className="text-left">
                                    <p className="text-base font-bold text-slate-900 dark:text-white">Export Report</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Download PDF Cap Table</p>
                                </div>
                            </div>
                            <div className="size-8 rounded-full bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-colors">
                                <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
