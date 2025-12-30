import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameState } from '../../hooks/useGameState';
import { supabase } from '../../lib/supabase';

export const MarketInsights = () => {
    const navigate = useNavigate();
    const { company } = useGameState();
    const [startups, setStartups] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (company?.id) {
            fetchMarketData();
        }
    }, [company?.id]);

    const fetchMarketData = async () => {
        try {
            setLoading(true);
            // Fetch AI competitors
            const { data: competitors } = await supabase
                .from('competitors')
                .select('*')
                .eq('company_id', company!.id)
                .eq('is_active', true)
                .order('valuation', { ascending: false });

            // Create user's entry
            const userStartup = {
                id: 'user',
                name: company!.name,
                niche: company!.niche,
                valuation: Number(company!.cash) * 10, // Simple valuation formula for now
                is_user: true,
                change: 5.4 // Simulated
            };

            // Combine and Sort
            const all = [...(competitors || []), userStartup];
            all.sort((a, b) => b.valuation - a.valuation);

            setStartups(all);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const formatValuation = (val: number) => {
        if (val >= 1000000000) return `$${(val / 1000000000).toFixed(1)}B`;
        if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
        return `$${(val / 1000).toFixed(0)}k`;
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display antialiased h-[100dvh] flex flex-col relative overflow-hidden text-slate-900 dark:text-white w-full max-w-md md:max-w-full mx-auto border-x border-white/5 shadow-2xl transition-colors duration-300">
            <style>{`.hide-scrollbar::-webkit-scrollbar {
                display: none;
            }
            .hide-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
            }
            `}</style>

            {/* TopAppBar */}
            <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between border-b border-gray-200 dark:border-gray-800 shrink-0 z-20">
                <button
                    onClick={() => navigate(-1)}
                    className="flex size-12 shrink-0 items-center justify-center cursor-pointer rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                >
                    <span className="material-symbols-outlined text-slate-900 dark:text-white">arrow_back</span>
                </button>
                <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center">Global Market Watch</h2>
                <div className="flex w-12 items-center justify-end">
                    <button className="flex size-12 cursor-pointer items-center justify-center overflow-hidden rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-slate-900 dark:text-white">search</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto hide-scrollbar relative z-10 w-full pb-24">
                {/* HeadlineText: Market Pulse */}
                <div className="pt-6 px-4 flex justify-between items-end">
                    <div>
                        <h3 className="text-slate-900 dark:text-white tracking-tight text-2xl font-bold leading-tight">Market Pulse</h3>
                        <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">Daily briefing • Global 10</p>
                    </div>
                </div>

                <div className="h-4 bg-transparent"></div>

                {/* SectionHeader: The Global 10 */}
                <div className="flex items-center justify-between px-4 pb-2">
                    <h3 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight">The Global 10</h3>
                    <span className="text-xs font-medium text-slate-400 dark:text-gray-500 bg-slate-100 dark:bg-white/5 px-2 py-1 rounded">Live Updates</span>
                </div>

                {/* Rankings List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 pt-4 gap-3">
                    {/* Header Row */}
                    <div className="flex px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="w-10 text-center">#</div>
                        <div className="flex-1 pl-4">Company</div>
                        <div className="text-right">Valuation</div>
                    </div>

                    {loading ? (
                        <p className="text-center p-4 text-gray-500">Analysing market data...</p>
                    ) : (
                        startups.slice(0, 10).map((startup, index) => {
                            const isUser = startup.is_user;
                            const isDirect = startup.is_direct_competitor;
                            
                            let cardClass = "group relative flex items-center p-3 rounded-xl border shadow-sm transition-all ";
                            if (isUser) {
                                cardClass += "bg-[#1a2333] border-primary ring-1 ring-primary/50 shadow-lg";
                            } else {
                                cardClass += "bg-white dark:bg-card-dark border-gray-100 dark:border-card-border hover:border-primary/50";
                            }

                            return (
                                <div key={startup.id || index} className={cardClass}>
                                    {isUser && <div className="absolute inset-0 bg-primary/20 blur-md rounded-xl -z-10"></div>}
                                    {index === 0 && <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-yellow-400 rounded-r-full"></div>}
                                    
                                    <div className="w-10 flex shrink-0 items-center justify-center flex-col">
                                        {index === 0 ? (
                                            <span className="material-symbols-outlined text-yellow-500 text-xl">trophy</span>
                                        ) : (
                                            <span className={`font-bold text-lg ${isUser ? 'text-white' : 'text-gray-400 dark:text-gray-500'}`}>{index + 1}</span>
                                        )}
                                    </div>

                                    <div className={`ml-2 size-10 rounded-lg flex items-center justify-center shrink-0 shadow-inner ${isUser ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-white/5'}`}>
                                        {isUser ? (
                                             <span className="material-symbols-outlined">rocket_launch</span>
                                        ) : (
                                             <span className="text-lg font-bold text-gray-400">{startup.name.substring(0, 1)}</span>
                                        )}
                                    </div>

                                    <div className="flex-1 min-w-0 ml-3">
                                        <div className="flex items-center gap-2">
                                            <p className={`font-bold truncate ${isUser ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{startup.name}</p>
                                            {isUser && <span className="bg-primary/30 text-primary-100 text-[10px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider border border-primary/20">You</span>}
                                            {isDirect && !isUser && <span className="bg-red-500/10 text-red-500 text-[10px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider border border-red-500/20">Rival</span>}
                                        </div>
                                        <p className={`text-xs truncate ${isUser ? 'text-primary/60' : 'text-slate-500 dark:text-gray-400'}`}>{startup.niche}</p>
                                    </div>

                                    <div className="text-right ml-2">
                                        <p className={`font-bold tracking-tight ${isUser ? 'text-white' : 'text-slate-900 dark:text-white'}`}>{formatValuation(startup.valuation)}</p>
                                        <div className="flex items-center justify-end gap-0.5 text-xs font-medium text-green-500">
                                            <span className="material-symbols-outlined text-[16px] leading-none">arrow_drop_up</span>
                                            <span>{Math.floor(Math.random() * 5)}%</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </main>
        </div>
    );
};
