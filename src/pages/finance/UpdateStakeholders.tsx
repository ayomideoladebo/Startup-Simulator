import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const UpdateStakeholders = () => {
    const navigate = useNavigate();
    const [selectedRecipients, setSelectedRecipients] = useState({
        apex: true,
        sarah: true,
        seed: false
    });
    const [subject, setSubject] = useState('Q3 2024 Performance Update');
    const [message, setMessage] = useState('Dear Investors,\nWe are pleased to share our Q3 results. Despite market volatility, we\'ve achieved 15% month-over-month growth in ARR. Key highlights include:\n- Launched Enterprise Tier\n- Secured 3 Key Partnerships\n- Reduced Burn Rate by 12%\nLooking forward to Q4!');
    const [attachments, setAttachments] = useState({
        financials: true,
        roadmap: false,
        metrics: false
    });

    const toggleRecipient = (key: keyof typeof selectedRecipients) => {
        setSelectedRecipients(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const toggleAttachment = (key: keyof typeof attachments) => {
        setAttachments(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const toggleAllRecipients = () => {
        const allSelected = Object.values(selectedRecipients).every(v => v);
        setSelectedRecipients({
            apex: !allSelected,
            sarah: !allSelected,
            seed: !allSelected
        });
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white overflow-x-hidden min-h-screen relative pb-32">
            <style>{`.no-scrollbar::-webkit-scrollbar {
                display: none;
            }
            .no-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
            }
            .custom-scrollbar::-webkit-scrollbar {
                width: 4px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
                background: transparent;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
                background-color: #cbd5e1;
                border-radius: 20px;
            }
            .dark .custom-scrollbar::-webkit-scrollbar-thumb {
                background-color: #475569;
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
                <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">Update Stakeholders</h2>
            </div>

            <div className="flex flex-col w-full max-w-md mx-auto p-4 space-y-6">
                {/* Recipients Section */}
                <section>
                    <div className="flex items-center justify-between mb-3 px-1">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500">Recipients</h3>
                        <button onClick={toggleAllRecipients} className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors">Select All</button>
                    </div>
                    <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-white/5 shadow-sm divide-y divide-slate-100 dark:divide-white/5 overflow-hidden">
                        <label className="flex items-center p-3 gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group select-none">
                            <div className="size-10 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 border border-blue-200 dark:border-blue-500/30">
                                <span className="material-symbols-outlined text-xl">apartment</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-bold text-sm text-slate-900 dark:text-white truncate">Apex Ventures</div>
                                <div className="text-[10px] font-medium text-slate-500 truncate">Lead Investor • Series A</div>
                            </div>
                            <input
                                checked={selectedRecipients.apex}
                                onChange={() => toggleRecipient('apex')}
                                className="rounded border-slate-300 text-primary focus:ring-primary size-5 bg-slate-100 dark:bg-white/10 dark:border-white/10 dark:checked:bg-primary transition-all cursor-pointer"
                                type="checkbox"
                            />
                        </label>
                        <label className="flex items-center p-3 gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group select-none">
                            <div className="size-10 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 border border-emerald-200 dark:border-emerald-500/30">
                                <span className="material-symbols-outlined text-xl">person</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-bold text-sm text-slate-900 dark:text-white truncate">Sarah Chen</div>
                                <div className="text-[10px] font-medium text-slate-500 truncate">Angel Investor</div>
                            </div>
                            <input
                                checked={selectedRecipients.sarah}
                                onChange={() => toggleRecipient('sarah')}
                                className="rounded border-slate-300 text-primary focus:ring-primary size-5 bg-slate-100 dark:bg-white/10 dark:border-white/10 dark:checked:bg-primary transition-all cursor-pointer"
                                type="checkbox"
                            />
                        </label>
                        <label className="flex items-center p-3 gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group select-none">
                            <div className="size-10 rounded-full bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400 shrink-0 border border-amber-200 dark:border-amber-500/30">
                                <span className="material-symbols-outlined text-xl">groups</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="font-bold text-sm text-slate-900 dark:text-white truncate">Seed Syndicate</div>
                                <div className="text-[10px] font-medium text-slate-500 truncate">Micro-VC Pool</div>
                            </div>
                            <input
                                checked={selectedRecipients.seed}
                                onChange={() => toggleRecipient('seed')}
                                className="rounded border-slate-300 text-primary focus:ring-primary size-5 bg-slate-100 dark:bg-white/10 dark:border-white/10 dark:checked:bg-primary transition-all cursor-pointer"
                                type="checkbox"
                            />
                        </label>
                    </div>
                </section>

                {/* Compose Update Section */}
                <section>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 ml-1 mb-3">Compose Update</h3>
                    <div className="bg-white dark:bg-surface-dark p-4 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Subject</label>
                            <input
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="w-full bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg px-3 py-2.5 text-sm font-medium focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all text-slate-900 dark:text-white placeholder-slate-400"
                                type="text"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 mb-1.5 uppercase">Message Body</label>
                            <textarea
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full h-40 bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/10 rounded-lg px-3 py-3 text-sm font-medium focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all resize-none text-slate-900 dark:text-white placeholder-slate-400 leading-relaxed custom-scrollbar"
                            />
                        </div>
                    </div>
                </section>

                {/* Attach Reports Section */}
                <section>
                    <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 ml-1 mb-3">Attach Reports</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={() => toggleAttachment('financials')}
                            className={`relative flex flex-col items-start p-3.5 rounded-xl border transition-all text-left group shadow-sm ${attachments.financials ? 'border-2 border-primary bg-primary/5 dark:bg-primary/10' : 'border border-slate-200 dark:border-white/10 bg-white dark:bg-surface-dark hover:border-primary/50 dark:hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-white/5 opacity-80 hover:opacity-100'}`}
                        >
                            <div className={`absolute top-2.5 right-2.5 transition-colors ${attachments.financials ? 'text-primary' : 'text-slate-300 dark:text-slate-600 group-hover:text-primary/50'}`}>
                                <span className={`material-symbols-outlined text-lg ${attachments.financials ? 'filled' : ''}`}>{attachments.financials ? 'check_circle' : 'radio_button_unchecked'}</span>
                            </div>
                            <span className={`material-symbols-outlined mb-3 text-2xl transition-colors ${attachments.financials ? 'text-primary' : 'text-slate-500 dark:text-slate-400 group-hover:text-primary'}`}>monitoring</span>
                            <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight">Q3 Financials</span>
                            <span className={`text-[10px] font-medium mt-1 ${attachments.financials ? 'text-primary' : 'text-slate-500'}`}>PDF • 2.4 MB</span>
                        </button>

                        <button
                            onClick={() => toggleAttachment('roadmap')}
                            className={`relative flex flex-col items-start p-3.5 rounded-xl border transition-all text-left group shadow-sm ${attachments.roadmap ? 'border-2 border-primary bg-primary/5 dark:bg-primary/10' : 'border border-slate-200 dark:border-white/10 bg-white dark:bg-surface-dark hover:border-primary/50 dark:hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-white/5 opacity-80 hover:opacity-100'}`}
                        >
                            <div className={`absolute top-2.5 right-2.5 transition-colors ${attachments.roadmap ? 'text-primary' : 'text-slate-300 dark:text-slate-600 group-hover:text-primary/50'}`}>
                                <span className={`material-symbols-outlined text-lg ${attachments.roadmap ? 'filled' : ''}`}>{attachments.roadmap ? 'check_circle' : 'radio_button_unchecked'}</span>
                            </div>
                            <span className={`material-symbols-outlined mb-3 text-2xl transition-colors ${attachments.roadmap ? 'text-primary' : 'text-slate-500 dark:text-slate-400 group-hover:text-primary'}`}>map</span>
                            <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight">Product Roadmap</span>
                            <span className={`text-[10px] font-medium mt-1 ${attachments.roadmap ? 'text-primary' : 'text-slate-500'}`}>PDF • 1.1 MB</span>
                        </button>

                        <button
                            onClick={() => toggleAttachment('metrics')}
                            className={`relative flex flex-col items-start p-3.5 rounded-xl border transition-all text-left group shadow-sm ${attachments.metrics ? 'border-2 border-primary bg-primary/5 dark:bg-primary/10' : 'border border-slate-200 dark:border-white/10 bg-white dark:bg-surface-dark hover:border-primary/50 dark:hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-white/5 opacity-80 hover:opacity-100'}`}
                        >
                            <div className={`absolute top-2.5 right-2.5 transition-colors ${attachments.metrics ? 'text-primary' : 'text-slate-300 dark:text-slate-600 group-hover:text-primary/50'}`}>
                                <span className={`material-symbols-outlined text-lg ${attachments.metrics ? 'filled' : ''}`}>{attachments.metrics ? 'check_circle' : 'radio_button_unchecked'}</span>
                            </div>
                            <span className={`material-symbols-outlined mb-3 text-2xl transition-colors ${attachments.metrics ? 'text-primary' : 'text-slate-500 dark:text-slate-400 group-hover:text-primary'}`}>group_add</span>
                            <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight">User Metrics</span>
                            <span className={`text-[10px] font-medium mt-1 ${attachments.metrics ? 'text-primary' : 'text-slate-500'}`}>XLSX • 800 KB</span>
                        </button>
                    </div>
                </section>
            </div>

            {/* Footer Actions */}
            <div className="fixed bottom-0 left-0 w-full p-4 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-t border-slate-200 dark:border-white/5 z-40 safe-pb">
                <div className="max-w-md mx-auto flex gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex-1 py-3.5 rounded-xl border border-slate-300 dark:border-white/10 bg-transparent text-slate-700 dark:text-slate-300 font-bold hover:bg-slate-100 dark:hover:bg-white/5 transition-all active:scale-[0.98]"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => navigate(-1)}
                        className="flex-[2] py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/25 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group"
                    >
                        <span className="material-symbols-outlined text-[20px] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform">send</span>
                        Send Update
                    </button>
                </div>
            </div>
        </div>
    );
};
