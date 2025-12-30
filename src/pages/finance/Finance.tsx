import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameState } from '../../hooks/useGameState';
import { supabase } from '../../lib/supabase';

export const Finance = () => {
    const navigate = useNavigate();
    const { company, gameState } = useGameState();
    const [finances, setFinances] = useState({
        cash: 0,
        mrr: 0,
        burnRate: 85000,
        netProfit: 35000
    });

    useEffect(() => {
        if (company && gameState) {
            setFinances({
                cash: Number(company.cash) || 0,
                mrr: Number(gameState.mrr) || 0,
                burnRate: 85000, // Placeholder or calculate if expenses table exists
                netProfit: Number(gameState.mrr) - 85000 // Simple calc
            });
        }
    }, [company, gameState]);

    const formatCurrency = (val: number) => {
        if (val >= 1000000) return `$${(val / 1000000).toFixed(1)}M`;
        if (val >= 1000) return `$${(val / 1000).toFixed(0)}k`;
        return `$${val}`;
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white overflow-x-hidden min-h-screen relative pb-20">
            <style>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>

            {/* Top App Bar */}
            <div className="md:hidden sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-black/5 dark:border-white/5 p-4 flex items-center justify-between">
                <button
                    onClick={() => navigate(-1)}
                    className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-900 dark:text-white pb-1"
                >
                    <span className="material-symbols-outlined">arrow_back_ios_new</span>
                </button>
                <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">Financial Overview</h2>
            </div>

            {/* Main Content */}
            <div className="flex flex-col w-full max-w-md md:max-w-full mx-auto">
                {/* Hero Section: Balance & Date */}
                <div className="flex flex-col items-center justify-center pt-6 pb-2 px-4 relative">
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">Total Cash Balance</p>
                    <h1 className="text-slate-900 dark:text-white tracking-tighter text-[40px] font-bold leading-none">
                        {company ? formatCurrency(Number(company.cash)) : '...'}
                    </h1>
                    <div className="flex items-center gap-1 mt-2 px-3 py-1 rounded-full bg-slate-200 dark:bg-surface-dark border border-slate-300 dark:border-white/10">
                        <span className="material-symbols-outlined text-base text-primary">calendar_today</span>
                        <p className="text-slate-600 dark:text-slate-300 text-xs font-semibold">
                            W{((gameState?.current_week || 1) - 1) % 48 + 1}, Y{Math.ceil((gameState?.current_week || 1) / 48)}
                        </p>
                    </div>
                </div>

                {/* Runway Progress */}
                <div className="px-4 py-4 w-full">
                    <div className="bg-white dark:bg-surface-dark p-4 rounded-xl shadow-sm border border-slate-200 dark:border-white/5">
                        <div className="flex justify-between items-end mb-2">
                            <div className="flex flex-col">
                                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Runway</span>
                                <span className="text-lg font-bold text-slate-900 dark:text-white">
                                    {finances.burnRate > 0 ? Math.floor(finances.cash / finances.burnRate) : '∞'} Months
                                </span>
                            </div>
                            <span className="text-xs font-medium text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">Safe Zone</span>
                        </div>
                        <div className="h-3 w-full bg-slate-100 dark:bg-black/40 rounded-full overflow-hidden">
                            <div className="h-full bg-primary rounded-full relative" style={{ width: '65%' }}>
                                <div className="absolute inset-0 bg-white/20 w-full h-full animate-pulse"></div>
                            </div>
                        </div>
                        <p className="text-slate-400 dark:text-slate-500 text-xs mt-2 text-right">Based on current burn rate of {formatCurrency(finances.burnRate)}/mo</p>
                    </div>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 px-4 mb-6">
                    {/* MRR */}
                    <div className="flex flex-col gap-1 p-4 rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/5 shadow-sm">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="size-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                                <span className="material-symbols-outlined text-blue-500 text-lg">trending_up</span>
                            </div>
                            <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase">MRR</span>
                        </div>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{formatCurrency(finances.mrr)}</p>
                        <p className="text-emerald-500 text-xs font-medium flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-sm">arrow_upward</span> 5.2%
                        </p>
                    </div>
                    {/* Burn Rate */}
                    <div className="flex flex-col gap-1 p-4 rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/5 shadow-sm">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="size-8 rounded-full bg-rose-500/20 flex items-center justify-center">
                                <span className="material-symbols-outlined text-rose-500 text-lg">local_fire_department</span>
                            </div>
                            <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase">Burn Rate</span>
                        </div>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{formatCurrency(finances.burnRate)}</p>
                        <p className="text-rose-500 text-xs font-medium flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-sm">arrow_upward</span> 1.1%
                        </p>
                    </div>
                    {/* Net Profit */}
                    <div className="flex flex-col gap-1 p-4 rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/5 shadow-sm">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="size-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                <span className="material-symbols-outlined text-emerald-500 text-lg">savings</span>
                            </div>
                            <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase">Net Profit</span>
                        </div>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{finances.netProfit > 0 ? '+' : ''}{formatCurrency(finances.netProfit)}</p>
                        <p className="text-emerald-500 text-xs font-medium flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-sm">arrow_upward</span> 12%
                        </p>
                    </div>
                    {/* LTV */}
                    <div className="flex flex-col gap-1 p-4 rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/5 shadow-sm">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="size-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                                <span className="material-symbols-outlined text-purple-500 text-lg">group</span>
                            </div>
                            <span className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase">LTV</span>
                        </div>
                        <p className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">$850</p>
                        <p className="text-slate-400 dark:text-slate-500 text-xs font-medium flex items-center gap-0.5">
                            No change
                        </p>
                    </div>
                </div>

                {/* Cashflow Chart Visualization */}
                <div className="px-4 mb-8">
                    <div className="bg-white dark:bg-surface-dark p-5 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Cashflow History</h3>
                            <button className="text-xs text-primary font-medium hover:text-primary/80">View Report</button>
                        </div>
                        {/* Simulated Chart */}
                        <div className="flex items-end justify-between h-24 gap-2 w-full">
                            {/* Month 1 */}
                            <div className="flex flex-col items-center gap-2 w-full group">
                                <div className="w-full bg-slate-100 dark:bg-white/5 rounded-t-sm h-full flex items-end relative overflow-hidden">
                                    <div className="w-full bg-primary/40 h-[45%] rounded-t-sm group-hover:bg-primary/60 transition-all"></div>
                                </div>
                                <span className="text-[10px] text-slate-400 font-medium">May</span>
                            </div>
                            {/* Month 2 */}
                            <div className="flex flex-col items-center gap-2 w-full group">
                                <div className="w-full bg-slate-100 dark:bg-white/5 rounded-t-sm h-full flex items-end relative overflow-hidden">
                                    <div className="w-full bg-primary/50 h-[52%] rounded-t-sm group-hover:bg-primary/70 transition-all"></div>
                                </div>
                                <span className="text-[10px] text-slate-400 font-medium">Jun</span>
                            </div>
                            {/* Month 3 */}
                            <div className="flex flex-col items-center gap-2 w-full group">
                                <div className="w-full bg-slate-100 dark:bg-white/5 rounded-t-sm h-full flex items-end relative overflow-hidden">
                                    <div className="w-full bg-primary/60 h-[48%] rounded-t-sm group-hover:bg-primary/80 transition-all"></div>
                                </div>
                                <span className="text-[10px] text-slate-400 font-medium">Jul</span>
                            </div>
                            {/* Month 4 */}
                            <div className="flex flex-col items-center gap-2 w-full group">
                                <div className="w-full bg-slate-100 dark:bg-white/5 rounded-t-sm h-full flex items-end relative overflow-hidden">
                                    <div className="w-full bg-primary/70 h-[65%] rounded-t-sm group-hover:bg-primary/90 transition-all"></div>
                                </div>
                                <span className="text-[10px] text-slate-400 font-medium">Aug</span>
                            </div>
                            {/* Month 5 */}
                            <div className="flex flex-col items-center gap-2 w-full group">
                                <div className="w-full bg-slate-100 dark:bg-white/5 rounded-t-sm h-full flex items-end relative overflow-hidden">
                                    <div className="w-full bg-primary/80 h-[72%] rounded-t-sm group-hover:bg-primary transition-all"></div>
                                </div>
                                <span className="text-[10px] text-slate-400 font-medium">Sep</span>
                            </div>
                            {/* Month 6 */}
                            <div className="flex flex-col items-center gap-2 w-full group">
                                <div className="w-full bg-slate-100 dark:bg-white/5 rounded-t-sm h-full flex items-end relative overflow-hidden">
                                    <div className="w-full bg-primary h-[85%] rounded-t-sm shadow-[0_0_10px_rgba(109,19,236,0.5)]"></div>
                                </div>
                                <span className="text-[10px] text-white font-bold">Oct</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Strategy Actions List */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                    {/* Group: Income Strategy */}
                    <div className="flex flex-col gap-3">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-500 ml-1">Income Strategy</h4>
                        <div className="flex flex-col rounded-xl overflow-hidden bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/5 divide-y divide-slate-100 dark:divide-white/5">
                            <button
                                onClick={() => navigate('/product/pricing')}
                                className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-lg bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                        <span className="material-symbols-outlined">sell</span>
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-semibold text-slate-900 dark:text-white">Pricing Models</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Manage tiers & subscriptions</p>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 group-hover:text-primary transition-colors">chevron_right</span>
                            </button>
                        </div>
                    </div>

                    {/* Group: Capital & Equity */}
                    <div className="flex flex-col gap-3">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-500 ml-1">Capital & Equity</h4>
                        <div className="flex flex-col rounded-xl overflow-hidden bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/5 divide-y divide-slate-100 dark:divide-white/5">
                            <button className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-lg bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center text-primary dark:text-purple-400">
                                        <span className="material-symbols-outlined">rocket_launch</span>
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-semibold text-slate-900 dark:text-white">Funding Rounds</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Raise Series A</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-white/10 text-[10px] font-medium text-slate-500 dark:text-slate-400 rounded-full">Coming Soon</span>
                                    <span className="material-symbols-outlined text-slate-300 dark:text-slate-600">chevron_right</span>
                                </div>
                            </button>
                            <button
                                onClick={() => navigate('/finance/valuation')}
                                className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-lg bg-amber-100 dark:bg-amber-500/20 flex items-center justify-center text-amber-600 dark:text-amber-400">
                                        <span className="material-symbols-outlined">pie_chart</span>
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-semibold text-slate-900 dark:text-white">Valuation & Cap Table</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Current Value: $12M</p>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 group-hover:text-primary transition-colors">chevron_right</span>
                            </button>
                            <button
                                onClick={() => navigate('/finance/investors')}
                                className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-lg bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                                        <span className="material-symbols-outlined">handshake</span>
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-semibold text-slate-900 dark:text-white">Investor Relations</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Update stakeholders</p>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 group-hover:text-primary transition-colors">chevron_right</span>
                            </button>
                        </div>
                    </div>

                    {/* Group: Liabilities */}
                    <div className="flex flex-col gap-3">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-500 ml-1">Liabilities & Risks</h4>
                        <div className="flex flex-col rounded-xl overflow-hidden bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/5 divide-y divide-slate-100 dark:divide-white/5">
                            <button
                                onClick={() => navigate('/finance/bank')}
                                className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-lg bg-teal-100 dark:bg-teal-500/20 flex items-center justify-center text-teal-600 dark:text-teal-400">
                                        <span className="material-symbols-outlined">account_balance</span>
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-semibold text-slate-900 dark:text-white">Bank Loans</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">View available credit</p>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 group-hover:text-primary transition-colors">chevron_right</span>
                            </button>
                            <button
                                onClick={() => navigate('/finance/cutbacks')}
                                className="flex items-center justify-between p-4 hover:bg-red-50 dark:hover:bg-red-500/5 transition-colors group border-l-4 border-transparent hover:border-red-500"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-lg bg-red-100 dark:bg-red-500/20 flex items-center justify-center text-red-600 dark:text-red-400">
                                        <span className="material-symbols-outlined">emergency</span>
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-semibold text-red-600 dark:text-red-400 group-hover:text-red-700 dark:group-hover:text-red-300 transition-colors">Emergency Cutbacks</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">Layoffs & Downsizing</p>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 group-hover:text-red-500 transition-colors">chevron_right</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
