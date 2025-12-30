import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CraftPitch = () => {
    const navigate = useNavigate();
    const [pitchText, setPitchText] = useState("The current market for digital services is fragmented. Users struggle to find reliable providers, leading to a 40% churn rate in the first month.\n\nOur solution aggregates these services into a single, AI-driven platform.");
    const [attachments, setAttachments] = useState({
        financials: true,
        growth: false,
        demo: false,
        team: false
    });

    const toggleAttachment = (key: keyof typeof attachments) => {
        setAttachments(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const insertTemplate = (section: string) => {
        setPitchText(prev => prev + `\n\n[${section}]\n`);
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white flex flex-col h-screen overflow-hidden w-full max-w-md md:max-w-2xl mx-auto shadow-2xl relative border-x border-white/5">
            <style>{`.hide-scrollbar::-webkit-scrollbar {
                display: none;
            }
            .hide-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
            }
            `}</style>

            {/* Top App Bar */}
            <header className="sticky top-0 z-10 flex items-center bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md p-4 pb-2 justify-between border-b border-black/5 dark:border-white/5">
                <button
                    onClick={() => navigate(-1)}
                    className="text-slate-900 dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h2 className="text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">Craft Pitch</h2>
            </header>

            {/* Profile Header */}
            <div className="p-4">
                <div className="bg-white dark:bg-surface-dark rounded-xl p-4 shadow-sm border border-black/5 dark:border-white/5">
                    <div className="flex gap-4 items-center">
                        <div className="relative shrink-0">
                            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full h-16 w-16 ring-2 ring-primary/20" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDf07iVwLl6TyYJf3hzesmbVy3uoDKgUM5QHjOtYAZ_uw70SGaSb7dLoXR0hzEipomMIlEWVmsTaaiuXgXIsOYHDlHT5JP1NfMY1bNqPibw5b1iD_9TxQLX7ZVyDxet1IdkAI6F03h1lHO-3__nlVU4ZcADwgHU4cV4an4kMZMxJwWiP-rRpte7cg-Hu62pEKOko48o19Ence4TLY8UHG-J-3zEK69Z5OViu-XxFcxUvTxhV8zvdy0SXrWdJhcCxEzj3Ow7rub0Q2A")' }}>
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-background-dark rounded-full p-0.5 border border-white/10">
                                <div className="bg-green-500 h-3 w-3 rounded-full"></div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                                <p className="text-[18px] font-bold leading-tight truncate">Tech Ventures</p>
                                <span className="bg-primary/20 text-primary text-xs font-medium px-2 py-0.5 rounded-full">Angel</span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-normal truncate">Funding: $50k - $150k</p>
                            {/* Pitch Strength Meter */}
                            <div className="mt-3 flex items-center gap-2">
                                <span className="text-xs font-medium text-primary">Pitch Strength</span>
                                <div className="flex-1 h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                                    <div className="h-full bg-primary w-[65%] rounded-full relative">
                                        <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                                    </div>
                                </div>
                                <span className="text-xs font-bold">Good</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Guidance Chips (Scrollable) */}
            <div className="flex flex-col gap-2">
                <div className="px-4 flex justify-between items-center">
                    <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Structure</h3>
                    <span className="text-xs text-primary flex items-center gap-1 cursor-pointer hover:underline">
                        <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
                        AI Suggest
                    </span>
                </div>
                <div className="flex gap-2 px-4 overflow-x-auto hide-scrollbar pb-2">
                    {['Problem', 'Solution', 'Market', 'Traction', 'The Ask'].map((chip) => (
                        <button
                            key={chip}
                            onClick={() => insertTemplate(chip)}
                            className="group flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-full bg-white dark:bg-surface-dark border border-black/5 dark:border-white/10 hover:border-primary/50 text-slate-700 dark:text-slate-300 pl-4 pr-4 transition-all hover:bg-slate-50 dark:hover:bg-white/5 active:scale-95"
                        >
                            <p className="text-sm font-medium leading-normal">{chip}</p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Text Field */}
            <div className="flex-1 flex flex-col px-4 py-3 min-h-0">
                <div className="relative flex-1 h-full">
                    <textarea
                        value={pitchText}
                        onChange={(e) => setPitchText(e.target.value)}
                        className="form-input w-full h-full resize-none rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary/50 border-none bg-white dark:bg-surface-dark placeholder:text-slate-400 dark:placeholder:text-slate-600 p-4 text-base font-normal leading-relaxed shadow-sm"
                        placeholder="Start by hooking them with a compelling problem statement. What pain point are you solving?"
                    ></textarea>
                    {/* AI Assistant Floating Badge inside textarea */}
                    <div className="absolute bottom-4 right-4 pointer-events-none">
                        <div className="flex items-center gap-2 bg-primary/10 backdrop-blur-md border border-primary/30 text-primary text-xs font-bold py-1.5 px-3 rounded-full shadow-sm">
                            <span className="material-symbols-outlined text-[16px]">lightbulb</span>
                            <span>Conciseness: 9/10</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Attachments Section */}
            <div className="mt-auto shrink-0 mb-20">
                <h3 className="text-slate-900 dark:text-white text-base font-bold leading-tight px-4 pb-3">Attachments</h3>
                <div className="flex gap-3 px-4 pb-4 overflow-x-auto hide-scrollbar">
                    {Object.entries(attachments).map(([key, active]) => (
                        <button
                            key={key}
                            onClick={() => toggleAttachment(key as keyof typeof attachments)}
                            className="flex flex-col items-center gap-2 min-w-[80px] group active:scale-95 transition-transform"
                        >
                            <div className={`size-14 rounded-2xl flex items-center justify-center border-2 transition-all ${active ? 'bg-primary/20 border-primary text-primary' : 'bg-white dark:bg-surface-dark border-black/5 dark:border-white/10 group-hover:border-primary/50 text-slate-400 group-hover:text-primary'}`}>
                                <span className="material-symbols-outlined">
                                    {key === 'financials' ? 'attach_money' :
                                        key === 'growth' ? 'analytics' :
                                            key === 'demo' ? 'play_circle' : 'groups'}
                                </span>
                            </div>
                            <span className={`text-xs font-medium capitalize transition-colors ${active ? 'text-primary' : 'text-slate-500 group-hover:text-primary'}`}>{key}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Action Floating Bar */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background-light dark:from-background-dark via-background-light/95 dark:via-background-dark/95 to-transparent pt-8 z-20 flex justify-center">
                <div className="flex gap-3 w-full max-w-md md:max-w-2xl">
                    <button className="flex-1 h-12 rounded-full border border-black/10 dark:border-white/10 bg-white dark:bg-surface-dark text-slate-900 dark:text-white font-bold text-sm hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center justify-center gap-2 active:scale-95">
                        <span className="material-symbols-outlined text-[20px]">visibility</span>
                        Preview
                    </button>
                    <button className="flex-[2] h-12 rounded-full bg-primary hover:bg-primary-light text-white font-bold text-sm shadow-lg shadow-primary/25 transition-all flex items-center justify-center gap-2 active:scale-95 hover:scale-[1.02]">
                        <span className="material-symbols-outlined text-[20px]">send</span>
                        Send Pitch
                    </button>
                </div>
            </div>
        </div>
    );
};
