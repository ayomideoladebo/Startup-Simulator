
export const Dashboard = () => {
    return (
        <div className="flex flex-col gap-6 pb-24 no-scrollbar">
            {/* Date & Status */}
            <div className="px-4 py-4 flex justify-between items-center bg-gradient-to-b from-background-dark to-transparent">
                <div className="flex flex-col">
                    <span className="text-white/50 text-xs font-medium uppercase tracking-widest">Turn 42</span>
                    <span className="text-white text-sm font-bold">Month 14</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-accent-green animate-pulse"></span>
                    <span className="text-accent-green text-xs font-bold uppercase tracking-wider">Phase: Scaling</span>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="px-4 pb-2">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-card-dark border border-primary/30 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-primary/20 blur-2xl rounded-full -mr-8 -mt-8"></div>
                        <div className="flex justify-between items-start mb-2">
                            <p className="text-white/60 text-xs font-semibold uppercase">MRR</p>
                            <span className="bg-accent-green/10 text-accent-green text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center">
                                <span className="material-symbols-outlined text-[12px]">arrow_upward</span> 12%
                            </span>
                        </div>
                        <div>
                            <p className="text-white text-2xl font-bold tracking-tight font-mono">$45.2k</p>
                            <p className="text-white/40 text-[10px] mt-1">Target: $50k</p>
                        </div>
                    </div>
                    <div className="bg-card-dark border border-accent-red/30 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-16 h-16 bg-accent-red/10 blur-2xl rounded-full -mr-8 -mt-8"></div>
                        <div className="flex justify-between items-start mb-2">
                            <p className="text-white/60 text-xs font-semibold uppercase">Runway</p>
                            <span className="bg-accent-red/10 text-accent-red text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                                <span className="material-symbols-outlined text-[12px]">warning</span> CRITICAL
                            </span>
                        </div>
                        <div>
                            <p className="text-white text-2xl font-bold tracking-tight font-mono">5 Mo</p>
                            <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                                <div className="bg-accent-red h-full w-[25%] rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Operations Grid */}
            <div className="px-4 pb-4">
                <h3 className="text-white/50 text-xs font-bold uppercase tracking-wider mb-3 px-1">Operations</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="bg-card-dark border border-card-border rounded-xl p-4 flex flex-col gap-1">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="material-symbols-outlined text-white/60 text-[18px]">group</span>
                            <p className="text-white/60 text-xs font-medium">Total Users</p>
                        </div>
                        <p className="text-white text-lg font-bold">12,405</p>
                        <p className="text-accent-green text-[10px] font-medium">+845 this mo</p>
                    </div>
                    <div className="bg-card-dark border border-card-border rounded-xl p-4 flex flex-col gap-1">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                            <p className="text-white/60 text-xs font-medium">Paying</p>
                        </div>
                        <p className="text-white text-lg font-bold">450</p>
                        <p className="text-white/40 text-[10px] font-medium">3.6% Conv. Rate</p>
                    </div>
                    <div className="bg-card-dark border border-card-border rounded-xl p-4 flex flex-col gap-1">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="material-symbols-outlined text-accent-red text-[18px]">local_fire_department</span>
                            <p className="text-white/60 text-xs font-medium">Burn Rate</p>
                        </div>
                        <p className="text-white text-lg font-bold">$8.5k</p>
                        <p className="text-accent-red text-[10px] font-medium">+2.1% (Hiring)</p>
                    </div>
                    <div className="bg-card-dark border border-card-border rounded-xl p-4 flex flex-col gap-1">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="material-symbols-outlined text-white/60 text-[18px]">person_remove</span>
                            <p className="text-white/60 text-xs font-medium">Churn</p>
                        </div>
                        <p className="text-white text-lg font-bold">4.2%</p>
                        <p className="text-white/40 text-[10px] font-medium">Sector Avg: 5.0%</p>
                    </div>
                </div>
            </div>

            {/* Chart Section */}
            <div className="px-4 py-4">
                <div className="bg-card-dark border border-card-border rounded-2xl p-5 relative">
                    <div className="flex justify-between items-end mb-4">
                        <div>
                            <p className="text-white/60 text-xs font-semibold mb-1">Revenue Trend</p>
                            <h3 className="text-xl font-bold text-white">$45,230</h3>
                        </div>
                        <div className="flex gap-2">
                            <span className="px-2 py-1 rounded bg-primary text-white text-[10px] font-bold">6M</span>
                            <span className="px-2 py-1 rounded bg-white/5 text-white/60 text-[10px] font-bold">1Y</span>
                        </div>
                    </div>
                    <div className="h-[120px] w-full">
                        <svg fill="none" height="100%" preserveAspectRatio="none" viewBox="0 0 478 150" width="100%" xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient gradientUnits="userSpaceOnUse" id="chartGradient" x1="236" x2="236" y1="25" y2="149">
                                    <stop stopColor="#6d13ec" stopOpacity="0.5"></stop>
                                    <stop offset="1" stopColor="#6d13ec" stopOpacity="0"></stop>
                                </linearGradient>
                            </defs>
                            <path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H0V109Z" fill="url(#chartGradient)"></path>
                            <path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25" stroke="#6d13ec" strokeLinecap="round" strokeWidth="3"></path>
                        </svg>
                    </div>
                    <div className="flex justify-between mt-2 px-1">
                        <p className="text-white/30 text-[10px] font-bold uppercase">Jan</p>
                        <p className="text-white/30 text-[10px] font-bold uppercase">Feb</p>
                        <p className="text-white/30 text-[10px] font-bold uppercase">Mar</p>
                        <p className="text-white/30 text-[10px] font-bold uppercase">Apr</p>
                        <p className="text-white/30 text-[10px] font-bold uppercase">May</p>
                        <p className="text-white/30 text-[10px] font-bold uppercase">Jun</p>
                    </div>
                </div>
            </div>

            {/* Internal Health */}
            <div className="px-4 pb-4">
                <h3 className="text-white/50 text-xs font-bold uppercase tracking-wider mb-3 px-1">Internal Health</h3>
                <div className="bg-card-dark border border-card-border rounded-xl p-5 flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-white/70 text-[16px]">sentiment_neutral</span>
                                <span className="text-sm text-white font-medium">Team Morale</span>
                            </div>
                            <span className="text-xs text-white/50 font-mono">45/100</span>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full w-[45%] bg-gradient-to-r from-accent-red via-yellow-500 to-accent-green rounded-full relative">
                                <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
                            </div>
                        </div>
                        <p className="text-[10px] text-white/40 italic">Dev team is overworked. Consider hiring.</p>
                    </div>
                    <div className="h-px bg-white/5 w-full"></div>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-[16px]">diamond</span>
                                <span className="text-sm text-white font-medium">Product Quality</span>
                            </div>
                            <span className="text-xs text-primary font-bold">Beta v0.9</span>
                        </div>
                        <div className="flex gap-1">
                            <span className="material-symbols-outlined text-primary text-[16px] fill-current">star</span>
                            <span className="material-symbols-outlined text-primary text-[16px] fill-current">star</span>
                            <span className="material-symbols-outlined text-primary text-[16px] fill-current">star</span>
                            <span className="material-symbols-outlined text-white/20 text-[16px]">star</span>
                            <span className="material-symbols-outlined text-white/20 text-[16px]">star</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Market Intel */}
            <div className="px-4 pb-24">
                <h3 className="text-white/50 text-xs font-bold uppercase tracking-wider mb-3 px-1">Market Intel</h3>
                <div className="bg-card-dark border border-card-border rounded-xl p-0 overflow-hidden mb-4">
                    <div className="p-4 border-b border-card-border/50 bg-white/5 flex justify-between items-center">
                        <span className="text-sm font-semibold text-white">Niche Leaderboard</span>
                        <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded border border-primary/20">AI Analytics</span>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex items-center p-3 gap-3 border-b border-card-border/30">
                            <span className="text-white/40 font-mono text-xs w-4">01</span>
                            <div className="h-8 w-8 rounded bg-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-xs border border-blue-500/30">CD</div>
                            <div className="flex-1">
                                <p className="text-white text-xs font-medium">CyberDyne</p>
                                <p className="text-white/30 text-[10px]">$89k MRR</p>
                            </div>
                            <span className="material-symbols-outlined text-accent-green text-[16px]">trending_up</span>
                        </div>
                        <div className="flex items-center p-3 gap-3 bg-primary/10 border-l-2 border-l-primary">
                            <span className="text-primary font-mono text-xs w-4 font-bold">02</span>
                            <div className="h-8 w-8 rounded bg-primary flex items-center justify-center text-white font-bold text-xs shadow-[0_0_10px_rgba(109,19,236,0.4)]">NI</div>
                            <div className="flex-1">
                                <p className="text-white text-xs font-bold">Neuromancer (You)</p>
                                <p className="text-primary-glow text-[10px]">$45.2k MRR</p>
                            </div>
                            <span className="material-symbols-outlined text-accent-green text-[16px]">trending_flat</span>
                        </div>
                        <div className="flex items-center p-3 gap-3">
                            <span className="text-white/40 font-mono text-xs w-4">03</span>
                            <div className="h-8 w-8 rounded bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold text-xs border border-orange-500/30">OM</div>
                            <div className="flex-1">
                                <p className="text-white text-xs font-medium">OmniCorp</p>
                                <p className="text-white/30 text-[10px]">$32k MRR</p>
                            </div>
                            <span className="material-symbols-outlined text-accent-red text-[16px]">trending_down</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
