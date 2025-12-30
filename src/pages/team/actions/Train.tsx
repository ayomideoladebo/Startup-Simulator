
import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { useGameState } from '../../../hooks/useGameState';

// Reusing Employee interface for now (should export from Team.tsx or types)
interface Employee {
    id: string;
    name: string;
    role: string;
    salary: string;
    salary_raw: number;
    img: string;
    level?: number;
    experience?: number;
    stats: {
        skill: number;
        burnout: number; // 0-100
        morale: number; // 0-100
        loyalty: number; // 0-100
    };
    traits: { icon: string; name: string; color: string }[];
    isBurnoutRisk?: boolean;
    is_training?: boolean;
    training_program?: string;
    training_days_left?: number;
}

interface ActionProps {
    onBack: () => void;
    employee: Employee;
    companyCash: number;
    onTrainingComplete: () => void;
}

interface TrainingOption {
    id: string;
    title: string;
    description: string;
    cost: number;
    duration_days: number;
    skill_gain: number;
    morale_impact: number;
    type: 'refresher' | 'workshop' | 'bootcamp';
}

export const Train = ({ onBack, employee, companyCash, onTrainingComplete }: ActionProps) => {
    const { company } = useGameState();
    const [options, setOptions] = useState<TrainingOption[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
    const [training, setTraining] = useState(false);

    useEffect(() => {
        if (employee.is_training) {
            setLoading(false);
            return;
        }

        const fetchOptions = async () => {
            if (!company) return;
            // setOptions(null); // Reset if needed
            setLoading(true);
            try {
                const { data, error } = await supabase.functions.invoke('generate-training-options', {
                    body: { 
                        role: employee.role, 
                        skill_level: employee.stats.skill,
                        company_niche: company.niche || 'Tech'
                    }
                });

                if (error) throw error;
                if (data.options) {
                    setOptions(data.options);
                    // Select middle option by default if available
                    if (data.options.length > 1) setSelectedOptionId(data.options[1].id);
                    else if (data.options.length > 0) setSelectedOptionId(data.options[0].id);
                }

            } catch (err) {
                console.error("Failed to generate training", err);
                // Fallback hardcoded if AI fails
                 setOptions([
                    { id: 'fallback_1', title: 'Quick Refresher', description: 'Basic skills update.', cost: 200, duration_days: 1, skill_gain: 2, morale_impact: 0, type: 'refresher' },
                    { id: 'fallback_2', title: 'Standard Workshop', description: 'Deep dive.', cost: 800, duration_days: 3, skill_gain: 5, morale_impact: 5, type: 'workshop' },
                    { id: 'fallback_3', title: 'Mastery Seminar', description: 'Advanced concepts.', cost: 2000, duration_days: 7, skill_gain: 10, morale_impact: 10, type: 'bootcamp' }
                ]);
                setSelectedOptionId('fallback_2');
            } finally {
                setLoading(false);
            }
        };

        fetchOptions();
    }, [employee, company]);

    const handleStartTraining = async () => {
        if (!selectedOptionId || !options || !company) return;
        const option = options.find(o => o.id === selectedOptionId);
        if (!option) return;

        setTraining(true);
        try {
            const { data, error } = await supabase.functions.invoke('perform-training', {
                body: {
                    company_id: company.id,
                    employee_id: employee.id,
                    cost: option.cost,
                    skill_gain: option.skill_gain,
                    morale_impact: option.morale_impact,
                    training_program_name: option.title,
                    duration_days: option.duration_days
                }
            });

            if (error) throw error;
             if (data.success === false) throw new Error(data.error);

            alert(`Training Started: ${employee.training_program || option.title}. Takes ${option.duration_days} days.`);
            onTrainingComplete(); // Refresh parent & close

        } catch (err: any) {
            alert(err.message || 'Training failed');
        } finally {
            setTraining(false);
        }
    };

    if (employee.is_training) {
        return (
             <div className="fixed inset-0 z-[100] bg-background-light dark:bg-background-dark flex flex-col min-h-full overflow-y-auto no-scrollbar animate-in fade-in slide-in-from-right duration-300">
                <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] opacity-20 dark:opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>

                <div className="sticky top-0 z-50 flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between border-b border-gray-200 dark:border-white/10 backdrop-blur-xl bg-opacity-90 dark:bg-opacity-90">
                    <div onClick={onBack} className="text-slate-900 dark:text-white flex size-10 shrink-0 items-center justify-center cursor-pointer rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Training Active</h2>
                    </div>
                    <div className="size-10"></div>
                </div>

                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                    <div className="h-24 w-24 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6 animate-pulse">
                        <span className="material-symbols-outlined text-[48px]">school</span>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Training in Progress</h1>
                    <p className="text-slate-500 dark:text-gray-400 max-w-xs mx-auto mb-8">
                        {employee.name} is currently enrolled in <strong>"{employee.training_program}"</strong>.
                    </p>

                    <div className="w-full max-w-sm bg-white dark:bg-surface-dark rounded-xl p-6 shadow-sm border border-gray-100 dark:border-white/5">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Status</h3>
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-500 dark:text-gray-400">Time Remaining</span>
                                <span className="text-xl font-bold text-slate-900 dark:text-white font-mono">{employee.training_days_left} Days</span>
                            </div>
                            <div className="w-full bg-gray-100 dark:bg-white/5 rounded-full h-3 overflow-hidden">
                                <div className="bg-blue-500 h-full rounded-full w-1/2 animate-pulse"></div>
                            </div>
                            <p className="text-xs text-slate-400 dark:text-gray-500 italic">
                                Training effects will apply upon completion.
                            </p>
                        </div>
                    </div>
                    
                    <button 
                        onClick={onBack}
                        className="mt-8 px-6 py-3 rounded-full bg-gray-100 dark:bg-white/5 text-slate-900 dark:text-white font-bold hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                    >
                        Return to Roster
                    </button>
                </div>
            </div>
        )
    }

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
                                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url("${employee.img}")` }}></div>
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-white dark:border-surface-dark">
                                Lvl {employee.level || 1}
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-slate-900 dark:text-white font-bold text-base truncate">{employee.name}</h3>
                            <p className="text-slate-500 dark:text-gray-400 text-xs truncate mb-2">{employee.role}</p>
                            <div className="space-y-1">
                                <div className="flex justify-between text-[10px] font-semibold text-slate-400 dark:text-gray-500 uppercase tracking-wide">
                                    <span>Current Skill</span>
                                    <span>{employee.stats.skill}/100</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-100 dark:bg-[#2f2839] rounded-full overflow-hidden">
                                    <div className="h-full bg-primary rounded-full" style={{ width: `${employee.stats.skill}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-4">
                    <h3 className="text-slate-900 dark:text-white text-sm font-bold mb-3 flex items-center gap-2">
                        <span className="material-symbols-outlined text-[18px] text-primary">school</span>
                        {loading ? 'Analyzing Skill Gaps...' : 'Available Programs'}
                    </h3>
                    
                    {loading ? (
                         <div className="flex flex-col gap-3 animate-pulse">
                            {[1,2,3].map(i => (
                                <div key={i} className="h-24 w-full bg-gray-100 dark:bg-white/5 rounded-xl"></div>
                            ))}
                         </div>
                    ) : (
                        <div className="flex flex-col gap-3">
                            {options?.map((option) => (
                                <label key={option.id} className="relative cursor-pointer group">
                                    <input 
                                        type="radio"
                                        name="training_plan" 
                                        className="peer sr-only training-radio"
                                        checked={selectedOptionId === option.id}
                                        onChange={() => setSelectedOptionId(option.id)}
                                    />
                                    <div className="p-4 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/5 transition-all duration-200 hover:border-gray-300 dark:hover:border-white/20 shadow-sm peer-checked:border-primary peer-checked:bg-primary/5 dark:peer-checked:bg-primary/15">
                                        <div className="flex items-start justify-between gap-3 mb-3">
                                            <div className="flex gap-3">
                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                                                    option.type === 'refresher' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                                                    option.type === 'workshop' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' :
                                                    'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400'
                                                }`}>
                                                    <span className="material-symbols-outlined text-[20px]">
                                                        {option.type === 'refresher' ? 'bolt' : option.type === 'workshop' ? 'psychology' : 'podium'}
                                                    </span>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{option.title}</h4>
                                                    <p className="text-xs text-slate-500 dark:text-gray-400 mt-0.5">{option.description}</p>
                                                </div>
                                            </div>
                                            <div className="h-5 w-5 rounded-full border-2 border-gray-300 dark:border-gray-600 flex items-center justify-center pointer-events-none peer-checked:bg-primary peer-checked:border-primary">
                                                 <span className={`material-symbols-outlined text-[14px] text-white transition-opacity ${selectedOptionId === option.id ? 'opacity-100' : 'opacity-0'}`}>check</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-gray-300 text-[10px] font-bold uppercase tracking-wide flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[12px]">schedule</span> {option.duration_days} Day{option.duration_days > 1 ? 's' : ''}
                                            </span>
                                            <span className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-gray-300 text-[10px] font-bold uppercase tracking-wide flex items-center gap-1">
                                                <span className="material-symbols-outlined text-[12px]">attach_money</span> ${option.cost.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="pt-3 border-t border-gray-100 dark:border-white/5 flex items-center gap-4 text-xs">
                                            <div className="flex items-center gap-1 text-green-600 dark:text-green-400 font-semibold">
                                                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                                                +{option.skill_gain} Skill
                                            </div>
                                            <div className={`flex items-center gap-1 font-semibold ${option.morale_impact < 0 ? 'text-red-500' : 'text-slate-400 dark:text-gray-500'}`}>
                                                <span className="material-symbols-outlined text-[14px]">{option.morale_impact < 0 ? 'trending_down' : option.morale_impact > 0 ? 'sentiment_satisfied' : 'remove'}</span>
                                                {option.morale_impact === 0 ? 'No Morale Effect' : `${option.morale_impact > 0 ? '+' : ''}${option.morale_impact}% Morale`}
                                            </div>
                                        </div>
                                    </div>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {!loading && selectedOptionId && options && (
                    <div className="mx-4 mt-6 p-4 rounded-xl bg-slate-50 dark:bg-white/5 border border-dashed border-slate-300 dark:border-white/10">
                        <h4 className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wide mb-3">Projected Outcome</h4>
                        <div className="flex items-center justify-between">
                            <div className="text-center">
                                <p className="text-[10px] text-slate-400">Skill Level</p>
                                <div className="flex items-baseline justify-center gap-1">
                                    <span className="text-lg font-bold text-slate-900 dark:text-white">{employee.stats.skill}</span>
                                    <span className="text-xs font-bold text-green-500">➜ {Math.min(100, employee.stats.skill + (options.find(o => o.id === selectedOptionId)?.skill_gain || 0))}</span>
                                </div>
                            </div>
                            <div className="h-8 w-px bg-slate-200 dark:bg-white/10"></div>
                            <div className="text-center">
                                <p className="text-[10px] text-slate-400">Morale</p>
                                <div className="flex items-baseline justify-center gap-1">
                                    <span className="text-lg font-bold text-slate-900 dark:text-white">{employee.stats.morale}%</span>
                                    <span className={`text-xs font-bold ${(options.find(o => o.id === selectedOptionId)?.morale_impact || 0) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                        ➜ {Math.max(0, Math.min(100, employee.stats.morale + (options.find(o => o.id === selectedOptionId)?.morale_impact || 0)))}%
                                    </span>
                                </div>
                            </div>
                            <div className="h-8 w-px bg-slate-200 dark:bg-white/10"></div>
                            <div className="text-center">
                                <p className="text-[10px] text-slate-400">Time</p>
                                <div className="flex items-baseline justify-center gap-1">
                                    <span className="text-lg font-bold text-slate-900 dark:text-white">{options.find(o => o.id === selectedOptionId)?.duration_days} Day(s)</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md md:max-w-2xl bg-white dark:bg-[#181022] border-t border-gray-200 dark:border-white/10 p-4 z-50 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] transition-transform duration-300 ${loading ? 'translate-y-full' : 'translate-y-0'}`}>
                <div className="flex items-center justify-between mb-3">
                    <div className="flex flex-col">
                        <span className="text-xs text-slate-500 dark:text-gray-400">Total Cost</span>
                        <span className="text-xl font-bold text-slate-900 dark:text-white">${options?.find(o => o.id === selectedOptionId)?.cost.toLocaleString()}</span>
                    </div>
                     <div className="text-right flex flex-col items-end">
                        <span className="text-xs text-slate-500 dark:text-gray-400">Company Balance</span>
                         <span className={`text-sm font-medium ${companyCash < (options?.find(o => o.id === selectedOptionId)?.cost || 0) ? 'text-red-500' : 'text-slate-700 dark:text-gray-300'}`}>
                            ${companyCash.toLocaleString()}
                        </span>
                    </div>
                </div>
                <button 
                    onClick={handleStartTraining}
                    disabled={training || !selectedOptionId || companyCash < (options?.find(o => o.id === selectedOptionId)?.cost || 0)}
                    className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-primary/30 active:scale-[0.98] transition-all"
                >
                    {training ? (
                         <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                    ) : (
                        <span className="material-symbols-outlined text-[20px]">play_circle</span>
                    )}
                    {training ? 'Processing...' : 'Start Training'}
                </button>
            </div>
        </div>
    );
}
