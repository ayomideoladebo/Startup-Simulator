import React from 'react';

interface HeadhuntStatusProps {
    onBack: () => void;
    onViewCandidates: () => void;
}

export const HeadhuntStatus = ({ onBack, onViewCandidates }: HeadhuntStatusProps) => {
    return (
        <div className="fixed inset-0 z-[100] bg-background-light dark:bg-background-dark flex flex-col min-h-full overflow-y-auto no-scrollbar animate-in fade-in slide-in-from-right duration-300">
            <style>{`
                @keyframes ripple {
                    0% { transform: scale(0.8); opacity: 1; }
                    100% { transform: scale(2.4); opacity: 0; }
                }
                .animate-ripple {
                    animation: ripple 3s linear infinite;
                }
                .delay-1000 { animation-delay: 1s; }
                .delay-2000 { animation-delay: 2s; }
            `}</style>

            <div className="sticky top-0 z-50 flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between border-b border-gray-200 dark:border-white/10">
                <div onClick={onBack} className="text-slate-900 dark:text-white flex size-12 shrink-0 items-center justify-center cursor-pointer rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                </div>
                <div className="flex flex-col items-center">
                    <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Headhunt Status</h2>
                    <div className="flex items-center gap-1.5">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        <p className="text-green-600 dark:text-green-400 text-xs font-bold uppercase tracking-wider">Active Search</p>
                    </div>
                </div>
                <div className="text-slate-900 dark:text-white flex size-12 shrink-0 items-center justify-center cursor-pointer rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-[24px]">more_horiz</span>
                </div>
            </div>

            <div className="flex flex-col gap-6 px-4 py-6 pb-32">
                <div className="flex items-center justify-center py-4">
                    <div className="relative size-64 flex items-center justify-center">
                        <div className="absolute inset-0 m-auto size-24 border border-primary/30 rounded-full animate-ripple"></div>
                        <div className="absolute inset-0 m-auto size-24 border border-primary/30 rounded-full animate-ripple delay-1000"></div>
                        <div className="absolute inset-0 m-auto size-24 border border-primary/30 rounded-full animate-ripple delay-2000"></div>
                        <div className="absolute inset-0 border border-slate-200 dark:border-white/5 rounded-full"></div>
                        <div className="absolute inset-12 border border-slate-200 dark:border-white/5 rounded-full border-dashed opacity-50"></div>
                        <div className="relative z-10 flex flex-col items-center justify-center size-24 rounded-full bg-white dark:bg-[#2f2839] shadow-xl border-4 border-background-light dark:border-background-dark">
                            <span className="material-symbols-outlined text-4xl text-primary animate-pulse">satellite_alt</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3 rounded-xl bg-white dark:bg-[#1e1e24] p-5 shadow-sm border border-gray-100 dark:border-white/5 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 dark:bg-white/5">
                        <div className="h-full bg-primary w-[5%] shadow-[0_0_10px_rgba(109,19,236,0.5)]"></div>
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-gray-500 mt-2">Time Remaining</p>
                    <div className="font-mono text-4xl font-bold tracking-tight text-slate-900 dark:text-white">23:59:04</div>
                    <p className="text-xs text-slate-500 dark:text-gray-400 font-medium">Est. Completion: <span className="text-slate-900 dark:text-white">Tomorrow, 09:42 AM</span></p>
                </div>

                <section>
                    <h3 className="text-slate-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider mb-3 pl-1">Target Profile</h3>
                    <div className="rounded-xl bg-white dark:bg-[#1e1e24] p-4 shadow-sm border border-gray-100 dark:border-white/5 flex items-start gap-4">
                        <div className="size-12 rounded-lg bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-[24px]">code</span>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">Senior Developer</p>
                                    <p className="text-[11px] text-slate-500 dark:text-gray-400">Engineering Dept • Skill 85+</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">High Priority</span>
                                </div>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-1.5">
                                <span className="px-2 py-1 rounded bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 text-[10px] font-medium text-slate-600 dark:text-gray-300">Visionary</span>
                                <span className="px-2 py-1 rounded bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 text-[10px] font-medium text-slate-600 dark:text-gray-300">Ambitious</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="flex justify-between items-end mb-3 px-1">
                        <h3 className="text-slate-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">Candidate Pool</h3>
                        <span className="text-[10px] font-medium text-slate-400">0 of 5 Found</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="group relative overflow-hidden rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4 flex items-center justify-center h-20">
                            <div className="flex items-center gap-2 text-primary">
                                <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                                <span className="text-xs font-bold uppercase tracking-wider">Sourcing Candidate...</span>
                            </div>
                        </div>
                        <div className="rounded-xl border border-dashed border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 p-4 flex items-center justify-center h-16 opacity-60">
                            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">Slot Empty</span>
                        </div>
                        <div className="rounded-xl border border-dashed border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 p-4 flex items-center justify-center h-16 opacity-60">
                            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">Slot Empty</span>
                        </div>
                    </div>
                    <p className="text-center mt-4 text-[11px] text-slate-400 max-w-[80%] mx-auto">
                        You will be notified when candidates matching your criteria are found.
                    </p>
                </section>
            </div>

            <div className="fixed bottom-0 left-0 w-full p-4 bg-gradient-to-t from-background-light via-background-light to-transparent dark:from-background-dark dark:via-background-dark pt-8 z-40 max-w-md mx-auto right-0 flex flex-col gap-3">
                <button
                    onClick={onViewCandidates}
                    className="w-full flex items-center justify-center gap-2 bg-white dark:bg-[#2f2839] hover:bg-slate-50 dark:hover:bg-[#3b3246] text-slate-900 dark:text-white py-3 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm transition-all active:scale-[0.98]">
                    <span className="material-symbols-outlined text-[18px] text-slate-400">visibility_off</span>
                    <span className="font-bold text-sm">View Candidates (0)</span>
                </button>
                <button
                    onClick={onBack}
                    className="w-full flex items-center justify-center gap-2 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-gray-200 text-white dark:text-slate-900 py-4 rounded-xl shadow-xl shadow-black/20 transition-all active:scale-[0.98]"
                >
                    <span className="font-bold text-sm tracking-wide">Return to Team Management</span>
                </button>
            </div>

            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] opacity-20 dark:opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>
        </div>
    );
};
