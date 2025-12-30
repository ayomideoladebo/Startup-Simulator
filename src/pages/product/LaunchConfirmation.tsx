

interface LaunchConfirmationProps {
    feature: any;
    onConfirm: () => void;
    onCancel: () => void;
    analysis?: {
        impact: {
            conversion: string;
            satisfaction: string;
        };
        cost: {
            deployment: number;
            maintenance: number;
        };
    };
}

export const LaunchConfirmation = ({ feature, onConfirm, onCancel, analysis }: LaunchConfirmationProps) => {
    // Default values if analysis is not yet available
    const impact = analysis?.impact || { conversion: '+15%', satisfaction: 'Positive' };
    // Use feature.maintenance_cost from DB (deterministic), fallback to analysis or default
    const maintenanceCost = feature.maintenance_cost || analysis?.cost?.maintenance || 200;

    return (
        <div className="fixed inset-0 z-[100] bg-background-light dark:bg-background-dark flex flex-col min-h-full overflow-y-auto no-scrollbar animate-in fade-in zoom-in-95 duration-300">
            <header className="sticky top-0 z-50 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-zinc-200 dark:border-white/5">
                <button onClick={onCancel} className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-2xl">close</span>
                </button>
                <h1 className="text-base font-semibold tracking-wide uppercase text-zinc-500 dark:text-zinc-400">Deployment Review</h1>
                <div className="w-10"></div> 
            </header>

            <main className="flex-1 px-4 pt-6 space-y-6">
                <section className="flex flex-col items-center text-center py-4 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/20 rounded-full blur-3xl -z-10"></div>
                    <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary-dark rounded-3xl flex items-center justify-center shadow-lg shadow-primary/30 mb-5 animate-bounce-slow">
                        <span className="material-symbols-outlined text-5xl text-white">rocket_launch</span>
                    </div>
                    <div className="space-y-1">
                        <span className="px-3 py-1 bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold uppercase tracking-wider rounded-full border border-green-500/20">Ready to Ship</span>
                        <h2 className="text-2xl font-bold leading-tight pt-2">{feature.name}</h2>
                        <p className="text-zinc-500 dark:text-zinc-400 text-sm max-w-xs mx-auto">
                            Version 1.0 • {feature.type || 'Feature'} Module
                        </p>
                    </div>
                </section>

                <section className="bg-card-light dark:bg-card-dark rounded-xl overflow-hidden shadow-sm border border-zinc-200 dark:border-white/5">
                    <div className="bg-zinc-50 dark:bg-white/5 px-5 py-3 border-b border-zinc-200 dark:border-white/5 flex justify-between items-center">
                        <h3 className="font-bold text-sm uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Projected Impact</h3>
                        <span className="material-symbols-outlined text-zinc-400 text-lg">insights</span>
                    </div>
                    <div className="p-5 space-y-4">
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-green-500/10 rounded-lg shrink-0 mt-0.5">
                                <span className="material-symbols-outlined text-green-500 text-xl">trending_up</span>
                            </div>
                            <div>
                                <p className="font-bold text-base">Conversion Boost</p>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">Expected <span className="text-green-600 dark:text-green-400 font-bold">{impact.conversion} increase</span> in signup conversion based on experimental data.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="p-2 bg-blue-500/10 rounded-lg shrink-0 mt-0.5">
                                <span className="material-symbols-outlined text-blue-500 text-xl">verified_user</span>
                            </div>
                            <div>
                                <p className="font-bold text-base">Reduced Friction</p>
                                <p className="text-sm text-zinc-500 dark:text-zinc-400">Simplifies onboarding flow. Positive impact on user satisfaction scores.</p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="bg-card-light dark:bg-card-dark rounded-xl overflow-hidden shadow-sm border border-zinc-200 dark:border-white/5">
                    <div className="bg-zinc-50 dark:bg-white/5 px-5 py-3 border-b border-zinc-200 dark:border-white/5 flex justify-between items-center">
                        <h3 className="font-bold text-sm uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Cost Analysis</h3>
                        <span className="material-symbols-outlined text-zinc-400 text-lg">payments</span>
                    </div>
                    <div className="p-4 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <span className="material-symbols-outlined text-zinc-400">dns</span>
                            <div>
                                <p className="text-sm font-medium">Maintenance Cost</p>
                                <p className="text-xs text-zinc-500">Recurring monthly</p>
                            </div>
                        </div>
                        <span className="font-bold text-lg text-zinc-900 dark:text-white">+${maintenanceCost.toLocaleString()}<span className="text-xs font-normal text-zinc-500">/mo</span></span>
                    </div>
                </section>

                <section className="flex gap-3 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl mb-48">
                    <span className="material-symbols-outlined text-orange-500 shrink-0">info</span>
                    <p className="text-xs leading-relaxed text-orange-700 dark:text-orange-300">
                        <span className="font-bold">Heads up:</span> Deploying this feature will update the live production environment for 100% of users. Rollbacks incur a 20% penalty fee.
                    </p>
                </section>
            </main>

            <div className="fixed bottom-0 left-0 right-0 p-4 bg-background-light dark:bg-background-dark/80 backdrop-blur-xl border-t border-zinc-200 dark:border-white/10 z-50">
                <div className="flex flex-col gap-3 max-w-md mx-auto">
                    <button onClick={onConfirm} className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 px-4 rounded-xl shadow-lg shadow-primary/25 active:scale-95 transition-all flex items-center justify-between group">
                        <div className="flex items-center gap-3">
                            <div className="bg-white/20 p-1.5 rounded-lg">
                                <span className="material-symbols-outlined text-xl">rocket_launch</span>
                            </div>
                            <div className="text-left">
                                <span className="block text-sm leading-none opacity-80 font-medium mb-0.5">Ready?</span>
                                <span className="block text-base leading-none">Confirm Launch</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 text-white/50 group-hover:text-white transition-colors">
                            <span className="text-sm font-mono">00:00</span>
                            <span className="material-symbols-outlined">chevron_right</span>
                        </div>
                    </button>
                    <button onClick={onCancel} className="w-full text-zinc-500 dark:text-zinc-400 font-semibold py-3 px-4 rounded-xl active:scale-95 transition-transform hover:bg-zinc-100 dark:hover:bg-white/5">
                        Cancel Operation
                    </button>
                </div>
            </div>
        </div>
    );
};
