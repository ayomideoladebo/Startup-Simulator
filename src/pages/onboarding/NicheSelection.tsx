import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import { MobileContainer } from '../../components/layout/MobileContainer';
import { supabase } from '../../lib/supabase';

interface NicheOption {
    id: string;
    name: string;
    description: string;
    icon: string;
    color: string;
    tags: { label: string; color: string }[];
}

const niches: NicheOption[] = [
    {
        id: 'crm',
        name: 'CRM & Business Tools',
        description: 'Build the backbone of enterprise efficiency.',
        icon: 'bar_chart',
        color: 'from-blue-600 to-indigo-900',
        tags: [
            { label: 'Stable', color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' },
            { label: 'B2B', color: 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300' }
        ]
    },
    {
        id: 'ai',
        name: 'AI Productivity',
        description: 'Unlock the future of work with neural networks.',
        icon: 'psychology',
        color: 'from-primary via-purple-600 to-pink-600',
        tags: [
            { label: 'High Growth', color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20' },
            { label: 'High Tech', color: 'bg-primary/20 text-primary border-primary/20' }
        ]
    },
    {
        id: 'fintech',
        name: 'Finance & Fintech',
        description: 'Revolutionize how money moves and grows.',
        icon: 'attach_money',
        color: 'from-yellow-500 to-amber-700',
        tags: [
            { label: 'High Reward', color: 'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20' },
            { label: 'Regulated', color: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20' }
        ]
    },
    {
        id: 'ecommerce',
        name: 'E-commerce & SaaS',
        description: 'Power the next generation of online stores.',
        icon: 'shopping_cart',
        color: 'from-emerald-500 to-teal-700',
        tags: [
            { label: 'Competitive', color: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20' },
            { label: 'Consumer', color: 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300' }
        ]
    },
    {
        id: 'social',
        name: 'Social Platforms',
        description: 'Connect the world through digital platforms.',
        icon: 'hub',
        color: 'from-pink-500 to-rose-600',
        tags: [
            { label: 'Viral Potential', color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20' },
            { label: 'Risky', color: 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20' }
        ]
    },
    {
        id: 'devtools',
        name: 'Dev Tools / API',
        description: 'Build the tools that builders use.',
        icon: 'terminal',
        color: 'from-slate-700 to-black',
        tags: [
            { label: 'Technical', color: 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300' },
            { label: 'Niche', color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20' }
        ]
    }
];

export const NicheSelection = () => {
    const navigate = useNavigate();
    const [selectedNiche, setSelectedNiche] = useState<string>('ai');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [startupName, setStartupName] = useState('');

    const [loading, setLoading] = useState(false);

    const handleInitialize = async () => {
        if (!startupName.trim()) return;
        setLoading(true);

        try {
            // Get current user
            const { data: { user } } = await supabase.auth.getUser();
            
            if (!user) {
                navigate('/login');
                return;
            }

            // 1. Create Company
            const { data: company, error: companyError } = await supabase
                .from('companies')
                .insert({
                    owner_id: user.id,
                    name: startupName,
                    niche: selectedNiche,
                    is_player: true,
                    cash: 100000, // Initial Pre-Seed Funding
                    stage: 'Pre-Seed'
                })
                .select()
                .single();

            if (companyError) throw companyError;

            // 2. Initialize Game State (Week 1)
            const { error: stateError } = await supabase
                .from('game_state')
                .insert({
                    company_id: company.id,
                    current_week: 1,
                    current_month: 1,
                    mrr: 0,
                    customers: 0,
                    team_morale: 100
                });

            if (stateError) throw stateError;

            // 3. Generate World (AI Rivals & Trends) using Edge Function
            // We don't await this if we want speed, BUT for a better UX (showing them appear), we should await.
            // Let's await to ensure Dashboard has data.
            const { error: funcError } = await supabase.functions.invoke('init-game-world', {
                body: { company_id: company.id }
            });

            if (funcError) {
                console.error("World gen failed (non-fatal):", funcError);
                // We proceed anyway, maybe retry later
            }

            // Success!
            navigate('/dashboard');

        } catch (error) {
            console.error('Error initializing game:', error);
            // TODO: Show nice error toast
        } finally {
            setLoading(false);
        }
    };

    return (
        <MobileContainer className="bg-background-light dark:bg-background-dark relative">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

            {/* Top Navigation */}
            <div className="flex items-center p-4 z-10">
                <button
                    onClick={() => navigate('/')}
                    className="flex size-10 shrink-0 items-center justify-center rounded-full active:bg-white/10 transition-colors text-slate-900 dark:text-white"
                >
                    <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                </button>
                <div className="flex-1 text-center pr-10">
                    <span className="text-sm font-medium uppercase tracking-widest text-primary">New Game</span>
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto no-scrollbar pb-32 z-10">
                {/* Header Text */}
                <div className="px-6 pb-6 pt-2">
                    <h1 className="text-3xl font-extrabold leading-tight tracking-tight mb-3 text-white">
                        Where will you <span className="text-primary">disrupt?</span>
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-relaxed">
                        Choose a market to define your initial competition and revenue potential.
                    </p>
                </div>

                {/* Niche Selection List */}
                <div className="px-4 flex flex-col gap-4">
                    {niches.map((niche) => {
                        const isSelected = selectedNiche === niche.id;
                        return (
                            <button
                                key={niche.id}
                                onClick={() => setSelectedNiche(niche.id)}
                                className={clsx(
                                    "group relative flex flex-col gap-3 rounded-2xl p-4 text-left transition-all duration-300",
                                    isSelected
                                        ? "bg-primary/5 dark:bg-primary/10 ring-2 ring-primary shadow-[0_0_20px_rgba(109,19,236,0.3)]"
                                        : "border border-transparent bg-white dark:bg-[#27272A] hover:bg-slate-50 dark:hover:bg-[#323236]"
                                )}
                            >
                                {isSelected && (
                                    <div className="absolute -top-2 -right-2 bg-primary text-white rounded-full p-1 shadow-md">
                                        <span className="material-symbols-outlined text-[16px] font-bold block">check</span>
                                    </div>
                                )}

                                <div className="flex items-start gap-4">
                                    <div className={clsx(
                                        "shrink-0 size-14 rounded-xl flex items-center justify-center shadow-lg bg-gradient-to-br",
                                        niche.color
                                    )}>
                                        <span className="material-symbols-outlined text-white text-[28px]">{niche.icon}</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h3 className={clsx(
                                                "text-lg font-bold transition-colors",
                                                isSelected ? "text-primary" : "text-slate-900 dark:text-white group-hover:text-primary"
                                            )}>
                                                {niche.name}
                                            </h3>
                                        </div>
                                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                                            {niche.description}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2 mt-1 pl-[72px]">
                                    {niche.tags.map((tag, idx) => (
                                        <span
                                            key={idx}
                                            className={clsx(
                                                "inline-flex items-center px-2 py-0.5 rounded text-xs font-medium border",
                                                tag.color.includes('border') ? tag.color : `${tag.color} border-transparent`
                                            )}
                                        >
                                            {tag.label}
                                        </span>
                                    ))}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Sticky Footer */}
            <div className="absolute bottom-0 w-full z-20">
                {/* Gradient fade */}
                <div className="h-12 w-full bg-gradient-to-t from-background-light dark:from-background-dark to-transparent pointer-events-none"></div>
                {/* Button Container */}
                <div className="bg-background-light dark:bg-background-dark px-4 pb-6 pt-2">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="w-full h-14 bg-primary hover:bg-primary/90 active:scale-[0.98] transition-all rounded-xl shadow-lg shadow-primary/30 flex items-center justify-center gap-2 group"
                    >
                        <span className="text-white text-lg font-bold tracking-wide">Initialize Startup</span>
                        <span className="material-symbols-outlined text-white transition-transform group-hover:translate-x-1">rocket_launch</span>
                    </button>
                </div>
            </div>

            {/* Startup Name Modal */}
            {isModalOpen && (
                <div className="absolute inset-0 z-50 flex items-center justify-center px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="w-full max-w-sm bg-card-dark border border-white/10 rounded-2xl p-6 shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-white mb-1">Name Your Startup</h2>
                                <p className="text-white/60 text-sm">Every unicorn starts with a name.</p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-white/40 hover:text-white transition-colors"
                            >
                                <span className="material-symbols-outlined">close</span>
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wider text-white/40 mb-2">Startup Name</label>
                                <input
                                    type="text"
                                    value={startupName}
                                    onChange={(e) => setStartupName(e.target.value)}
                                    placeholder="e.g. PiperNet"
                                    autoFocus
                                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                    onKeyDown={(e) => e.key === 'Enter' && handleInitialize()}
                                />
                            </div>

                            <button
                                onClick={handleInitialize}
                                disabled={!startupName.trim() || loading}
                                className="w-full h-12 bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] transition-all rounded-xl shadow-lg shadow-primary/30 flex items-center justify-center gap-2 group mt-2"
                            >
                                <span className="text-white font-bold tracking-wide">{loading ? 'Generating World...' : 'Launch 🚀'}</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </MobileContainer>
    );
};
