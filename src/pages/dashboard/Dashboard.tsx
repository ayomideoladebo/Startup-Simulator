
import { useGameState } from '../../hooks/useGameState';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export const Dashboard = () => {
    const { company, gameState, competitors, loading, error } = useGameState();
    const navigate = useNavigate();
    const [processing, setProcessing] = useState(false);
    const [monthlyBurn, setMonthlyBurn] = useState(0);
    const [teamMorale, setTeamMorale] = useState(100);
    const [avgBurnout, setAvgBurnout] = useState(0);
    const [employeeCount, setEmployeeCount] = useState(0);
    const [productQuality, setProductQuality] = useState(0);
    const [launchedFeatures, setLaunchedFeatures] = useState(0);

    // Fetch employees and features to calculate burn rate and internal health
    useEffect(() => {
        const fetchDashboardData = async () => {
            if (!company?.id) return;
            
            // Fetch employee data (salaries, morale, burnout)
            const { data: employees } = await supabase
                .from('employees')
                .select('salary, morale, burnout')
                .eq('company_id', company.id);
            
            // Fetch feature data (maintenance costs, quality for LIVE features)
            const { data: launchedFeaturesData } = await supabase
                .from('product_features')
                .select('maintenance_cost, market_fit_score, innovation_score')
                .eq('company_id', company.id)
                .eq('status', 'live');
            
            // Calculate monthly salary burn (yearly / 12)
            const totalYearlySalary = employees?.reduce((acc, emp) => acc + (emp.salary || 0), 0) || 0;
            const monthlySalaryBurn = Math.round(totalYearlySalary / 12);
            
            // Sum all feature maintenance costs (already monthly)
            const totalMaintenanceCost = launchedFeaturesData?.reduce((acc, feat) => acc + (feat.maintenance_cost || 0), 0) || 0;
            
            // Total monthly burn = salaries + maintenance
            setMonthlyBurn(monthlySalaryBurn + totalMaintenanceCost);
            
            // Calculate team morale (average of all employees)
            if (employees && employees.length > 0) {
                const avgMorale = Math.round(employees.reduce((acc, emp) => acc + (emp.morale || 50), 0) / employees.length);
                const avgBurn = Math.round(employees.reduce((acc, emp) => acc + (emp.burnout || 0), 0) / employees.length);
                setTeamMorale(avgMorale);
                setAvgBurnout(avgBurn);
                setEmployeeCount(employees.length);
            }
            
            // Calculate product quality (average of feature scores)
            if (launchedFeaturesData && launchedFeaturesData.length > 0) {
                const avgQuality = Math.round(
                    launchedFeaturesData.reduce((acc, feat) => 
                        acc + ((feat.market_fit_score || 50) + (feat.innovation_score || 50)) / 2, 0
                    ) / launchedFeaturesData.length
                );
                setProductQuality(avgQuality);
                setLaunchedFeatures(launchedFeaturesData.length);
            }
        };
        fetchDashboardData();
    }, [company?.id]);

    const handleAdvanceWeek = async () => {
        setProcessing(true);
        try {
            const { error } = await supabase.functions.invoke('advance-day', {
                body: { company_id: company.id }
            });
            
            if (error) throw error;



            // Force reload or query invalidation would be better here, 
            // but for now a simple reload works to fetch fresh data
            window.location.reload(); 
        } catch (err) {
            console.error("Failed to advance week:", err);
            let msg = "Unknown error";
            if (err instanceof Error) msg = err.message;
            if ((err as any).context && (err as any).context.json) {
                 const body = await (err as any).context.json().catch(() => ({}));
                 if (body.error) msg = body.error;
            }
            alert(`Failed to advance week: ${msg}`);
        } finally {
            setProcessing(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full pt-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error || !company) {
         return (
            <div className="p-6 text-center">
                <p className="text-red-400 mb-4">{error || "No company found"}</p>
                <button onClick={() => navigate('/niche-selection')} className="bg-primary px-4 py-2 rounded text-white">Create Startup</button>
            </div>
        );
    }

    // Calculate formatted values
    const mrr = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' }).format(gameState.mrr);
    const funds = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' }).format(company.cash);
    const burn = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', notation: 'compact' }).format(monthlyBurn);
    
    // Sort competitors including player for leaderboard
    const allCompanies = [...competitors, { ...company, is_me: true }];
    // Sort by "Valuation" (Approximated by Cash * 10 or just Cash for now)
    allCompanies.sort((a, b) => b.cash - a.cash);

    return (
        <div className="flex flex-col gap-6 pb-24 no-scrollbar">
            {/* Date & Status */}
            <div className="px-4 py-4 flex justify-between items-center bg-gradient-to-b from-background-dark to-transparent">
                <div className="flex flex-col">
                    <span className="text-white/50 text-xs font-medium uppercase tracking-widest">Turn {gameState.turn_count}</span>
                    <h2 className="text-xl font-bold text-slate-800 dark:text-white">Day {gameState?.current_day || 1}</h2>
                </div>
                <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-accent-green animate-pulse"></span>
                    <span className="text-accent-green text-xs font-bold uppercase tracking-wider">{company.stage}</span>
                    <button 
                        onClick={handleAdvanceWeek}
                        disabled={processing}
                        className="ml-4 bg-primary hover:bg-primary/90 disabled:opacity-50 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg shadow-primary/20 transition-all active:scale-95 flex items-center gap-1"
                    >
                        {processing ? (
                           <span className="animate-spin h-3 w-3 border-b-2 border-white rounded-full"></span> 
                        ) : (
                            <span className="material-symbols-outlined text-[14px]">skip_next</span>
                        )}
                        Next Day
                    </button>
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
                            <p className="text-white text-2xl font-bold tracking-tight font-mono">{mrr}</p>
                            <p className="text-white/40 text-[10px] mt-1">Target: $10k</p>
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
                            <p className="text-white text-2xl font-bold tracking-tight font-mono">{funds}</p>
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
                            <p className="text-white/60 text-xs font-medium">Customers</p>
                        </div>
                        <p className="text-white text-lg font-bold">{gameState.customers.toLocaleString()}</p>
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
                            <p className="text-white/60 text-xs font-medium">Burn (Est)</p>
                        </div>
                        <p className="text-white text-lg font-bold">{burn}</p>
                        <p className="text-accent-red text-[10px] font-medium">+2.1% (Hiring)</p>
                    </div>
                    <div className="bg-card-dark border border-card-border rounded-xl p-4 flex flex-col gap-1">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="material-symbols-outlined text-white/60 text-[18px]">person_remove</span>
                            <p className="text-white/60 text-xs font-medium">Churn</p>
                        </div>
                        <p className="text-white text-lg font-bold">{gameState.churn_rate}%</p>
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
                            <h3 className="text-xl font-bold text-white">{mrr}</h3>
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
                                <span className={`material-symbols-outlined text-[16px] ${teamMorale >= 70 ? 'text-accent-green' : teamMorale >= 40 ? 'text-yellow-500' : 'text-accent-red'}`}>
                                    {teamMorale >= 70 ? 'sentiment_satisfied' : teamMorale >= 40 ? 'sentiment_neutral' : 'sentiment_dissatisfied'}
                                </span>
                                <span className="text-sm text-white font-medium">Team Morale</span>
                            </div>
                            <span className="text-xs text-white/50 font-mono">{teamMorale}/100</span>
                        </div>
                        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                            <div 
                                className={`h-full rounded-full relative transition-all duration-500 ${
                                    teamMorale >= 70 ? 'bg-accent-green' : teamMorale >= 40 ? 'bg-yellow-500' : 'bg-accent-red'
                                }`}
                                style={{ width: `${teamMorale}%` }}
                            >
                                <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
                            </div>
                        </div>
                        <p className="text-[10px] text-white/40 italic">
                            {avgBurnout > 60 
                                ? '⚠️ High burnout risk! Consider vacations.' 
                                : employeeCount < 3 
                                    ? 'Small team - consider hiring.' 
                                    : teamMorale >= 80 
                                        ? '✓ Team is happy and productive!' 
                                        : 'Team morale could be improved.'}
                        </p>
                    </div>
                    <div className="h-px bg-white/5 w-full"></div>
                    <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-primary text-[16px]">diamond</span>
                                <span className="text-sm text-white font-medium">Product Quality</span>
                            </div>
                            <span className="text-xs text-primary font-bold">
                                {launchedFeatures > 0 ? `${launchedFeatures} Feature${launchedFeatures > 1 ? 's' : ''} Live` : 'No features yet'}
                            </span>
                        </div>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span 
                                    key={star}
                                    className={`material-symbols-outlined text-[16px] ${
                                        productQuality >= star * 20 ? 'text-primary fill-current' : 'text-white/20'
                                    }`}
                                >
                                    star
                                </span>
                            ))}
                        </div>
                        <p className="text-[10px] text-white/40">
                            {productQuality > 0 ? `Quality Score: ${productQuality}/100` : 'Launch features to see quality score'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Market Intel */}
            <div className="px-4 pb-24">
                <h3 className="text-white/50 text-xs font-bold uppercase tracking-wider mb-3 px-1">Market Intel</h3>
                <div className="bg-card-dark border border-card-border rounded-xl p-0 overflow-hidden mb-4">
                    <div className="p-4 border-b border-card-border/50 bg-white/5 flex justify-between items-center">
                        <span className="text-sm font-semibold text-white">Niche Leaderboard</span>
                        <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded border border-primary/20">{company.niche}</span>
                    </div>
                    <div className="flex flex-col">
                        {allCompanies.slice(0, 5).map((comp: any, idx: number) => (
                             <div key={comp.id} className={`flex items-center p-3 gap-3 ${comp.is_me ? 'bg-primary/10 border-l-2 border-l-primary' : 'border-b border-card-border/30'}`}>
                                <span className={`font-mono text-xs w-4 ${comp.is_me ? 'text-primary font-bold' : 'text-white/40'}`}>{idx + 1}</span>
                                <div className={`h-8 w-8 rounded flex items-center justify-center font-bold text-xs border ${comp.is_me ? 'bg-primary text-white shadow-[0_0_10px_rgba(109,19,236,0.4)]' : 'bg-blue-500/20 text-blue-400 border-blue-500/30'}`}>
                                    {comp.name.substring(0, 2).toUpperCase()}
                                </div>
                                <div className="flex-1">
                                    <p className={`text-xs ${comp.is_me ? 'text-white font-bold' : 'text-white font-medium'}`}>{comp.name} {comp.is_me && '(You)'}</p>
                                    <p className={`${comp.is_me ? 'text-primary-glow' : 'text-white/30'} text-[10px]`}>
                                        ${(comp.cash).toLocaleString()} Cash
                                    </p>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    </div>
    );
};
