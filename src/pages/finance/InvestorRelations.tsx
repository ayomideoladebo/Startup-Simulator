// import React from 'react';
import { useNavigate } from 'react-router-dom';

export const InvestorRelations = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white overflow-x-hidden min-h-screen relative pb-20">
            <style>{`.no-scrollbar::-webkit-scrollbar {
                display: none;
            }
            .no-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
            }
            `}</style>

            {/* Header */}
            <div className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-black/5 dark:border-white/5 p-4 flex items-center justify-between">
                <button
                    onClick={() => navigate(-1)}
                    className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-900 dark:text-white"
                >
                    <span className="material-symbols-outlined">arrow_back_ios_new</span>
                </button>
                <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">Investor Relations</h2>
            </div>

            <div className="flex flex-col w-full max-w-md md:max-w-full mx-auto">
                {/* Confidence Meter */}
                <div className="flex flex-col items-center justify-center pt-6 pb-6 px-4 relative">
                    <div className="size-20 rounded-full border-4 border-emerald-500/20 flex items-center justify-center mb-3 relative">
                        <svg className="size-full -rotate-90 absolute inset-0" viewBox="0 0 36 36">
                            <path className="text-slate-200 dark:text-white/5" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3"></path>
                            <path className="text-emerald-500 drop-shadow-[0_0_4px_rgba(16,185,129,0.5)]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="85, 100" strokeLinecap="round" strokeWidth="3"></path>
                        </svg>
                        <span className="material-symbols-outlined text-3xl text-emerald-500">sentiment_satisfied</span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-0.5">Overall Board Confidence</p>
                    <h1 className="text-slate-900 dark:text-white tracking-tighter text-3xl font-bold leading-none">High Trust</h1>
                    <div className="flex items-center gap-1 mt-2 px-3 py-1 rounded-full bg-slate-200 dark:bg-surface-dark border border-slate-300 dark:border-white/10">
                        <span className="material-symbols-outlined text-xs text-primary">schedule</span>
                        <p className="text-slate-600 dark:text-slate-300 text-[10px] font-semibold uppercase tracking-wide">Next Update: 5 Days</p>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 px-4 mb-6">
                    <button
                        onClick={() => navigate('/finance/investors/update')}
                        className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-primary text-white shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all active:scale-95"
                    >
                        <span className="material-symbols-outlined text-2xl">campaign</span>
                        <span className="text-sm font-bold">Update Stakeholders</span>
                    </button>
                    <button
                        onClick={() => navigate('/finance/investors/schedule')}
                        className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white shadow-sm hover:bg-slate-50 dark:hover:bg-white/5 transition-all active:scale-95"
                    >
                        <span className="material-symbols-outlined text-2xl text-purple-500">calendar_add_on</span>
                        <span className="text-sm font-bold">Schedule Meeting</span>
                    </button>
                </div>

                {/* Cap Table List */}
                <div className="px-4 mb-6">
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Cap Table</h3>
                        <span onClick={() => navigate('/finance/valuation')} className="text-xs font-medium text-primary cursor-pointer">View Equity</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* Investor 1 */}
                        <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-white/5 p-4 shadow-sm relative overflow-hidden group">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-lg bg-indigo-500/10 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-lg">
                                        N
                                    </div>
                                    <div>
                                        <h4 className="text-base font-bold text-slate-900 dark:text-white leading-tight">Nebula Ventures</h4>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <span className="text-xs text-slate-500 dark:text-slate-400">Series A Lead • 15%</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                    <span className="material-symbols-outlined">more_vert</span>
                                </button>
                            </div>
                            <div className="flex items-center justify-between mb-3 bg-slate-50 dark:bg-black/20 p-2 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-slate-400 text-sm">mail</span>
                                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">sarah@nebula.vc</span>
                                </div>
                                <button
                                    onClick={() => navigate('/finance/pitch')}
                                    className="text-[10px] font-bold text-primary uppercase tracking-wide px-2 py-1 bg-primary/10 rounded hover:bg-primary/20 transition-colors"
                                >
                                    Pitch
                                </button>
                            </div>
                            <div>
                                <div className="flex justify-between items-end mb-1">
                                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Satisfaction</span>
                                    <span className="text-xs font-bold text-emerald-500">Ecstatic</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '92%' }}></div>
                                </div>
                            </div>
                        </div>

                        {/* Investor 2 */}
                        <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-white/5 p-4 shadow-sm relative overflow-hidden group">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-lg bg-amber-500/10 dark:bg-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400 font-bold text-lg">
                                        A
                                    </div>
                                    <div>
                                        <h4 className="text-base font-bold text-slate-900 dark:text-white leading-tight">Apex Angel Syndicate</h4>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <span className="text-xs text-slate-500 dark:text-slate-400">Seed • 8%</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                    <span className="material-symbols-outlined">more_vert</span>
                                </button>
                            </div>
                            <div className="flex items-center justify-between mb-3 bg-slate-50 dark:bg-black/20 p-2 rounded-lg">
                                <div className="flex items-center gap-2">
                                    <span className="material-symbols-outlined text-slate-400 text-sm">call</span>
                                    <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">+1 (555) 019-2834</span>
                                </div>
                                <button className="text-[10px] font-bold text-primary uppercase tracking-wide px-2 py-1 bg-primary/10 rounded hover:bg-primary/20 transition-colors">
                                    Call
                                </button>
                            </div>
                            <div>
                                <div className="flex justify-between items-end mb-1">
                                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Satisfaction</span>
                                    <span className="text-xs font-bold text-amber-500">Neutral</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-amber-500 rounded-full" style={{ width: '55%' }}></div>
                                </div>
                                <p className="mt-2 text-[10px] text-amber-600 dark:text-amber-400 bg-amber-500/10 p-1.5 rounded border border-amber-500/20 flex items-start gap-1">
                                    <span className="material-symbols-outlined text-xs">warning</span>
                                    Concern: Burn rate is higher than projected.
                                </p>
                            </div>
                        </div>

                        {/* Investor 3 */}
                        <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-white/5 p-4 shadow-sm relative overflow-hidden group">
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-lg bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold text-lg">
                                        <span className="material-symbols-outlined">family_star</span>
                                    </div>
                                    <div>
                                        <h4 className="text-base font-bold text-slate-900 dark:text-white leading-tight">Friends & Family</h4>
                                        <div className="flex items-center gap-1.5 mt-0.5">
                                            <span className="text-xs text-slate-500 dark:text-slate-400">Pre-Seed • 4%</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                    <span className="material-symbols-outlined">more_vert</span>
                                </button>
                            </div>
                            <div>
                                <div className="flex justify-between items-end mb-1">
                                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">Satisfaction</span>
                                    <span className="text-xs font-bold text-emerald-500">Happy</span>
                                </div>
                                <div className="h-1.5 w-full bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '80%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Communication Log */}
                <div className="px-4 pb-8 mb-20 md:mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400">Communication Log</h3>
                        <button onClick={() => navigate('/finance/chat')} className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors">View All</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="relative pl-4 border-l border-slate-200 dark:border-white/10 space-y-6">
                            {/* Items manually migrated or left as list if difficult to split. 
                                Actually, the log items were hardcoded. I will keep them as hardcoded items but maybe in a responsive grid container?
                                The previous design had a vertical timeline line. Vertical timeline is hard to do in grid. 
                                I'll keep the vertical timeline but put it inside a grid cell if I had multiple columns of timelines? 
                                Or better: Keep it vertical on mobile, but maybe 2 columns on desktop? 
                                If 2 columns, the timeline line needs to be handled carefully.
                                Let's simplify and make it a list of cards on grid for desktop without the continuous line, or keep the line for each column.
                                I'll stick to a single vertical timeline for simplicity but wide container. Or better, just make the items full width cards.
                             */}
                            <div className="relative group ml-2">
                                <div className="absolute -left-[29px] top-1 size-2.5 rounded-full bg-emerald-500 ring-4 ring-background-light dark:ring-background-dark"></div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] font-medium text-slate-400">Today, 10:30 AM</span>
                                    <p className="text-sm text-slate-900 dark:text-white font-medium">Monthly Report Sent</p>
                                    <p className="text-xs text-emerald-600 dark:text-emerald-400">+5 Trust Score</p>
                                </div>
                            </div>
                            <div className="relative group ml-2">
                                <div className="absolute -left-[29px] top-1 size-2.5 rounded-full bg-slate-300 dark:bg-slate-600 ring-4 ring-background-light dark:ring-background-dark"></div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] font-medium text-slate-400">Oct 12, Year 2</span>
                                    <p className="text-sm text-slate-900 dark:text-white font-medium">Meeting with Apex Syndicate</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Discussed runway extension strategy.</p>
                                </div>
                            </div>
                            <div className="relative group ml-2">
                                <div className="absolute -left-[29px] top-1 size-2.5 rounded-full bg-rose-500 ring-4 ring-background-light dark:ring-background-dark"></div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[10px] font-medium text-slate-400">Sep 30, Year 2</span>
                                    <p className="text-sm text-slate-900 dark:text-white font-medium">Missed Q3 Target</p>
                                    <p className="text-xs text-rose-500">-12 Trust Score (Revenue below projections)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
