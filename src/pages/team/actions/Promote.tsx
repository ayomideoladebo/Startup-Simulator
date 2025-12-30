import React from 'react';
import { supabase } from '../../../lib/supabase';

interface ActionProps {
    onBack: () => void;
    employee: any;
    companyCash: number;
    companyId: string;
    onConfirm: () => void;
}

interface PromotionOption {
    title: string;
    salaryMultiplier: number;
    track: string;
    newSalary: number;
    salaryIncrease: number;
}

const PROMOTION_BONUS = 5000;

export const Promote = ({ onBack, employee, companyCash, companyId, onConfirm }: ActionProps) => {
    const [loading, setLoading] = React.useState(true);
    const [promoting, setPromoting] = React.useState(false);
    const [options, setOptions] = React.useState<PromotionOption[]>([]);
    const [selectedOption, setSelectedOption] = React.useState<PromotionOption | null>(null);
    const [currentRole, setCurrentRole] = React.useState('');
    const [currentSalary, setCurrentSalary] = React.useState(0);

    React.useEffect(() => {
        fetchPromotionOptions();
    }, [employee?.id]);

    const fetchPromotionOptions = async () => {
        if (!employee?.id) return;
        setLoading(true);
        try {
            const { data, error } = await supabase.functions.invoke('perform-promote', {
                body: { employee_id: employee.id }
            });
            if (error) throw error;
            if (data.error) throw new Error(data.error);
            
            setOptions(data.options || []);
            setCurrentRole(data.current_role);
            setCurrentSalary(data.current_salary);
            if (data.options?.length > 0) {
                // Auto-select the management track if available, else first option
                const mgmtOption = data.options.find((o: PromotionOption) => o.track === 'Management');
                setSelectedOption(mgmtOption || data.options[0]);
            }
        } catch (err) {
            console.error('Failed to fetch promotion options:', err);
        } finally {
            setLoading(false);
        }
    };

    const handlePromote = async () => {
        if (!selectedOption) return;
        setPromoting(true);
        try {
            const { data, error } = await supabase.functions.invoke('perform-promote', {
                body: {
                    company_id: companyId,
                    employee_id: employee.id,
                    new_role: selectedOption.title,
                    new_salary: selectedOption.newSalary,
                    promotion_bonus: PROMOTION_BONUS
                }
            });
            if (error) throw error;
            if (data.error) throw new Error(data.error);
            
            alert(`${employee.name} promoted to ${selectedOption.title}!`);
            onConfirm();
        } catch (err: any) {
            console.error(err);
            alert('Failed to promote: ' + err.message);
        } finally {
            setPromoting(false);
        }
    };

    const weeklyIncrease = selectedOption 
        ? Math.round((selectedOption.newSalary - currentSalary) / 52) 
        : 0;

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
                        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url("${employee?.img}")` }}></div>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-slate-900 dark:text-white">{employee?.name}</h1>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-slate-500 dark:text-gray-400 text-xs uppercase font-bold tracking-wider">Current Role:</span>
                            <span className="text-slate-700 dark:text-gray-200 text-xs font-semibold bg-gray-100 dark:bg-white/10 px-2 py-0.5 rounded">{currentRole || employee?.role}</span>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin h-8 w-8 border-4 border-primary rounded-full border-t-transparent"></div>
                    </div>
                ) : options.length === 0 ? (
                    <div className="p-4 text-center">
                        <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">work_off</span>
                        <p className="text-slate-500">No promotion paths available for this role.</p>
                    </div>
                ) : (
                    <>
                        <div className="p-4">
                            <h3 className="text-slate-900 dark:text-white text-sm font-bold mb-3 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px] text-primary">alt_route</span> Choose Career Path
                            </h3>
                            <div className="grid grid-cols-1 gap-3">
                                {options.map((opt, idx) => {
                                    const isSelected = selectedOption?.title === opt.title;
                                    const isManagement = opt.track === 'Management';
                                    return (
                                        <div 
                                            key={idx} 
                                            onClick={() => setSelectedOption(opt)}
                                            className="relative group cursor-pointer"
                                        >
                                            <div className={`absolute inset-0 rounded-xl border shadow-sm transition-all ${
                                                isSelected 
                                                    ? 'bg-primary/5 dark:bg-primary/10 border-2 border-primary' 
                                                    : 'bg-white dark:bg-surface-dark border-gray-200 dark:border-white/10 group-hover:border-primary/50'
                                            }`}></div>
                                            {isManagement && (
                                                <div className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm z-10">RECOMMENDED</div>
                                            )}
                                            <div className="relative p-4 flex items-center gap-4">
                                                <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                                                    isSelected 
                                                        ? 'border-[5px] border-primary bg-white dark:bg-surface-dark' 
                                                        : 'border-gray-300 dark:border-gray-600'
                                                }`}></div>
                                                <div className="flex-1">
                                                    <h4 className={`font-bold text-sm ${isSelected ? 'text-primary dark:text-white' : 'text-slate-900 dark:text-white'}`}>{opt.title}</h4>
                                                    <p className={`text-xs mt-0.5 ${isSelected ? 'text-primary/80 dark:text-gray-300' : 'text-slate-500 dark:text-gray-400'}`}>
                                                        {opt.track} Track
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className={`text-sm font-bold ${isSelected ? 'text-primary dark:text-white' : 'text-slate-900 dark:text-white'}`}>
                                                        ${(opt.newSalary / 1000).toFixed(0)}k
                                                    </p>
                                                    <p className="text-[10px] text-green-600 dark:text-green-400 font-bold">
                                                        +{Math.round((opt.salaryMultiplier - 1) * 100)}%
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {selectedOption && (
                            <div className="px-4 pb-4">
                                <h3 className="text-slate-900 dark:text-white text-sm font-bold mb-3 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-[18px] text-blue-400">analytics</span> Projected Impact
                                </h3>
                                <div className="bg-white dark:bg-surface-dark rounded-xl border border-gray-200 dark:border-white/5 p-4 shadow-sm">
                                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-100 dark:border-white/5">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-slate-500 dark:text-gray-400 font-medium mb-1">Base Salary</span>
                                            <span className="text-sm font-mono text-slate-400 dark:text-gray-500 line-through">${currentSalary?.toLocaleString()}</span>
                                        </div>
                                        <div className="flex flex-col items-center px-2">
                                            <span className="material-symbols-outlined text-slate-300 dark:text-gray-600">arrow_forward</span>
                                        </div>
                                        <div className="flex flex-col items-end">
                                            <span className="text-xs text-green-600 dark:text-green-400 font-bold bg-green-50 dark:bg-green-900/20 px-1.5 py-0.5 rounded mb-1">+${selectedOption.salaryIncrease?.toLocaleString()}</span>
                                            <span className="text-lg font-bold text-slate-900 dark:text-white">${selectedOption.newSalary?.toLocaleString()}</span>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs font-medium text-slate-500 dark:text-gray-400">Morale</span>
                                                <span className="text-[10px] font-bold text-green-500 bg-green-50 dark:bg-green-900/20 px-1 rounded">+Huge Boost</span>
                                            </div>
                                            <div className="h-2 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden flex">
                                                <div className="h-full bg-blue-400 opacity-30" style={{width: `${employee?.stats?.morale || 50}%`}}></div>
                                                <div className="h-full bg-green-500 animate-pulse" style={{width: '30%'}}></div>
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <div className="flex justify-between items-center">
                                                <span className="text-xs font-medium text-slate-500 dark:text-gray-400">Stress</span>
                                                <span className="text-[10px] font-bold text-orange-500 bg-orange-50 dark:bg-orange-900/20 px-1 rounded">+Slight</span>
                                            </div>
                                            <div className="h-2 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden flex">
                                                <div className="h-full bg-orange-400" style={{width: `${(employee?.stats?.burnout || 0) + 10}%`}}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-500/20 rounded-lg flex gap-3">
                                    <span className="material-symbols-outlined text-blue-500 text-[20px] shrink-0">info</span>
                                    <p className="text-xs text-blue-800 dark:text-blue-200 leading-relaxed">
                                        Promoting {employee?.name} to <strong>{selectedOption.title}</strong> will significantly improve morale but may increase stress levels initially.
                                    </p>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            <div className="fixed bottom-0 left-0 w-full bg-white dark:bg-[#181022] border-t border-gray-200 dark:border-white/10 p-4 pb-8 z-50">
                <div className="max-w-md md:max-w-2xl mx-auto">
                    <div className="flex justify-between items-end mb-4 px-1">
                        <div>
                            <p className="text-[10px] text-slate-500 dark:text-gray-400 uppercase font-bold tracking-wider">Cost to Promote</p>
                            <p className="text-lg font-bold text-slate-900 dark:text-white">${PROMOTION_BONUS.toLocaleString()} <span className="text-xs font-normal text-slate-400">(Bonus)</span></p>
                        </div>
                        {selectedOption && (
                            <div className="text-right">
                                <p className="text-[10px] text-slate-500 dark:text-gray-400 uppercase font-bold tracking-wider">New Weekly Cost</p>
                                <p className="text-lg font-bold text-red-500">+${weeklyIncrease.toLocaleString()}<span className="text-xs font-normal text-slate-400">/wk</span></p>
                            </div>
                        )}
                    </div>
                    {companyCash < PROMOTION_BONUS && (
                        <p className="text-center text-red-500 text-xs font-bold mb-2">Insufficient Funds</p>
                    )}
                    <button 
                        onClick={handlePromote}
                        disabled={promoting || !selectedOption || companyCash < PROMOTION_BONUS}
                        className="w-full bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-base py-3.5 rounded-xl shadow-lg shadow-primary/25 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                        {promoting ? (
                            <span className="animate-spin h-5 w-5 border-2 border-white rounded-full border-t-transparent"></span>
                        ) : (
                            <>
                                <span className="material-symbols-outlined text-[20px]">stars</span>
                                Confirm Promotion
                            </>
                        )}
                    </button>
                    <button onClick={onBack} className="w-full mt-3 text-slate-500 dark:text-slate-400 font-semibold text-sm hover:text-slate-700 dark:hover:text-slate-200 transition-colors">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}
