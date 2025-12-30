import { useState, useEffect } from 'react';
import { InitiateHeadhunt } from './InitiateHeadhunt';
import { HeadhuntStatus } from './HeadhuntStatus';
import { supabase } from '../../lib/supabase';
import { useGameState } from '../../hooks/useGameState';

export interface Candidate {
    id: string; // Added ID for DB operations
    name: string;
    role: string;
    salary_ask: number; // Changed to number to match DB
    salary: string; // Keeping for UI display helper or mapped
    ask: string; 
    img: string; // mapped from avatar_url
    stats: {
        skill: number;
        burnout: number; // 0-100
        morale: number; // 0-100
        loyalty: number; // 0-100
    };
    traits: { icon: string; name: string; color: string }[];
    isTopTalent?: boolean;
    equity?: string; 
}

interface RecruitmentProps {
    onBack: () => void;
    onHire: (candidate: Candidate) => void;
}

export const Recruitment = ({ onBack, onHire }: RecruitmentProps) => {
    const { company } = useGameState();
    const [view, setView] = useState<'list' | 'initiate_headhunt' | 'headhunt_status'>('list');
    const [headhuntRole, setHeadhuntRole] = useState<string>('');
    const [candidates, setCandidates] = useState<Candidate[]>([]);
    const [loading, setLoading] = useState(false);

    const handleDismiss = async (candidateId: string) => {
        if (!candidateId) return;
        setLoading(true);
        // Optimistic update
        setCandidates(prev => prev.filter(c => c.id !== candidateId));

        const { error } = await supabase
            .from('job_candidates')
            .delete()
            .eq('id', candidateId);

        if (error) {
            console.error('Error dismissing candidate:', error);
            // Revert on error (re-fetch)
            fetchCandidates();
            alert('Failed to dismiss candidate');
        }
        setLoading(false);
    };

    const fetchCandidates = async () => {
        if (!company) return;
        setLoading(true);
        const { data, error } = await supabase
            .from('job_candidates')
            .select('*')
            .eq('company_id', company.id)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching candidates:', error);
        } else {
            // Map DB structure to UI structure
            // DB: salary_ask (int), skill_speed (int), traits (jsonb)
            // UI: ask (string), stats object, traits object array
            const mapped = data.map((c: any) => ({
                id: c.id,
                name: c.name,
                role: c.role,
                salary_ask: c.salary_ask,
                salary: `$${(c.salary_ask / 1000).toFixed(0)}k/yr`,
                ask: `$${(c.salary_ask / 1000).toFixed(0)}k/yr`,
                img: c.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${c.name}`,
                stats: {
                    skill: c.skill_quality || 50, // Using quality as main skill for now
                    burnout: 0,
                    morale: 100,
                    loyalty: 50
                },
                traits: Array.isArray(c.traits) ? c.traits.map((t: string) => ({
                    icon: 'star', // Default icon
                    name: t,
                    color: 'blue'
                })) : [],
                isTopTalent: c.skill_quality > 85
            }));
            setCandidates(mapped);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchCandidates();
    }, [company, view]); // Re-fetch when view changes (e.g. returning from headhunt)

    if (view === 'initiate_headhunt') {
        return <InitiateHeadhunt 
            onBack={() => setView('list')} 
            onStart={(role) => { 
                setHeadhuntRole(role); 
                setView('headhunt_status'); 
            }} 
        />;
    }

    if (view === 'headhunt_status') {
        // We'll treat "Status" as just a quick loading screen or success screen for now, then redirect to list
        // Actually HeadhuntStatus likely has a "View Candidates" button
        return <HeadhuntStatus 
            onBack={() => setView('list')} 
            onViewCandidates={() => setView('list')} 
            candidates={candidates}
            role={headhuntRole}
        />;
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
                    <p className="text-slate-500 dark:text-gray-400 text-xs font-medium">{candidates.length} Candidates Found</p>
                </div>
                <div className="text-slate-900 dark:text-white flex size-12 shrink-0 items-center justify-center cursor-pointer rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-[24px]">filter_list</span>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto no-scrollbar relative z-10">
                {/* Stats omitted */}
                
                <div className="flex flex-col gap-4 p-4 pb-24">
                    {loading ? (
                        <div className="text-center py-10 text-slate-500">Loading candidates...</div>
                    ) : candidates.length === 0 ? (
                         <div className="text-center py-20 flex flex-col items-center">
                            <span className="material-symbols-outlined text-4xl text-slate-300 mb-2">search_off</span>
                            <p className="text-slate-500">No candidates found. Start a headhunt!</p>
                        </div>
                    ) : (
                        candidates.map((candidate, index) => (
                            <div key={candidate.id || index} className={`relative flex flex-col gap-3 rounded-xl bg-white dark:bg-[#1e1e24] p-4 shadow-md border ${candidate.isTopTalent ? 'border-purple-500/30 dark:border-purple-500/20' : 'border-transparent dark:border-[#453b54]'}`}>
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
                                    {/* Other stats... */}
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
                                    <button 
                                        onClick={() => handleDismiss(candidate.id)}
                                        disabled={loading}
                                        className="flex-1 py-2.5 rounded-lg border border-gray-200 dark:border-white/10 bg-white dark:bg-[#2f2839] text-slate-600 dark:text-gray-300 text-xs font-bold hover:bg-gray-50 dark:hover:bg-[#3a3246] transition-colors disabled:opacity-50"
                                    >
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
                        ))
                    )}
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

