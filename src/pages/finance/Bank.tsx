// import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Bank = () => {
    const navigate = useNavigate();

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
                    className="flex size-10 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-slate-900 dark:text-white pb-1"
                >
                    <span className="material-symbols-outlined">arrow_back_ios_new</span>
                </button>
                <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">Bank Loans & Credit</h2>
            </div>

            <div className="flex flex-col w-full max-w-md md:max-w-full mx-auto pt-4 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
                    <div className="bg-gradient-to-br from-surface-dark to-[#1e1628] dark:from-surface-dark dark:to-[#1e1628] bg-white border border-slate-200 dark:border-white/5 rounded-2xl p-5 shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div>
                                <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-widest">Business Credit Score</p>
                                <div className="flex items-baseline gap-2 mt-1">
                                    <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">765</h1>
                                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/20">Excellent</span>
                                </div>
                            </div>
                            <div className="size-12 rounded-full border-4 border-slate-100 dark:border-white/5 flex items-center justify-center relative">
                                <svg className="absolute inset-0 transform -rotate-90" height="48" width="48">
                                    <circle className="text-emerald-500" cx="24" cy="24" fill="transparent" r="20" stroke="currentColor" strokeDasharray="125.6" strokeDashoffset="20" strokeWidth="4"></circle>
                                </svg>
                                <span className="material-symbols-outlined text-emerald-500">verified_user</span>
                            </div>
                        </div>
                        <div className="space-y-2 relative z-10">
                            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                                <span className="material-symbols-outlined text-primary text-base">percent</span>
                                <span>Qualifies for Prime Rate (6% - 8%)</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                                <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                                <span>High approval odds for Term Loans</span>
                            </div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex justify-between items-center">
                            <p className="text-[10px] text-slate-400">Next evaluation: Oct 31</p>
                            <button className="text-xs font-medium text-primary hover:text-primary/80 transition-colors flex items-center gap-1">
                                See Report <span className="material-symbols-outlined text-sm">chevron_right</span>
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col h-full">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 px-1">Revolving Credit Line</h3>
                        <div className="bg-white dark:bg-surface-dark p-4 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm flex-1 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between items-end mb-3">
                                    <div>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Available Credit</p>
                                        <p className="text-xl font-bold text-slate-900 dark:text-white">$145,000 <span className="text-sm font-normal text-slate-400">/ $200,000</span></p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Utilization</p>
                                        <p className="text-sm font-bold text-amber-500">27.5%</p>
                                    </div>
                                </div>
                                <div className="h-4 w-full bg-slate-100 dark:bg-black/40 rounded-full overflow-hidden mb-3">
                                    <div className="h-full bg-gradient-to-r from-emerald-500 to-amber-500 rounded-full" style={{ width: '27.5%' }}></div>
                                </div>
                            </div>
                            <div className="flex gap-2 mt-4 md:mt-0">
                                <button className="flex-1 py-2 px-3 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary/90 transition-colors shadow-sm shadow-primary/20 flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-sm">add_circle</span>
                                    Draw Funds
                                </button>
                                <button className="flex-1 py-2 px-3 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white text-xs font-semibold rounded-lg hover:bg-slate-50 dark:hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                                    <span className="material-symbols-outlined text-sm">payments</span>
                                    Repay Line
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-4">
                    <div className="flex justify-between items-center mb-3 px-1">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Active Obligations</h3>
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Monthly: $7,240</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div className="bg-white dark:bg-surface-dark p-4 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm relative group">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="size-8 rounded-lg bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                        <span className="material-symbols-outlined text-lg">domain</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">Seed Bridge Loan</h4>
                                        <p className="text-[10px] text-slate-500 dark:text-slate-400">Short-term • 12 Months</p>
                                    </div>
                                </div>
                                <span className="px-2 py-1 bg-slate-100 dark:bg-white/5 text-[10px] font-semibold text-slate-500 dark:text-slate-300 rounded">8.5% APR</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 my-3">
                                <div>
                                    <p className="text-[10px] uppercase text-slate-400 font-semibold mb-0.5">Balance</p>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">$42,500 <span className="text-xs font-normal text-slate-500">/ $100k</span></p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase text-slate-400 font-semibold mb-0.5">Next Payment</p>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">$4,250 <span className="text-xs text-rose-500 font-medium">Due in 5d</span></p>
                                </div>
                            </div>
                            <div className="w-full bg-slate-100 dark:bg-black/40 h-1.5 rounded-full mb-3">
                                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '57.5%' }}></div>
                            </div>
                            <div className="flex items-center justify-end gap-2">
                                <button className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-lg transition-colors">Details</button>
                                <button className="px-3 py-1.5 text-xs font-medium text-white bg-slate-900 dark:bg-white/10 dark:hover:bg-white/20 hover:bg-slate-800 rounded-lg transition-colors">Pay Early</button>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-surface-dark p-4 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm relative group opacity-90">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-3">
                                    <div className="size-8 rounded-lg bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400">
                                        <span className="material-symbols-outlined text-lg">print</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">Equipment Financing</h4>
                                        <p className="text-[10px] text-slate-500 dark:text-slate-400">Secured • 36 Months</p>
                                    </div>
                                </div>
                                <span className="px-2 py-1 bg-slate-100 dark:bg-white/5 text-[10px] font-semibold text-slate-500 dark:text-slate-300 rounded">6.2% APR</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 my-3">
                                <div>
                                    <p className="text-[10px] uppercase text-slate-400 font-semibold mb-0.5">Balance</p>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">$18,200 <span className="text-xs font-normal text-slate-500">/ $25k</span></p>
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase text-slate-400 font-semibold mb-0.5">Next Payment</p>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">$790 <span className="text-xs text-slate-500 font-medium">Due in 18d</span></p>
                                </div>
                            </div>
                            <div className="w-full bg-slate-100 dark:bg-black/40 h-1.5 rounded-full mb-3">
                                <div className="bg-purple-500 h-1.5 rounded-full" style={{ width: '27%' }}></div>
                            </div>
                            <div className="flex items-center justify-end gap-2">
                                <button className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 rounded-lg transition-colors">Details</button>
                                <button className="px-3 py-1.5 text-xs font-medium text-white bg-slate-900 dark:bg-white/10 dark:hover:bg-white/20 hover:bg-slate-800 rounded-lg transition-colors">Pay Early</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-4 pb-6">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3 px-1">New Borrowing Options</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <button
                            onClick={() => navigate('/finance/loans/new')}
                            className="w-full group relative overflow-hidden rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 p-5 shadow-lg transition-transform active:scale-[0.98] col-span-1 md:col-span-2"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:animate-[shimmer_2s_infinite]"></div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="size-10 rounded-full bg-white/20 dark:bg-slate-900/10 flex items-center justify-center">
                                        <span className="material-symbols-outlined text-2xl">add</span>
                                    </div>
                                    <div className="text-left">
                                        <p className="text-base font-bold">Apply for New Loan</p>
                                        <p className="text-xs opacity-80 font-medium">Get pre-approved up to $500k</p>
                                    </div>
                                </div>
                                <span className="material-symbols-outlined">arrow_forward</span>
                            </div>
                        </button>
                        <button className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-white/20 bg-transparent hover:bg-slate-50 dark:hover:bg-white/5 transition-colors flex flex-col items-center justify-center text-center gap-2 group">
                            <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">speed</span>
                            <div>
                                <p className="text-xs font-bold text-slate-900 dark:text-white">Emergency Fund</p>
                                <p className="text-[10px] text-slate-500">High Interest • Instant</p>
                            </div>
                        </button>
                        <button className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-white/20 bg-transparent hover:bg-slate-50 dark:hover:bg-white/5 transition-colors flex flex-col items-center justify-center text-center gap-2 group">
                            <span className="material-symbols-outlined text-slate-400 group-hover:text-primary transition-colors">request_quote</span>
                            <div>
                                <p className="text-xs font-bold text-slate-900 dark:text-white">Invoice Factoring</p>
                                <p className="text-[10px] text-slate-500">Advance on Revenue</p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
