import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const LoanApplication = () => {
    const navigate = useNavigate();
    const [amount, setAmount] = useState(50000);
    const [term, setTerm] = useState(6); // Months
    const [purpose, setPurpose] = useState('working_capital');

    // Constants
    const INTEREST_RATE = 0.075; // 7.5%

    // Calculations
    const totalInterest = Math.round(amount * INTEREST_RATE * (term / 12));
    const totalPayback = amount + totalInterest;
    const monthlyPayment = Math.round(totalPayback / term);

    return (
        <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white overflow-x-hidden min-h-screen relative pb-24">
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
                    height: 24px;
                    width: 24px;
                    border-radius: 50%;
                    background: #6d13ec;
                    border: 2px solid white;
                    cursor: pointer;
                    box-shadow: 0 2px 6px rgba(0,0,0,0.2);
                    margin-top: -10px;
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
                input[type=range]:focus::-webkit-slider-thumb {
                    box-shadow: 0 0 0 3px rgba(109, 19, 236, 0.3);
                }
                @keyframes shimmer {
                    100% {
                        transform: translateX(100%);
                    }
                }
            `}</style>

            {/* Top App Bar */}
            <div className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-black/5 dark:border-white/5 p-4 flex items-center justify-between">
                <button
                    onClick={() => navigate(-1)}
                    className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-900 dark:text-white"
                >
                    <span className="material-symbols-outlined">close</span>
                </button>
                <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">Apply for New Loan</h2>
            </div>

            <div className="flex flex-col w-full max-w-md md:max-w-full mx-auto pt-6 space-y-6 px-4 pb-8">
                {/* Credit Score Card */}
                <div className="flex items-center justify-between bg-white dark:bg-surface-dark px-4 py-3 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm md:w-full">
                    <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                            <span className="material-symbols-outlined text-emerald-500 text-lg">verified_user</span>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Credit Score</p>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">765 <span className="text-emerald-500 font-medium text-xs ml-1">Excellent</span></p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Max Approval</p>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">$500,000</p>
                    </div>
                </div>

                {/* Amount Slider */}
                <div className="space-y-4">
                    <div className="flex justify-between items-end px-1">
                        <label className="text-sm font-bold text-slate-900 dark:text-white">Desired Amount</label>
                        <span className="text-primary font-bold text-2xl">${amount.toLocaleString()}</span>
                    </div>
                    <div className="bg-white dark:bg-surface-dark p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
                        <input
                            className="w-full bg-transparent appearance-none h-4 cursor-pointer focus:outline-none mb-2"
                            max="500000"
                            min="5000"
                            step="5000"
                            type="range"
                            value={amount}
                            onChange={(e) => setAmount(Number(e.target.value))}
                        />
                        <div className="flex justify-between text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                            <span>$5k</span>
                            <span>$500k</span>
                        </div>
                    </div>
                </div>

                {/* Loan Purpose */}
                <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-900 dark:text-white px-1">Loan Purpose</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <label className="relative group cursor-pointer h-full">
                            <input
                                className="peer sr-only"
                                name="purpose"
                                type="radio"
                                checked={purpose === 'working_capital'}
                                onChange={() => setPurpose('working_capital')}
                            />
                            <div className="flex items-center gap-4 p-3 rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/5 peer-checked:border-primary peer-checked:ring-1 peer-checked:ring-primary/50 hover:bg-slate-50 dark:hover:bg-white/5 transition-all h-full">
                                <div className="size-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                    <span className="material-symbols-outlined">inventory_2</span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">Working Capital</p>
                                    <p className="text-[10px] text-slate-500">Day-to-day operations & inventory</p>
                                </div>
                                <span className="material-symbols-outlined text-transparent peer-checked:text-primary">check_circle</span>
                            </div>
                        </label>
                        <label className="relative group cursor-pointer h-full">
                            <input
                                className="peer sr-only"
                                name="purpose"
                                type="radio"
                                checked={purpose === 'equipment'}
                                onChange={() => setPurpose('equipment')}
                            />
                            <div className="flex items-center gap-4 p-3 rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/5 peer-checked:border-primary peer-checked:ring-1 peer-checked:ring-primary/50 hover:bg-slate-50 dark:hover:bg-white/5 transition-all h-full">
                                <div className="size-10 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 dark:text-slate-400 peer-checked:text-primary peer-checked:bg-primary/10 shrink-0">
                                    <span className="material-symbols-outlined">precision_manufacturing</span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">Equipment</p>
                                    <p className="text-[10px] text-slate-500">Machinery & Hardware purchases</p>
                                </div>
                                <span className="material-symbols-outlined text-transparent peer-checked:text-primary">check_circle</span>
                            </div>
                        </label>
                        <label className="relative group cursor-pointer h-full">
                            <input
                                className="peer sr-only"
                                name="purpose"
                                type="radio"
                                checked={purpose === 'expansion'}
                                onChange={() => setPurpose('expansion')}
                            />
                            <div className="flex items-center gap-4 p-3 rounded-xl bg-white dark:bg-surface-dark border border-slate-200 dark:border-white/5 peer-checked:border-primary peer-checked:ring-1 peer-checked:ring-primary/50 hover:bg-slate-50 dark:hover:bg-white/5 transition-all h-full">
                                <div className="size-10 rounded-lg bg-slate-100 dark:bg-white/5 flex items-center justify-center text-slate-500 dark:text-slate-400 peer-checked:text-primary peer-checked:bg-primary/10 shrink-0">
                                    <span className="material-symbols-outlined">storefront</span>
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">Expansion</p>
                                    <p className="text-[10px] text-slate-500">New locations & renovations</p>
                                </div>
                                <span className="material-symbols-outlined text-transparent peer-checked:text-primary">check_circle</span>
                            </div>
                        </label>
                    </div>
                </div>

                {/* Repayment Term */}
                <div className="space-y-3">
                    <label className="text-sm font-bold text-slate-900 dark:text-white px-1">Repayment Term</label>
                    <div className="grid grid-cols-3 gap-2 bg-slate-100 dark:bg-white/5 p-1 rounded-xl">
                        {[6, 12, 24].map((t) => (
                            <button
                                key={t}
                                onClick={() => setTerm(t)}
                                className={`py-2.5 rounded-lg text-xs font-bold transition-all ${term === t
                                    ? 'bg-white dark:bg-surface-dark text-slate-900 dark:text-white shadow-sm border border-slate-200 dark:border-white/10'
                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-white/50'
                                    }`}
                            >
                                {t} Months
                            </button>
                        ))}
                    </div>
                </div>

                {/* Estimated Quote */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 dark:from-surface-dark dark:to-black border border-slate-200 dark:border-white/10 p-5 shadow-lg mt-4">
                    <div className="absolute top-0 right-0 -mt-8 -mr-8 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-3">
                            <p className="text-xs font-semibold text-white/70">Estimated Quote</p>
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500 text-white shadow-sm shadow-emerald-500/20">High Approval Odds</span>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-2 md:gap-x-6 items-center">
                            <div>
                                <p className="text-[10px] uppercase text-white/50 font-bold mb-0.5">Interest Rate</p>
                                <p className="text-xl font-bold text-white">{(INTEREST_RATE * 100).toFixed(1)}%</p>
                            </div>
                            <div className="text-right md:text-left">
                                <p className="text-[10px] uppercase text-white/50 font-bold mb-0.5">Monthly Payment</p>
                                <p className="text-xl font-bold text-white">${monthlyPayment.toLocaleString()}</p>
                            </div>
                            <div className="col-span-2 md:col-span-2 md:mt-0 bg-white/5 rounded-lg p-3 flex justify-between items-center mt-1">
                                <div>
                                    <p className="text-[10px] text-white/60 font-medium">Total Interest Cost</p>
                                    <p className="text-sm font-bold text-white">${totalInterest.toLocaleString()}</p>
                                </div>
                                <div className="h-8 w-px bg-white/10 mx-2"></div>
                                <div className="text-right">
                                    <p className="text-[10px] text-white/60 font-medium">Total Payback</p>
                                    <p className="text-sm font-bold text-white">${totalPayback.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                        <p className="text-[10px] text-white/40 mt-3 text-center leading-tight">
                            *Rates are estimated based on your credit score. Final terms may vary upon submission.
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="pt-4 pb-8 space-y-3 md:space-y-0 md:flex md:gap-4 md:flex-row-reverse">
                    <button className="w-full md:w-auto md:flex-1 group relative overflow-hidden rounded-xl bg-primary text-white p-4 shadow-lg shadow-primary/25 transition-transform active:scale-[0.98]">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_1.5s_infinite]"></div>
                        <span className="text-base font-bold relative z-10 flex items-center justify-center gap-2">
                            Submit Application
                            <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </span>
                    </button>
                    <button
                        onClick={() => navigate(-1)}
                        className="w-full md:w-auto md:w-32 p-4 rounded-xl text-slate-500 dark:text-slate-400 font-semibold text-sm hover:text-slate-700 dark:hover:text-white transition-colors bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};
