import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Pricing = () => {
    const navigate = useNavigate();

    // State
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
    const [proPrice, setProPrice] = useState(29);
    const [trialDays, setTrialDays] = useState(14);
    const [annualDiscount, setAnnualDiscount] = useState(20);

    // Derived values

    const PRO_USERS = 2840;
    const ENTERPRISE_USERS = 145;
    const ENTERPRISE_PRICE = 299;

    const projectedMRR = Math.round(
        (0 * 12405) + // Free users
        (proPrice * PRO_USERS) +
        (ENTERPRISE_PRICE * ENTERPRISE_USERS)
    );

    // Simulation of market response based on price point
    const getMarketResponse = (price: number) => {
        if (price < 25) return { text: "High Demand (Acquisition ++)", color: "text-emerald-600 dark:text-emerald-400", icon: "trending_up" };
        if (price < 35) return { text: "Market accepts this price point.", color: "text-emerald-600 dark:text-emerald-400", icon: "sentiment_satisfied" };
        if (price < 45) return { text: "Growth slowing (Churn Risk)", color: "text-orange-500", icon: "warning" };
        return { text: "Too Expensive (High Churn)", color: "text-red-500", icon: "error" };
    };

    const marketResponse = getMarketResponse(proPrice);

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
                input[type=range] {
                    -webkit-appearance: none; 
                    background: transparent; 
                }
                input[type=range]::-webkit-slider-thumb {
                    -webkit-appearance: none;
                    height: 20px;
                    width: 20px;
                    border-radius: 50%;
                    background: #6d13ec;
                    margin-top: -8px; 
                    box-shadow: 0 0 0 4px rgba(109, 19, 236, 0.2);
                    cursor: pointer;
                }
                input[type=range]::-webkit-slider-runnable-track {
                    width: 100%;
                    height: 4px;
                    cursor: pointer;
                    background: #e2e8f0;
                    border-radius: 2px;
                }
                .dark input[type=range]::-webkit-slider-runnable-track {
                    background: #334155;
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
                <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">Pricing Models</h2>
            </div>

            <div className="flex flex-col w-full max-w-md mx-auto">
                <div className="px-4 pt-6 pb-2">
                    <div className="flex flex-col gap-1">
                        <p className="text-slate-500 dark:text-slate-400 text-xs font-semibold uppercase tracking-wider">Projected MRR Impact</p>
                        <div className="flex items-end gap-3">
                            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">${projectedMRR.toLocaleString()}</h1>
                            <div className="flex items-center gap-1 mb-1.5 px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                <span className="material-symbols-outlined text-sm">arrow_upward</span>
                                <span className="text-xs font-bold">+10.4%</span>
                            </div>
                        </div>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Changes pending application. Simulating market response...</p>
                    </div>
                </div>

                {/* Billing Cycle Toggle */}
                <div className="px-4 py-4">
                    <div className="bg-slate-200 dark:bg-white/5 p-1 rounded-lg flex items-center relative cursor-pointer" onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}>
                        <div className={`w-1/2 flex items-center justify-center py-1.5 rounded-md shadow-sm z-10 transition-all duration-300 ${billingCycle === 'monthly' ? 'bg-white dark:bg-surface-dark text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300 opacity-60'}`}>
                            <span className="text-sm font-semibold">Monthly</span>
                        </div>
                        <div className={`w-1/2 flex items-center justify-center py-1.5 z-10 transition-all duration-300 ${billingCycle === 'annual' ? 'bg-white dark:bg-surface-dark text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-300 opacity-60'}`}>
                            <span className="text-sm font-medium">Annual</span>
                            <span className="ml-1.5 text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-1.5 rounded">-{annualDiscount}%</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4 px-4 mb-6">
                    {/* Starter Plan */}
                    <div className="bg-white dark:bg-surface-dark p-4 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm relative overflow-hidden group">
                        <div className="flex justify-between items-start">
                            <div className="flex items-start gap-3">
                                <div className="size-10 rounded-lg bg-slate-100 dark:bg-slate-700/50 flex items-center justify-center text-slate-500 dark:text-slate-400">
                                    <span className="material-symbols-outlined">person_outline</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white">Starter</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">User Acquisition Model</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-lg text-slate-900 dark:text-white">Free</p>
                                <p className="text-[10px] text-slate-400">12,405 Users</p>
                            </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-white/5 flex justify-between items-center">
                            <div className="flex -space-x-2">
                                <span className="inline-flex items-center justify-center size-6 rounded-full bg-slate-100 dark:bg-slate-700 text-[10px] text-slate-500 border border-white dark:border-surface-dark" title="Feature A">A</span>
                                <span className="inline-flex items-center justify-center size-6 rounded-full bg-slate-100 dark:bg-slate-700 text-[10px] text-slate-500 border border-white dark:border-surface-dark" title="Feature B">B</span>
                            </div>
                            <button className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors">Edit Plan</button>
                        </div>
                    </div>

                    {/* Pro Plan */}
                    <div className="bg-white dark:bg-surface-dark p-4 rounded-xl border-2 border-primary/50 shadow-lg shadow-primary/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg">
                            POPULAR
                        </div>
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-start gap-3">
                                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                    <span className="material-symbols-outlined">rocket_launch</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white">Pro</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Core Monetization</p>
                                </div>
                            </div>
                            <div className="text-right pr-2">
                                <p className="font-bold text-2xl text-primary">${billingCycle === 'annual' ? (proPrice * (1 - annualDiscount / 100)).toFixed(2) : proPrice}<span className="text-sm text-slate-400 font-normal">/mo</span></p>
                                <p className="text-[10px] text-slate-400">{PRO_USERS.toLocaleString()} Users</p>
                            </div>
                        </div>
                        <div className="mb-5 bg-background-light dark:bg-background-dark/50 p-3 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Base Price</label>
                                <span className="text-xs font-bold text-primary">${proPrice}.00</span>
                            </div>
                            <input
                                className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
                                max="49"
                                min="19"
                                type="range"
                                value={proPrice}
                                onChange={(e) => setProPrice(Number(e.target.value))}
                            />
                            <div className="flex justify-between mt-1">
                                <span className="text-[10px] text-slate-400">$19</span>
                                <span className="text-[10px] text-slate-400">$49</span>
                            </div>
                            <div className="mt-3 flex items-center gap-2">
                                <span className={`material-symbols-outlined text-sm ${marketResponse.color}`}>{marketResponse.icon}</span>
                                <p className={`text-xs font-medium ${marketResponse.color}`}>{marketResponse.text}</p>
                            </div>
                        </div>
                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-slate-600 dark:text-slate-300">Analytics Dashboard</span>
                                <div className="w-8 h-4 bg-primary rounded-full relative cursor-pointer">
                                    <div className="absolute right-0.5 top-0.5 size-3 bg-white rounded-full shadow-sm"></div>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-slate-600 dark:text-slate-300">API Access</span>
                                <div className="w-8 h-4 bg-slate-200 dark:bg-slate-700 rounded-full relative cursor-pointer">
                                    <div className="absolute left-0.5 top-0.5 size-3 bg-white dark:bg-slate-400 rounded-full shadow-sm"></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="bg-white dark:bg-surface-dark p-4 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm relative overflow-hidden group">
                        <div className="flex justify-between items-start">
                            <div className="flex items-start gap-3">
                                <div className="size-10 rounded-lg bg-amber-100 dark:bg-amber-500/10 flex items-center justify-center text-amber-600 dark:text-amber-500">
                                    <span className="material-symbols-outlined">apartment</span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900 dark:text-white">Enterprise</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">High LTV Clients</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-lg text-slate-900 dark:text-white">${ENTERPRISE_PRICE}<span className="text-sm text-slate-400 font-normal">/mo</span></p>
                                <p className="text-[10px] text-slate-400">{ENTERPRISE_USERS} Users</p>
                            </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-white/5 flex justify-end">
                            <button className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors">Edit Plan</button>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/product/pricing/new')}
                        className="w-full py-4 rounded-xl border-2 border-dashed border-slate-300 dark:border-white/10 flex items-center justify-center gap-2 text-slate-500 dark:text-slate-400 hover:border-primary hover:text-primary transition-colors bg-slate-50 dark:bg-white/5"
                    >
                        <span className="material-symbols-outlined">add_circle</span>
                        <span className="text-sm font-semibold">Create New Tier</span>
                    </button>
                </div>

                {/* Global Strategy */}
                <div className="px-4 mb-8">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-lg">tune</span>
                        Global Strategy
                    </h3>
                    <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-white/5 overflow-hidden divide-y divide-slate-100 dark:divide-white/5">
                        <div className="p-4 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-slate-900 dark:text-white">Free Trial</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Days before charging</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => setTrialDays(Math.max(0, trialDays - 1))} className="size-6 rounded bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-600 dark:text-white hover:bg-slate-200 dark:hover:bg-white/20">
                                    <span className="material-symbols-outlined text-sm">remove</span>
                                </button>
                                <span className="text-sm font-bold w-6 text-center text-slate-900 dark:text-white">{trialDays}</span>
                                <button onClick={() => setTrialDays(trialDays + 1)} className="size-6 rounded bg-slate-100 dark:bg-white/10 flex items-center justify-center text-slate-600 dark:text-white hover:bg-slate-200 dark:hover:bg-white/20">
                                    <span className="material-symbols-outlined text-sm">add</span>
                                </button>
                            </div>
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-center mb-2">
                                <div>
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Annual Discount</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Incentivize yearly subs</p>
                                </div>
                                <span className="text-sm font-bold text-primary">{annualDiscount}%</span>
                            </div>
                            <input
                                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700"
                                max="40"
                                min="0"
                                type="range"
                                value={annualDiscount}
                                onChange={(e) => setAnnualDiscount(Number(e.target.value))}
                            />
                        </div>
                        <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                            <div>
                                <p className="text-sm font-semibold text-slate-900 dark:text-white">Currency</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Global billing base</p>
                            </div>
                            <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                                <span className="text-xs font-medium">USD ($)</span>
                                <span className="material-symbols-outlined text-sm">chevron_right</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 w-full p-4 bg-gradient-to-t from-background-light dark:from-background-dark via-background-light dark:via-background-dark to-transparent pb-8">
                <div className="max-w-md mx-auto">
                    <button className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined">save</span>
                        Apply Pricing Strategy
                    </button>
                </div>
            </div>
        </div>
    );
};
