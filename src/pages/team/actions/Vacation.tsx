import React from 'react';
import { supabase } from '../../../lib/supabase';

interface ActionProps {
    onBack: () => void;
    employee: any;
    companyCash: number;
    companyId: string;
    onConfirm: () => void;
}

export const Vacation = ({ onBack, employee, companyCash, companyId, onConfirm }: ActionProps) => {
    const [selectedDuration, setSelectedDuration] = React.useState<number>(7);
    const [loading, setLoading] = React.useState(false);

    const options = [
        { label: 'Long Weekend', days: 3, cost: 575, reduction: 15, icon: 'weekend', color: 'blue' },
        { label: '1 Week Recharge', days: 7, cost: 2300, reduction: 40, icon: 'beach_access', color: 'purple', recommended: true },
        { label: '2 Weeks Sabbatical', days: 14, cost: 4600, reduction: 100, icon: 'flight_takeoff', color: 'orange' }
    ];

    const selectedOption = options.find(o => o.days === selectedDuration) || options[1];

    const handleConfirm = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase.functions.invoke('perform-vacation', {
                body: {
                    company_id: companyId,
                    employee_id: employee.id,
                    duration_days: selectedOption.days,
                    cost: selectedOption.cost,
                    burnout_reduction: selectedOption.reduction
                }
            });

            if (error) throw error;
            if (data.error) throw new Error(data.error);

            alert('Vacation approved!');
            onConfirm();
        } catch (err: any) {
            console.error(err);
            alert('Failed to approve vacation: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

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
                                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url("${employee.img}")` }}></div>
                            </div>
                            {employee.stats.burnout > 70 && (
                                <div className="absolute -bottom-1 -right-1 bg-red-500 text-white rounded-full p-1 border-2 border-white dark:border-[#1e1e24] shadow-sm">
                                    <span className="material-symbols-outlined text-[12px] block">local_fire_department</span>
                                </div>
                            )}
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 dark:text-white leading-tight">{employee.name}</h3>
                            <p className="text-xs text-slate-500 dark:text-gray-400 mb-1">{employee.role}</p>
                            {employee.stats.burnout > 70 ? (
                                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 text-[10px] font-bold uppercase tracking-wider">
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                                    Burnout Critical
                                </div>
                            ) : (
                                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-[10px] font-bold uppercase tracking-wider">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                                    Healthy
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="px-4 mb-6">
                    <h3 className="text-slate-900 dark:text-white text-sm font-bold mb-3 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-primary">date_range</span> Select Duration
                    </h3>
                    <div className="flex flex-col gap-3">
                        {options.map((opt) => (
                            <label key={opt.label} className="cursor-pointer relative group">
                                <input 
                                    className="peer sr-only" 
                                    name="vacation_duration" 
                                    type="radio" 
                                    checked={selectedDuration === opt.days}
                                    onChange={() => setSelectedDuration(opt.days)}
                                />
                                <div className="flex items-center justify-between p-4 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/5 shadow-sm transition-all peer-checked:border-primary peer-checked:ring-1 peer-checked:ring-primary dark:peer-checked:bg-primary/5 hover:bg-gray-50 dark:hover:bg-white/[0.02]">
                                    {opt.recommended && <div className="absolute -top-2 right-4 bg-primary text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">RECOMMENDED</div>}
                                    <div className="flex items-center gap-4">
                                        <div className={`bg-${opt.color}-100 dark:bg-${opt.color}-900/30 text-${opt.color}-600 dark:text-${opt.color}-400 w-10 h-10 rounded-full flex items-center justify-center shrink-0`}>
                                            <span className="material-symbols-outlined text-[20px]">{opt.icon}</span>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">{opt.label}</h4>
                                            <p className="text-xs text-slate-500 dark:text-gray-400">{opt.days} Days Off</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-bold text-slate-900 dark:text-white">${opt.cost}</div>
                                        <div className="text-[10px] text-green-600 dark:text-green-400 font-medium">
                                            {opt.reduction === 100 ? 'Full Reset' : `-${opt.reduction}% Stress`}
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-1/2 right-4 -translate-y-1/2 hidden peer-checked:block text-primary">
                                    <span className="material-symbols-outlined text-[20px]">check_circle</span>
                                </div>
                            </label>
                        ))}
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
                                    <span className="text-xs font-mono text-slate-400 line-through">{employee.stats.burnout}%</span>
                                    <span className="material-symbols-outlined text-[12px] text-slate-400">arrow_right_alt</span>
                                    <span className="text-sm font-mono font-bold text-emerald-500">
                                        {Math.max(0, employee.stats.burnout - selectedOption.reduction)}%
                                    </span>
                                </div>
                            </div>
                            <div className="h-2 w-full bg-gray-100 dark:bg-[#2f2839] rounded-full overflow-hidden relative">
                                <div className="absolute top-0 left-0 h-full bg-red-500/20" style={{ width: `${employee.stats.burnout}%` }}></div>
                                <div className="absolute top-0 left-0 h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${Math.max(0, employee.stats.burnout - selectedOption.reduction)}%` }}></div>
                            </div>
                            <p className="text-[10px] text-slate-400 mt-1.5 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[12px] text-emerald-500">verified</span>
                                Lowers risk of resignation significantly.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="px-4 mb-6">
                    <div className="flex gap-3 p-3 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-500/20">
                        <span className="material-symbols-outlined text-blue-500 shrink-0 text-[20px]">info</span>
                        <p className="text-xs text-blue-800 dark:text-blue-200/80 leading-relaxed">
                            {employee.name} will be unavailable for <span className="font-bold">{selectedOption.days} game days</span>.
                        </p>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 w-full p-4 bg-background-light dark:bg-background-dark border-t border-gray-200 dark:border-white/10 backdrop-blur-md z-50">
                <div className="max-w-md md:max-w-2xl mx-auto">
                    <div className="flex items-center justify-between mb-3 px-1">
                        <span className="text-sm text-slate-500 dark:text-gray-400">Total Cost</span>
                        <div className="flex flex-col items-end">
                             <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">${selectedOption.cost}</span>
                             {companyCash < selectedOption.cost && <span className="text-xs text-red-500 font-bold">Insufficient Funds</span>}
                        </div>
                    </div>
                    <button 
                        onClick={handleConfirm}
                        disabled={loading || companyCash < selectedOption.cost}
                        className="w-full flex items-center justify-center gap-2 p-3.5 rounded-xl bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm shadow-lg shadow-primary/25 transition-all active:scale-[0.98]"
                    >
                        {loading ? (
                            <span className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent"></span>
                        ) : (
                            <>
                                <span className="material-symbols-outlined text-[20px]">send</span>
                                Approve Vacation
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};
