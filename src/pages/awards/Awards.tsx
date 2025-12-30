import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Awards = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'upcoming' | 'earned'>('upcoming');

    const upcomingAwards = [
        {
            id: 1,
            title: "Best New Startup",
            date: "Nov 15, 2024",
            criteria: "Reach $1M Valuation",
            progress: 85,
            reward: "Media Boost (+5k Users)",
            icon: "rocket_launch",
            color: "text-blue-500",
            bg: "bg-blue-500/10"
        },
        {
            id: 2,
            title: "Social Innovation",
            date: "Dec 01, 2024",
            criteria: "Impact Score > 90",
            progress: 45,
            reward: "Gov Grant ($50k)",
            icon: "public",
            color: "text-green-500",
            bg: "bg-green-500/10"
        },
        {
            id: 3,
            title: "Tech Titan 2024",
            date: "Jan 10, 2025",
            criteria: "Hire 5 Senior Devs",
            progress: 20,
            reward: "Talent Magnet (Hiring +20%)",
            icon: "memory",
            color: "text-purple-500",
            bg: "bg-purple-500/10"
        }
    ];

    const earnedAwards = [
        {
            id: 101,
            title: "First Revenue",
            date: "Earned Oct 12, 2024",
            desc: "Generated your first $1,000 in revenue.",
            icon: "attach_money",
            color: "text-yellow-500",
            bg: "bg-yellow-500/10"
        }
    ];

    return (
        <div className="bg-background-light dark:bg-background-dark font-display antialiased text-gray-900 dark:text-white h-[100dvh] flex flex-col relative overflow-hidden max-w-md mx-auto shadow-2xl transition-colors duration-300 border-x border-white/5">
            <style>{`.no-scrollbar::-webkit-scrollbar {
                display: none;
            }
            .no-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
            }
            `}</style>

            {/* Header */}
            <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-200 dark:border-white/10 shrink-0">
                <div className="flex items-center p-4 justify-between">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center justify-center rounded-full h-10 w-10 bg-transparent text-gray-900 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors mr-2"
                    >
                        <span className="material-symbols-outlined">arrow_back</span>
                    </button>
                    <h2 className="text-xl font-bold leading-tight tracking-tight flex-1">Awards & Recognition</h2>
                    <div className="w-10"></div> {/* Spacer for alignment */}
                </div>

                {/* Tabs */}
                <div className="flex px-4 border-b border-gray-200 dark:border-white/5">
                    <button
                        onClick={() => setActiveTab('upcoming')}
                        className={`flex-1 py-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'upcoming' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                    >
                        Upcoming
                    </button>
                    <button
                        onClick={() => setActiveTab('earned')}
                        className={`flex-1 py-3 text-sm font-semibold border-b-2 transition-colors ${activeTab === 'earned' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'}`}
                    >
                        My Awards
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-4 relative z-10 w-full">
                {activeTab === 'upcoming' ? (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">Next Events</h3>
                            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded font-bold">3 Active</span>
                        </div>

                        {upcomingAwards.map(award => (
                            <div key={award.id} className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/5 rounded-xl p-5 shadow-sm relative overflow-hidden group">
                                <div className="flex items-start justify-between gap-4 relative z-10">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{award.date}</span>
                                            {award.progress > 80 && <span className="text-[10px] font-bold bg-orange-500/10 text-orange-500 px-1.5 rounded uppercase">Hot</span>}
                                        </div>
                                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary transition-colors">{award.title}</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{award.criteria}</p>

                                        {/* Progress Bar */}
                                        <div className="w-full h-2 bg-gray-100 dark:bg-white/5 rounded-full mb-2 overflow-hidden">
                                            <div className="h-full bg-primary rounded-full" style={{ width: `${award.progress}%` }}></div>
                                        </div>
                                        <div className="flex justify-between text-xs">
                                            <span className="font-medium text-gray-500">Progress</span>
                                            <span className="font-bold text-primary">{award.progress}%</span>
                                        </div>
                                    </div>
                                    <div className={`shrink-0 w-12 h-12 rounded-xl ${award.bg} ${award.color} flex items-center justify-center`}>
                                        <span className="material-symbols-outlined text-2xl">{award.icon}</span>
                                    </div>
                                </div>
                                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-white/5 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-yellow-500 text-sm">emoji_events</span>
                                    <span className="text-xs font-semibold text-gray-700 dark:text-gray-200">Reward: {award.reward}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-3">
                        {earnedAwards.map(award => (
                            <div key={award.id} className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-white/5 rounded-xl p-4 flex flex-col items-center text-center shadow-sm hover:border-primary/30 transition-all cursor-pointer">
                                <div className={`w-14 h-14 rounded-full ${award.bg} ${award.color} flex items-center justify-center mb-3`}>
                                    <span className="material-symbols-outlined text-3xl">{award.icon}</span>
                                </div>
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1">{award.title}</h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{award.date}</p>
                                <p className="text-xs text-gray-600 dark:text-gray-300 leading-tight">{award.desc}</p>
                            </div>
                        ))}
                        {/* Placeholder for empty slots */}
                        <div className="border border-dashed border-gray-300 dark:border-white/10 rounded-xl p-4 flex flex-col items-center justify-center text-center h-40 opacity-50">
                            <span className="material-symbols-outlined text-3xl text-gray-400 mb-2">lock</span>
                            <span className="text-xs text-gray-400 font-medium">Locked</span>
                        </div>
                        <div className="border border-dashed border-gray-300 dark:border-white/10 rounded-xl p-4 flex flex-col items-center justify-center text-center h-40 opacity-50">
                            <span className="material-symbols-outlined text-3xl text-gray-400 mb-2">lock</span>
                            <span className="text-xs text-gray-400 font-medium">Locked</span>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};
