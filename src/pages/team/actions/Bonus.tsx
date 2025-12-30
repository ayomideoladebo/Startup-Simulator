

interface ActionProps {
    onBack: () => void;
}

export const Bonus = ({ onBack }: ActionProps) => {
    return (
        <div className="fixed inset-0 z-[100] bg-background-light dark:bg-background-dark flex flex-col min-h-full overflow-y-auto no-scrollbar animate-in fade-in slide-in-from-right duration-300">
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] opacity-20 dark:opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>

            <div className="sticky top-0 z-50 flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between border-b border-gray-200 dark:border-white/10 backdrop-blur-xl bg-opacity-90 dark:bg-opacity-90">
                <div onClick={onBack} className="text-slate-900 dark:text-white flex size-10 shrink-0 items-center justify-center cursor-pointer rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                </div>
                <div className="flex flex-col items-center">
                    <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Give Bonus</h2>
                </div>
                <div className="text-slate-900 dark:text-white flex size-10 shrink-0 items-center justify-center cursor-pointer rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-[24px]">help</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto pb-36">
                <div className="flex flex-col items-center pt-6 pb-2 px-4">
                    <div className="relative mb-3">
                        <div className="h-20 w-20 rounded-full border-2 border-white dark:border-[#2f2839] shadow-lg overflow-hidden relative z-10">
                            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAsal2UZnHhBLXFpLJAfL3gpcNEsKX50tzfil60sA9JpVz8rmRT6MUeIWXTAatj9xzQtgHrAcSk-oT-NTdQHtQHn-P1eaSuY0CCW4KISMs4AyQpz0VGOeRbih_6FspMgVz0VswtZw05l28AZHKc-rgw5tqfrWQMlqapl-l7v2kdibweMqJDJGg0cdUMCW4bWfw449mJQ4Q-oYvqaDnfG5l7MAJQloq9bZ-5jtSM4qEkkcXmIeLjyCnlxCGsG5oNv93lmV2UxyyAHwM")' }}></div>
                        </div>
                        <div className="absolute -bottom-1 -right-1 z-20 bg-red-500 text-white rounded-full p-1 border border-white dark:border-[#181022] shadow-sm animate-pulse">
                            <span className="material-symbols-outlined text-[12px] block">local_fire_department</span>
                        </div>
                    </div>
                    <h1 className="text-xl font-bold text-slate-900 dark:text-white mb-0.5">Sarah Jenkins</h1>
                    <p className="text-slate-500 dark:text-gray-400 text-xs font-medium mb-3">Lead AI Specialist</p>
                    <div className="flex items-center gap-2 mb-4">
                        <div className="px-3 py-1 bg-white dark:bg-surface-dark rounded-full border border-gray-200 dark:border-white/5 flex items-center gap-2 shadow-sm">
                            <span className="text-slate-400 dark:text-gray-500 text-[10px] uppercase font-bold tracking-wider">Salary</span>
                            <span className="text-slate-900 dark:text-white text-sm font-mono font-bold">$120,000/yr</span>
                        </div>
                    </div>
                </div>

                <div className="px-4 mb-6">
                    <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-4 border border-blue-100 dark:border-blue-500/20 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                                <span className="material-symbols-outlined text-[20px]">trending_up</span>
                            </div>
                            <div>
                                <h4 className="text-slate-900 dark:text-white font-bold text-sm">Top Performer</h4>
                                <p className="text-slate-500 dark:text-gray-400 text-xs">Led "Project Alpha" to success</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <span className="block text-blue-600 dark:text-blue-400 font-bold text-sm">Rating: A</span>
                            <span className="text-[10px] text-slate-400">Last 30 days</span>
                        </div>
                    </div>
                </div>

                <div className="px-4 mb-6">
                    <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-3 opacity-10">
                            <span className="material-symbols-outlined text-[64px] text-slate-900 dark:text-white">payments</span>
                        </div>
                        <label className="block text-center text-xs font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-4">Bonus Amount</label>
                        <div className="flex items-center justify-center gap-1 mb-8 relative z-10">
                            <span className="text-3xl text-slate-300 dark:text-gray-600 font-bold">$</span>
                            <input className="bg-transparent border-none p-0 w-40 text-center text-5xl font-bold text-slate-900 dark:text-white font-mono focus:ring-0 placeholder-gray-200 focus:outline-none" inputMode="numeric" type="text" defaultValue="5,000" />
                        </div>
                        <div className="grid grid-cols-4 gap-2 mb-2 relative z-10">
                            <button className="py-2.5 rounded-lg border border-gray-200 dark:border-white/10 text-xs font-bold text-slate-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:border-primary/50 dark:hover:border-primary/50 transition-all">$1k</button>
                            <button className="py-2.5 rounded-lg bg-primary/10 border border-primary/50 text-xs font-bold text-primary dark:text-primary-light ring-1 ring-primary/20">$5k</button>
                            <button className="py-2.5 rounded-lg border border-gray-200 dark:border-white/10 text-xs font-bold text-slate-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:border-primary/50 dark:hover:border-primary/50 transition-all">$10k</button>
                            <button className="py-2.5 rounded-lg border border-gray-200 dark:border-white/10 text-xs font-bold text-slate-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:border-primary/50 dark:hover:border-primary/50 transition-all">$25k</button>
                        </div>
                        <p className="text-center text-[10px] text-slate-400 mt-3 relative z-10">Company Bank: <span className="font-mono text-slate-600 dark:text-gray-300 font-semibold">$1,450,230</span></p>
                    </div>
                </div>

                <div className="px-4 mb-6">
                    <h3 className="text-slate-900 dark:text-white text-sm font-bold mb-3 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-primary">auto_fix_high</span> Predicted Impact
                    </h3>
                    <div className="bg-white dark:bg-surface-dark rounded-xl p-4 border border-gray-100 dark:border-white/5 flex flex-col gap-4">
                        <div>
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-xs font-medium text-slate-500 dark:text-gray-400">Morale Boost</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-orange-500 font-bold">Low (40%)</span>
                                    <span className="material-symbols-outlined text-[12px] text-gray-400">arrow_right_alt</span>
                                    <span className="text-xs text-green-500 font-bold flex items-center">
                                        55% <span className="material-symbols-outlined text-[12px] ml-0.5">trending_up</span>
                                    </span>
                                </div>
                            </div>
                            <div className="h-3 w-full bg-gray-100 dark:bg-[#2f2839] rounded-full overflow-hidden flex relative">
                                <div className="h-full bg-orange-500" style={{ width: '40%' }}></div>
                                <div className="h-full bg-green-500 relative" style={{ width: '15%' }}>
                                    <div className="absolute inset-0 bg-white/20" style={{ backgroundImage: 'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)', backgroundSize: '1rem 1rem' }}></div>
                                </div>
                            </div>
                            <p className="text-[10px] text-slate-400 mt-1.5 leading-tight">Bonus will reduce burnout risk for ~2 weeks.</p>
                        </div>
                        <div className="pt-3 border-t border-dashed border-gray-100 dark:border-white/10">
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-xs font-medium text-slate-500 dark:text-gray-400">Loyalty Gain</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-slate-600 dark:text-gray-300 font-bold">60%</span>
                                    <span className="material-symbols-outlined text-[12px] text-gray-400">arrow_right_alt</span>
                                    <span className="text-xs text-green-500 font-bold flex items-center">
                                        65% <span className="material-symbols-outlined text-[12px] ml-0.5">trending_up</span>
                                    </span>
                                </div>
                            </div>
                            <div className="h-3 w-full bg-gray-100 dark:bg-[#2f2839] rounded-full overflow-hidden flex relative">
                                <div className="h-full bg-blue-500" style={{ width: '60%' }}></div>
                                <div className="h-full bg-green-500/80 relative" style={{ width: '5%' }}>
                                    <div className="absolute inset-0 bg-white/20" style={{ backgroundImage: 'linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)', backgroundSize: '1rem 1rem' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-surface-dark border-t border-gray-200 dark:border-white/10 p-4 pb-8 z-50 rounded-t-2xl shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
                <div className="max-w-md md:max-w-2xl mx-auto flex flex-col gap-3">
                    <button className="w-full flex items-center justify-between bg-primary hover:bg-primary-dark text-white px-5 py-3.5 rounded-xl shadow-lg shadow-primary/30 active:scale-[0.98] transition-all group">
                        <span className="font-bold text-sm">Pay Bonus</span>
                        <div className="flex items-center gap-2">
                            <span className="bg-white/20 px-2 py-1 rounded text-sm font-mono font-bold">$5,000</span>
                            <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </div>
                    </button>
                    <button onClick={onBack} className="w-full text-slate-500 dark:text-gray-400 text-xs font-semibold py-2 hover:text-slate-800 dark:hover:text-white transition-colors">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
