import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { HiringConfirmation } from './HiringConfirmation';
import { Recruitment, Candidate } from './Recruitment';
import { Train } from './actions/Train';
import { Bonus } from './actions/Bonus';
import { Vacation } from './actions/Vacation';
import { Promote } from './actions/Promote';
import { Fire } from './actions/Fire';

type GameLayoutContextType = {
    setBottomNavVisible: (visible: boolean) => void;
};

// Types (moving to types file later recommended)
interface Employee {
    id: string;
    name: string;
    role: string;
    salary: string; // e.g., "$120k/yr"
    img: string;
    stats: {
        skill: number;
        burnout: number; // 0-100
        morale: number; // 0-100
        loyalty: number; // 0-100
    };
    traits: { icon: string; name: string; color: string }[];
    isBurnoutRisk?: boolean;
}

const INITIAL_EMPLOYEES: Employee[] = [
    {
        id: 'sarah',
        name: 'Sarah Jenkins',
        role: 'Lead AI Specialist',
        salary: '$120k/yr',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsal2UZnHhBLXFpLJAfL3gpcNEsKX50tzfil60sA9JpVz8rmRT6MUeIWXTAatj9xzQtgHrAcSk-oT-NTdQHtQHn-P1eaSuY0CCW4KISMs4AyQpz0VGOeRbih_6FspMgVz0VswtZw05l28AZHKc-rgw5tqfrWQMlqapl-l7v2kdibweMqJDJGg0cdUMCW4bWfw449mJQ4Q-oYvqaDnfG5l7MAJQloq9bZ-5jtSM4qEkkcXmIeLjyCnlxCGsG5oNv93lmV2UxyyAHwM',
        stats: { skill: 85, burnout: 92, morale: 40, loyalty: 60 },
        traits: [],
        isBurnoutRisk: true
    },
    {
        id: 'mark',
        name: 'Mark Chen',
        role: 'Senior Backend Dev',
        salary: '$95k/yr',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRslWXnkFmMkC5l-Z0xaKr8Nqj8phFNFnLF7ssfTGRlG2YOakraQS29CT29-EoieKcMUeqaoaS8SbawvmdeNSzOMxQOeb3Akw4JDCP9tKutqAgAWXseoT3F0Zwl4Xw4K_-Dh4zk_sRuZQ7f_bJQJg4ft1Dh4MPJmS25JW5RCUv9coWnKxHrkqwWzLQvpF1JA80mxchXObRIj68lQiMiI9M5wWdar1XzmpNzT_Hhvte-Ovu8M_94fnfLf0-8KdWlUy6M-fQsatK29U',
        stats: { skill: 72, burnout: 20, morale: 70, loyalty: 88 },
        traits: [{ icon: 'shield', name: 'Reliable', color: 'slate' }, { icon: 'code', name: 'Coder', color: 'slate' }]
    },
    {
        id: 'elena',
        name: 'Elena Rodriguez',
        role: 'Product Designer',
        salary: '$88k/yr',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC46zO22rcz2n9tQlNSqTEyODH7Bkfb1DlZ6VOLnsYFl7PnZ2XDpbt-UHQmw83j5fCJQG4JmUO2KFGeF1BGHk-6aeWosVki-FxD7iOa5Qlf9mSCVIOV09lAHf6PzQAbcEjWDq9PeyDEBQz3K6RBopKJrb0H72uVo1Hmx85tV1-pKxbwvvKDv51DOFuEdxYy1Za6SPuMQ_mmQbExj4McFX3VVXlrpYGSuHNPrcE2bewob2YxqZv3zthPZ3VxvtCT2YIuP7CvwVjjzFk',
        stats: { skill: 65, burnout: 10, morale: 95, loyalty: 90 },
        traits: []
    }
];

export const Team = () => {
    const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
    const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);
    const [actionView, setActionView] = useState<'train' | 'bonus' | 'vacation' | 'promote' | 'fire' | 'recruit' | 'hiring_confirmed' | null>(null);
    const [newlyHired, setNewlyHired] = useState<Candidate | null>(null);
    const { setBottomNavVisible } = useOutletContext<GameLayoutContextType>();

    useEffect(() => {
        if (selectedMemberId || actionView) {
            setBottomNavVisible(false);
        } else {
            setBottomNavVisible(true);
        }
        return () => setBottomNavVisible(true);
    }, [selectedMemberId, actionView, setBottomNavVisible]);

    // Handle full-screen action views (replacing detail view)
    if (selectedMemberId && actionView === 'train') return <Train onBack={() => setActionView(null)} />;
    if (selectedMemberId && actionView === 'bonus') return <Bonus onBack={() => setActionView(null)} />;
    if (selectedMemberId && actionView === 'vacation') return <Vacation onBack={() => setActionView(null)} />;
    if (selectedMemberId && actionView === 'promote') return <Promote onBack={() => setActionView(null)} />;
    if (selectedMemberId && actionView === 'fire') return <Fire onConfirm={() => {
        // Remove employee logic here
        setEmployees(prev => prev.filter(e => e.id !== selectedMemberId));
        setSelectedMemberId(null);
        setActionView(null);
    }} onBack={() => setActionView(null)} />;

    const handleHire = (candidate: Candidate) => {
        const newEmployee: Employee = {
            id: Date.now().toString(), // Unique ID
            name: candidate.name,
            role: candidate.role,
            salary: '$75k/yr', // Default salary for new hires, adjust as needed
            img: candidate.img,
            stats: {
                skill: candidate.stats.skill,
                burnout: 0, // New hires start fresh
                morale: 80, // Good morale for new hires
                loyalty: 50 // Neutral loyalty for new hires
            },
            traits: candidate.traits || []
        };
        setEmployees(prev => [...prev, newEmployee]);
        setNewlyHired(candidate);
        setActionView('hiring_confirmed');
    };

    // Handle Recruitment view - independent of selectedMemberId
    if (actionView === 'recruit') return <Recruitment onBack={() => setActionView(null)} onHire={handleHire} />;

    if (actionView === 'hiring_confirmed' && newlyHired) return (
        <HiringConfirmation
            candidate={newlyHired}
            onViewProfile={() => {
                // Find the new employee ID (last one added)
                // This relies on the fact that `setEmployees` has completed its update
                // before this render cycle, which is generally true for state updates
                // within the same component.
                const hiredEmp = employees.find(e => e.name === newlyHired.name && e.img === newlyHired.img);
                if (hiredEmp) {
                    setSelectedMemberId(hiredEmp.id);
                }
                setActionView(null);
            }}
            onReturn={() => setActionView('recruit')}
        />
    );

    if (selectedMemberId) {
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
                                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAsal2UZnHhBLXFpLJAfL3gpcNEsKX50tzfil60sA9JpVz8rmRT6MUeIWXTAatj9xzQtgHrAcSk-oT-NTdQHtQHn-P1eaSuY0CCW4KISMs4AyQpz0VGOeRbih_6FspMgVz0VswtZw05l28AZHKc-rgw5tqfrWQMlqapl-l7v2kdibweMqJDJGg0cdUMCW4bWfw449mJQ4Q-oYvqaDnfG5l7MAJQloq9bZ-5jtSM4qEkkcXmIeLjyCnlxCGsG5oNv93lmV2UxyyAHwM")' }}></div>
                            </div>
                            <div className="absolute bottom-1 right-1 z-20 bg-red-500 text-white rounded-full p-1.5 border-2 border-white dark:border-[#181022] shadow-md animate-bounce">
                                <span className="material-symbols-outlined text-[16px] block">local_fire_department</span>
                            </div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-primary/20 rounded-full blur-xl z-0"></div>
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Sarah Jenkins</h1>
                        <p className="text-primary text-sm font-bold uppercase tracking-wider mb-3">Lead AI Specialist</p>
                        <div className="flex items-center gap-2">
                            <span className="px-3 py-1 bg-white dark:bg-[#2f2839] rounded-full text-slate-600 dark:text-gray-300 text-sm font-mono border border-gray-200 dark:border-white/10 shadow-sm">
                                $120,000 / yr
                            </span>
                            <span className="px-3 py-1 bg-white dark:bg-[#2f2839] rounded-full text-slate-600 dark:text-gray-300 text-sm font-medium border border-gray-200 dark:border-white/10 shadow-sm flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px] text-yellow-500">star</span> Lvl 4
                            </span>
                        </div>
                    </div>

                    <div className="mx-4 mb-6 rounded-xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-500/20 p-3 flex items-start gap-3 shadow-sm">
                        <div className="p-2 bg-red-100 dark:bg-red-500/20 rounded-lg shrink-0 text-red-600 dark:text-red-400">
                            <span className="material-symbols-outlined text-[20px]">warning</span>
                        </div>
                        <div className="flex-1">
                            <h4 className="text-red-800 dark:text-red-400 font-bold text-sm">Approaching Burnout</h4>
                            <p className="text-red-600 dark:text-red-300/80 text-xs mt-0.5 leading-relaxed">Sarah is extremely stressed. Productivity is down -15%. Immediate intervention advised.</p>
                        </div>
                        <button className="shrink-0 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm shadow-red-500/30 transition-colors">
                            Fix
                        </button>
                    </div>

                    <div className="px-4 mb-6">
                        <h3 className="text-slate-900 dark:text-white text-sm font-bold mb-3 flex items-center gap-2">
                            <span className="material-symbols-outlined text-[18px] text-primary">bar_chart</span> Performance Stats
                        </h3>
                        <div className="bg-white dark:bg-surface-dark rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-white/5 flex flex-col gap-4">
                            <div>
                                <div className="flex justify-between text-sm mb-1.5">
                                    <span className="text-slate-500 dark:text-gray-400 font-medium">Technical Skill</span>
                                    <span className="text-slate-900 dark:text-white font-mono font-bold">85/100</span>
                                </div>
                                <div className="h-2.5 w-full bg-gray-100 dark:bg-[#2f2839] rounded-full overflow-hidden">
                                    <div className="h-full bg-primary rounded-full shadow-[0_0_10px_rgba(109,19,236,0.3)]" style={{ width: '85%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1.5">
                                    <span className="text-slate-500 dark:text-gray-400 font-medium">Morale</span>
                                    <span className="text-orange-500 font-mono font-bold">Low (40%)</span>
                                </div>
                                <div className="h-2.5 w-full bg-gray-100 dark:bg-[#2f2839] rounded-full overflow-hidden">
                                    <div className="h-full bg-orange-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.3)]" style={{ width: '40%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1.5">
                                    <span className="text-slate-500 dark:text-gray-400 font-medium">Burnout Risk</span>
                                    <span className="text-red-500 font-mono font-bold animate-pulse">CRITICAL (92%)</span>
                                </div>
                                <div className="h-2.5 w-full bg-gray-100 dark:bg-[#2f2839] rounded-full overflow-hidden relative">
                                    <div className="absolute inset-0 w-full h-full opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #ef4444 0, #ef4444 10px, transparent 10px, transparent 20px)' }}></div>
                                    <div className="h-full bg-gradient-to-r from-orange-500 to-red-600 rounded-full shadow-[0_0_10px_rgba(220,38,38,0.4)]" style={{ width: '92%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-sm mb-1.5">
                                    <span className="text-slate-500 dark:text-gray-400 font-medium">Loyalty</span>
                                    <span className="text-slate-700 dark:text-gray-300 font-mono font-bold">Stable (60%)</span>
                                </div>
                                <div className="h-2.5 w-full bg-gray-100 dark:bg-[#2f2839] rounded-full overflow-hidden">
                                    <div className="h-full bg-blue-400 rounded-full" style={{ width: '60%' }}></div>
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
                                <div className="px-3 py-1.5 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-xs font-semibold border border-purple-100 dark:border-purple-500/20 flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-[14px]">auto_fix_high</span> Innovative
                                </div>
                                <div className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs font-semibold border border-blue-100 dark:border-blue-500/20 flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-[14px]">school</span> Fast Learner
                                </div>
                                <div className="px-3 py-1.5 rounded-lg bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 text-xs font-semibold border border-orange-100 dark:border-orange-500/20 flex items-center gap-1.5">
                                    <span className="material-symbols-outlined text-[14px]">timer</span> Workaholic
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-slate-900 dark:text-white text-sm font-bold mb-3 flex items-center gap-2">
                                <span className="material-symbols-outlined text-[18px] text-pink-400">group</span> Relationships
                            </h3>
                            <div className="bg-white dark:bg-surface-dark rounded-xl border border-gray-100 dark:border-white/5 overflow-hidden">
                                <div className="flex items-center gap-3 p-3 border-b border-gray-100 dark:border-white/5">
                                    <div className="h-8 w-8 rounded-full bg-cover bg-center shrink-0" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDRslWXnkFmMkC5l-Z0xaKr8Nqj8phFNFnLF7ssfTGRlG2YOakraQS29CT29-EoieKcMUeqaoaS8SbawvmdeNSzOMxQOeb3Akw4JDCP9tKutqAgAWXseoT3F0Zwl4Xw4K_-Dh4zk_sRuZQ7f_bJQJg4ft1Dh4MPJmS25JW5RCUv9coWnKxHrkqwWzLQvpF1JA80mxchXObRIj68lQiMiI9M5wWdar1XzmpNzT_Hhvte-Ovu8M_94fnfLf0-8KdWlUy6M-fQsatK29U")' }}></div>
                                    <div className="flex-1">
                                        <p className="text-xs font-bold text-slate-900 dark:text-white">Mark Chen</p>
                                        <p className="text-[10px] text-slate-500 dark:text-gray-400">Senior Backend Dev</p>
                                    </div>
                                    <div className="flex items-center gap-1 text-red-500 bg-red-50 dark:bg-red-900/20 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide">
                                        <span className="material-symbols-outlined text-[14px]">thunderstorm</span> Conflict
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3">
                                    <div className="h-8 w-8 rounded-full bg-cover bg-center shrink-0" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC46zO22rcz2n9tQlNSqTEyODH7Bkfb1DlZ6VOLnsYFl7PnZ2XDpbt-UHQmw83j5fCJQG4JmUO2KFGeF1BGHk-6aeWosVki-FxD7iOa5Qlf9mSCVIOV09lAHf6PzQAbcEjWDq9PeyDEBQz3K6RBopKJrb0H72uVo1Hmx85tV1-pKxbwvvKDv51DOFuEdxYy1Za6SPuMQ_mmQbExj4McFX3VVXlrpYGSuHNPrcE2bewob2YxqZv3zthPZ3VxvtCT2YIuP7CvwVjjzFk")' }}></div>
                                    <div className="flex-1">
                                        <p className="text-xs font-bold text-slate-900 dark:text-white">Elena Rodriguez</p>
                                        <p className="text-[10px] text-slate-500 dark:text-gray-400">Product Designer</p>
                                    </div>
                                    <div className="flex items-center gap-1 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide">
                                        <span className="material-symbols-outlined text-[14px]">handshake</span> Friend
                                    </div>
                                </div>
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
                                className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/5 shadow-sm hover:bg-gray-50 dark:hover:bg-[#2f2839] transition-all active:scale-95 group"
                            >
                                <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 p-2 rounded-full group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-[24px]">school</span>
                                </div>
                                <span className="text-xs font-semibold text-slate-700 dark:text-gray-200">Train</span>
                            </button>
                            <button
                                onClick={() => setActionView('bonus')}
                                className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/5 shadow-sm hover:bg-gray-50 dark:hover:bg-[#2f2839] transition-all active:scale-95 group"
                            >
                                <div className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 p-2 rounded-full group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-[24px]">attach_money</span>
                                </div>
                                <span className="text-xs font-semibold text-slate-700 dark:text-gray-200">Give Bonus</span>
                            </button>
                            <button
                                onClick={() => setActionView('vacation')}
                                className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-white dark:bg-surface-dark border-2 border-primary/20 dark:border-primary/20 shadow-sm hover:bg-gray-50 dark:hover:bg-[#2f2839] transition-all active:scale-95 group relative overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 bg-primary text-white text-[9px] font-bold px-1.5 py-0.5 rounded-bl-lg">REC</div>
                                <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 p-2 rounded-full group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-[24px]">beach_access</span>
                                </div>
                                <span className="text-xs font-semibold text-slate-700 dark:text-gray-200">Vacation</span>
                            </button>
                            <button
                                onClick={() => setActionView('promote')}
                                className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/5 shadow-sm hover:bg-gray-50 dark:hover:bg-[#2f2839] transition-all active:scale-95 group"
                            >
                                <div className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 p-2 rounded-full group-hover:scale-110 transition-transform">
                                    <span className="material-symbols-outlined text-[24px]">upgrade</span>
                                </div>
                                <span className="text-xs font-semibold text-slate-700 dark:text-gray-200">Promote</span>
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

                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-[340px] px-4 z-50">
                    <button className="w-full flex items-center justify-between bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-1 py-1 pr-6 rounded-full shadow-2xl shadow-slate-900/20 active:scale-95 transition-transform border border-slate-700 dark:border-slate-200">
                        <div className="bg-primary flex items-center justify-center h-10 w-10 rounded-full">
                            <span className="material-symbols-outlined text-[20px] text-white">medical_services</span>
                        </div>
                        <div className="flex flex-col items-start ml-3">
                            <span className="text-xs font-normal opacity-80">Crisis Mode</span>
                            <span className="text-sm font-bold">Address Burnout</span>
                        </div>
                        <span className="material-symbols-outlined text-[20px]">chevron_right</span>
                    </button>
                </div>

                {/* Fire Confirmation Modal (Overlay) */}
                {actionView === 'fire' && <Fire onBack={() => setActionView(null)} />}
            </div>
        );
    }

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
                    <p className="text-slate-500 dark:text-gray-400 text-xs font-medium">8/10 Slots Filled</p>
                </div>
                <div className="text-slate-900 dark:text-white flex size-12 shrink-0 items-center justify-center cursor-pointer rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-[24px]">settings</span>
                </div>
            </header>

            {/* Global Stats Header */}
            <section className="flex flex-wrap gap-3 px-4 py-4 bg-background-light dark:bg-background-dark">
                <div className="flex min-w-[100px] flex-1 basis-[fit-content] flex-col gap-1 rounded-xl bg-white dark:bg-[#2f2839]/40 border border-gray-200 dark:border-[#453b54] p-3 items-center text-center shadow-sm">
                    <p className="text-slate-900 dark:text-white tracking-tight text-xl font-bold leading-tight">$45k</p>
                    <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-primary">payments</span>
                        <p className="text-slate-500 dark:text-[#a89db9] text-xs font-medium uppercase tracking-wide">Weekly</p>
                    </div>
                </div>
                <div className="flex min-w-[100px] flex-1 basis-[fit-content] flex-col gap-1 rounded-xl bg-white dark:bg-[#2f2839]/40 border border-gray-200 dark:border-[#453b54] p-3 items-center text-center shadow-sm">
                    <p className="text-slate-900 dark:text-white tracking-tight text-xl font-bold leading-tight">72%</p>
                    <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-green-500">sentiment_satisfied</span>
                        <p className="text-slate-500 dark:text-[#a89db9] text-xs font-medium uppercase tracking-wide">Morale</p>
                    </div>
                </div>
                <div className="flex min-w-[100px] flex-1 basis-[fit-content] flex-col gap-1 rounded-xl bg-white dark:bg-[#2f2839]/40 border border-gray-200 dark:border-[#453b54] p-3 items-center text-center shadow-sm">
                    <p className="text-slate-900 dark:text-white tracking-tight text-xl font-bold leading-tight">$1.2M</p>
                    <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-blue-400">account_balance</span>
                        <p className="text-slate-500 dark:text-[#a89db9] text-xs font-medium uppercase tracking-wide">Budget</p>
                    </div>
                </div>
            </section>

            {/* Filter Chips */}
            <section className="flex gap-2 px-4 pb-2 overflow-x-auto no-scrollbar mask-gradient">
                <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-primary pl-3 pr-4 shadow-lg shadow-primary/20 cursor-pointer">
                    <span className="material-symbols-outlined text-white text-[18px]">group</span>
                    <p className="text-white text-sm font-semibold leading-normal">All</p>
                </div>
                <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-[#2f2839] border border-gray-200 dark:border-white/10 pl-3 pr-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-[#3a3246] transition-colors">
                    <span className="material-symbols-outlined text-slate-700 dark:text-gray-300 text-[18px]">code</span>
                    <p className="text-slate-700 dark:text-gray-300 text-sm font-medium leading-normal">Devs</p>
                </div>
                <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-[#2f2839] border border-gray-200 dark:border-white/10 pl-3 pr-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-[#3a3246] transition-colors">
                    <span className="material-symbols-outlined text-slate-700 dark:text-gray-300 text-[18px]">palette</span>
                    <p className="text-slate-700 dark:text-gray-300 text-sm font-medium leading-normal">Design</p>
                </div>
                <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-white dark:bg-[#2f2839] border border-gray-200 dark:border-white/10 pl-3 pr-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-[#3a3246] transition-colors">
                    <span className="material-symbols-outlined text-slate-700 dark:text-gray-300 text-[18px]">campaign</span>
                    <p className="text-slate-700 dark:text-gray-300 text-sm font-medium leading-normal">Sales</p>
                </div>
            </section>

            {/* Employee List */}
            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 pb-24">
                {employees.map(emp => (
                    <div
                        key={emp.id}
                        onClick={() => setSelectedMemberId(emp.id)}
                        className={`relative flex flex-col gap-3 rounded-xl bg-white dark:bg-[#1e1e24] p-4 shadow-sm border ${emp.isBurnoutRisk ? 'border-red-500/50 ring-1 ring-red-500/20' : 'border-transparent dark:border-[#453b54]'} cursor-pointer hover:scale-[1.01] transition-transform`}
                    >
                        {emp.isBurnoutRisk && (
                            <div className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-md animate-pulse">
                                <span className="material-symbols-outlined text-[12px]">local_fire_department</span>
                                BURNOUT RISK
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
                            {emp.isBurnoutRisk ? (
                                <div className="flex flex-col gap-1">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-slate-500 dark:text-gray-400">Burnout</span>
                                        <span className="text-red-500 font-bold font-mono">CRITICAL</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-gray-100 dark:bg-[#453b54] rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-orange-400 to-red-600 rounded-full" style={{ width: `${emp.stats.burnout}%` }}></div>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-1">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-slate-500 dark:text-gray-400">Morale</span>
                                        <span className={`font-mono ${emp.stats.morale > 75 ? 'text-green-500' : 'text-slate-900 dark:text-white'}`}>{emp.stats.morale > 75 ? 'Great' : 'Normal'}</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-gray-100 dark:bg-[#453b54] rounded-full overflow-hidden">
                                        <div className="h-full bg-green-500 rounded-full" style={{ width: `${emp.stats.morale}%` }}></div>
                                    </div>
                                </div>
                            )}
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
