import { Candidate } from './Recruitment';

interface HiringConfirmationProps {
    candidate: Candidate;
    onViewProfile: () => void;
    onReturn: () => void;
    companyCash: number;
    currentTeamSize: number;
}

export const HiringConfirmation = ({ candidate, onViewProfile, onReturn, companyCash, currentTeamSize }: HiringConfirmationProps) => {
    // Calculate new monthly burn impact
    const monthlyCost = candidate.salary_ask ? Math.round(candidate.salary_ask / 12) : 0;
    
    return (
        <div className="fixed inset-0 z-[100] bg-background-light dark:bg-background-dark flex flex-col min-h-full overflow-y-auto no-scrollbar animate-in fade-in zoom-in-95 duration-300">
            <div className="sticky top-0 z-50 flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between">
                <div onClick={onReturn} className="text-slate-900 dark:text-white flex size-12 shrink-0 items-center justify-center cursor-pointer rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-[24px]">close</span>
                </div>
                <div className="flex flex-col items-center">
                    <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Confirmation</h2>
                </div>
                <div className="text-slate-900 dark:text-white flex size-12 shrink-0 items-center justify-center opacity-0">
                    <span className="material-symbols-outlined text-[24px]">more_vert</span>
                </div>
            </div>

            <div className="flex flex-col items-center px-6 pt-6 pb-24 text-center relative z-10 flex-grow justify-center">
                
                {/* ... (background and header omitted for brevity, keeping existing structure) ... */}
                
                 {/* Background effect */}
                <div className="absolute inset-0 z-[-1] opacity-50 bg-[radial-gradient(circle_at_50%_50%,_rgba(109,19,236,0.15)_0%,_transparent_50%)]"></div>

                <div className="mb-6 relative">
                    <div className="absolute inset-0 bg-green-500 blur-[40px] opacity-20 dark:opacity-30 rounded-full"></div>
                    <div className="relative bg-gradient-to-br from-green-400 to-green-600 rounded-full p-5 shadow-xl shadow-green-500/20 animate-bounce">
                        <span className="material-symbols-outlined text-white text-[48px]">check_circle</span>
                    </div>
                </div>

                <h1 className="text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Offer Accepted!</h1>
                <p className="text-slate-500 dark:text-gray-400 text-sm font-medium mb-8 max-w-[280px]">
                    You have successfully hired a new team member. They will start immediately.
                </p>

                <div className="w-full bg-white dark:bg-[#1e1e24] rounded-2xl p-5 shadow-lg border border-purple-500/30 dark:border-purple-500/20 mb-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary/10 rounded-bl-full -mr-4 -mt-4"></div>
                    <div className="flex flex-col items-center relative z-10">
                        <div className="bg-center bg-no-repeat bg-cover rounded-xl h-24 w-24 shadow-md border-2 border-white dark:border-[#2f2839] mb-3" style={{ backgroundImage: `url("${candidate.img}")` }}></div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">{candidate.name}</h3>
                        <p className="text-primary text-sm font-bold uppercase tracking-wide mb-4">{candidate.role}</p>

                        <div className="w-full grid grid-cols-2 gap-3 mb-2">
                            <div className="bg-slate-50 dark:bg-[#2f2839] p-3 rounded-xl border border-slate-100 dark:border-white/5 flex flex-col items-center">
                                <span className="text-xs text-slate-500 dark:text-gray-400 uppercase font-semibold mb-1">Salary</span>
                                <span className="text-slate-900 dark:text-white font-mono font-bold">{candidate.ask}</span>
                            </div>
                            <div className="bg-slate-50 dark:bg-[#2f2839] p-3 rounded-xl border border-slate-100 dark:border-white/5 flex flex-col items-center">
                                <span className="text-xs text-slate-500 dark:text-gray-400 uppercase font-semibold mb-1">Skill</span>
                                <span className="text-slate-900 dark:text-white font-mono font-bold text-primary">{candidate.stats.skill}/100</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full mb-8">
                    <h4 className="text-xs font-bold text-slate-400 dark:text-gray-500 uppercase tracking-widest mb-3 text-left pl-1">Immediate Impact</h4>
                    <div className="bg-white dark:bg-[#1e1e24] rounded-xl border border-gray-100 dark:border-[#2f2839] divide-y divide-gray-100 dark:divide-[#2f2839] shadow-sm">
                        <div className="flex justify-between items-center p-4">
                            <div className="flex items-center gap-3">
                                <div className="bg-red-100 dark:bg-red-500/20 p-2 rounded-lg text-red-600 dark:text-red-400">
                                    <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="text-sm font-semibold text-slate-900 dark:text-white">Budget Remaining</span>
                                    <span className="text-xs text-slate-500 dark:text-gray-400">Monthly burn increased</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-bold text-slate-900 dark:text-white">
                                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' }).format(companyCash)}
                                </div>
                                <div className="text-xs font-bold text-red-500">
                                    -${(monthlyCost / 1000).toFixed(1)}k/mo
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-between items-center p-4">
                            <div className="flex items-center gap-3">
                                <div className="bg-blue-100 dark:bg-blue-500/20 p-2 rounded-lg text-blue-600 dark:text-blue-400">
                                    <span className="material-symbols-outlined text-[20px]">group</span>
                                </div>
                                <div className="flex flex-col text-left">
                                    <span className="text-sm font-semibold text-slate-900 dark:text-white">Team Slots</span>
                                    <span className="text-xs text-slate-500 dark:text-gray-400">Office capacity filled</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-sm font-bold text-slate-900 dark:text-white">{10 - currentTeamSize} Open</div>
                                <div className="text-xs font-bold text-blue-500">-1 Slot</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full flex flex-col gap-3">
                    <button onClick={onViewProfile} className="w-full py-4 rounded-xl bg-primary text-white font-bold text-base shadow-lg shadow-primary/30 hover:bg-[#5a0ec7] active:scale-95 transition-all flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined">badge</span>
                        View Employee Profile
                    </button>
                    <button onClick={onReturn} className="w-full py-3.5 rounded-xl bg-transparent border border-gray-200 dark:border-white/10 text-slate-600 dark:text-gray-300 font-semibold text-sm hover:bg-gray-50 dark:hover:bg-[#2f2839] transition-colors">
                        Return to Recruitment
                    </button>
                </div>
            </div>

            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-30 dark:opacity-20 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-purple-500/40 via-transparent to-transparent"></div>
        </div>
    );
};
