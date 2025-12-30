import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const CreateTier = () => {
    const navigate = useNavigate();

    // State
    const [tierName, setTierName] = useState('');
    const [monthlyPrice, setMonthlyPrice] = useState(49);
    const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
    const [userCapacity, setUserCapacity] = useState(1000);
    const [features, setFeatures] = useState({
        analytics: true,
        api: false,
        whiteLabel: false,
        backups: false
    });

    const toggleFeature = (key: keyof typeof features) => {
        setFeatures(prev => ({ ...prev, [key]: !prev[key] }));
    };

    // Calculate Estimated ARPU (simple simulation)
    const discount = billingCycle === 'annual' ? 0.8 : 1;
    const estArpu = (monthlyPrice * discount).toFixed(2);

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
                }input::-webkit-outer-spin-button,
                input::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
                input[type=number] {
                    -moz-appearance: textfield;
                }
            `}</style>
            <div className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-black/5 dark:border-white/5 p-4 flex items-center justify-between">
                <button
                    onClick={() => navigate(-1)}
                    className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-900 dark:text-white"
                >
                    <span className="material-symbols-outlined">arrow_back_ios_new</span>
                </button>
                <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">Create New Tier</h2>
            </div>

            <div className="flex flex-col w-full max-w-md mx-auto">
                {/* Tier Identity */}
                <div className="px-4 pt-6 pb-2">
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 pl-1">Tier Identity</label>
                    <div className="bg-white dark:bg-surface-dark p-4 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm">
                        <div className="flex gap-4 items-center">
                            <div className="size-14 rounded-xl bg-slate-100 dark:bg-white/5 flex items-center justify-center text-3xl cursor-pointer hover:bg-slate-200 dark:hover:bg-white/10 transition-colors border border-dashed border-slate-300 dark:border-white/20 text-slate-400 group relative">
                                <span className="material-symbols-outlined group-hover:text-primary transition-colors">diamond</span>
                                <div className="absolute -bottom-1 -right-1 size-5 bg-white dark:bg-surface-dark rounded-full border border-slate-200 dark:border-white/10 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-[10px] text-slate-500">edit</span>
                                </div>
                            </div>
                            <div className="flex-1">
                                <label className="text-xs text-slate-400 mb-1 block">Tier Name</label>
                                <input
                                    className="w-full bg-transparent border-b border-slate-200 dark:border-white/10 py-1 text-lg font-bold text-slate-900 dark:text-white focus:outline-none focus:border-primary transition-colors placeholder-slate-300 dark:placeholder-slate-600"
                                    placeholder="e.g. Enterprise Gold"
                                    type="text"
                                    value={tierName}
                                    onChange={(e) => setTierName(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Pricing Configuration */}
                <div className="px-4 py-4">
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 pl-1">Pricing Configuration</label>
                    <div className="bg-white dark:bg-surface-dark p-5 rounded-xl border-2 border-primary/50 shadow-lg shadow-primary/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg">
                            CUSTOM
                        </div>
                        <div className="flex flex-col items-center justify-center mb-6 mt-4">
                            <div className="flex items-start text-slate-900 dark:text-white relative">
                                <span className="text-3xl font-bold tracking-tighter mt-1">$</span>
                                <input
                                    className="bg-transparent text-6xl font-bold tracking-tighter w-40 text-center focus:outline-none border-none p-0 appearance-none m-0 text-slate-900 dark:text-white placeholder-slate-300"
                                    type="number"
                                    value={monthlyPrice}
                                    onChange={(e) => setMonthlyPrice(Number(e.target.value))}
                                />
                            </div>
                            <span className="text-sm text-slate-400 font-medium bg-slate-100 dark:bg-white/5 px-2 py-0.5 rounded text-xs mt-2">Base Monthly Price</span>
                        </div>
                        <div className="mb-6 px-1">
                            <input
                                className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-primary"
                                max="500"
                                min="0"
                                step="1"
                                type="range"
                                value={monthlyPrice}
                                onChange={(e) => setMonthlyPrice(Number(e.target.value))}
                            />
                            <div className="flex justify-between mt-2">
                                <span className="text-[10px] text-slate-400 font-semibold uppercase">Free</span>
                                <span className="text-[10px] text-slate-400 font-semibold uppercase">High Ticket ($500+)</span>
                            </div>
                        </div>
                        <div className="bg-background-light dark:bg-background-dark/50 p-1 rounded-lg flex items-center relative cursor-pointer" onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}>
                            <div className={`w-1/2 flex items-center justify-center py-2 rounded-md shadow-sm z-10 transition-all border ${billingCycle === 'monthly' ? 'bg-white dark:bg-surface-dark border-black/5 dark:border-white/5 text-slate-900 dark:text-white' : 'border-transparent opacity-50 text-slate-600 dark:text-slate-300'}`}>
                                <span className="text-xs font-bold">Monthly</span>
                            </div>
                            <div className={`w-1/2 flex items-center justify-center py-2 z-10 transition-opacity ${billingCycle === 'annual' ? 'bg-white dark:bg-surface-dark border-black/5 dark:border-white/5 text-slate-900 dark:text-white rounded-md shadow-sm border' : 'opacity-50 text-slate-900 dark:text-white'}`}>
                                <span className="text-xs font-medium">Annual</span>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2 px-2">
                        <span className="material-symbols-outlined text-emerald-500 text-sm">trending_up</span>
                        <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Estimated ARPU: ${estArpu} (after discounts)</p>
                    </div>
                </div>

                {/* Tier Constraints */}
                <div className="px-4 py-2">
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 pl-1">Tier Constraints</label>
                    <div className="bg-white dark:bg-surface-dark p-4 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm">
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-slate-400 text-lg">group</span>
                                <div>
                                    <h4 className="font-bold text-slate-900 dark:text-white text-sm">User Capacity</h4>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Seats per account</p>
                                </div>
                            </div>
                            <div className="bg-slate-100 dark:bg-white/5 px-3 py-1 rounded-lg border border-slate-200 dark:border-white/5 min-w-[60px] text-center">
                                <span className="font-mono font-bold text-primary text-sm">{userCapacity >= 10000 ? 'Unlimited' : userCapacity.toLocaleString()}</span>
                            </div>
                        </div>
                        <input
                            className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-primary"
                            max="10000"
                            min="100"
                            step="100"
                            type="range"
                            value={userCapacity}
                            onChange={(e) => setUserCapacity(Number(e.target.value))}
                        />
                        <div className="flex justify-between mt-2 px-1">
                            <span className="text-[10px] text-slate-400">1</span>
                            <span className="text-[10px] text-slate-400">Unlimited</span>
                        </div>
                    </div>
                </div>

                {/* Feature Entitlements */}
                <div className="px-4 py-4 mb-8">
                    <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3 pl-1">Feature Entitlements</label>
                    <div className="bg-white dark:bg-surface-dark rounded-xl border border-slate-200 dark:border-white/5 shadow-sm divide-y divide-slate-100 dark:divide-white/5 overflow-hidden">

                        {/* Analytics */}
                        <div className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer group" onClick={() => toggleFeature('analytics')}>
                            <div className="flex items-center gap-3">
                                <div className="size-8 rounded bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-lg">monitoring</span>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Advanced Analytics</p>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Full data history access</p>
                                </div>
                            </div>
                            <div className={`w-10 h-6 rounded-full relative transition-colors ${features.analytics ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'}`}>
                                <div className={`absolute top-1 size-4 bg-white rounded-full shadow-sm transition-all ${features.analytics ? 'right-1' : 'left-1 dark:bg-slate-400'}`}></div>
                            </div>
                        </div>

                        {/* API Access */}
                        <div className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer group" onClick={() => toggleFeature('api')}>
                            <div className="flex items-center gap-3">
                                <div className="size-8 rounded bg-fuchsia-100 dark:bg-fuchsia-500/20 text-fuchsia-600 dark:text-fuchsia-400 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-lg">webhook</span>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white">API Access</p>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Programmable integration</p>
                                </div>
                            </div>
                            <div className={`w-10 h-6 rounded-full relative transition-colors ${features.api ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'}`}>
                                <div className={`absolute top-1 size-4 bg-white rounded-full shadow-sm transition-all ${features.api ? 'right-1' : 'left-1 dark:bg-slate-400'}`}></div>
                            </div>
                        </div>

                        {/* White Labeling */}
                        <div className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer group" onClick={() => toggleFeature('whiteLabel')}>
                            <div className="flex items-center gap-3">
                                <div className="size-8 rounded bg-orange-100 dark:bg-orange-500/20 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-lg">verified</span>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white">White Labeling</p>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Remove branding</p>
                                </div>
                            </div>
                            <div className={`w-10 h-6 rounded-full relative transition-colors ${features.whiteLabel ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'}`}>
                                <div className={`absolute top-1 size-4 bg-white rounded-full shadow-sm transition-all ${features.whiteLabel ? 'right-1' : 'left-1 dark:bg-slate-400'}`}></div>
                            </div>
                        </div>

                        {/* Auto Backups */}
                        <div className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer group" onClick={() => toggleFeature('backups')}>
                            <div className="flex items-center gap-3">
                                <div className="size-8 rounded bg-sky-100 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-lg">cloud_sync</span>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Auto Backups</p>
                                    <p className="text-[10px] text-slate-500 dark:text-slate-400">Daily snapshot</p>
                                </div>
                            </div>
                            <div className={`w-10 h-6 rounded-full relative transition-colors ${features.backups ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'}`}>
                                <div className={`absolute top-1 size-4 bg-white rounded-full shadow-sm transition-all ${features.backups ? 'right-1' : 'left-1 dark:bg-slate-400'}`}></div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div className="fixed bottom-0 left-0 w-full p-4 bg-gradient-to-t from-background-light dark:from-background-dark via-background-light dark:via-background-dark to-transparent pb-8 z-50">
                <div className="max-w-md mx-auto">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                        <span className="material-symbols-outlined">save</span>
                        Save & Activate Tier
                    </button>
                </div>
            </div>
        </div>
    );
};
