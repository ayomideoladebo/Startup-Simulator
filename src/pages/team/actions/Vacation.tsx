

interface ActionProps {
    onBack: () => void;
}

export const Vacation = ({ onBack }: ActionProps) => {
    return (
        <div className="fixed inset-0 z-[100] bg-background-light dark:bg-background-dark flex flex-col min-h-full overflow-y-auto no-scrollbar animate-in fade-in slide-in-from-right duration-300">
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] opacity-20 dark:opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>

            <div className="sticky top-0 z-50 flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between border-b border-gray-200 dark:border-white/10 backdrop-blur-xl bg-opacity-90 dark:bg-opacity-90">
                <div onClick={onBack} className="text-slate-900 dark:text-white flex size-10 shrink-0 items-center justify-center cursor-pointer rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                </div>
                <div className="flex flex-col items-center">
                    <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Plan Vacation</h2>
                </div>
                <div className="text-slate-900 dark:text-white flex size-10 shrink-0 items-center justify-center cursor-pointer rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-[24px]">help</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto pb-36">
                <div className="p-4 pt-6">
                    <div className="flex items-center gap-4 bg-white dark:bg-surface-dark p-4 rounded-2xl shadow-sm border border-gray-200 dark:border-white/5">
                        <div className="relative shrink-0">
                            <div className="h-16 w-16 rounded-full border-2 border-white dark:border-[#2f2839] shadow-md overflow-hidden">
                                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAsal2UZnHhBLXFpLJAfL3gpcNEsKX50tzfil60sA9JpVz8rmRT6MUeIWXTAatj9xzQtgHrAcSk-oT-NTdQHtQHn-P1eaSuY0CCW4KISMs4AyQpz0VGOeRbih_6FspMgVz0VswtZw05l28AZHKc-rgw5tqfrWQMlqapl-l7v2kdibweMqJDJGg0cdUMCW4bWfw449mJQ4Q-oYvqaDnfG5l7MAJQloq9bZ-5jtSM4qEkkcXmIeLjyCnlxCGsG5oNv93lmV2UxyyAHwM")' }}></div>
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-red-500 text-white rounded-full p-1 border-2 border-white dark:border-[#1e1e24] shadow-sm">
                                <span className="material-symbols-outlined text-[12px] block">local_fire_department</span>
                            </div>
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 dark:text-white leading-tight">Sarah Jenkins</h3>
                            <p className="text-xs text-slate-500 dark:text-gray-400 mb-1">Lead AI Specialist</p>
                            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-[10px] font-bold uppercase tracking-wider">
                                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                                Burnout Critical
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-4 mb-6">
                    <h3 className="text-slate-900 dark:text-white text-sm font-bold mb-3 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-primary">date_range</span> Select Duration
                    </h3>
                    <div className="flex flex-col gap-3">
                        <label className="cursor-pointer relative group">
                            <input className="peer sr-only" name="vacation_duration" type="radio" />
                            <div className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/5 shadow-sm transition-all peer-checked:border-primary peer-checked:ring-1 peer-checked:ring-primary dark:peer-checked:bg-primary/5 hover:bg-gray-50 dark:hover:bg-white/[0.02]">
                                <div className="flex items-center gap-4">
                                    <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-[20px]">weekend</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">Long Weekend</h4>
                                        <p className="text-xs text-slate-500 dark:text-gray-400">3 Days Off</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-bold text-slate-900 dark:text-white">$575</div>
                                    <div className="text-[10px] text-green-600 dark:text-green-400 font-medium">-15% Stress</div>
                                </div>
                            </div>
                        </label>
                        <label className="cursor-pointer relative group">
                            <input defaultChecked className="peer sr-only" name="vacation_duration" type="radio" />
                            <div className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/5 shadow-sm transition-all peer-checked:border-primary peer-checked:ring-1 peer-checked:ring-primary dark:peer-checked:bg-primary/10 hover:bg-gray-50 dark:hover:bg-white/[0.02]">
                                <div className="absolute -top-2 right-4 bg-primary text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">RECOMMENDED</div>
                                <div className="flex items-center gap-4">
                                    <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-[20px]">beach_access</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">1 Week Recharge</h4>
                                        <p className="text-xs text-slate-500 dark:text-gray-400">Standard Leave</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-bold text-slate-900 dark:text-white">$2,300</div>
                                    <div className="text-[10px] text-green-600 dark:text-green-400 font-medium">-45% Stress</div>
                                </div>
                            </div>
                            <div className="absolute top-1/2 right-4 -translate-y-1/2 hidden peer-checked:block text-primary">
                                <span className="material-symbols-outlined text-[20px]">check_circle</span>
                            </div>
                        </label>
                        <label className="cursor-pointer relative group">
                            <input className="peer sr-only" name="vacation_duration" type="radio" />
                            <div className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/5 shadow-sm transition-all peer-checked:border-primary peer-checked:ring-1 peer-checked:ring-primary dark:peer-checked:bg-primary/5 hover:bg-gray-50 dark:hover:bg-white/[0.02]">
                                <div className="flex items-center gap-4">
                                    <div className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                                        <span className="material-symbols-outlined text-[20px]">flight_takeoff</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">2 Weeks Sabbatical</h4>
                                        <p className="text-xs text-slate-500 dark:text-gray-400">Deep Recovery</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-sm font-bold text-slate-900 dark:text-white">$4,600</div>
                                    <div className="text-[10px] text-green-600 dark:text-green-400 font-medium">Full Reset</div>
                                </div>
                            </div>
                        </label>
                    </div>
                </div>

                <div className="px-4 mb-6">
                    <h3 className="text-slate-900 dark:text-white text-sm font-bold mb-3 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-emerald-500">trending_up</span> Projected Impact
                    </h3>
                    <div className="bg-white dark:bg-surface-dark rounded-xl p-5 shadow-sm border border-gray-200 dark:border-white/5 space-y-5">
                        <div>
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-xs font-semibold text-slate-500 dark:text-gray-400">Burnout Risk</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-mono text-slate-400 line-through">92%</span>
                                    <span className="material-symbols-outlined text-[12px] text-slate-400">arrow_right_alt</span>
                                    <span className="text-sm font-mono font-bold text-emerald-500">47%</span>
                                </div>
                            </div>
                            <div className="h-2 w-full bg-gray-100 dark:bg-[#2f2839] rounded-full overflow-hidden relative">
                                <div className="absolute top-0 left-0 h-full bg-red-500/20 w-[92%]"></div>
                                <div className="absolute top-0 left-0 h-full bg-emerald-500 rounded-full w-[47%] transition-all duration-500"></div>
                                <div className="absolute top-0 left-[47%] h-full w-[45%] bg-gradient-to-r from-emerald-500/0 to-red-500/0 flex items-center justify-center">
                                    <div className="w-full border-t border-dashed border-emerald-500/50 mt-[1px]"></div>
                                </div>
                            </div>
                            <p className="text-[10px] text-slate-400 mt-1.5 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[12px] text-emerald-500">verified</span>
                                Lowers risk of resignation significantly.
                            </p>
                        </div>
                        <div>
                            <div className="flex justify-between items-end mb-2">
                                <span className="text-xs font-semibold text-slate-500 dark:text-gray-400">Morale</span>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-mono text-slate-400 line-through">40%</span>
                                    <span className="material-symbols-outlined text-[12px] text-slate-400">arrow_right_alt</span>
                                    <span className="text-sm font-mono font-bold text-emerald-500">85%</span>
                                </div>
                            </div>
                            <div className="h-2 w-full bg-gray-100 dark:bg-[#2f2839] rounded-full overflow-hidden relative">
                                <div className="absolute top-0 left-0 h-full bg-emerald-500 rounded-full w-[85%] transition-all duration-500"></div>
                                <div className="absolute top-0 left-0 h-full bg-orange-500 w-[40%] rounded-l-full border-r border-white/20"></div>
                            </div>
                        </div>
                        <div className="pt-3 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
                            <span className="text-xs font-semibold text-slate-500 dark:text-gray-400">Est. Productivity Return</span>
                            <span className="px-2 py-1 rounded bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold font-mono">+25%</span>
                        </div>
                    </div>
                </div>

                <div className="px-4 mb-6">
                    <div className="flex gap-3 p-3 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-500/20">
                        <span className="material-symbols-outlined text-blue-500 shrink-0 text-[20px]">info</span>
                        <p className="text-xs text-blue-800 dark:text-blue-200/80 leading-relaxed">
                            Sarah will be unavailable for <span className="font-bold">7 game days</span>. Her tasks will be paused or auto-delegated to juniors.
                        </p>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full p-4 bg-background-light dark:bg-background-dark border-t border-gray-200 dark:border-white/10 backdrop-blur-md z-50">
                <div className="max-w-md md:max-w-2xl mx-auto">
                    <div className="flex items-center justify-between mb-3 px-1">
                        <span className="text-sm text-slate-500 dark:text-gray-400">Total Cost</span>
                        <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">$2,300</span>
                    </div>
                    <button className="w-full flex items-center justify-center gap-2 p-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-sm shadow-lg shadow-primary/25 transition-all active:scale-[0.98]">
                        <span className="material-symbols-outlined text-[20px]">send</span>
                        Approve 1 Week Vacation
                    </button>
                </div>
            </div>
        </div>
    );
};
