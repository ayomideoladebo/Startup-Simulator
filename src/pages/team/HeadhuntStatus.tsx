import React, { useEffect, useState } from 'react';
import { Candidate } from './Recruitment';

interface HeadhuntStatusProps {
    onBack: () => void;
    onViewCandidates: () => void;
    candidates: Candidate[];
    role?: string;
}

export const HeadhuntStatus = ({ onBack, onViewCandidates, candidates = [], role = 'Talent' }: HeadhuntStatusProps) => {
    // Determine status based on candidates
    const isComplete = candidates.length > 0;
    
    return (
        <div className="fixed inset-0 z-[100] bg-background-light dark:bg-background-dark flex flex-col min-h-full overflow-y-auto no-scrollbar animate-in fade-in slide-in-from-right duration-300">
            <style>{`
                @keyframes ripple {
                    0% { transform: scale(0.8); opacity: 1; }
                    100% { transform: scale(2.4); opacity: 0; }
                }
                .animate-ripple {
                    animation: ripple 3s linear infinite;
                }
                .delay-1000 { animation-delay: 1s; }
                .delay-2000 { animation-delay: 2s; }
            `}</style>
            
            <div className="sticky top-0 z-50 flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between border-b border-gray-200 dark:border-white/10">
                <div onClick={onBack} className="text-slate-900 dark:text-white flex size-12 shrink-0 items-center justify-center cursor-pointer rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                </div>
                <div className="flex flex-col items-center">
                    <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Headhunt Status</h2>
                    <div className="flex items-center gap-1.5">
                        <span className="relative flex h-2 w-2">
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isComplete ? 'bg-blue-400' : 'bg-green-400'}`}></span>
                            <span className={`relative inline-flex rounded-full h-2 w-2 ${isComplete ? 'bg-blue-500' : 'bg-green-500'}`}></span>
                        </span>
                        <p className={`${isComplete ? 'text-blue-600 dark:text-blue-400' : 'text-green-600 dark:text-green-400'} text-xs font-bold uppercase tracking-wider`}>
                            {isComplete ? 'Search Complete' : 'Active Search'}
                        </p>
                    </div>
                </div>
                <div className="text-slate-900 dark:text-white flex size-12 shrink-0 items-center justify-center cursor-pointer rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-[24px]">more_horiz</span>
                </div>
            </div>

            <div className="flex flex-col gap-6 px-4 py-6 pb-32">
                <div className="flex items-center justify-center py-4">
                    <div className="relative size-64 flex items-center justify-center">
                        {!isComplete && (
                            <>
                                <div className="absolute inset-0 m-auto size-24 border border-primary/30 rounded-full animate-ripple"></div>
                                <div className="absolute inset-0 m-auto size-24 border border-primary/30 rounded-full animate-ripple delay-1000"></div>
                                <div className="absolute inset-0 m-auto size-24 border border-primary/30 rounded-full animate-ripple delay-2000"></div>
                            </>
                        )}
                        <div className="absolute inset-0 border border-slate-200 dark:border-white/5 rounded-full"></div>
                        <div className="absolute inset-12 border border-slate-200 dark:border-white/5 rounded-full border-dashed opacity-50"></div>
                        <div className="relative z-10 flex flex-col items-center justify-center size-24 rounded-full bg-white dark:bg-[#2f2839] shadow-xl border-4 border-background-light dark:border-background-dark">
                            <span className={`material-symbols-outlined text-4xl ${isComplete ? 'text-green-500' : 'text-primary animate-pulse'}`}>
                                {isComplete ? 'check_circle' : 'satellite_alt'}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-3 rounded-xl bg-white dark:bg-[#1e1e24] p-5 shadow-sm border border-gray-100 dark:border-white/5 text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 dark:bg-white/5">
                        <div className={`h-full w-full shadow-[0_0_10px_rgba(109,19,236,0.5)] ${isComplete ? 'bg-green-500' : 'bg-primary'}`}></div>
                    </div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-gray-500 mt-2">Status</p>
                    <div className="font-mono text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                        {isComplete ? 'Candidates Ready' : 'In Progress...'}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-gray-400 font-medium">
                        {isComplete ? 'Review profiles below' : 'Est. Completion: Immediate'}
                    </p>
                </div>

                <section>
                    <h3 className="text-slate-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider mb-3 pl-1">Target Profile</h3>
                    <div className="rounded-xl bg-white dark:bg-[#1e1e24] p-4 shadow-sm border border-gray-100 dark:border-white/5 flex items-start gap-4">
                        <div className="size-12 rounded-lg bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                            <span className="material-symbols-outlined text-[24px]">code</span>
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="text-sm font-bold text-slate-900 dark:text-white">{role}</p>
                                    <p className="text-[11px] text-slate-500 dark:text-gray-400">High Priority Search</p>
                                </div>
                                <div className="text-right">
                                    <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">Active</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <div className="flex justify-between items-end mb-3 px-1">
                        <h3 className="text-slate-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">Candidate Pool</h3>
                        <span className="text-[10px] font-medium text-slate-400">{candidates.length} Found</span>
                    </div>
                    <div className="flex flex-col gap-2">
                        {candidates.slice(0, 3).map((cand, i) => (
                            <div key={cand.id || i} className="group relative overflow-hidden rounded-xl border border-dashed border-primary/40 bg-primary/5 p-4 flex items-center h-20">
                                <div className="flex items-center gap-3">
                                    <div className="size-10 rounded-full bg-cover bg-center" style={{ backgroundImage: `url("${cand.img}")` }}></div>
                                    <div className="flex flex-col">
                                         <span className="text-sm font-bold text-slate-900 dark:text-white">{cand.name}</span>
                                         <span className="text-[10px] text-primary font-bold uppercase">{cand.role}</span>
                                    </div>
                                </div>
                                <div className="absolute right-4 text-primary">
                                    <span className="material-symbols-outlined">check_circle</span>
                                </div>
                            </div>
                        ))}
                        {candidates.length < 3 && Array(3 - candidates.length).fill(0).map((_, i) => (
                             <div key={i} className="rounded-xl border border-dashed border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 p-4 flex items-center justify-center h-16 opacity-60">
                                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">Searching...</span>
                             </div>
                        ))}
                    </div>
                </section>
            </div>

            <div className="fixed bottom-0 left-0 w-full p-4 bg-gradient-to-t from-background-light via-background-light to-transparent dark:from-background-dark dark:via-background-dark pt-8 z-40 max-w-md mx-auto right-0 flex flex-col gap-3">
                <button
                    onClick={onViewCandidates}
                    disabled={!isComplete}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl border shadow-sm transition-all active:scale-[0.98] ${
                        isComplete 
                            ? 'bg-primary text-white border-primary shadow-primary/20 hover:bg-primary-dark' 
                            : 'bg-white dark:bg-[#2f2839] text-slate-400 border-gray-200 dark:border-white/10 opacity-50 cursor-not-allowed'
                    }`}
                >
                    <span className="material-symbols-outlined text-[18px]">{isComplete ? 'visibility' : 'visibility_off'}</span>
                    <span className="font-bold text-sm">View Candidates ({candidates.length})</span>
                </button>
                <button
                    onClick={onBack}
                    className="w-full flex items-center justify-center gap-2 bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-gray-200 text-white dark:text-slate-900 py-4 rounded-xl shadow-xl shadow-black/20 transition-all active:scale-[0.98]"
                >
                    <span className="font-bold text-sm tracking-wide">Return to Team Management</span>
                </button>
            </div>

            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1] opacity-20 dark:opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>
        </div>
    );
};
