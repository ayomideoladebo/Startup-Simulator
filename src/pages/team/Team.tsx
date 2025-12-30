import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { HiringConfirmation } from './HiringConfirmation';
import { Recruitment, Candidate } from './Recruitment';
import { Train } from './actions/Train';
import { Bonus } from './actions/Bonus';
import { Vacation } from './actions/Vacation';
import { Promote } from './actions/Promote';
import { Fire } from './actions/Fire';
import { supabase } from '../../lib/supabase';
import { useGameState } from '../../hooks/useGameState';

type GameLayoutContextType = {
    setBottomNavVisible: (visible: boolean) => void;
};

// Types (moving to types file later recommended)
interface Employee {
    id: string;
    name: string;
    role: string;
    salary: string; // e.g., "$120k/yr"
    salary_raw: number; // raw yearly integer
    img: string;
    level: number; // Employee level 1-10
    experience: number; // Current XP
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
    vacation_remaining_days?: number;
}

export const Team = () => {
    const { company } = useGameState();
    const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [actionView, setActionView] = useState<'train' | 'bonus' | 'vacation' | 'promote' | 'fire' | 'recruit' | 'hiring_confirmed' | null>(null);
    const [newlyHired, setNewlyHired] = useState<Candidate | null>(null);
    const [payrollDue, setPayrollDue] = useState(false);
    const [lastPayrollTurn, setLastPayrollTurn] = useState(0);
    const [currentTurn, setCurrentTurn] = useState(0);
    const [payingSalary, setPayingSalary] = useState(false);
    const { setBottomNavVisible } = useOutletContext<GameLayoutContextType>();

    // Derived state
    const turnsSincePayroll = currentTurn - lastPayrollTurn;

    const fetchPayrollStatus = async () => {
        if (!company) return;
        
        // Fetch company payroll data
        const { data: compData } = await supabase
            .from('companies')
            .select('payroll_due, last_payroll_turn')
            .eq('id', company.id)
            .single();

        if (compData) {
            setPayrollDue(compData.payroll_due || false);
            setLastPayrollTurn(compData.last_payroll_turn || 0);
        }

        // Fetch Game State for current turn
        const { data: gsData } = await supabase
            .from('game_state')
            .select('turn_count')
            .eq('company_id', company.id)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();
        
        if (gsData) {
            setCurrentTurn(gsData.turn_count);
        }
    };

    const handlePaySalary = async () => {
        if (!company) return;
        setPayingSalary(true);
        try {
            const { data, error } = await supabase.functions.invoke('perform-payroll', {
                body: { company_id: company.id }
            });

            if (error) throw error;
            if (data.success === false) throw new Error(data.error);
            
            // Refresh Data
            await fetchPayrollStatus();
            await fetchEmployees(); // To update morale
            // Maybe show success toast
            alert(`Salaries paid: $${(data.paid/1000).toFixed(1)}k deducted.`);

        } catch (err: any) {
            console.error('Payment failed:', err);
            alert(err.message || "Failed to pay salaries");
        } finally {
            setPayingSalary(false);
        }
    };

    const fetchEmployees = async () => {
        if (!company) return;
        
        const { data, error } = await supabase
            .from('employees')
            .select('*')
            .eq('company_id', company.id)
            .order('hired_at', { ascending: true });

        if (error) {
            console.error('Error fetching employees:', error);
            return;
        }

        const mapped: Employee[] = data.map((e: any) => ({
            id: e.id,
            name: e.name,
            role: e.role,
            salary: `$${(e.salary / 1000).toFixed(0)}k/yr`,
            salary_raw: e.salary,
            img: e.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${e.name}`,
            level: e.level || 1,
            experience: e.experience || 0,
            stats: {
                skill: e.skill_quality || 50,
                burnout: e.burnout || 0,
                morale: e.morale || 100,
                loyalty: 50
            },
            traits: Array.isArray(e.traits) ? e.traits.map((t: string) => ({
                icon: 'star',
                name: t,
                color: 'blue'
            })) : [],
            isBurnoutRisk: (e.burnout || 0) > 70,
            is_training: e.is_training,
            training_program: e.training_program_name,
            training_days_left: e.training_remaining_days,
            vacation_remaining_days: e.vacation_remaining_days || 0
        }));
        setEmployees(mapped);
    };

    useEffect(() => {
        fetchEmployees();
        fetchPayrollStatus();
    }, [company]);

    useEffect(() => {
        if (selectedMemberId || actionView) {
            setBottomNavVisible(false);
        } else {
            setBottomNavVisible(true);
        }
        return () => setBottomNavVisible(true);
    }, [selectedMemberId, actionView, setBottomNavVisible]);

    // Handle full-screen action views (replacing detail view)
    if (selectedMemberId && actionView === 'train') {
        const emp = employees.find(e => e.id === selectedMemberId);
        if (emp) {
            return (
                <Train 
                    onBack={() => setActionView(null)} 
                    employee={emp}
                    companyCash={company?.cash || 0}
                    onTrainingComplete={() => {
                        fetchEmployees();
                        setActionView(null);
                    }}
                />
            );
        }
    }
    if (selectedMemberId && actionView === 'bonus') {
        const emp = employees.find(e => e.id === selectedMemberId);
        if (emp) {
            return (
                <Bonus 
                    onBack={() => setActionView(null)} 
                    employee={emp}
                    companyCash={company?.cash || 0}
                    companyId={company.id}
                    onConfirm={() => {
                        fetchEmployees();
                        setActionView(null);
                    }}
                />
            );
        }
    }
    if (selectedMemberId && actionView === 'vacation') {
        const emp = employees.find(e => e.id === selectedMemberId);
        if (emp) {
            return (
                <Vacation 
                    onBack={() => setActionView(null)} 
                    employee={emp}
                    companyCash={company?.cash || 0}
                    companyId={company.id}
                    onConfirm={() => {
                        fetchEmployees();
                        setActionView(null);
                    }}
                />
            );
        }
    }
    if (selectedMemberId && actionView === 'promote') {
        const emp = employees.find(e => e.id === selectedMemberId);
        if (emp) {
            return (
                <Promote 
                    onBack={() => setActionView(null)} 
                    employee={emp}
                    companyCash={company?.cash || 0}
                    companyId={company.id}
                    onConfirm={() => {
                        fetchEmployees();
                        setActionView(null);
                    }}
                />
            );
        }
    }
    if (selectedMemberId && actionView === 'fire') {
        const emp = employees.find(e => e.id === selectedMemberId);
        if (emp) {
            return (
                <Fire 
                    onConfirm={() => {
                        fetchEmployees(); // Refresh data
                        // Maybe fetch company cash too if needed, but handled by useEffect mostly
                         setActionView(null);
                         setSelectedMemberId(null);
                    }} 
                    onBack={() => setActionView(null)}
                    employee={emp}
                    companyId={company.id}
                    companyCash={company.cash}
                />
            );
        }
    }

    const handleHire = async (candidate: Candidate) => {
        if (!company) return;

        // 1. Insert into employees
        const { error: insertError } = await supabase
            .from('employees')
            .insert({
                company_id: company.id,
                name: candidate.name,
                role: candidate.role,
                salary: candidate.salary_ask,
                morale: 100,
                skill_quality: candidate.stats.skill,
                traits: candidate.traits?.map(t => t.name) || [],
                avatar_url: candidate.img
            })
            .select() // Select to get the new ID
            .single();

        if (insertError) {
            console.error('Error hiring:', insertError);
            alert('Failed to hire candidate');
            return;
        }

        // 2. Delete from candidates
        if (candidate.id) {
            await supabase
                .from('job_candidates')
                .delete()
                .eq('id', candidate.id);
        }

        // 3. Update local state
        setNewlyHired(candidate);
        await fetchEmployees(); // Refresh list
        setActionView('hiring_confirmed');
    };

    // Handle Recruitment view - independent of selectedMemberId
    if (actionView === 'recruit') return <Recruitment onBack={() => setActionView(null)} onHire={handleHire} />;

    if (actionView === 'hiring_confirmed' && newlyHired) return (
        <HiringConfirmation
            candidate={newlyHired}
            onViewProfile={() => {
                // Find the new employee ID (last one added or matching name)
                const hiredEmp = employees.find(e => e.name === newlyHired.name);
                if (hiredEmp) {
                    setSelectedMemberId(hiredEmp.id);
                } else {
                    // Fallback if state update lag, try finding by name in fresh fetch or just close
                    // For now, just reset view
                     setSelectedMemberId(null);
                }
                setActionView(null);
            }}
            onReturn={() => setActionView('recruit')}
            companyCash={company?.cash || 0}
            currentTeamSize={employees.length}
        />
    );

    if (selectedMemberId) {
        // Find the selected employee object
        const emp = employees.find(e => e.id === selectedMemberId);
        if (!emp) return null; // Should probably reset selectedMemberId here

        return (
            <div className="fixed inset-0 z-[100] md:static md:z-auto bg-background-light dark:bg-background-dark flex flex-col min-h-full overflow-y-auto no-scrollbar animate-in fade-in slide-in-from-right duration-300">
                {/* Background Decoration Gradient */}
                <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] opacity-20 dark:opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>

                <div className="sticky top-0 z-50 flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between border-b border-gray-200 dark:border-white/10 backdrop-blur-xl bg-opacity-90 dark:bg-opacity-90">
                    <div
                        onClick={() => setSelectedMemberId(null)}
                        className="text-slate-900 dark:text-white flex size-10 shrink-0 items-center justify-center cursor-pointer rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Employee Profile</h2>
                    </div>
                    <div className="text-slate-900 dark:text-white flex size-10 shrink-0 items-center justify-center cursor-pointer rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-[24px]">more_vert</span>
                    </div>
                </div>

                <div className="flex-1 pb-24">
                    <div className="flex flex-col items-center pt-6 pb-6 px-4">
                        <div className="relative mb-4 group">
                            <div className="h-28 w-28 rounded-full border-4 border-white dark:border-[#2f2839] shadow-xl overflow-hidden relative z-10">
                                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url("${emp.img}")` }}></div>
                            </div>
                            {/* Burnout indicator logic would go here */}
                             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/20 rounded-full blur-xl z-0"></div>
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{emp.name}</h1>
                        <p className="text-primary text-sm font-bold uppercase tracking-wider mb-3">{emp.role}</p>
                        <div className="flex items-center gap-2">
                            <span className="px-3 py-1 bg-white dark:bg-[#2f2839] rounded-full text-slate-600 dark:text-gray-300 text-sm font-mono border border-gray-200 dark:border-white/10 shadow-sm">
                                {emp.salary}
                            </span>
                            <span className="px-3 py-1 bg-white dark:bg-[#2f2839] rounded-full text-slate-600 dark:text-gray-300 text-sm font-medium border border-gray-200 dark:border-white/10 shadow-sm flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">star</span> Lvl {emp.level || 1}
                            </span>
                        </div>
                    </div>

                    {/* Stats - Using real data */}
                     <div className="px-4 mb-6">
                        <h3 className="text-slate-900 dark:text-white text-sm font-bold mb-3 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px] text-primary">bar_chart</span> Performance Stats
                        </h3>
                        <div className="bg-white dark:bg-surface-dark rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-white/5 flex flex-col gap-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1.5">
                                    <span className="text-slate-500 dark:text-gray-400 font-medium">Technical Skill</span>
                                    <span className="text-slate-900 dark:text-white font-mono font-bold">{emp.stats.skill}/100</span>
                                </div>
                                <div className="h-2.5 w-full bg-gray-100 dark:bg-[#2f2839] rounded-full overflow-hidden">
                                    <div className="h-full bg-primary rounded-full shadow-[0_0_10px_rgba(109,19,236,0.3)]" style={{ width: `${emp.stats.skill}%` }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1.5">
                                    <span className="text-slate-500 dark:text-gray-400 font-medium">Morale</span>
                                    <span className={`font-mono font-bold ${emp.stats.morale > 60 ? 'text-green-500' : 'text-orange-500'}`}>{emp.stats.morale}%</span>
                                </div>
                                <div className="h-2.5 w-full bg-gray-100 dark:bg-[#2f2839] rounded-full overflow-hidden">
                                     <div className={`h-full rounded-full ${emp.stats.morale > 60 ? 'bg-green-500' : 'bg-orange-500'}`} style={{ width: `${emp.stats.morale}%` }}></div>
                                </div>
                            </div>
                        </div>
                     </div>

                    <div className="px-4 mb-6 grid grid-cols-1 gap-4">
                        <div>
                            <h3 className="text-slate-900 dark:text-white text-sm font-bold mb-3 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px] text-purple-400">psychology</span> Personality Traits
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {emp.traits.length > 0 ? emp.traits.map((t, i) => (
                                     <div key={i} className="px-3 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-xs font-semibold border border-purple-100 dark:border-purple-500/20 flex items-center gap-1.5">
                                        <span className="material-symbols-outlined text-[14px]">star</span> {t.name}
                                    </div>
                                )) : (
                                    <p className="text-slate-500 text-xs italic">No specific traits</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="px-4 mb-8">
                        <h3 className="text-slate-900 dark:text-white text-sm font-bold mb-3 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px] text-slate-400">settings_applications</span> Actions
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => setActionView('train')}
                                disabled={(emp.vacation_remaining_days || 0) > 0}
                                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border shadow-sm transition-all active:scale-95 group ${
                                    (emp.vacation_remaining_days || 0) > 0
                                        ? 'bg-gray-100 dark:bg-white/5 border-transparent opacity-50 cursor-not-allowed'
                                        : 'bg-white dark:bg-surface-dark border-gray-200 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-[#2f2839]'
                                }`}
                            >
                                <div className={`p-2 rounded-full transition-transform ${
                                    (emp.vacation_remaining_days || 0) > 0 
                                        ? 'bg-gray-200 dark:bg-white/10 text-gray-400'
                                        : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 group-hover:scale-110'
                                }`}>
                                    <span className="material-symbols-outlined text-[24px]">school</span>
                                </div>
                                <span className="text-xs font-semibold text-slate-700 dark:text-gray-200">
                                    {(emp.vacation_remaining_days || 0) > 0 ? 'Away' : 'Train'}
                                </span>
                            </button>
                            <button
                                onClick={() => setActionView('bonus')}
                                disabled={(emp.vacation_remaining_days || 0) > 0}
                                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border shadow-sm transition-all active:scale-95 group ${
                                    (emp.vacation_remaining_days || 0) > 0
                                        ? 'bg-gray-100 dark:bg-white/5 border-transparent opacity-50 cursor-not-allowed'
                                        : 'bg-white dark:bg-surface-dark border-gray-200 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-[#2f2839]'
                                }`}
                            >
                                <div className={`p-2 rounded-full transition-transform ${
                                     (emp.vacation_remaining_days || 0) > 0 
                                        ? 'bg-gray-200 dark:bg-white/10 text-gray-400'
                                        : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 group-hover:scale-110'
                                }`}>
                                    <span className="material-symbols-outlined text-[24px]">attach_money</span>
                                </div>
                                <span className="text-xs font-semibold text-slate-700 dark:text-gray-200">
                                     {(emp.vacation_remaining_days || 0) > 0 ? 'Away' : 'Give Bonus'}
                                </span>
                            </button>
                            <button
                                onClick={() => setActionView('vacation')}
                                disabled={(emp.vacation_remaining_days || 0) > 0}
                                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 shadow-sm transition-all active:scale-95 group relative overflow-hidden ${
                                     (emp.vacation_remaining_days || 0) > 0
                                        ? 'bg-purple-50 dark:bg-purple-900/10 border-purple-200 dark:border-purple-500/20 cursor-default'
                                        : 'bg-white dark:bg-surface-dark border-primary/20 hover:bg-gray-50 dark:hover:bg-[#2f2839]'
                                }`}
                            >
                                {!(emp.vacation_remaining_days || 0) && <div className="absolute top-0 right-0 bg-primary text-white text-[9px] font-bold px-1.5 py-0.5 rounded-bl-lg">REC</div>}
                                <div className={`p-2 rounded-full transition-transform ${
                                     (emp.vacation_remaining_days || 0) > 0 
                                        ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                                        : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 group-hover:scale-110'
                                }`}>
                                    <span className="material-symbols-outlined text-[24px]">beach_access</span>
                                </div>
                                <span className="text-xs font-semibold text-slate-700 dark:text-gray-200">
                                    {(emp.vacation_remaining_days || 0) > 0 ? `${emp.vacation_remaining_days}d Left` : 'Vacation'}
                                </span>
                            </button>
                            <button
                                onClick={() => setActionView('promote')}
                                disabled={(emp.vacation_remaining_days || 0) > 0}
                                className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border shadow-sm transition-all active:scale-95 group ${
                                    (emp.vacation_remaining_days || 0) > 0
                                        ? 'bg-gray-100 dark:bg-white/5 border-transparent opacity-50 cursor-not-allowed'
                                        : 'bg-white dark:bg-surface-dark border-gray-200 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-[#2f2839]'
                                }`}
                            >
                                <div className={`p-2 rounded-full transition-transform ${
                                    (emp.vacation_remaining_days || 0) > 0 
                                        ? 'bg-gray-200 dark:bg-white/10 text-gray-400'
                                        : 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 group-hover:scale-110'
                                }`}>
                                    <span className="material-symbols-outlined text-[24px]">upgrade</span>
                                </div>
                                <span className="text-xs font-semibold text-slate-700 dark:text-gray-200">
                                    {(emp.vacation_remaining_days || 0) > 0 ? 'Away' : 'Promote'}
                                </span>
                            </button>
                        </div>
                        <button
                            onClick={() => setActionView('fire')}
                            className="w-full mt-3 flex items-center justify-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 font-semibold text-sm hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
                        >
                            <span className="material-symbols-outlined text-[18px]">person_remove</span> Fire Employee
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const [selectedFilter, setSelectedFilter] = useState<'All' | 'Devs' | 'Design' | 'Sales'>('All');
    
    // Filter employees based on selected chip
    const filteredEmployees = employees.filter(emp => {
        if (selectedFilter === 'All') return true;
        
        const roleLower = emp.role.toLowerCase();
        
        if (selectedFilter === 'Devs') {
            return roleLower.includes('developer') || 
                   roleLower.includes('engineer') || 
                   roleLower.includes('cto') ||
                   roleLower.includes('architect') ||
                   roleLower.includes('lead');
        }
        
        if (selectedFilter === 'Design') {
            return roleLower.includes('designer') || 
                   roleLower.includes('artist') || 
                   roleLower.includes('creative') ||
                   roleLower.includes('ui') ||
                   roleLower.includes('ux');
        }
        
        if (selectedFilter === 'Sales') {
            return roleLower.includes('sales') || 
                   roleLower.includes('marketing') || 
                   roleLower.includes('cmo') ||
                   roleLower.includes('growth') ||
                   roleLower.includes('business');
        }
        
        return true;
    });

    return (
        <div className="flex flex-col min-h-full pb-24 relative">
            {/* Background Decoration Gradient */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] opacity-20 dark:opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>

            {/* Top App Bar */}
            <header className="sticky top-0 z-40 flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between border-b border-gray-200 dark:border-white/10 backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95">
                <div className="text-slate-900 dark:text-white flex size-12 shrink-0 items-center justify-center cursor-pointer rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                </div>
                <div className="flex flex-col items-center">
                    <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Team Roster</h2>
                    <p className="text-slate-500 dark:text-gray-400 text-xs font-medium">{employees.length}/10 Slots Filled</p>
                </div>
                <div className="text-slate-900 dark:text-white flex size-12 shrink-0 items-center justify-center cursor-pointer rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-[24px]">settings</span>
                </div>
            </header>

            {/* Global Stats Header */}
            <section className="flex flex-wrap gap-3 px-4 py-4 bg-background-light dark:bg-background-dark">
                <div className="flex min-w-[100px] flex-1 basis-[fit-content] flex-col gap-1 rounded-xl bg-white dark:bg-[#2f2839]/40 border border-gray-200 dark:border-[#453b54] p-3 items-center text-center shadow-sm">
                    <p className="text-slate-900 dark:text-white tracking-tight text-xl font-bold leading-tight">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0, notation: 'compact' }).format(
                             employees.reduce((acc, curr) => acc + (curr.salary_raw || 0), 0) / 12
                         )}
                    </p>
                    <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-primary">payments</span>
                        <p className="text-slate-500 dark:text-[#a89db9] text-xs font-medium uppercase tracking-wide">Monthly Burn</p>
                    </div>
                </div>
                <div className="flex min-w-[100px] flex-1 basis-[fit-content] flex-col gap-1 rounded-xl bg-white dark:bg-[#2f2839]/40 border border-gray-200 dark:border-[#453b54] p-3 items-center text-center shadow-sm">
                    <p className="text-slate-900 dark:text-white tracking-tight text-xl font-bold leading-tight">
                        {employees.length > 0 
                            ? Math.round(employees.reduce((acc, curr) => acc + curr.stats.morale, 0) / employees.length) 
                            : 100}%
                    </p>
                    <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-green-500">sentiment_satisfied</span>
                        <p className="text-slate-500 dark:text-[#a89db9] text-xs font-medium uppercase tracking-wide">Morale</p>
                    </div>
                </div>
                <div className="flex min-w-[100px] flex-1 basis-[fit-content] flex-col gap-1 rounded-xl bg-white dark:bg-[#2f2839]/40 border border-gray-200 dark:border-[#453b54] p-3 items-center text-center shadow-sm">
                     <p className="text-slate-900 dark:text-white tracking-tight text-xl font-bold leading-tight">
                        {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' }).format(company?.cash || 0)}
                    </p>
                    <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-blue-400">account_balance</span>
                        <p className="text-slate-500 dark:text-[#a89db9] text-xs font-medium uppercase tracking-wide">Budget</p>
                    </div>
                </div>
            </section>
            
            {/* Payroll Status Section */}
            <section className="px-4 mb-2">
                 <div className={`p-4 rounded-xl border flex items-center justify-between shadow-sm transition-all ${
                     payrollDue 
                        ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-500/30' 
                        : 'bg-white dark:bg-[#2f2839]/40 border-gray-200 dark:border-[#453b54]'
                 }`}>
                     <div className="flex items-center gap-3">
                         <div className={`p-2 rounded-full ${payrollDue ? 'bg-red-100 text-red-600' : 'bg-blue-50 dark:bg-blue-900/20 text-blue-500'}`}>
                             <span className="material-symbols-outlined">{payrollDue ? 'warning' : 'calendar_clock'}</span>
                         </div>
                         <div>
                             <h3 className={`text-sm font-bold ${payrollDue ? 'text-red-700 dark:text-red-400' : 'text-slate-900 dark:text-white'}`}>
                                 {payrollDue ? 'Payroll Overdue!' : 'Next Payroll'}
                             </h3>
                             <p className="text-xs text-slate-500 dark:text-gray-400">
                                 {payrollDue 
                                     ? 'Base morale decreasing daily. Pay immediately.' 
                                     : `Due in ${Math.max(0, 25 - (turnsSincePayroll || 0))} days`}
                             </p>
                         </div>
                     </div>
                     
                     <button 
                        onClick={handlePaySalary}
                        disabled={payingSalary || (!payrollDue && (turnsSincePayroll || 0) < 20)}
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-sm ${
                            payrollDue
                                ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-500/25 animate-pulse'
                                : (turnsSincePayroll || 0) >= 20
                                    ? 'bg-orange-500 hover:bg-orange-600 text-white'
                                    : 'bg-gray-100 dark:bg-white/5 text-gray-400 cursor-not-allowed'
                        }`}
                     >
                         {payingSalary ? 'Paying...' : 'Pay Salaries'}
                     </button>
                 </div>
            </section>

             {/* Filter Chips */}
            <section className="flex gap-2 px-4 pb-2 overflow-x-auto no-scrollbar mask-gradient">
                <div 
                    onClick={() => setSelectedFilter('All')}
                    className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg pl-3 pr-4 cursor-pointer transition-colors ${selectedFilter === 'All' ? 'bg-primary shadow-lg shadow-primary/20' : 'bg-white dark:bg-[#2f2839] border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-[#3a3246]'}`}>
                    <span className={`material-symbols-outlined text-[18px] ${selectedFilter === 'All' ? 'text-white' : 'text-slate-700 dark:text-gray-300'}`}>group</span>
                    <p className={`text-sm font-semibold leading-normal ${selectedFilter === 'All' ? 'text-white' : 'text-slate-700 dark:text-gray-300 font-medium'}`}>All</p>
                </div>
                <div 
                    onClick={() => setSelectedFilter('Devs')}
                    className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg pl-3 pr-4 cursor-pointer transition-colors ${selectedFilter === 'Devs' ? 'bg-primary shadow-lg shadow-primary/20' : 'bg-white dark:bg-[#2f2839] border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-[#3a3246]'}`}>
                    <span className={`material-symbols-outlined text-[18px] ${selectedFilter === 'Devs' ? 'text-white' : 'text-slate-700 dark:text-gray-300'}`}>code</span>
                    <p className={`text-sm font-semibold leading-normal ${selectedFilter === 'Devs' ? 'text-white' : 'text-slate-700 dark:text-gray-300 font-medium'}`}>Devs</p>
                </div>
                <div 
                    onClick={() => setSelectedFilter('Design')}
                    className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg pl-3 pr-4 cursor-pointer transition-colors ${selectedFilter === 'Design' ? 'bg-primary shadow-lg shadow-primary/20' : 'bg-white dark:bg-[#2f2839] border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-[#3a3246]'}`}>
                    <span className={`material-symbols-outlined text-[18px] ${selectedFilter === 'Design' ? 'text-white' : 'text-slate-700 dark:text-gray-300'}`}>palette</span>
                    <p className={`text-sm font-semibold leading-normal ${selectedFilter === 'Design' ? 'text-white' : 'text-slate-700 dark:text-gray-300 font-medium'}`}>Design</p>
                </div>
                <div 
                     onClick={() => setSelectedFilter('Sales')}
                    className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg pl-3 pr-4 cursor-pointer transition-colors ${selectedFilter === 'Sales' ? 'bg-primary shadow-lg shadow-primary/20' : 'bg-white dark:bg-[#2f2839] border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-[#3a3246]'}`}>
                    <span className={`material-symbols-outlined text-[18px] ${selectedFilter === 'Sales' ? 'text-white' : 'text-slate-700 dark:text-gray-300'}`}>campaign</span>
                    <p className={`text-sm font-semibold leading-normal ${selectedFilter === 'Sales' ? 'text-white' : 'text-slate-700 dark:text-gray-300 font-medium'}`}>Sales</p>
                </div>
            </section>

            {/* Employee List */}
            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 pb-24">
                {filteredEmployees.map(emp => (
                    <div
                        key={emp.id}
                        onClick={() => setSelectedMemberId(emp.id)}
                        className={`relative flex flex-col gap-3 rounded-xl bg-white dark:bg-[#1e1e24] p-4 shadow-sm border ${emp.isBurnoutRisk ? 'border-red-500/50 ring-1 ring-red-500/20' : 'border-transparent dark:border-[#453b54]'} cursor-pointer hover:scale-[1.01] transition-transform`}
                    >
                        {/* Burnout logic */}
                         {emp.isBurnoutRisk && (
                            <div className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-md animate-pulse z-10">
                                <span className="material-symbols-outlined text-[12px]">local_fire_department</span>
                                BURNOUT RISK
                            </div>
                        )}
                        
                        {/* Training Badge */}
                        {emp.is_training && (
                            <div className="absolute -top-2 right-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-md z-10">
                                <span className="material-symbols-outlined text-[12px]">school</span>
                                {emp.training_days_left}d Left
                            </div>
                        )}

                        {/* Vacation Badge */}
                        {(emp.vacation_remaining_days || 0) > 0 && (
                            <div className="absolute -top-2 right-2 bg-purple-600 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-md z-10">
                                <span className="material-symbols-outlined text-[12px]">beach_access</span>
                                {emp.vacation_remaining_days}d Left
                            </div>
                        )}

                        <div className="flex justify-between items-start gap-3">
                            <div className="flex items-center gap-3">
                                <div className="bg-center bg-no-repeat bg-cover rounded-xl h-14 w-14 shrink-0 shadow-inner" style={{ backgroundImage: `url("${emp.img}")` }}></div>
                                <div className="flex flex-col">
                                    <h3 className="text-slate-900 dark:text-white text-base font-bold leading-tight">{emp.name}</h3>
                                    <p className="text-primary text-xs font-semibold uppercase tracking-wider mb-0.5">{emp.role}</p>
                                    <p className="text-slate-500 dark:text-[#a89db9] text-xs font-mono">{emp.salary}</p>
                                </div>
                            </div>
                            <button className="bg-transparent hover:bg-gray-100 dark:hover:bg-white/5 text-slate-400 p-2 rounded-lg transition-colors">
                                <span className="material-symbols-outlined text-[20px]">more_vert</span>
                            </button>
                        </div>

                        {/* Stats - Simplified for List */}
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-1">
                            <div className="flex flex-col gap-1">
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-500 dark:text-gray-400">Skill</span>
                                    <span className="text-slate-900 dark:text-white font-mono">{emp.stats.skill}/100</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-100 dark:bg-[#453b54] rounded-full overflow-hidden">
                                    <div className="h-full bg-primary rounded-full" style={{ width: `${emp.stats.skill}%` }}></div>
                                </div>
                            </div>
                           <div className="flex flex-col gap-1">
                                <div className="flex justify-between text-xs">
                                    <span className="text-slate-500 dark:text-gray-400">Morale</span>
                                    <span className={`font-mono ${emp.stats.morale > 75 ? 'text-green-500' : 'text-slate-900 dark:text-white'}`}>{emp.stats.morale > 75 ? 'Great' : 'Normal'}</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-100 dark:bg-[#453b54] rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 rounded-full" style={{ width: `${emp.stats.morale}%` }}></div>
                                </div>
                            </div>
                        </div>

                         {emp.traits && emp.traits.length > 0 && (
                            <div className="flex gap-2 mt-1">
                                {emp.traits.map((trait, idx) => (
                                    <span key={idx} className="inline-flex items-center gap-1 rounded bg-slate-100 dark:bg-[#2f2839] px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:text-gray-300">
                                        <span className="material-symbols-outlined text-[12px]">{trait.icon}</span> {trait.name}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                ))}

                {/* Add Slot Button */}
                <div onClick={() => setActionView('recruit')} className="flex items-center justify-center p-6 border-2 border-dashed border-gray-300 dark:border-[#453b54] rounded-xl cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-all group">
                    <div className="flex flex-col items-center gap-2">
                        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-[#2f2839] flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors text-slate-500 dark:text-gray-400">
                            <span className="material-symbols-outlined text-[20px]">add</span>
                        </div>
                        <span className="text-sm font-medium text-slate-500 dark:text-gray-400 group-hover:text-primary transition-colors">Open New Position</span>
                    </div>
                </div>
            </main>

            {/* Floating Action Button */}
            <div className="fixed bottom-20 right-6 z-50">
                <button
                    onClick={() => setActionView('recruit')}
                    className="flex items-center gap-2 bg-primary hover:bg-[#5a0ec7] text-white px-5 py-4 rounded-full shadow-xl shadow-primary/30 transition-transform active:scale-95 group"
                >
                    <span className="material-symbols-outlined text-[24px]">person_add</span>
                    <span className="font-bold text-sm tracking-wide">Recruit</span>
                </button>
            </div>
        </div>
    );
};
