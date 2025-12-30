import React, { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';

type GameLayoutContextType = {
    setBottomNavVisible: (visible: boolean) => void;
};

import { supabase } from '../../lib/supabase';

// Helper for type safety
interface Feature {
    id: string;
    name: string;
    feature_type: string;
    status: string;
    progress: number;
    impact_est: string;
    market_fit_score?: number;
    description?: string;
    innovation_score?: number;
    complexity_score?: number;
    estimated_days?: number;
}

const formatNumber = (num: number) => {
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(0)}K`;
    return `$${num.toLocaleString()}`;
};

export const Product = () => {
    const [view, setView] = useState<'list' | 'detail'>('list');
    const [isNewFeatureModalOpen, setIsNewFeatureModalOpen] = useState(false);
    const { setBottomNavVisible } = useOutletContext<GameLayoutContextType>();

    // Supabase State
    const [features, setFeatures] = useState<Feature[]>([]);
    const [loading, setLoading] = useState(true);
    const [companyId, setCompanyId] = useState<string | null>(null);
    const [companyCash, setCompanyCash] = useState(0);
    const [companyDevPoints, setCompanyDevPoints] = useState(0);

    // Form State
    const [newFeatureName, setNewFeatureName] = useState('');
    const [newFeatureType, setNewFeatureType] = useState('core');
    const [devPoints, setDevPoints] = useState(100);
    const [budget, setBudget] = useState(10000);
    const [creating, setCreating] = useState(false);

    // Derived State for UI Feedback (Client-side estimation)
    const estImpact = Math.min(100, Math.floor((devPoints * 0.4) + (budget / 1000)));
    const estRisk = Math.min(100, Math.floor((devPoints * 0.2) - (budget / 5000) + 20));
    
    // Feature Types Configuration
    const FEATURE_TYPES = [
        { id: 'core', icon: 'deployed_code', label: 'Core', color: 'text-primary', border: 'border-primary', bg: 'bg-primary/10' },
        { id: 'growth', icon: 'rocket_launch', label: 'Growth', color: 'text-purple-500', border: 'border-purple-500', bg: 'bg-purple-500/10' },
        { id: 'ux', icon: 'design_services', label: 'UX', color: 'text-pink-500', border: 'border-pink-500', bg: 'bg-pink-500/10' },
        { id: 'infra', icon: 'database', label: 'Infra', color: 'text-blue-500', border: 'border-blue-500', bg: 'bg-blue-500/10' },
        { id: 'exp', icon: 'science', label: 'Exp', color: 'text-orange-500', border: 'border-orange-500', bg: 'bg-orange-500/10' },
        { id: 'ai', icon: 'psychology', label: 'AI Tool', color: 'text-emerald-500', border: 'border-emerald-500', bg: 'bg-emerald-500/10' },
    ];

    useEffect(() => {
        const fetchFeatures = async () => {
             try {
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) return; // Should handle auth redirect

                // Get Company
                const { data: company } = await supabase
                    .from('companies')
                    .select('id, cash, dev_points')
                    .eq('owner_id', user.id)
                    .order('created_at', { ascending: false })
                    .limit(1)
                    .single();
                
                if (company) {
                    setCompanyId(company.id);
                    setCompanyCash(company.cash);
                    setCompanyDevPoints(company.dev_points || 0);
                    // Get Features
                    const { data: feats } = await supabase
                        .from('product_features')
                        .select('*')
                        .eq('company_id', company.id)
                        .order('created_at', { ascending: false });
                    
                    setFeatures(feats || []);
                }
            } catch (e) {
                console.error("Error loading features", e);
            } finally {
                setLoading(false);
            }
        };
        fetchFeatures();
    }, []);

    const handleCreateFeature = async () => {
        if (!newFeatureName || !companyId) return;
        setCreating(true);
        try {
            // Call Edge Function for AI Analysis & Creation
            const { data, error } = await supabase.functions.invoke('create-feature', {
                body: {
                    company_id: companyId,
                    name: newFeatureName,
                    feature_type: newFeatureType,
                    dev_points: devPoints,
                    budget: budget
                }
            });

            if (error) throw error;
            if (data?.error) throw new Error(data.error);
            
            // Refetch data
            const { data: company } = await supabase
                    .from('companies')
                    .select('cash, dev_points')
                    .eq('id', companyId)
                    .single();
            if (company) {
                setCompanyCash(company.cash);
                setCompanyDevPoints(company.dev_points || 0);
            }

            const { data: feats } = await supabase
                .from('product_features')
                .select('*')
                .eq('company_id', companyId)
                .order('created_at', { ascending: false });
            setFeatures(feats || []);

            setIsNewFeatureModalOpen(false);
            setNewFeatureName('');
            setDevPoints(100);
            setBudget(10000);
        } catch (e: any) {
            console.error("Failed to create feature:", e);
            alert(e.message || "Failed to create feature");
        } finally {
            setCreating(false);
        }
    };

    const handleStartBuild = async (featureId: string) => {
        try {
            const { error } = await supabase
                .from('product_features')
                .update({ status: 'in_progress' })
                .eq('id', featureId);

            if (error) throw error;
            
            // Optimistic Update
            setFeatures(features.map(f => f.id === featureId ? { ...f, status: 'in_progress' } : f));
        } catch (e) {
            console.error("Failed to start build:", e);
        }
    };

    const handleStartTesting = async (featureId: string) => {
        try {
            const { error } = await supabase
                .from('product_features')
                .update({ status: 'testing', progress: 50 })
                .eq('id', featureId);

            if (error) throw error;
            
            // Optimistic Update
            setFeatures(features.map(f => f.id === featureId ? { ...f, status: 'testing', progress: 50 } : f));
        } catch (e) {
            console.error("Failed to start testing:", e);
        }
    }

    const navigate = useNavigate();

    useEffect(() => {
        // If we represent a full screen view (detail or modal), hide the bottom nav
        if (view === 'detail' || isNewFeatureModalOpen) {
            setBottomNavVisible(false);
        } else {
            setBottomNavVisible(true);
        }

        // Cleanup: ensure we show it when unmounting or leaving
        return () => setBottomNavVisible(true);
    }, [view, isNewFeatureModalOpen, setBottomNavVisible]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-background-light dark:bg-background-dark">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (view === 'detail') {
        return (
            <div className="fixed inset-0 z-50 md:static md:z-auto bg-background-light dark:bg-background-dark flex flex-col min-h-full pb-20 animate-in fade-in slide-in-from-right duration-300 overflow-y-auto no-scrollbar">
                {/* Header */}
                <header className="sticky top-0 z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-slate-200 dark:border-white/10 px-4 py-3 flex items-center justify-between">
                    <button
                        onClick={() => setView('list')}
                        className="flex items-center justify-center p-2 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
                    >
                        <span className="material-symbols-outlined text-slate-600 dark:text-white">arrow_back</span>
                    </button>
                    <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">Manage Feature</h1>
                    <button className="flex items-center justify-center p-2 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-slate-600 dark:text-white">more_vert</span>
                    </button>
                </header>

                <main className="flex-1 flex flex-col gap-6 px-4 py-6">
                    <section className="relative overflow-hidden rounded-2xl bg-white dark:bg-card-dark p-5 border border-slate-200 dark:border-white/5 shadow-sm">
                        <div className="flex items-start justify-between">
                            <div className="flex gap-4">
                                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-pink-500/10 text-pink-500 shadow-inner ring-1 ring-inset ring-pink-500/20">
                                    <span className="material-symbols-outlined text-3xl">smart_toy</span>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-400 text-[10px] font-bold uppercase tracking-wider border border-purple-500/20">Growth</span>
                                        <span className="px-2 py-0.5 rounded-md bg-green-500/10 text-green-400 text-[10px] font-bold uppercase tracking-wider border border-green-500/20 flex items-center gap-1">
                                            <span className="block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Active
                                        </span>
                                    </div>
                                    <h2 className="text-xl font-bold leading-tight text-slate-900 dark:text-white">AI Chatbot</h2>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Version 1.2.0 • Last updated 2d ago</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-white/5">
                            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                                Automated customer support agent that handles Tier 1 inquiries. Reduces human support load and improves response times for basic queries.
                            </p>
                        </div>
                    </section>

                    <section>
                        <h3 className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-3 px-1">Live Performance</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="p-4 rounded-xl bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 shadow-sm">
                                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-2">
                                    <span className="material-symbols-outlined text-sm">group</span>
                                    <span className="text-xs font-semibold">Adoption</span>
                                </div>
                                <div className="flex items-end gap-2">
                                    <span className="text-xl font-bold text-slate-900 dark:text-white">42.5%</span>
                                    <span className="text-xs text-green-400 font-medium mb-1 flex items-center">
                                        <span className="material-symbols-outlined text-sm">trending_up</span> +2%
                                    </span>
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 shadow-sm">
                                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-2">
                                    <span className="material-symbols-outlined text-sm">payments</span>
                                    <span className="text-xs font-semibold">Rev. Impact</span>
                                </div>
                                <div className="flex items-end gap-2">
                                    <span className="text-xl font-bold text-slate-900 dark:text-white">$4.2k<span className="text-sm text-slate-500 font-normal">/mo</span></span>
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 shadow-sm">
                                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-2">
                                    <span className="material-symbols-outlined text-sm">bug_report</span>
                                    <span className="text-xs font-semibold">Bug Reports</span>
                                </div>
                                <div className="flex items-end gap-2">
                                    <span className="text-xl font-bold text-slate-900 dark:text-white">12</span>
                                    <span className="text-xs text-orange-400 font-medium mb-1 flex items-center">
                                        <span className="material-symbols-outlined text-sm">warning</span> Low
                                    </span>
                                </div>
                            </div>
                            <div className="p-4 rounded-xl bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 shadow-sm">
                                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-2">
                                    <span className="material-symbols-outlined text-sm">favorite</span>
                                    <span className="text-xs font-semibold">Retention</span>
                                </div>
                                <div className="flex items-end gap-2">
                                    <span className="text-xl font-bold text-slate-900 dark:text-white">+5.8%</span>
                                    <span className="text-xs text-green-400 font-medium mb-1">Stable</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="relative overflow-hidden rounded-xl p-0.5 bg-gradient-to-br from-primary/50 via-purple-500/20 to-transparent">
                        <div className="relative bg-white dark:bg-[#1e1628] rounded-[10px] p-4">
                            <div className="absolute top-0 right-0 p-3 opacity-10">
                                <span className="material-symbols-outlined text-6xl text-primary">psychology</span>
                            </div>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="material-symbols-outlined text-primary text-lg">auto_awesome</span>
                                <h3 className="text-sm font-bold text-primary uppercase tracking-wide">AI Impact Analysis</h3>
                            </div>
                            <p className="text-sm text-slate-600 dark:text-slate-300 relative z-10">
                                "This feature has successfully reduced customer support overhead by <span className="text-green-600 dark:text-green-400 font-bold">35%</span>. Users engaging with the chatbot show higher session lengths, but sentiment drops if the session exceeds 5 minutes."
                            </p>
                        </div>
                    </section>

                    <section className="mt-auto pt-4">
                        <h3 className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400 tracking-wider mb-3 px-1">Actions</h3>
                        <button className="w-full mb-4 group relative flex items-center justify-between p-4 rounded-xl bg-primary hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 overflow-hidden">
                            <div className="flex items-center gap-3 relative z-10">
                                <div className="bg-white/20 p-2 rounded-lg">
                                    <span className="material-symbols-outlined text-white">upgrade</span>
                                </div>
                                <div className="text-left">
                                    <span className="block text-white font-bold text-base">Upgrade Feature</span>
                                    <span className="block text-white/70 text-xs">Unlock v1.3 • Est. +15% Impact</span>
                                </div>
                            </div>
                            <div className="text-right relative z-10">
                                <span className="block text-white font-mono font-bold text-sm">350 Pts</span>
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                        </button>
                        <div className="grid grid-cols-3 gap-3">
                            <button className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                <span className="material-symbols-outlined text-slate-500 dark:text-slate-400">history</span>
                                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">History</span>
                            </button>
                            <button className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                                <span className="material-symbols-outlined text-orange-400">pause_circle</span>
                                <span className="text-xs font-medium text-slate-600 dark:text-slate-300">Disable</span>
                            </button>
                            <button className="flex flex-col items-center justify-center gap-2 p-3 rounded-xl bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 hover:bg-red-500/10 hover:border-red-500/30 transition-colors group">
                                <span className="material-symbols-outlined text-slate-400 group-hover:text-red-500 transition-colors">delete</span>
                                <span className="text-xs font-medium text-slate-600 dark:text-slate-300 group-hover:text-red-500 transition-colors">Retire</span>
                            </button>
                        </div>
                    </section>
                </main>
            </div>
        )
    }

    return (
        <div className="flex flex-col min-h-full pb-20">
            {/* Top App Bar */}
            <header className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm border-b border-slate-200 dark:border-white/10 px-4 py-3 flex items-center justify-between">
                <button className="flex items-center justify-center p-2 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-slate-600 dark:text-white">menu</span>
                </button>
                <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">Product Development</h1>
                <button className="flex items-center justify-center p-2 rounded-full hover:bg-slate-200 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-slate-600 dark:text-white">settings</span>
                </button>
            </header>

            {/* Stats Bar */}
            <section className="px-4 py-4 w-full overflow-x-auto no-scrollbar">
                <div className="flex gap-3 min-w-max md:grid md:grid-cols-3 md:w-full md:min-w-0">
                    {/* Cash */}
                    <div className="flex flex-col gap-1 rounded-xl p-4 bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 shadow-sm min-w-[140px]">
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                            <span className="material-symbols-outlined text-sm">payments</span>
                            <span className="text-xs font-semibold uppercase tracking-wider">Cash</span>
                        </div>
                        <p className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                            {formatNumber(companyCash)}
                        </p>
                    </div>
                    {/* Dev Points */}
                    <div className="flex flex-col gap-1 rounded-xl p-4 bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 shadow-sm min-w-[140px]">
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                            <span className="material-symbols-outlined text-sm">code</span>
                            <span className="text-xs font-semibold uppercase tracking-wider">Dev Points</span>
                        </div>
                        <p className="text-xl font-bold tracking-tight text-primary">{companyDevPoints}</p>
                    </div>
                    {/* Server Cap */}
                    <div className="flex flex-col gap-1 rounded-xl p-4 bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 shadow-sm min-w-[140px]">
                        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
                            <span className="material-symbols-outlined text-sm">dns</span>
                            <span className="text-xs font-semibold uppercase tracking-wider">Server Cap</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <p className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">65%</p>
                            <span className="material-symbols-outlined text-green-500 text-sm">trending_down</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Category Tabs */}
            <section className="border-b border-slate-200 dark:border-white/10 sticky top-[60px] z-40 bg-background-light dark:bg-background-dark">
                <div className="flex overflow-x-auto no-scrollbar px-4 gap-6">
                    <button className="flex flex-col items-center gap-2 pb-3 pt-2 min-w-[60px] border-b-[3px] border-primary group">
                        <span className="material-symbols-outlined text-primary group-hover:scale-110 transition-transform filled">deployed_code</span>
                        <span className="text-xs font-bold text-primary tracking-wide">Core</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 pb-3 pt-2 min-w-[60px] border-b-[3px] border-transparent group">
                        <span className="material-symbols-outlined text-slate-400 group-hover:text-slate-200 transition-colors">rocket_launch</span>
                        <span className="text-xs font-bold text-slate-400 group-hover:text-slate-200 tracking-wide">Growth</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 pb-3 pt-2 min-w-[60px] border-b-[3px] border-transparent group">
                        <span className="material-symbols-outlined text-slate-400 group-hover:text-slate-200 transition-colors">design_services</span>
                        <span className="text-xs font-bold text-slate-400 group-hover:text-slate-200 tracking-wide">UX</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 pb-3 pt-2 min-w-[60px] border-b-[3px] border-transparent group">
                        <span className="material-symbols-outlined text-slate-400 group-hover:text-slate-200 transition-colors">database</span>
                        <span className="text-xs font-bold text-slate-400 group-hover:text-slate-200 tracking-wide">Infra</span>
                    </button>
                    <button className="flex flex-col items-center gap-2 pb-3 pt-2 min-w-[60px] border-b-[3px] border-transparent group relative">
                        <span className="material-symbols-outlined text-slate-400 group-hover:text-slate-200 transition-colors">psychology</span>
                        <span className="text-xs font-bold text-slate-400 group-hover:text-slate-200 tracking-wide">AI</span>
                        <span className="absolute top-1 right-1 size-2 bg-primary rounded-full animate-pulse"></span>
                    </button>
                </div>
            </section>

            {/* Filter/Sort Chips */}
            <section className="py-4 px-4 overflow-x-auto no-scrollbar">
                <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white text-xs font-medium whitespace-nowrap shadow-lg shadow-primary/20">
                        <span>All Features</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-card-dark border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 text-xs font-medium whitespace-nowrap hover:bg-slate-50 dark:hover:bg-white/5">
                        <span className="material-symbols-outlined text-base">trending_up</span>
                        <span>Highest Impact</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-card-dark border border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300 text-xs font-medium whitespace-nowrap hover:bg-slate-50 dark:hover:bg-white/5">
                        <span className="material-symbols-outlined text-base">savings</span>
                        <span>Lowest Cost</span>
                    </button>
                </div>
            </section>

            {/* Feature List */}
            {/* Feature List */}
            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4 pb-24">
                {loading && <div className="text-white text-center py-10 col-span-full">Loading roadmap...</div>}
                {!loading && features.length === 0 && (
                    <div className="text-white/50 text-center py-10 col-span-full border-2 border-dashed border-white/10 rounded-xl">
                        No features yet. Start building!
                    </div>
                )}
                
                {features.map((feat) => {
                    // 1. PLANNED FEATURE (The "Backlog" Card)
                    if (feat.status === 'planned') {
                        return (
                           <div
                                key={feat.id}
                                onClick={() => setView('detail')}
                                className="group relative overflow-hidden rounded-xl bg-white dark:bg-card-dark p-4 border border-slate-200 dark:border-white/5 shadow-sm hover:border-primary/50 transition-colors cursor-pointer"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary`}>
                                            <span className="material-symbols-outlined">
                                                {feat.feature_type === 'ai' ? 'psychology' : 'deployed_code'}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="text-base font-bold leading-tight flex items-center gap-2 text-slate-900 dark:text-white">
                                                {feat.name}
                                                <span className="px-1.5 py-0.5 rounded-md bg-purple-500/20 text-purple-400 text-[9px] uppercase border border-purple-500/30">New</span>
                                            </h3>
                                            <div className="flex items-center gap-3 mt-1.5">
                                                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[14px]">bolt</span> Impact: <span className="text-green-400">{feat.market_fit_score ? (feat.market_fit_score > 75 ? 'High' : 'Med') : '...'}</span>
                                                </span>
                                                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
                                                    <span className="material-symbols-outlined text-[14px]">warning</span> Risk: <span className="text-orange-400">{feat.complexity_score ? (feat.complexity_score > 60 ? 'High' : 'Low') : '...'}</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* Action Strip */}
                                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-between">
                                    <div className="flex gap-4">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] uppercase text-slate-500">Dev Cost</span>
                                            {/* We use estimated_days if available, else fallback to complexity calculation */}
                                            <span className="text-xs font-bold font-mono text-slate-900 dark:text-white">
                                                ~{feat.estimated_days ? feat.estimated_days : Math.ceil((feat.complexity_score || 0) * 0.2)} Days
                                            </span>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleStartBuild(feat.id);
                                        }}
                                        className="bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold py-2 px-4 rounded-lg transition-colors"
                                    >
                                        Build
                                    </button>
                                </div>
                            </div> 
                        );
                    }

                    // 1.5. READY TO TEST (In Progress 100%)
                    if (feat.status === 'in_progress' && feat.progress >= 100) {
                         return (
                            <div
                                key={feat.id}
                                onClick={() => setView('detail')}
                                className="group relative overflow-hidden rounded-xl bg-white dark:bg-card-dark p-4 border border-slate-200 dark:border-white/5 shadow-sm hover:border-primary/50 transition-colors cursor-pointer"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-green-500`}>
                                            <span className="material-symbols-outlined">check_circle</span>
                                        </div>
                                        <div>
                                            <h3 className="text-base font-bold leading-tight text-slate-900 dark:text-white">{feat.name}</h3>
                                            <p className="text-xs text-slate-500 mt-1">Development Complete</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-end">
                                     <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleStartTesting(feat.id);
                                        }}
                                        className="bg-purple-500 hover:bg-purple-600 text-white text-xs font-bold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
                                    >
                                        <span className="material-symbols-outlined text-[16px]">science</span>
                                        Start Testing
                                    </button>
                                </div>
                            </div>
                         );
                    }

                    // 1.6. READY TO LAUNCH (Testing 100% or ready_to_launch)
                    if (feat.status === 'ready_to_launch') {
                         return (
                            <div
                                key={feat.id}
                                onClick={() => setView('detail')}
                                className="group relative overflow-hidden rounded-xl bg-white dark:bg-card-dark p-4 border border-green-500/30 shadow-sm hover:border-green-500 transition-colors cursor-pointer"
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-green-500`}>
                                            <span className="material-symbols-outlined">rocket_launch</span>
                                        </div>
                                        <div>
                                            <h3 className="text-base font-bold leading-tight text-slate-900 dark:text-white">{feat.name}</h3>
                                            <p className="text-xs text-green-500 mt-1 font-bold uppercase tracking-wider">Ready to Launch</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-white/5 flex items-center justify-end">
                                     <button 
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/product/results/${feat.id}`);
                                        }}
                                        className="bg-green-600 hover:bg-green-500 text-white text-xs font-bold py-2 px-6 rounded-lg transition-colors shadow-lg shadow-green-500/20 flex items-center gap-2 animate-pulse"
                                    >
                                        LAUNCH
                                    </button>
                                </div>
                            </div>
                         );
                    }

                    // 2. ACTIVE / LIVE FEATURE
                    return (
                        <div
                            key={feat.id}
                            onClick={() => setView('detail')}
                            className="relative overflow-hidden rounded-xl bg-white dark:bg-card-dark p-4 border border-slate-200 dark:border-white/5 shadow-sm cursor-pointer hover:border-primary/30 transition-colors"
                        >
                            <div className="flex items-start justify-between gap-4 mb-3">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                        <span className="material-symbols-outlined">
                                            {feat.feature_type === 'ai' ? 'psychology' : 'deployed_code'}
                                        </span>
                                    </div>
                                    <div>
                                        <h3 className="text-base font-bold leading-tight text-slate-900 dark:text-white capitalize">{feat.name}</h3>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 capitalize">{feat.feature_type}</p>
                                    </div>
                                </div>
                                <span className="px-2 py-1 rounded bg-green-500/10 text-green-600 dark:text-green-400 text-[10px] font-bold uppercase tracking-wider">
                                    {feat.status.replace('_', ' ')}
                                </span>
                            </div>
                            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-2">
                                <span>{feat.status === 'testing' ? 'Testing in progress...' : feat.progress < 100 ? 'Developing...' : 'Live'}</span>
                                <span className="text-slate-900 dark:text-white font-mono">{feat.progress}%</span>
                            </div>
                            <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-white/10 overflow-hidden">
                                <div className={`h-full rounded-full ${feat.status === 'testing' ? 'bg-purple-500' : 'bg-primary'}`} style={{ width: `${feat.progress}%` }}></div>
                            </div>
                        </div>
                    );
                })}
            </main>

            {/* Floating Action Button */}
            <div className="fixed bottom-20 right-6 z-50">
                <button
                    onClick={() => setIsNewFeatureModalOpen(true)}
                    className="group flex items-center justify-center size-14 rounded-full bg-primary text-white shadow-xl shadow-primary/40 hover:scale-105 active:scale-95 transition-all"
                >
                    <span className="material-symbols-outlined text-3xl group-hover:rotate-90 transition-transform duration-300">add</span>
                    <span className="sr-only">New Feature</span>
                </button>
            </div>

            {/* New Feature Modal */}
            {isNewFeatureModalOpen && (
                <div className="fixed inset-0 z-[100] flex flex-col bg-background-light dark:bg-background-dark animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-white/10 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md sticky top-0 z-20 shrink-0">
                        <div className="w-10"></div>
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">New Feature</h2>
                        <button
                            onClick={() => setIsNewFeatureModalOpen(false)}
                            className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-200 dark:bg-white/10 hover:bg-slate-300 dark:hover:bg-white/20 transition-colors"
                        >
                            <span className="material-symbols-outlined text-slate-700 dark:text-white">close</span>
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-8 no-scrollbar">
                        <section className="space-y-3">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">Feature Name</label>
                            <div className="relative">
                                <input
                                    className="w-full bg-white dark:bg-card-dark border border-slate-200 dark:border-white/10 rounded-xl px-4 py-4 text-base font-semibold focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-sm text-slate-900 dark:text-white"
                                    placeholder="e.g., Social Integration v2"
                                    onChange={(e) => setNewFeatureName(e.target.value)}
                                    value={newFeatureName}
                                    type="text"
                                />
                                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">edit</span>
                            </div>
                        </section>
                        <section className="space-y-3">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">Feature Type</label>
                            <div className="grid grid-cols-3 gap-3">
                                {FEATURE_TYPES.map((type) => (
                                    <button
                                        key={type.id}
                                        onClick={() => setNewFeatureType(type.id)}
                                        className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all shadow-sm ${
                                            newFeatureType === type.id 
                                            ? `${type.bg} ${type.border} ${type.color}` 
                                            : 'bg-white dark:bg-card-dark border-slate-200 dark:border-white/10 text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5'
                                        }`}
                                    >
                                        <span className="material-symbols-outlined text-2xl">{type.icon}</span>
                                        <span className="text-[10px] font-bold">{type.label}</span>
                                    </button>
                                ))}
                            </div>
                        </section>
                        <section className="p-5 rounded-2xl bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 shadow-sm space-y-6">
                            <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-white">
                                <span className="material-symbols-outlined text-lg text-primary">tune</span>
                                Feature Definition
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-end">
                                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Dev Effort (Points)</label>
                                    <span className="text-sm font-bold font-mono text-primary">{devPoints} Pts</span>
                                </div>
                                <input 
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-primary" 
                                    type="range" 
                                    min="10" 
                                    max="500" 
                                    step="10"
                                    value={devPoints}
                                    onChange={(e) => setDevPoints(parseInt(e.target.value))}
                                />
                                <div className="flex justify-between text-[10px] text-slate-400 uppercase font-medium tracking-wide">
                                    <span>Quick Fix</span>
                                    <span>Major Overhaul</span>
                                </div>
                            </div>
                            <div className="space-y-3 pt-2">
                                <div className="flex justify-between items-end">
                                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Budget Allocation</label>
                                    <span className="text-sm font-bold font-mono text-slate-700 dark:text-slate-200">${budget.toLocaleString()}</span>
                                </div>
                                <input 
                                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer dark:bg-slate-700 accent-green-500" 
                                    type="range" 
                                    min="1000" 
                                    max="50000" 
                                    step="1000" 
                                    value={budget}
                                    onChange={(e) => setBudget(parseInt(e.target.value))}
                                />
                                <div className="flex justify-between text-[10px] text-slate-400 uppercase font-medium tracking-wide">
                                    <span>Bootstrap</span>
                                    <span>Enterprise</span>
                                </div>
                            </div>
                        </section>
                        <section className="p-5 rounded-2xl bg-white dark:bg-card-dark border border-slate-200 dark:border-white/5 shadow-sm space-y-6">
                            <h3 className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-white">
                                <span className="material-symbols-outlined text-lg text-orange-400">analytics</span>
                                Strategic Assessment
                            </h3>
                            <div className="space-y-3">
                                <div className="flex justify-between items-end">
                                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Estimated Impact</label>
                                    <span className={`text-xs font-bold px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 uppercase ${estImpact > 75 ? 'text-green-500' : estImpact > 40 ? 'text-yellow-500' : 'text-slate-500'}`}>
                                        {estImpact > 75 ? 'High' : estImpact > 40 ? 'Medium' : 'Low'}
                                    </span>
                                </div>
                                <div className="relative w-full h-2 rounded-lg bg-slate-100 dark:bg-white/5 overflow-hidden">
                                    <div className={`h-full rounded-full transition-all duration-500 ${estImpact > 75 ? 'bg-green-500' : estImpact > 40 ? 'bg-yellow-500' : 'bg-slate-500'}`} style={{ width: `${estImpact}%`}}></div>
                                </div>
                                <p className="text-[10px] text-slate-400 leading-snug">AI will finalize this upon creation.</p>
                            </div>
                            <div className="space-y-3 pt-2">
                                <div className="flex justify-between items-end">
                                    <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">Risk Profile</label>
                                    <span className={`text-xs font-bold px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 uppercase ${estRisk > 70 ? 'text-red-500' : estRisk > 40 ? 'text-orange-500' : 'text-green-500'}`}>
                                        {estRisk > 70 ? 'High' : estRisk > 40 ? 'Medium' : 'Low'}
                                    </span>
                                </div>
                                <div className="relative w-full h-2 rounded-lg bg-slate-100 dark:bg-white/5 overflow-hidden">
                                    <div className={`h-full rounded-full transition-all duration-500 ${estRisk > 70 ? 'bg-red-500' : estRisk > 40 ? 'bg-orange-500' : 'bg-green-500'}`} style={{ width: `${estRisk}%`}}></div>
                                </div>
                                <p className="text-[10px] text-slate-400 leading-snug">Higher effort increases burn risk.</p>
                            </div>
                        </section>
                    </div>
                    <div className="p-4 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-t border-slate-200 dark:border-white/5 shrink-0 z-20">
                        <div className="flex items-center justify-between mb-3 text-xs px-1">
                            <span className="text-slate-500 dark:text-slate-400">Total Est. Time</span>
                            <span className="font-bold text-slate-800 dark:text-white">~{Math.ceil(devPoints / 7)} Days</span>
                        </div>
                        <button 
                            onClick={handleCreateFeature}
                            disabled={creating || !newFeatureName}
                            className="w-full py-4 bg-primary hover:bg-primary-hover active:scale-[0.98] transition-all rounded-xl shadow-lg shadow-primary/25 flex items-center justify-center gap-2 group disabled:opacity-50"
                        >
                            <span className="text-white font-bold text-base">{creating ? 'Designing...' : 'Start Development'}</span>
                            <span className="material-symbols-outlined text-white group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
