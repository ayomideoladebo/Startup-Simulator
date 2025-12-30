import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const EmergencyCutbacks = () => {
    const navigate = useNavigate();

    // State for interactive elements
    const [layoffLevel, setLayoffLevel] = useState<'none' | 'freeze' | 'trim' | 'deep'>('none');
    const [marketingBudget, setMarketingBudget] = useState(75); // 0-100 scale representing %
    const [pauseRD, setPauseRD] = useState(true);
    const [liquidateServers, setLiquidateServers] = useState(false);
    const [subleaseOffice, setSubleaseOffice] = useState(false);

    // Constants & Calculations
    const BASE_BURN = 85000;
    const BASE_RUNWAY = 3; // Months
    const CURRENT_CASH = 255000; // Example cash derived from burn * runway

    // Calculation Logic
    const getLayoffSavings = () => {
        switch (layoffLevel) {
            case 'freeze': return 5000;
            case 'trim': return 22500;
            case 'deep': return 55000;
            default: return 0;
        }
    };

    const getMarketingSavings = () => {
        // Savings = Max Budget - Current Setting
        // New Budget is (marketingBudget / 100) * 20000
        return 20000 * (1 - (marketingBudget / 100));
    };

    const getRDSavings = () => pauseRD ? 15000 : 0;
    const getAssetLiquidation = () => (liquidateServers ? 12000 : 0) + (subleaseOffice ? 8000 : 0);

    const monthlySavings = getLayoffSavings() + getMarketingSavings() + getRDSavings();
    const oneTimeCash = getAssetLiquidation();

    const newBurn = BASE_BURN - monthlySavings;
    const newCash = CURRENT_CASH + oneTimeCash;
    const newRunway = newCash / newBurn;
    const runwayExtension = newRunway - BASE_RUNWAY;

    // derived for UI
    const marketingSpend = Math.round((marketingBudget / 100) * 20000);

    return (
        <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white overflow-x-hidden min-h-screen relative pb-28">
            <style>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                input[type=range]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: #ef4444;
                    cursor: pointer;
                    margin-top: -8px; 
                    box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.2);
                }
                input[type=range]::-webkit-slider-runnable-track {
                    width: 100%;
                    height: 4px;
                    cursor: pointer;
                    background: #cbd5e1;
                    border-radius: 2px;
                }
                .dark input[type=range]::-webkit-slider-runnable-track {
                    background: #334155;
                }
            `}</style>

            {/* Top Header */}
            <div className="sticky top-0 z-50 bg-white/90 dark:bg-surface-dark/90 backdrop-blur-md border-b border-red-100 dark:border-red-900/30 p-4 flex items-center justify-between">
                <button
                    onClick={() => navigate(-1)}
                    className="flex size-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors text-slate-900 dark:text-white"
                >
                    <span className="material-symbols-outlined">arrow_back_ios_new</span>
                </button>
                <div className="flex flex-col items-center">
                    <h2 className="text-lg font-bold leading-tight tracking-tight text-red-600 dark:text-red-500">Emergency Cutbacks</h2>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400">Survival Mode</span>
                </div>
                <div className="size-10 flex items-center justify-center text-red-500">
                    <span className="material-symbols-outlined animate-pulse">warning</span>
                </div>
            </div>

            <div className="flex flex-col w-full max-w-md md:max-w-full mx-auto">

                {/* Impact Card */}
                <div className="p-4">
                    <div className="bg-gradient-to-br from-red-600 to-red-800 dark:from-red-900 dark:to-surface-dark p-5 rounded-2xl shadow-lg shadow-red-500/20 text-white relative overflow-hidden">
                        <div className="absolute -right-6 -top-6 size-32 bg-white/10 rounded-full blur-2xl"></div>
                        <div className="relative z-10 flex justify-between items-start mb-4">
                            <div>
                                <p className="text-red-100 text-xs font-semibold uppercase tracking-wider mb-1">Projected Savings</p>
                                <h1 className="text-3xl font-bold tracking-tight">+${Math.round(monthlySavings).toLocaleString()}<span className="text-lg font-medium opacity-80">/mo</span></h1>
                                {oneTimeCash > 0 && <p className="text-xs text-red-200 mt-1">+${oneTimeCash.toLocaleString()} One-time</p>}
                            </div>
                            <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg border border-white/20">
                                <span className="text-xs font-bold text-white flex items-center gap-1">
                                    <span className="material-symbols-outlined text-sm">timelapse</span>
                                    +{runwayExtension.toFixed(1)} Months
                                </span>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-xs font-medium text-red-100/80">
                                <span>Current Runway: {BASE_RUNWAY} Mo</span>
                                <span className="text-white">New Runway: {newRunway.toFixed(1)} Mo</span>
                            </div>
                            <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden flex">
                                <div className="h-full bg-white/40" style={{ width: '30%' }}></div>
                                <div className="h-full bg-green-400 animate-pulse relative" style={{ width: `${(runwayExtension / 12) * 100}%` }}>
                                    <div className="absolute inset-0 bg-white/30 w-full h-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Layoffs Section */}
                <div className="px-4 mb-4">
                    <div className="bg-white dark:bg-surface-dark rounded-xl border border-red-100 dark:border-red-900/30 overflow-hidden shadow-sm">
                        <div className="p-4 border-b border-slate-100 dark:border-white/5 bg-red-50/50 dark:bg-red-900/10 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-red-500">group_remove</span>
                                <h3 className="font-bold text-slate-900 dark:text-white">Initiate Layoffs</h3>
                            </div>
                            <span className="text-xs font-bold text-red-500 px-2 py-0.5 bg-red-100 dark:bg-red-500/20 rounded">High Impact</span>
                        </div>
                        <div className="p-5 flex flex-col gap-4">
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-snug">
                                Reducing headcount is the fastest way to extend runway, but will severely damage morale and productivity.
                            </p>
                            <div className="grid grid-cols-3 gap-2">
                                <button
                                    onClick={() => setLayoffLevel(layoffLevel === 'freeze' ? 'none' : 'freeze')}
                                    className={`py-2 px-1 text-xs font-medium rounded-lg border transition-all ${layoffLevel === 'freeze' ? 'bg-slate-200 dark:bg-white/20 border-slate-400 text-slate-900 dark:text-white font-bold' : 'border-slate-200 dark:border-white/10 text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5'}`}
                                >
                                    Freeze Hiring
                                </button>
                                <button
                                    onClick={() => setLayoffLevel(layoffLevel === 'trim' ? 'none' : 'trim')}
                                    className={`py-2 px-1 text-xs font-bold rounded-lg transition-all ${layoffLevel === 'trim' ? 'bg-red-500 text-white shadow-md shadow-red-500/20 ring-2 ring-red-500 ring-offset-2 dark:ring-offset-surface-dark' : 'border border-slate-200 dark:border-white/10 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20'}`}
                                >
                                    Trim (15%)
                                </button>
                                <button
                                    onClick={() => setLayoffLevel(layoffLevel === 'deep' ? 'none' : 'deep')}
                                    className={`py-2 px-1 text-xs font-medium rounded-lg border transition-all ${layoffLevel === 'deep' ? 'bg-red-700 text-white shadow-md shadow-red-700/20 ring-2 ring-red-700 ring-offset-2 dark:ring-offset-surface-dark font-bold' : 'border-slate-200 dark:border-white/10 text-red-700 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20'}`}
                                >
                                    Deep Cut (40%)
                                </button>
                            </div>
                            {layoffLevel !== 'none' && (
                                <div className="grid grid-cols-2 gap-3 mt-1">
                                    <div className="bg-emerald-50 dark:bg-emerald-500/10 p-3 rounded-lg border border-emerald-100 dark:border-emerald-500/20">
                                        <span className="text-[10px] uppercase font-bold text-emerald-600 dark:text-emerald-400">Savings</span>
                                        <p className="text-lg font-bold text-emerald-700 dark:text-emerald-300">+${(getLayoffSavings() / 1000).toFixed(1)}k</p>
                                    </div>
                                    <div className="bg-red-50 dark:bg-red-500/10 p-3 rounded-lg border border-red-100 dark:border-red-500/20">
                                        <span className="text-[10px] uppercase font-bold text-red-600 dark:text-red-400">Morale Impact</span>
                                        <div className="flex items-center gap-1 text-red-700 dark:text-red-300">
                                            <span className="material-symbols-outlined text-base">sentiment_very_dissatisfied</span>
                                            <span className="text-lg font-bold">-{layoffLevel === 'freeze' ? '10' : (layoffLevel === 'trim' ? '25' : '60')}%</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {layoffLevel === 'deep' && (
                                <div className="flex items-start gap-2 text-xs text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/10 p-2.5 rounded-lg">
                                    <span className="material-symbols-outlined text-sm mt-0.5">warning</span>
                                    <p><span className="font-bold">Risk:</span> 40% chance of key engineer resignation due to panic.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Other Cuts */}
                <div className="px-4 mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Marketing Budget */}
                    <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-white/5 overflow-hidden shadow-sm h-full flex flex-col">
                        <div className="p-4 border-b border-slate-100 dark:border-white/5 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <div className="size-8 rounded bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                    <span className="material-symbols-outlined text-lg">campaign</span>
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">Marketing Budget</h3>
                                    <p className="text-[10px] text-slate-500">User acquisition cost</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-xs font-bold">
                                <span>+${(getMarketingSavings() / 1000).toFixed(1)}k</span>
                            </div>
                        </div>
                        <div className="p-4 flex-1 flex flex-col justify-center">
                            <div className="flex justify-between text-xs text-slate-500 mb-2">
                                <span>Conservative</span>
                                <span className={marketingBudget < 30 ? "font-bold text-red-500" : ""}>Drastic Cut</span>
                            </div>
                            <input
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 mb-3 accent-red-500"
                                max="100"
                                min="0"
                                type="range"
                                value={marketingBudget}
                                onChange={(e) => setMarketingBudget(Number(e.target.value))}
                            />
                            <p className="text-xs text-slate-400 text-center">New Budget: <span className="text-slate-900 dark:text-white font-semibold">${(marketingSpend / 1000).toFixed(1)}k/mo</span> (Was $20k)</p>
                            {marketingBudget < 25 && <p className="text-[10px] text-red-500 mt-2 text-center font-medium">Warning: Growth rate will drop to near zero.</p>}
                        </div>
                    </div>

                    {/* Pause R&D */}
                    <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-white/5 overflow-hidden shadow-sm flex flex-row md:flex-col items-center md:items-stretch justify-between p-4 h-full">
                        <div className="flex md:flex-col items-center md:items-start gap-3 md:gap-4 md:mb-4">
                            <div className="size-8 rounded bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                                <span className="material-symbols-outlined text-lg">science</span>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Pause R&D</h3>
                                <p className="text-[10px] text-slate-500">Halts feature development</p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer md:mt-auto md:w-full md:justify-end">
                            <input
                                type="checkbox"
                                checked={pauseRD}
                                onChange={(e) => setPauseRD(e.target.checked)}
                                className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-500"></div>
                        </label>
                    </div>

                    {/* Liquidate Assets */}
                    <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-white/5 overflow-hidden shadow-sm h-full flex flex-col">
                        <div className="p-3 bg-slate-50 dark:bg-white/5 border-b border-slate-100 dark:border-white/5 flex justify-between items-center">
                            <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500">Liquidate Assets</h3>
                            <span className="text-[10px] text-slate-400">One-time cash</span>
                        </div>
                        <div className="divide-y divide-slate-100 dark:divide-white/5 flex-1 flex flex-col justify-center">
                            <label className="flex items-center justify-between p-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={liquidateServers}
                                        onChange={(e) => setLiquidateServers(e.target.checked)}
                                        className="rounded border-slate-300 text-red-600 focus:ring-red-500 bg-transparent"
                                    />
                                    <span className="text-sm text-slate-700 dark:text-slate-300">Sell Unused Servers</span>
                                </div>
                                <span className="text-xs font-bold text-emerald-500">+$12,000</span>
                            </label>
                            <label className="flex items-center justify-between p-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5">
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={subleaseOffice}
                                        onChange={(e) => setSubleaseOffice(e.target.checked)}
                                        className="rounded border-slate-300 text-red-600 focus:ring-red-500 bg-transparent"
                                    />
                                    <span className="text-sm text-slate-700 dark:text-slate-300">Sublease Office Floor</span>
                                </div>
                                <span className="text-xs font-bold text-emerald-500">+$8,000</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Actions */}
            <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/80 dark:bg-background-dark/80 backdrop-blur-xl border-t border-slate-200 dark:border-white/10 max-w-md md:max-w-full mx-auto w-full">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between md:px-8">
                    <div className="flex justify-between items-center px-1 md:gap-4 md:justify-start">
                        <span className="text-xs text-slate-500 font-medium">Total Productivity Impact</span>
                        <span className="text-xs text-red-500 font-bold">-{pauseRD ? '15' : '0'}% Efficiency</span>
                    </div>
                    <button className="w-full md:w-auto md:px-8 bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-red-500/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
                        <span className="material-symbols-outlined">gavel</span>
                        Execute Cutbacks
                    </button>
                </div>
            </div>
        </div>
    );
};
