

interface ActionProps {
    onBack: () => void;
}

export const Promote = ({ onBack }: ActionProps) => {
    return (
        <div className="fixed inset-0 z-[100] bg-background-light dark:bg-background-dark flex flex-col min-h-full overflow-y-auto no-scrollbar animate-in fade-in slide-in-from-right duration-300">
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] opacity-20 dark:opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>

            <div className="sticky top-0 z-50 flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between border-b border-gray-200 dark:border-white/10 backdrop-blur-xl bg-opacity-90 dark:bg-opacity-90">
                <div onClick={onBack} className="text-slate-900 dark:text-white flex size-10 shrink-0 items-center justify-center cursor-pointer rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                </div>
                <div className="flex flex-col items-center">
                    <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Promote Employee</h2>
                </div>
                <div className="text-slate-900 dark:text-white flex size-10 shrink-0 items-center justify-center cursor-pointer rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-[24px]">help</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto pb-32">
                <div className="flex items-center gap-4 p-4 border-b border-gray-100 dark:border-white/5 bg-white dark:bg-surface-dark/50">
                    <div className="h-16 w-16 rounded-full border-2 border-white dark:border-[#2f2839] shadow-md overflow-hidden shrink-0">
                        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAsal2UZnHhBLXFpLJAfL3gpcNEsKX50tzfil60sA9JpVz8rmRT6MUeIWXTAatj9xzQtgHrAcSk-oT-NTdQHtQHn-P1eaSuY0CCW4KISMs4AyQpz0VGOeRbih_6FspMgVz0VswtZw05l28AZHKc-rgw5tqfrWQMlqapl-l7v2kdibweMqJDJGg0cdUMCW4bWfw449mJQ4Q-oYvqaDnfG5l7MAJQloq9bZ-5jtSM4qEkkcXmIeLjyCnlxCGsG5oNv93lmV2UxyyAHwM")' }}></div>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-slate-900 dark:text-white">Sarah Jenkins</h1>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-slate-500 dark:text-gray-400 text-xs uppercase font-bold tracking-wider">Current Role:</span>
                            <span className="text-slate-700 dark:text-gray-200 text-xs font-semibold bg-gray-100 dark:bg-white/10 px-2 py-0.5 rounded">Lead AI Specialist</span>
                        </div>
                    </div>
                </div>

                <div className="p-4">
                    <h3 className="text-slate-900 dark:text-white text-sm font-bold mb-3 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-primary">alt_route</span> Choose Career Path
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                        <div className="relative group cursor-pointer">
                            <div className="absolute inset-0 bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-white/10 shadow-sm transition-all group-hover:border-primary/50"></div>
                            <div className="relative p-4 flex items-center gap-4">
                                <div className="h-5 w-5 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center shrink-0"></div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">Principal AI Architect</h4>
                                    <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">Technical Track • Lvl 5</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">$145k</p>
                                    <p className="text-[10px] text-green-600 dark:text-green-400 font-bold">+20%</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative group cursor-pointer">
                            <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10 rounded-xl border-2 border-primary shadow-sm"></div>
                            <div className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">RECOMMENDED</div>
                            <div className="relative p-4 flex items-center gap-4">
                                <div className="h-5 w-5 rounded-full border-[5px] border-primary bg-white dark:bg-surface-dark flex items-center justify-center shrink-0"></div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-primary dark:text-white text-sm">Head of AI Department</h4>
                                    <p className="text-xs text-primary/80 dark:text-gray-300 mt-0.5">Management Track • Lvl 5</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-primary dark:text-white">$160k</p>
                                    <p className="text-[10px] text-green-600 dark:text-green-400 font-bold">+33%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-4 pb-4">
                    <h3 className="text-slate-900 dark:text-white text-sm font-bold mb-3 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-blue-400">analytics</span> Projected Impact
                    </h3>
                    <div className="bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-white/5 p-4 shadow-sm">
                        <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100 dark:border-white/5">
                            <div className="flex flex-col">
                                <span className="text-xs text-slate-500 dark:text-gray-400 font-medium mb-1">Base Salary</span>
                                <span className="text-sm font-mono text-slate-400 dark:text-gray-500 line-through">$120,000</span>
                            </div>
                            <div className="flex flex-col items-center px-2">
                                <span className="material-symbols-outlined text-slate-300 dark:text-gray-600">arrow_forward</span>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className="text-xs text-green-600 dark:text-green-400 font-bold bg-green-50 dark:bg-green-900/20 px-1.5 py-0.5 rounded mb-1">+$40,000</span>
                                <span className="text-lg font-bold text-slate-900 dark:text-white">$160,000</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-medium text-slate-500 dark:text-gray-400">Morale</span>
                                    <span className="text-[10px] font-bold text-green-500 bg-green-50 dark:bg-green-900/20 px-1 rounded">+Huge Boost</span>
                                </div>
                                <div className="h-2 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden flex">
                                    <div className="h-full bg-orange-400 w-[40%] opacity-30"></div>
                                    <div className="h-full bg-green-500 w-[50%] animate-pulse"></div>
                                </div>
                                <div className="flex justify-between text-[10px] text-slate-400">
                                    <span>Low</span>
                                    <span className="text-slate-900 dark:text-white font-bold">Excellent</span>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-medium text-slate-500 dark:text-gray-400">Loyalty</span>
                                    <span className="text-[10px] font-bold text-green-500 bg-green-50 dark:bg-green-900/20 px-1 rounded">+15%</span>
                                </div>
                                <div className="h-2 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden flex">
                                    <div className="h-full bg-blue-400 w-[60%] opacity-30"></div>
                                    <div className="h-full bg-blue-500 w-[15%]"></div>
                                </div>
                                <div className="flex justify-between text-[10px] text-slate-400">
                                    <span>Stable</span>
                                    <span className="text-slate-900 dark:text-white font-bold">High</span>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-medium text-slate-500 dark:text-gray-400">Skill Match</span>
                                    <span className="text-[10px] font-bold text-slate-500 dark:text-gray-400 bg-gray-100 dark:bg-white/10 px-1 rounded">Perfect</span>
                                </div>
                                <div className="h-2 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-purple-500 w-[95%]"></div>
                                </div>
                                <div className="text-[10px] text-right text-slate-900 dark:text-white font-bold">95%</div>
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between items-center">
                                    <span className="text-xs font-medium text-slate-500 dark:text-gray-400">Stress Load</span>
                                    <span className="text-[10px] font-bold text-red-500 bg-red-50 dark:bg-red-900/20 px-1 rounded">+High</span>
                                </div>
                                <div className="h-2 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden flex">
                                    <div className="h-full bg-red-500 w-[92%]"></div>
                                </div>
                                <div className="text-[10px] text-right text-red-500 font-bold animate-pulse">Critical</div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-500/20 rounded-lg flex gap-3">
                        <span className="material-symbols-outlined text-blue-500 text-[20px] shrink-0">info</span>
                        <p className="text-xs text-blue-800 dark:text-blue-200 leading-relaxed">
                            Promoting Sarah to a management role will significantly improve her morale but may increase her stress levels initially. Ensure she has support.
                        </p>
                    </div>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-[#181022] border-t border-gray-200 dark:border-white/10 p-4 pb-8 z-50 max-w-md md:max-w-2xl mx-auto left-1/2 -translate-x-1/2">
                <div className="flex justify-between items-end mb-4 px-1">
                    <div>
                        <p className="text-[10px] text-slate-500 dark:text-gray-400 uppercase font-bold tracking-wider">Cost to Promote</p>
                        <p className="text-lg font-bold text-slate-900 dark:text-white">$5,000 <span className="text-xs font-normal text-slate-400">(Bonus)</span></p>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] text-slate-500 dark:text-gray-400 uppercase font-bold tracking-wider">New Weekly Cost</p>
                        <p className="text-lg font-bold text-red-500">+$769<span className="text-xs font-normal text-slate-400">/wk</span></p>
                    </div>
                </div>
                <button className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-base py-3.5 rounded-xl shadow-lg shadow-primary/25 active:scale-95 transition-all flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-[20px]">stars</span>
                    Confirm Promotion
                </button>
                <button onClick={onBack} className="w-full mt-3 text-slate-500 dark:text-slate-400 font-semibold text-sm hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
                    Cancel
                </button>
            </div>
        </div>
    );
}
