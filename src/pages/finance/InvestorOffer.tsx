
import { useNavigate } from 'react-router-dom';

export const InvestorOffer = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-gray-900 dark:text-white h-[100dvh] flex flex-col relative overflow-hidden transition-colors duration-300 w-full max-w-md mx-auto border-x border-white/5 shadow-2xl">
            <style>{`.no-scrollbar::-webkit-scrollbar {
                display: none;
            }
            .no-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
            }
            .glass-panel {
                background-color: rgba(255, 255, 255, 0.6);
                backdrop-filter: blur(12px);
                border: 1px solid rgba(255, 255, 255, 0.2);
            }
            .dark .glass-panel {
                background-color: rgba(37, 27, 48, 0.8);
                border: 1px solid rgba(255, 255, 255, 0.05);
            }
            `}</style>

            <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-green-500/5 rounded-full blur-[100px] pointer-events-none"></div>

            <header className="flex w-full items-center justify-between px-6 py-4 z-20 shrink-0">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                    <span className="material-symbols-outlined text-gray-600 dark:text-gray-300">arrow_back</span>
                </button>
                <div className="flex flex-col items-center">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Negotiation</span>
                    <span className="text-sm font-bold text-gray-900 dark:text-white">Titan Capital</span>
                </div>
                <button className="flex items-center justify-center h-10 w-10 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                    <span className="material-symbols-outlined text-gray-600 dark:text-gray-300">info</span>
                </button>
            </header>

            <main className="flex-1 flex flex-col w-full px-6 pt-2 pb-6 relative z-10 overflow-y-auto no-scrollbar overscroll-contain">
                <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                        <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center border border-white/10 shadow-lg">
                            <span className="text-2xl font-bold text-white">TC</span>
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-2 border-[#181022] flex items-center justify-center">
                            <span className="material-symbols-outlined text-white text-[12px]">check</span>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold leading-tight">Investment Offer</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Received 2m ago via Chat</p>
                    </div>
                </div>

                <div className="w-full glass-panel rounded-2xl p-1 shadow-xl mb-6 relative overflow-hidden group">
                    <div className="h-1.5 w-full bg-gradient-to-r from-primary via-purple-400 to-primary rounded-t-xl"></div>
                    <div className="p-5 flex flex-col gap-6 bg-white/50 dark:bg-[#1f1629]/50 rounded-xl backdrop-blur-sm">
                        <div className="text-center py-2">
                            <span className="block text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Investment Amount</span>
                            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 tracking-tight">
                                $750,000
                            </h1>
                        </div>
                        <div className="h-px w-full bg-gray-200 dark:bg-white/10"></div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/60 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/5 flex flex-col items-center justify-center text-center">
                                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">Equity Stake</span>
                                <span className="text-2xl font-bold text-primary">15%</span>
                                <span className="text-[10px] text-gray-400 mt-1">Dilution</span>
                            </div>
                            <div className="bg-white/60 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/5 flex flex-col items-center justify-center text-center">
                                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">Pre-Money Valuation</span>
                                <span className="text-2xl font-bold text-white">$4.25M</span>
                                <span className="text-[10px] text-gray-400 mt-1">Based on terms</span>
                            </div>
                        </div>
                        <div className="space-y-3">
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider pl-1">Conditions & Terms</span>
                            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-[#251b30] border border-gray-100 dark:border-white/5">
                                <span className="material-symbols-outlined text-primary text-xl mt-0.5">chair</span>
                                <div>
                                    <p className="text-sm font-bold text-gray-800 dark:text-gray-200">Board Seat</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Investor requires 1 voting seat on the Board of Directors.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-[#251b30] border border-gray-100 dark:border-white/5">
                                <span className="material-symbols-outlined text-primary text-xl mt-0.5">lock_clock</span>
                                <div>
                                    <p className="text-sm font-bold text-gray-800 dark:text-gray-200">4-Year Vesting</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">Standard founder vesting with a 1-year cliff period.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-3 items-start bg-blue-500/10 border border-blue-500/20 p-3 rounded-lg mb-6">
                    <span className="material-symbols-outlined text-blue-400 text-lg mt-0.5">lightbulb</span>
                    <p className="text-xs text-blue-200 leading-relaxed">
                        <span className="font-bold text-blue-300">Advisor Tip:</span> The valuation is slightly below market average for your niche, but the board member has high expertise in AI tech.
                    </p>
                </div>
            </main>

            <footer className="w-full px-6 pb-8 pt-2 z-20 flex flex-col gap-3 shrink-0 bg-background-light dark:bg-background-dark/95 backdrop-blur-sm border-t border-white/5">
                <button className="w-full h-14 bg-primary hover:bg-primary/90 active:scale-[0.98] rounded-xl flex items-center justify-between px-6 transition-all shadow-lg shadow-primary/25 group border-t border-white/10">
                    <span className="font-bold text-white text-lg">Accept Offer</span>
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                        <span className="material-symbols-outlined text-white text-lg">check</span>
                    </div>
                </button>
                <div className="grid grid-cols-2 gap-3">
                    <button className="h-12 bg-white/5 hover:bg-white/10 active:scale-[0.98] border border-white/10 rounded-xl flex items-center justify-center gap-2 transition-all">
                        <span className="material-symbols-outlined text-gray-400 text-lg">chat</span>
                        <span className="font-medium text-white text-sm">Counter-Offer</span>
                    </button>
                    <button className="h-12 bg-red-500/10 hover:bg-red-500/20 active:scale-[0.98] border border-red-500/20 rounded-xl flex items-center justify-center gap-2 transition-all group">
                        <span className="material-symbols-outlined text-red-400 text-lg group-hover:text-red-300 transition-colors">close</span>
                        <span className="font-medium text-red-400 text-sm group-hover:text-red-300 transition-colors">Reject</span>
                    </button>
                </div>
            </footer>
        </div>
    );
};
