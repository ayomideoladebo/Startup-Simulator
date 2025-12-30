import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useGameState } from '../../hooks/useGameState';

interface InitiateHeadhuntProps {
    onBack: () => void;
    onStart: (role: string, skill: number) => void;
}

export const InitiateHeadhunt = ({ onBack, onStart }: InitiateHeadhuntProps) => {
    const { company } = useGameState();
    const [skillLevel, setSkillLevel] = useState(85);
    const [selectedRole, setSelectedRole] = useState('Developer');
    const [processing, setProcessing] = useState(false);

    const handleStartHeadhunt = async () => {
        if (!company) return;
        setProcessing(true);
        try {
            const { error } = await supabase.functions.invoke('generate-candidates', {
                body: { 
                    company_id: company.id,
                    role: selectedRole,
                    min_skill: skillLevel
                }
            });

            if (error) throw error;
            
            // Deduct cost (Client side for speed, ideally backend)
            await supabase.from('companies').update({ cash: company.cash - 5000 }).eq('id', company.id);

            onStart(selectedRole, skillLevel); // Go to status/list view
        } catch (err) {
            console.error('Headhunt failed:', err);
            alert('Failed to start headhunt');
        } finally {
            setProcessing(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] bg-background-light dark:bg-background-dark flex flex-col min-h-full overflow-y-auto no-scrollbar animate-in fade-in slide-in-from-right duration-300">
            <div className="sticky top-0 z-50 flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between border-b border-gray-200 dark:border-white/10">
                <div onClick={onBack} className="text-slate-900 dark:text-white flex size-12 shrink-0 items-center justify-center cursor-pointer rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                </div>
                <div className="flex flex-col items-center">
                    <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Initiate Headhunt</h2>
                    <p className="text-slate-500 dark:text-gray-400 text-xs font-medium">Configure Search</p>
                </div>
                <div className="text-slate-900 dark:text-white flex size-12 shrink-0 items-center justify-center cursor-pointer rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors opacity-0 pointer-events-none">
                    <span className="material-symbols-outlined text-[24px]">filter_list</span>
                </div>
            </div>

            <div className="flex flex-wrap gap-3 px-4 py-4 bg-background-light dark:bg-background-dark">
                {/* Stats omitted for brevity, keeping layout */}
                <div className="flex min-w-[100px] flex-1 basis-[fit-content] flex-col gap-1 rounded-xl bg-white dark:bg-[#2f2839]/40 border border-gray-200 dark:border-[#453b54] p-3 items-center text-center shadow-sm">
                    <p className="text-slate-900 dark:text-white tracking-tight text-xl font-bold leading-tight">
                         {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' }).format(company?.cash || 0)}
                    </p>
                    <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-green-500">attach_money</span>
                        <p className="text-slate-500 dark:text-[#a89db9] text-xs font-medium uppercase tracking-wide">Available</p>
                    </div>
                </div>
                <div className="flex min-w-[100px] flex-1 basis-[fit-content] flex-col gap-1 rounded-xl bg-white dark:bg-[#2f2839]/40 border border-gray-200 dark:border-[#453b54] p-3 items-center text-center shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full m-2 animate-pulse"></div>
                    <p className="text-red-500 tracking-tight text-xl font-bold leading-tight">-$5k</p>
                    <div className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-slate-400">payments</span>
                        <p className="text-slate-500 dark:text-[#a89db9] text-xs font-medium uppercase tracking-wide">Search Cost</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-6 px-4 pb-32">
                <section>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-slate-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">Target Role</h3>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {['Developer', 'Designer', 'Marketer', 'Manager'].map(role => (
                             <label key={role} className="cursor-pointer group relative" onClick={() => setSelectedRole(role)}>
                                <input checked={selectedRole === role} className="peer sr-only" name="role" type="radio" readOnly />
                                <div className="flex flex-col gap-2 p-3 rounded-xl bg-white dark:bg-[#1e1e24] border-2 border-transparent peer-checked:border-primary peer-checked:bg-primary/5 dark:peer-checked:bg-primary/10 transition-all shadow-sm">
                                    <div className="size-8 rounded-lg bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-[20px]">{role === 'Developer' ? 'code' : role === 'Designer' ? 'palette' : role === 'Marketer' ? 'campaign' : 'star'}</span>
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">{role}</p>
                                    </div>
                                </div>
                                <div className="absolute top-3 right-3 opacity-0 peer-checked:opacity-100 transition-opacity text-primary">
                                    <span className="material-symbols-outlined text-[18px] fill-current">check_circle</span>
                                </div>
                            </label>
                        ))}
                    </div>
                </section>
                
                {/* Minimal settings for now */}
                 <section className="flex flex-col gap-4 rounded-xl bg-white dark:bg-[#1e1e24] p-4 shadow-sm">
                    <div>
                        <div className="flex justify-between items-end mb-4">
                            <h3 className="text-slate-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">Min. Skill Level</h3>
                            <div className="text-primary font-mono font-bold text-lg">{skillLevel}<span className="text-xs text-slate-400 dark:text-gray-500 ml-1">/100</span></div>
                        </div>
                        <div className="relative w-full h-6 flex items-center">
                            <input
                                className="z-10 relative w-full opacity-0 cursor-pointer h-full"
                                max="100"
                                min="1"
                                type="range"
                                value={skillLevel}
                                onChange={(e) => setSkillLevel(parseInt(e.target.value))}
                            />
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 dark:bg-white/10 rounded-full z-0 overflow-hidden">
                                <div className="h-full bg-primary" style={{ width: `${skillLevel}%` }}></div>
                            </div>
                            <div className="absolute pointer-events-none h-5 w-5 bg-primary rounded-full shadow-[0_0_0_4px_rgba(109,19,236,0.2)] top-1/2 -translate-y-1/2 -mt-[1px] -ml-2.5" style={{ left: `${skillLevel}%` }}></div>
                        </div>
                    </div>
                </section>

                <div className="mt-2 p-3 bg-blue-50 dark:bg-blue-500/10 rounded-lg border border-blue-100 dark:border-blue-500/20 flex gap-3 items-start">
                    <span className="material-symbols-outlined text-blue-500 text-[20px] mt-0.5">info</span>
                    <div className="flex flex-col gap-1">
                        <p className="text-xs font-bold text-slate-700 dark:text-blue-100">
                            Headhunt Probability: 
                            <span className={`${
                                skillLevel > 85 ? 'text-red-500' : 
                                skillLevel > 70 ? 'text-orange-500' : 
                                'text-green-600 dark:text-green-400'
                            }`}>
                                {skillLevel > 85 ? ' Low' : skillLevel > 70 ? ' Medium' : ' High'}
                            </span>
                        </p>
                        <p className="text-[11px] leading-relaxed text-slate-500 dark:text-blue-200/60">
                            {skillLevel > 85 
                                ? "Given your strict criteria, expect 0-1 top-tier candidates." 
                                : skillLevel > 70 
                                    ? "Expect 1-3 quality candidates." 
                                    : "Expect 3-5 candidates immediately."}
                        </p>
                    </div>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 w-full p-4 bg-gradient-to-t from-background-light via-background-light to-transparent dark:from-background-dark dark:via-background-dark pt-8 z-40 max-w-md mx-auto right-0">
                <button 
                    onClick={handleStartHeadhunt} 
                    disabled={processing}
                    className="w-full flex items-center justify-between bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-gray-200 text-white dark:text-slate-900 p-1.5 pr-6 rounded-full shadow-xl shadow-black/20 transition-transform active:scale-[0.98] group disabled:opacity-50"
                >
                    <div className="bg-white/10 dark:bg-black/10 rounded-full h-12 w-12 flex items-center justify-center shrink-0">
                         {processing ? (
                            <span className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full font-bold"></span>
                         ) : (
                            <span className="material-symbols-outlined text-[24px] group-hover:rotate-12 transition-transform">rocket_launch</span>
                         )}
                    </div>
                    <div className="flex flex-col items-start mr-auto ml-3">
                        <span className="font-bold text-sm tracking-wide">{processing ? 'Connecting...' : 'Start Headhunt'}</span>
                        <span className="text-[10px] opacity-70 font-medium">{processing ? 'Contacting Recruiters' : 'Instant Results'}</span>
                    </div>
                    <div className="text-right">
                        <span className="block font-bold text-lg text-green-400 dark:text-green-600 group-hover:text-green-300 dark:group-hover:text-green-700 transition-colors">$5,000</span>
                    </div>
                </button>
            </div>

            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] opacity-20 dark:opacity-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>
        </div>
    );
};

