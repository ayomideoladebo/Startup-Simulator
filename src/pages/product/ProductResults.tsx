import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation, useOutletContext } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { LaunchConfirmation } from './LaunchConfirmation';

type GameLayoutContextType = {
    setBottomNavVisible: (visible: boolean) => void;
};

export const ProductResults = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const { featureId } = useParams();
    const { setBottomNavVisible } = useOutletContext<GameLayoutContextType>();
    
    const [feature, setFeature] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [showLaunchConfirmation, setShowLaunchConfirmation] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);

    // If we passed feature data via router state, use it. Otherwise fetch.
    useEffect(() => {
        setBottomNavVisible(false); // Hide bottom nav

        if (state?.feature) {
            setFeature(state.feature);
            setLoading(false);
        } else if (featureId) {
            fetchFeature();
        }

        return () => setBottomNavVisible(true); // Restore on unmount
    }, [featureId, state, setBottomNavVisible]);

    useEffect(() => {
        if (feature && !feature.impact_analysis && !analyzing) {
            generateImpact();
        }
    }, [feature]);

    const fetchFeature = async () => {
        const { data, error } = await supabase
            .from('product_features')
            .select('*')
            .eq('id', featureId)
            .single();
        if (data) setFeature(data);
        setLoading(false);
    };

    const generateImpact = async () => {
        if (!feature) return;
        setAnalyzing(true);
        console.log('Generating impact analysis...');
        
        try {
            const { data, error } = await supabase.functions.invoke('generate-feature-impact', {
                body: { feature_id: feature.id }
            });

            if (!error && data) {
                setFeature((prev: any) => ({
                    ...prev,
                    impact_analysis: data,
                    maintenance_cost: data.cost?.maintenance || 0
                }));
            }
        } catch (e) {
            console.error('Error generating analysis:', e);
        } finally {
            setAnalyzing(false);
        }
    };

    const handleLaunchClick = () => {
        setShowLaunchConfirmation(true);
    };

    const handleConfirmLaunch = async () => {
        if (!feature) return;
        
        // Update to LIVE
        const { error } = await supabase
            .from('product_features')
            .update({ status: 'live', progress: 100 })
            .eq('id', feature.id);

        if (!error) navigate('/product');
    };

    const handleDiscard = async () => {
        if (!feature) return;
        // Kill it
        const { error } = await supabase
            .from('product_features')
            .update({ status: 'killed' })
            .eq('id', feature.id);

        if (!error) navigate('/product');
    };

    if (loading) return <div className="text-white p-10">Loading results...</div>;
    if (!feature) return <div className="text-white p-10">Feature not found</div>;

    if (showLaunchConfirmation) {
        return (
            <LaunchConfirmation 
                feature={feature}
                analysis={feature.impact_analysis}
                onConfirm={handleConfirmLaunch}
                onCancel={() => setShowLaunchConfirmation(false)}
            />
        );
    }

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-zinc-900 dark:text-white antialiased overflow-x-hidden min-h-screen relative flex flex-col pb-32">
            
            {/* Header */}
            <header className="sticky top-0 z-50 bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-zinc-200 dark:border-white/5">
                <button onClick={() => navigate('/product')} className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-2xl">arrow_back</span>
                </button>
                <h1 className="text-base font-semibold tracking-wide uppercase text-zinc-500 dark:text-zinc-400">Experiment #{feature.id.slice(0, 4)}</h1>
                <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-2xl">share</span>
                </button>
            </header>

            {/* Main Content */}
            <main className="flex-1 px-4 pt-6 space-y-6">
                {/* Title & Status Section */}
                <section>
                    <div className="flex flex-wrap gap-2 mb-3">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/10 text-green-600 dark:text-green-400 text-xs font-bold uppercase tracking-wider border border-green-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                            Test Completed
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary dark:text-primary-300 text-xs font-bold uppercase tracking-wider border border-primary/20">
                            High Impact
                        </span>
                    </div>
                    <h2 className="text-3xl font-bold leading-tight mb-2">{feature.name}</h2>
                    <div className="flex items-center text-zinc-500 dark:text-zinc-400 text-sm">
                        <span className="material-symbols-outlined text-lg mr-1">calendar_today</span>
                        <span>Development Time: {feature.current_week_effort || 3} Weeks</span>
                    </div>
                </section>

                {/* Hypothesis Card */}
                <section className="bg-card-light dark:bg-card-dark rounded-xl p-5 shadow-sm border border-zinc-200 dark:border-white/5">
                    <div className="flex items-start gap-3 mb-4">
                        <div className="p-2 bg-purple-500/10 rounded-lg">
                            <span className="material-symbols-outlined text-primary">lightbulb</span>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">Goal</h3>
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1 leading-relaxed">
                                {feature.description || "Improve user retention and engagement through new functionality."}
                            </p>
                        </div>
                    </div>
                    <div className="pt-4 border-t border-zinc-100 dark:border-white/5">
                        <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Methodology</h4>
                        <p className="text-sm dark:text-zinc-300">Beta Test (50% Rollout) on active users.</p>
                    </div>
                </section>

                {/* AI Insight Box */}
                <section className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-xl blur-sm"></div>
                    <div className="relative bg-card-light dark:bg-[#1a1523] rounded-xl p-5 border border-primary/30">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="material-symbols-outlined text-primary animate-pulse">auto_awesome</span>
                            <h3 className="font-bold text-primary text-sm uppercase tracking-wide">AI Analysis</h3>
                        </div>
                        <p className="text-sm leading-relaxed dark:text-zinc-200">
                            <strong className="text-white">Success validated.</strong> The data shows a clear preference for this feature.
                            User feedback indicates high satisfaction. Recommended for full rollout.
                        </p>
                        <div className="mt-4 pt-3 border-t border-primary/10 flex justify-between items-center">
                            <span className="text-xs text-zinc-500">Confidence Score</span>
                            <div className="flex items-center gap-2">
                                <div className="flex gap-0.5">
                                    <div className="w-1.5 h-3 bg-primary rounded-sm"></div>
                                    <div className="w-1.5 h-3 bg-primary rounded-sm"></div>
                                    <div className="w-1.5 h-3 bg-primary rounded-sm"></div>
                                    <div className="w-1.5 h-3 bg-primary rounded-sm"></div>
                                    <div className="w-1.5 h-3 bg-primary/30 rounded-sm"></div>
                                </div>
                                <span className="text-xs font-bold text-primary">High</span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Fixed Bottom Actions */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-background-light dark:bg-background-dark/80 backdrop-blur-xl border-t border-zinc-200 dark:border-white/10 z-50">
                <div className="flex flex-col gap-3 max-w-md mx-auto">
                    <div className="flex gap-3">
                        <button onClick={handleDiscard} className="flex-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white font-semibold py-3.5 px-4 rounded-xl active:scale-95 transition-transform flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-[20px]">delete</span>
                            Discard
                        </button>
                        <button onClick={() => navigate('/product')} className="flex-1 bg-zinc-200 dark:bg-zinc-800 text-zinc-900 dark:text-white font-semibold py-3.5 px-4 rounded-xl active:scale-95 transition-transform flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-[20px]">science</span>
                            Iterate
                        </button>
                    </div>
                    <button onClick={handleLaunchClick} className="w-full bg-primary text-white font-bold py-4 px-4 rounded-xl shadow-lg shadow-primary/25 active:scale-95 transition-transform flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined">rocket_launch</span>
                        Launch Feature
                        <span className="bg-white/20 text-xs px-2 py-0.5 rounded ml-1">
                             {analyzing ? '...' : `+$${feature.maintenance_cost || feature.impact_analysis?.cost?.maintenance || 0}/mo`}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

