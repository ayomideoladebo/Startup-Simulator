import React, { useState } from 'react';
import { InitiateHeadhunt } from './InitiateHeadhunt';
import { HeadhuntStatus } from './HeadhuntStatus';

export interface Candidate {
    name: string;
    role: string;
    salary: string;
    ask: string; // e.g. "$145k/yr"
    img: string;
    stats: {
        skill: number;
        burnout: number; // 0-100
        morale: number; // 0-100
        loyalty: number; // 0-100
    };
    traits: { icon: string; name: string; color: string }[];
    isTopTalent?: boolean;
    equity?: string; // Optional property for equity ask
}

interface RecruitmentProps {
    onBack: () => void;
    onHire: (candidate: Candidate) => void;
}

const CANDIDATES: Candidate[] = [
    {
        name: 'Alex Rivera',
        role: 'Senior AI Architect',
        salary: '$145k/yr',
        ask: '$145k/yr',
        equity: '0.5%',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsal2UZnHhBLXFpLJAfL3gpcNEsKX50tzfil60sA9JpVz8rmRT6MUeIWXTAatj9xzQtgHrAcSk-oT-NTdQHtQHn-P1eaSuY0CCW4KISMs4AyQpz0VGOeRbih_6FspMgVz0VswtZw05l28AZHKc-rgw5tqfrWQMlqapl-l7v2kdibweMqJDJGg0cdUMCW4bWfw449mJQ4Q-oYvqaDnfG5l7MAJQloq9bZ-5jtSM4qEkkcXmIeLjyCnlxCGsG5oNv93lmV2UxyyAHwM',
        stats: { skill: 94, burnout: 20, morale: 85, loyalty: 60 },
        traits: [
            { icon: 'lightbulb', name: 'Visionary', color: 'yellow' },
            { icon: 'psychology', name: 'Analytical', color: 'blue' }
        ],
        isTopTalent: true
    },
    {
        name: 'Benji Chen',
        role: 'Junior UI Designer',
        salary: '$65k/yr',
        ask: '$65k/yr',
        equity: '0.1%',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDRslWXnkFmMkC5l-Z0xaKr8Nqj8phFNFnLF7ssfTGRlG2YOakraQS29CT29-EoieKcMUeqaoaS8SbawvmdeNSzOMxQOeb3Akw4JDCP9tKutqAgAWXseoT3F0Zwl4Xw4K_-Dh4zk_sRuZQ7f_bJQJg4ft1Dh4MPJmS25JW5RCUv9coWnKxHrkqwWzLQvpF1JA80mxchXObRIj68lQiMiI9M5wWdar1XzmpNzT_Hhvte-Ovu8M_94fnfLf0-8KdWlUy6M-fQsatK29U',
        stats: { skill: 58, burnout: 5, morale: 50, loyalty: 80 },
        traits: [
            { icon: 'school', name: 'Fast Learner', color: 'green' }
        ]
    },
    {
        name: 'Sarah Vaughn',
        role: 'Sales Lead',
        salary: '$88k/yr',
        ask: '$88k/yr + Bonus',
        equity: '0.25%',
        img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC46zO22rcz2n9tQlNSqTEyODH7Bkfb1DlZ6VOLnsYFl7PnZ2XDpbt-UHQmw83j5fCJQG4JmUO2KFGeF1BGHk-6aeWosVki-FxD7iOa5Qlf9mSCVIOV09lAHf6PzQAbcEjWDq9PeyDEBQz3K6RBopKJrb0H72uVo1Hmx85tV1-pKxbwvvKDv51DOFuEdxYy1Za6SPuMQ_mmQbExj4McFX3VVXlrpYGSuHNPrcE2bewob2YxqZv3zthPZ3VxvtCT2YIuP7CvwVjjzFk',
        stats: { skill: 79, burnout: 45, morale: 90, loyalty: 30 },
        traits: [
            { icon: 'campaign', name: 'Charismatic', color: 'purple' },
            { icon: 'payments', name: 'Greedy', color: 'red' }
        ]
    }
];

export const Recruitment = ({ onBack, onHire }: RecruitmentProps) => {
    const [view, setView] = useState<'list' | 'initiate_headhunt' | 'headhunt_status'>('list');

    if (view === 'initiate_headhunt') {
        return <InitiateHeadhunt onBack={() => setView('list')} onStart={() => setView('headhunt_status')} />;
    }

    if (view === 'headhunt_status') {
        return <HeadhuntStatus onBack={() => setView('list')} onViewCandidates={() => setView('list')} />;
    }

    return (
        <div className="fixed inset-0 z-[100] bg-background-light dark:bg-background-dark flex flex-col h-full overflow-hidden animate-in fade-in slide-in-from-bottom duration-300">
            {/* Background Decoration Gradient */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] opacity-20 dark:opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>

            {/* Header */}
            <div className="shrink-0 flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between border-b border-gray-200 dark:border-white/10 relative z-20">
                <div
                    onClick={onBack}
                    className="text-slate-900 dark:text-white flex size-12 shrink-0 items-center justify-center cursor-pointer rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                >
                    <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                </div>
                <div className="flex flex-col items-center">
                    <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Recruitment</h2>
                    <p className="text-slate-500 dark:text-gray-400 text-xs font-medium">12 Candidates Found</p>
                </div>
                <div className="text-slate-900 dark:text-white flex size-12 shrink-0 items-center justify-center cursor-pointer rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-[24px]">filter_list</span>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto no-scrollbar relative z-10">
                <div className="flex flex-wrap gap-3 px-4 py-4">
                    <div className="flex min-w-[100px] flex-1 basis-[fit-content] flex-col gap-1 rounded-xl bg-white dark:bg-[#2f2839]/40 border border-gray-200 dark:border-[#453b54] p-3 items-center text-center shadow-sm">
                        <p className="text-slate-900 dark:text-white tracking-tight text-xl font-bold leading-tight">$1.2M</p>
                        <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px] text-green-500">attach_money</span>
                            <p className="text-slate-500 dark:text-[#a89db9] text-xs font-medium uppercase tracking-wide">Budget</p>
                        </div>
                    </div>
                    <div className="flex min-w-[100px] flex-1 basis-[fit-content] flex-col gap-1 rounded-xl bg-white dark:bg-[#2f2839]/40 border border-gray-200 dark:border-[#453b54] p-3 items-center text-center shadow-sm">
                        <p className="text-slate-900 dark:text-white tracking-tight text-xl font-bold leading-tight">2</p>
                        <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px] text-primary">person_add</span>
                            <p className="text-slate-500 dark:text-[#a89db9] text-xs font-medium uppercase tracking-wide">Open Slots</p>
                        </div>
                    </div>
                    <div className="flex min-w-[100px] flex-1 basis-[fit-content] flex-col gap-1 rounded-xl bg-white dark:bg-[#2f2839]/40 border border-gray-200 dark:border-[#453b54] p-3 items-center text-center shadow-sm">
                        <p className="text-slate-900 dark:text-white tracking-tight text-xl font-bold leading-tight">+15%</p>
                        <div className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[16px] text-orange-400">trending_up</span>
                            <p className="text-slate-500 dark:text-[#a89db9] text-xs font-medium uppercase tracking-wide">Market Rate</p>
                        </div>
                    </div>
                </div>

                <div className="flex w-full shrink-0 gap-2 px-4 py-2 overflow-x-auto no-scrollbar">
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
                </div>

                <div className="flex flex-col gap-4 p-4 pb-24">
                    {CANDIDATES.map((candidate, index) => (
                        <div key={index} className={`relative flex flex-col gap-3 rounded-xl bg-white dark:bg-[#1e1e24] p-4 shadow-md border ${candidate.isTopTalent ? 'border-purple-500/30 dark:border-purple-500/20' : 'border-transparent dark:border-[#453b54]'}`}>
                            {candidate.isTopTalent && (
                                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-md">
                                    <span className="material-symbols-outlined text-[12px]">star</span>
                                    TOP TALENT
                                </div>
                            )}
                            <div className="flex justify-between items-start gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="bg-center bg-no-repeat bg-cover rounded-xl h-16 w-16 shrink-0 shadow-sm border border-gray-100 dark:border-white/5" style={{ backgroundImage: `url("${candidate.img}")` }}></div>
                                    <div className="flex flex-col">
                                        <h3 className="text-slate-900 dark:text-white text-base font-bold leading-tight">{candidate.name}</h3>
                                        <p className="text-primary text-xs font-semibold uppercase tracking-wider mb-1">{candidate.role}</p>
                                        <div className="inline-flex items-center gap-1 bg-green-500/10 text-green-600 dark:text-green-400 px-1.5 py-0.5 rounded text-xs font-mono font-bold">
                                            Ask: {candidate.ask}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                                <div className="flex justify-between items-center py-1">
                                    <span className="text-slate-500 dark:text-gray-400 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">bolt</span> Skill</span>
                                    <span className="text-slate-900 dark:text-white font-mono font-bold">{candidate.stats.skill}/100</span>
                                </div>
                                <div className="flex justify-between items-center py-1">
                                    <span className="text-slate-500 dark:text-gray-400 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">local_fire_department</span> Burnout Risk</span>
                                    <span className="text-green-500 font-bold text-[10px] uppercase">{candidate.stats.burnout < 30 ? 'Low' : 'High'}</span>
                                </div>
                                <div className="flex justify-between items-center py-1">
                                    <span className="text-slate-500 dark:text-gray-400 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">handshake</span> Loyalty</span>
                                    <span className="text-slate-700 dark:text-gray-300 text-[10px] uppercase">Moderate</span>
                                </div>
                                <div className="flex justify-between items-center py-1">
                                    <span className="text-slate-500 dark:text-gray-400 flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">sentiment_satisfied</span> Base Morale</span>
                                    <span className="text-purple-400 text-[10px] uppercase">High</span>
                                </div>
                                {index === 0 && (
                                    <div className="col-span-2 pt-2 border-t border-gray-100 dark:border-white/5 mt-1">
                                        <div className="h-1.5 w-full bg-gray-100 dark:bg-[#453b54] rounded-full overflow-hidden">
                                            <div className="h-full bg-primary rounded-full" style={{ width: `${candidate.stats.skill}%` }}></div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {candidate.traits && (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {candidate.traits.map((trait, tIdx) => (
                                        <span key={tIdx} className="inline-flex items-center gap-1 rounded border border-gray-200 dark:border-white/10 bg-slate-50 dark:bg-[#2f2839] px-2 py-0.5 text-[10px] font-medium text-slate-600 dark:text-gray-300">
                                            <span className={`material-symbols-outlined text-[12px] text-${trait.color}-500`}>{trait.icon}</span> {trait.name}
                                        </span>
                                    ))}
                                </div>
                            )}

                            <div className="flex gap-3 mt-3 pt-3 border-t border-gray-100 dark:border-white/5">
                                <button className="flex-1 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-[#2f2839] text-slate-600 dark:text-gray-300 text-xs font-bold hover:bg-gray-50 dark:hover:bg-[#3a3246] transition-colors">
                                    Dismiss
                                </button>
                                <button
                                    onClick={() => onHire(candidate)}
                                    className="flex-[2] py-2.5 rounded-lg bg-primary text-white text-xs font-bold shadow-lg shadow-primary/25 hover:bg-[#5a0ec7] active:scale-95 transition-all flex items-center justify-center gap-2"
                                >
                                    <span className="material-symbols-outlined text-[16px]">check</span>
                                    Hire
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sticky Bottom Action Bar */}
            <div className="shrink-0 w-full bg-white dark:bg-[#1e1e24] border-t border-gray-200 dark:border-white/5 p-4 z-50 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
                <button
                    onClick={() => setView('initiate_headhunt')}
                    className="w-full flex items-center justify-center gap-2 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-gray-200 text-white dark:text-slate-900 font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-black/20 active:scale-[0.98] transition-all"
                >
                    <span className="material-symbols-outlined text-[20px]">travel_explore</span>
                    Headhunt New Talent ($5k)
                </button>
            </div>
        </div>
    );
};
