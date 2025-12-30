
import { useState } from 'react';
import { supabase } from '../../../lib/supabase';

interface Employee {
    id: string;
    name: string;
    role: string;
    salary: string;
    salary_raw: number;
    img: string;
    stats: any;
}

interface ActionProps {
    onBack: () => void;
    onConfirm?: () => void; // Optional, can be handled internally
    employee: Employee;
    companyId: string;
    companyCash: number;
}

export const Fire = ({ onBack, onConfirm, employee, companyId }: ActionProps) => {
    const [loading, setLoading] = useState(false);

    // Calculate severance (2 months)
    // salary_raw is annual.
    const monthlySalary = Math.ceil(employee.salary_raw / 12);
    const severanceCost = monthlySalary * 2;

    const handleFire = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase.functions.invoke('perform-fire', {
                body: {
                    company_id: companyId,
                    employee_id: employee.id
                }
            });

            if (error) throw error;
            if (data.error) throw new Error(data.error);

            alert(`Fired ${employee.name}. Severance of $${severanceCost.toLocaleString()} paid.`);
            if (onConfirm) onConfirm();

        } catch (err: any) {
            console.error("Firing failed:", err);
            alert(err.message || "Failed to fire employee");
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 backdrop-blur-[6px] bg-slate-900/70 animate-in fade-in duration-300">
            {/* Background overlay */}
            <div className="absolute inset-0 z-0" onClick={onBack}></div>

            <div className="relative z-10 w-full max-w-sm md:max-w-lg bg-surface-light dark:bg-surface-dark rounded-2xl shadow-2xl overflow-hidden border border-red-100 dark:border-red-900/30 transform transition-all scale-100 animate-in zoom-in-95 duration-200">
                <div className="bg-red-50/50 dark:bg-red-900/10 p-6 flex flex-col items-center border-b border-red-100 dark:border-red-900/20">
                    <div className="relative">
                        <div className="h-20 w-20 rounded-full border-4 border-white dark:border-[#2f2839] shadow-lg overflow-hidden grayscale">
                            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url("${employee.img}")` }}></div>
                        </div>
                        <div className="absolute -bottom-1 -right-1 z-10 bg-red-600 text-white rounded-full p-1 border-2 border-white dark:border-[#1e1e24] shadow-md">
                            <span className="material-symbols-outlined text-[16px] block">close</span>
                        </div>
                    </div>
                    <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white text-center">Fire {employee.name}?</h2>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wide">{employee.role}</p>
                </div>
                <div className="p-6">
                    <div className="flex items-start gap-3 mb-5 bg-red-50 dark:bg-red-900/10 p-3 rounded-lg border border-red-100 dark:border-red-900/20">
                        <span className="material-symbols-outlined text-red-600 dark:text-red-400 mt-0.5">warning</span>
                        <div>
                            <p className="text-sm font-bold text-red-700 dark:text-red-400">Irreversible Action</p>
                            <p className="text-xs text-red-600/80 dark:text-red-300/70 mt-0.5 leading-relaxed">
                                Firing {employee.name.split(' ')[0]} will trigger immediate penalties and cannot be undone.
                            </p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center pb-3 border-b border-dashed border-gray-200 dark:border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="bg-slate-100 dark:bg-slate-800 p-1.5 rounded text-slate-500 dark:text-slate-400">
                                    <span className="material-symbols-outlined text-[18px]">group</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-slate-700 dark:text-gray-300">Team Morale</span>
                                    <span className="text-[10px] text-slate-400">Impact on team</span>
                                </div>
                            </div>
                            <span className="text-sm font-bold text-red-600 dark:text-red-400">-15%</span>
                        </div>
                        <div className="flex justify-between items-center pb-3 border-b border-dashed border-gray-200 dark:border-white/10">
                            <div className="flex items-center gap-3">
                                <div className="bg-slate-100 dark:bg-slate-800 p-1.5 rounded text-slate-500 dark:text-slate-400">
                                    <span className="material-symbols-outlined text-[18px]">attach_money</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-slate-700 dark:text-gray-300">Severance Fee</span>
                                    <span className="text-[10px] text-slate-400">2 months salary</span>
                                </div>
                            </div>
                            <span className="text-sm font-bold text-red-600 dark:text-red-400">-${severanceCost.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="bg-slate-100 dark:bg-slate-800 p-1.5 rounded text-slate-500 dark:text-slate-400">
                                    <span className="material-symbols-outlined text-[18px]">gavel</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium text-slate-700 dark:text-gray-300">Legal Risk</span>
                                    <span className="text-[10px] text-slate-400">Chance of lawsuit</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="text-sm font-bold text-orange-500">Medium</span>
                                <span className="material-symbols-outlined text-[16px] text-orange-500">trending_flat</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-[#181022]/50 flex gap-3 border-t border-gray-100 dark:border-white/5">
                    <button onClick={onBack} disabled={loading} className="flex-1 py-3 px-4 rounded-xl border border-gray-200 dark:border-white/10 text-slate-600 dark:text-gray-400 font-semibold text-sm hover:bg-white dark:hover:bg-[#2f2839] transition-all active:scale-95 shadow-sm disabled:opacity-50">
                        Cancel
                    </button>
                    <button 
                        onClick={handleFire} 
                        disabled={loading}
                        className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-sm shadow-lg shadow-red-600/30 transition-all active:scale-95 flex items-center justify-center gap-2 group disabled:opacity-50"
                    >
                        {loading ? (
                            <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
                        ) : (
                            <span className="material-symbols-outlined text-[20px] group-hover:animate-pulse">local_fire_department</span>
                        )}
                        {loading ? 'Firing...' : 'Confirm Fire'}
                    </button>
                </div>
            </div>
        </div>
    );
}
