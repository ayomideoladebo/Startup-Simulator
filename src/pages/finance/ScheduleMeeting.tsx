import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ScheduleMeeting = () => {
    const navigate = useNavigate();
    const [selectedInvestors, setSelectedInvestors] = useState({
        sarah: true,
        mike: true,
        global: false
    });
    const [topic, setTopic] = useState('Q3 Performance Review');
    const [time, setTime] = useState('Next Week (Early)');

    const toggleInvestor = (key: keyof typeof selectedInvestors) => {
        setSelectedInvestors(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const selectedCount = Object.values(selectedInvestors).filter(Boolean).length;

    return (
        <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white overflow-x-hidden min-h-screen relative pb-32">
            <style>{`.no-scrollbar::-webkit-scrollbar {
                display: none;
            }
            .no-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
            }
            input:focus, select:focus, textarea:focus {
                outline: none;
                border-color: #6d13ec;
                ring: 2px; 
                ring-color: #6d13ec;
            }
            `}</style>

            {/* Header */}
            <div className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-black/5 dark:border-white/5 p-4 flex items-center justify-between">
                <button
                    onClick={() => navigate(-1)}
                    className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-900 dark:text-white"
                >
                    <span className="material-symbols-outlined">arrow_back_ios_new</span>
                </button>
                <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">Schedule Meeting</h2>
                <div className="w-0"></div>
            </div>

            <div className="flex flex-col w-full max-w-md mx-auto">
                <div className="px-4 py-6 space-y-6">
                    {/* Meeting Details */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-500 ml-1">Meeting Details</h3>
                        <div className="bg-white dark:bg-surface-dark p-5 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm space-y-5">
                            <div>
                                <label className="text-xs font-bold uppercase text-slate-500 mb-2 block">Meeting Topic</label>
                                <div className="relative">
                                    <select
                                        value={topic}
                                        onChange={(e) => setTopic(e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg py-3 pl-4 pr-10 text-sm font-medium text-slate-900 dark:text-white focus:ring-1 focus:ring-primary focus:border-primary appearance-none transition-shadow"
                                    >
                                        <option>Q3 Performance Review</option>
                                        <option>Future Strategy & Roadmap</option>
                                        <option>New Product Launch</option>
                                        <option>Emergency Funding Request</option>
                                        <option>General Network Catch-up</option>
                                    </select>
                                    <span className="material-symbols-outlined absolute right-3 top-3 pointer-events-none text-slate-400">expand_more</span>
                                </div>
                            </div>
                            <div>
                                <label className="text-xs font-bold uppercase text-slate-500 mb-2 block">Proposed Time</label>
                                <div className="relative">
                                    <select
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-lg py-3 pl-4 pr-10 text-sm font-medium text-slate-900 dark:text-white focus:ring-1 focus:ring-primary focus:border-primary appearance-none transition-shadow"
                                    >
                                        <option>Next Week (Early)</option>
                                        <option>Next Week (Late)</option>
                                        <option>End of Month</option>
                                        <option>Next Quarter</option>
                                        <option>ASAP (Urgent)</option>
                                    </select>
                                    <span className="material-symbols-outlined absolute right-3 top-3 pointer-events-none text-slate-400">calendar_month</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Invite Investors */}
                    <div className="space-y-4">
                        <div className="flex items-end justify-between ml-1">
                            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-500">Invite Investors</h3>
                            <span className="text-xs font-medium text-primary">{selectedCount} Selected</span>
                        </div>
                        <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-white/5 shadow-sm overflow-hidden divide-y divide-slate-100 dark:divide-white/5">
                            <label className="flex items-center p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                                <div className="relative flex items-center justify-center">
                                    <input
                                        type="checkbox"
                                        checked={selectedInvestors.sarah}
                                        onChange={() => toggleInvestor('sarah')}
                                        className="peer size-5 rounded border-slate-300 dark:border-white/20 text-primary focus:ring-primary bg-transparent"
                                    />
                                </div>
                                <div className="ml-4 flex-1 flex items-center gap-3">
                                    <div className="size-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-xs border border-indigo-200 dark:border-indigo-500/20">SC</div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">Sarah Chen</p>
                                        <p className="text-[10px] text-slate-500">Peak Ventures (VC)</p>
                                    </div>
                                </div>
                                <div className="hidden sm:block">
                                    <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-200 dark:border-emerald-500/20">High Interest</div>
                                </div>
                            </label>
                            <label className="flex items-center p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                                <div className="relative flex items-center justify-center">
                                    <input
                                        type="checkbox"
                                        checked={selectedInvestors.mike}
                                        onChange={() => toggleInvestor('mike')}
                                        className="peer size-5 rounded border-slate-300 dark:border-white/20 text-primary focus:ring-primary bg-transparent"
                                    />
                                </div>
                                <div className="ml-4 flex-1 flex items-center gap-3">
                                    <div className="size-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 font-bold text-xs border border-amber-200 dark:border-amber-500/20">MR</div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">Mike Ross</p>
                                        <p className="text-[10px] text-slate-500">Angel Investor</p>
                                    </div>
                                </div>
                                <div className="hidden sm:block">
                                    <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/10 px-2 py-1 rounded-full border border-slate-200 dark:border-white/10">Neutral</div>
                                </div>
                            </label>
                            <label className="flex items-center p-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                                <div className="relative flex items-center justify-center">
                                    <input
                                        type="checkbox"
                                        checked={selectedInvestors.global}
                                        onChange={() => toggleInvestor('global')}
                                        className="peer size-5 rounded border-slate-300 dark:border-white/20 text-primary focus:ring-primary bg-transparent"
                                    />
                                </div>
                                <div className={`ml-4 flex-1 flex items-center gap-3 ${selectedInvestors.global ? '' : 'opacity-60'}`}>
                                    <div className="size-10 rounded-full bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-rose-600 dark:text-rose-400 font-bold text-xs border border-rose-200 dark:border-rose-500/20">GV</div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">Global Ventures</p>
                                        <p className="text-[10px] text-slate-500">Institutional</p>
                                    </div>
                                </div>
                                <div className="hidden sm:block">
                                    <div className={`text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-white/10 px-2 py-1 rounded-full border border-slate-200 dark:border-white/10 ${selectedInvestors.global ? '' : 'opacity-60'}`}>Low Interest</div>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Agenda & Notes */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 dark:text-slate-500 ml-1">Agenda & Notes</h3>
                        <div className="relative">
                            <textarea
                                className="w-full bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/5 rounded-xl p-4 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-1 focus:ring-primary focus:border-primary resize-none h-32 shadow-sm"
                                placeholder="Briefly describe talking points (e.g. KPI review, burn rate concerns)..."
                            ></textarea>
                            <div className="absolute bottom-3 right-3 pointer-events-none">
                                <span className="material-symbols-outlined text-slate-300 dark:text-white/20 text-lg">edit_note</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Actions */}
            <div className="fixed bottom-0 left-0 w-full p-4 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-t border-slate-200 dark:border-white/5 z-40">
                <div className="max-w-md mx-auto flex gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-1/3 py-3.5 rounded-xl bg-slate-200 dark:bg-surface-dark hover:bg-slate-300 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 font-bold transition-all active:scale-[0.98]"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => navigate(-1)}
                        className="flex-1 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group"
                    >
                        <span className="material-symbols-outlined text-[20px]">check_circle</span>
                        Confirm Meeting
                    </button>
                </div>
            </div>
        </div>
    );
};
