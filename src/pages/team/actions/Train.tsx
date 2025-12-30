

interface ActionProps {
    onBack: () => void;
}

export const Train = ({ onBack }: ActionProps) => {
    return (
        <div className="fixed inset-0 z-[100] bg-background-light dark:bg-background-dark flex flex-col min-h-full overflow-y-auto no-scrollbar animate-in fade-in slide-in-from-right duration-300">
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] opacity-20 dark:opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>

            <div className="sticky top-0 z-50 flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between border-b border-gray-200 dark:border-white/10 backdrop-blur-xl bg-opacity-90 dark:bg-opacity-90">
                <div onClick={onBack} className="text-slate-900 dark:text-white flex size-10 shrink-0 items-center justify-center cursor-pointer rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                </div>
                <div className="flex flex-col items-center">
                    <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Train Employee</h2>
                    <span className="text-[10px] text-slate-500 dark:text-gray-400 font-medium uppercase tracking-wider">Development Plan</span>
                </div>
                <div className="text-slate-900 dark:text-white flex size-10 shrink-0 items-center justify-center cursor-pointer rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-[24px]">help</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto pb-32">
                <div className="px-4 py-6">
                    <div className="bg-white dark:bg-surface-dark rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-white/5 flex items-center gap-4">
                        <div className="relative shrink-0">
                            <div className="h-16 w-16 rounded-full border-2 border-white dark:border-[#2f2839] shadow-md overflow-hidden">
                                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAsal2UZnHhBLXFpLJAfL3gpcNEsKX50tzfil60sA9JpVz8rmRT6MUeIWXTAatj9xzQtgHrAcSk-oT-NTdQHtQHn-P1eaSuY0CCW4KISMs4AyQpz0VGOeRbih_6FspMgVz0VswtZw05l28AZHKc-rgw5tqfrWQMlqapl-l7v2kdibweMqJDJGg0cdUMCW4bWfw449mJQ4Q-oYvqaDnfG5l7MAJQloq9bZ-5jtSM4qEkkcXmIeLjyCnlxCGsG5oNv93lmV2UxyyAHwM")' }}></div>
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-white dark:border-surface-dark">
                                Lvl 4
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-slate-900 dark:text-white font-bold text-base truncate">Sarah Jenkins</h3>
                            <p className="text-slate-500 dark:text-gray-400 text-xs truncate mb-2">Lead AI Specialist</p>
                            <div className="space-y-1">
                                <div className="flex justify-between text-[10px] font-semibold text-slate-400 dark:text-gray-500 uppercase tracking-wide">
                                    <span>Current Skill</span>
                                    <span>85/100</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-100 dark:bg-[#2f2839] rounded-full overflow-hidden">
                                    <div className="h-full bg-primary rounded-full" style={{ width: '85%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-4">
                    <h3 className="text-slate-900 dark:text-white text-sm font-bold mb-3 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-primary">school</span> Available Programs
                    </h3>
                    <form className="flex flex-col gap-3">
                        <label className="relative cursor-pointer group">
                            <input className="peer sr-only training-radio" name="training_plan" type="radio" />
                            <div className="p-4 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/5 transition-all duration-200 hover:border-gray-300 dark:hover:border-white/20 shadow-sm peer-checked:border-primary peer-checked:bg-primary/5 dark:peer-checked:bg-primary/15">
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <div className="flex gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                                            <span className="material-symbols-outlined text-[20px]">bolt</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Quick Refresher</h4>
                                            <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">Basic skills update and review.</p>
                                        </div>
                                    </div>
                                    <div className="h-5 w-5 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center check-circle transition-colors peer-checked:bg-primary peer-checked:border-primary">
                                        <span className="material-symbols-outlined text-[14px] text-white opacity-0 transition-opacity peer-checked:opacity-100">check</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-gray-300 text-[10px] font-bold uppercase tracking-wide flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[12px]">schedule</span> 1 Day
                                    </span>
                                    <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-gray-300 text-[10px] font-bold uppercase tracking-wide flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[12px]">attach_money</span> $200
                                    </span>
                                </div>
                                <div className="pt-3 border-t border-gray-100 dark:border-white/5 flex items-center gap-4 text-xs">
                                    <div className="flex items-center gap-1 text-green-600 dark:text-green-400 font-semibold">
                                        <span className="material-symbols-outlined text-[14px]">trending_up</span>
                                        +2 Skill
                                    </div>
                                    <div className="flex items-center gap-1 text-slate-400 dark:text-gray-500">
                                        <span className="material-symbols-outlined text-[14px]">remove</span>
                                        No Morale Effect
                                    </div>
                                </div>
                            </div>
                            {/* Custom Check Circle Logic needs CSS or easier React State. Used peer-checked classes for simplicity */}
                            <div className="absolute top-4 right-4 h-5 w-5 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center pointer-events-none peer-checked:bg-primary peer-checked:border-primary">
                                <span className="material-symbols-outlined text-[14px] text-white opacity-0 peer-checked:opacity-100">check</span>
                            </div>
                        </label>

                        <label className="relative cursor-pointer group">
                            <input defaultChecked className="peer sr-only training-radio" name="training_plan" type="radio" />
                            <div className="p-4 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/5 transition-all duration-200 hover:border-gray-300 dark:hover:border-white/20 shadow-sm peer-checked:border-primary peer-checked:bg-primary/5 dark:peer-checked:bg-primary/15">
                                <div className="absolute -top-2 right-4 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">RECOMMENDED</div>
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <div className="flex gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
                                            <span className="material-symbols-outlined text-[20px]">psychology</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Advanced AI Seminar</h4>
                                            <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">Deep dive into neural networks.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-gray-300 text-[10px] font-bold uppercase tracking-wide flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[12px]">schedule</span> 1 Week
                                    </span>
                                    <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-gray-300 text-[10px] font-bold uppercase tracking-wide flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[12px]">attach_money</span> $1,200
                                    </span>
                                </div>
                                <div className="pt-3 border-t border-gray-100 dark:border-white/5 flex items-center gap-4 text-xs">
                                    <div className="flex items-center gap-1 text-green-600 dark:text-green-400 font-semibold">
                                        <span className="material-symbols-outlined text-[14px]">trending_up</span>
                                        +8 Skill
                                    </div>
                                    <div className="flex items-center gap-1 text-red-500 font-semibold">
                                        <span className="material-symbols-outlined text-[14px]">trending_down</span>
                                        -5% Morale (Stress)
                                    </div>
                                </div>
                            </div>
                            <div className="absolute top-4 right-4 h-5 w-5 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center pointer-events-none peer-checked:bg-primary peer-checked:border-primary">
                                <span className="material-symbols-outlined text-[14px] text-white opacity-0 peer-checked:opacity-100">check</span>
                            </div>
                        </label>

                        <label className="relative cursor-pointer group">
                            <input className="peer sr-only training-radio" name="training_plan" type="radio" />
                            <div className="p-4 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/5 transition-all duration-200 hover:border-gray-300 dark:hover:border-white/20 shadow-sm peer-checked:border-primary peer-checked:bg-primary/5 dark:peer-checked:bg-primary/15">
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <div className="flex gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 shrink-0">
                                            <span className="material-symbols-outlined text-[20px]">podium</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Tech Conference 2024</h4>
                                            <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">Networking and learning.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-gray-300 text-[10px] font-bold uppercase tracking-wide flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[12px]">schedule</span> 3 Days
                                    </span>
                                    <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-gray-300 text-[10px] font-bold uppercase tracking-wide flex items-center gap-1">
                                        <span className="material-symbols-outlined text-[12px]">attach_money</span> $2,500
                                    </span>
                                </div>
                                <div className="pt-3 border-t border-gray-100 dark:border-white/5 flex items-center gap-4 text-xs">
                                    <div className="flex items-center gap-1 text-green-600 dark:text-green-400 font-semibold">
                                        <span className="material-symbols-outlined text-[14px]">trending_up</span>
                                        +5 Skill
                                    </div>
                                    <div className="flex items-center gap-1 text-green-600 dark:text-green-400 font-semibold">
                                        <span className="material-symbols-outlined text-[14px]">sentiment_satisfied</span>
                                        +15% Morale
                                    </div>
                                </div>
                            </div>
                            <div className="absolute top-4 right-4 h-5 w-5 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center pointer-events-none peer-checked:bg-primary peer-checked:border-primary">
                                <span className="material-symbols-outlined text-[14px] text-white opacity-0 peer-checked:opacity-100">check</span>
                            </div>
                        </label>
                    </form>
                </div>

                <div className="mx-4 mt-6 p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-dashed border-slate-300 dark:border-white/10">
                    <h4 className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wide mb-3">Projected Outcome</h4>
                    <div className="flex items-center justify-between">
                        <div className="text-center">
                            <p className="text-[10px] text-slate-400">Skill Level</p>
                            <div className="flex items-baseline justify-center gap-1">
                                <span className="text-lg font-bold text-slate-900 dark:text-white">85</span>
                                <span className="text-xs font-bold text-green-500">➜ 93</span>
                            </div>
                        </div>
                        <div className="h-8 w-px bg-slate-200 dark:bg-white/10"></div>
                        <div className="text-center">
                            <p className="text-[10px] text-slate-400">Efficiency</p>
                            <div className="flex items-baseline justify-center gap-1">
                                <span className="text-lg font-bold text-slate-900 dark:text-white">100%</span>
                                <span className="text-xs font-bold text-red-500">➜ 90%</span>
                            </div>
                        </div>
                        <div className="h-8 w-px bg-slate-200 dark:bg-white/10"></div>
                        <div className="text-center">
                            <p className="text-[10px] text-slate-400">Available In</p>
                            <div className="flex items-baseline justify-center gap-1">
                                <span className="text-lg font-bold text-slate-900 dark:text-white">1 Wk</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md md:max-w-2xl bg-white dark:bg-[#181022] border-t border-gray-200 dark:border-white/10 p-4 z-50 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex flex-col">
                        <span className="text-xs text-slate-500 dark:text-gray-400">Total Cost</span>
                        <span className="text-xl font-bold text-slate-900 dark:text-white">$1,200</span>
                    </div>
                    <div className="text-right flex flex-col items-end">
                        <span className="text-xs text-slate-500 dark:text-gray-400">Company Balance</span>
                        <span className="text-sm font-medium text-slate-700 dark:text-gray-300">$845,230</span>
                    </div>
                </div>
                <button className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-primary/30 active:scale-[0.98] transition-all">
                    <span className="material-symbols-outlined text-[20px]">play_circle</span>
                    Start Training
                </button>
            </div>
        </div>
    );
}
