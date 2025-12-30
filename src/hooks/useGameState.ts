import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export interface DashboardData {
    company: any;
    gameState: any;
    competitors: any[];
    marketTrends: any;
    loading: boolean;
    error: string | null;
}

export const useGameState = () => {
    const [data, setData] = useState<DashboardData>({
        company: null,
        gameState: null,
        competitors: [],
        marketTrends: null,
        loading: true,
        error: null
    });

    useEffect(() => {
        const fetchGameData = async () => {
            try {
                // 1. Get User
                const { data: { user } } = await supabase.auth.getUser();
                if (!user) throw new Error("Not authenticated");

                // 2. Fetch Player Company (Get the latest one if multiple exist)
                const { data: company, error: companyError } = await supabase
                    .from('companies')
                    .select('*')
                    .eq('owner_id', user.id)
                    .order('created_at', { ascending: false })
                    .limit(1)
                    .single();

                if (companyError) throw companyError;

                // 3. Fetch Game State
                const { data: gameState, error: stateError } = await supabase
                    .from('game_state')
                    .select('*')
                    .eq('company_id', company.id)
                    .order('created_at', { ascending: false })
                    .limit(1)
                    .single();

                if (stateError) throw stateError;

                // 4. Fetch Competitors (Same Niche, NOT Player)
                const { data: competitors, error: compError } = await supabase
                    .from('companies')
                    .select('*')
                    .eq('niche', company.niche)
                    .eq('is_player', false)
                    .order('cash', { ascending: false }); // Simple sort by funds for now

                if (compError) throw compError;

                // 5. Fetch Market Trends
                const { data: trends, error: trendsError } = await supabase
                    .from('market_trends')
                    .select('*')
                    .eq('niche', company.niche)
                    .eq('week_number', gameState.current_week)
                    .maybeSingle(); // Might be null if not generated yet

                setData({
                    company,
                    gameState,
                    competitors: competitors || [],
                    marketTrends: trends,
                    loading: false,
                    error: null
                });

            } catch (err: any) {
                console.error("Error fetching game data:", err);
                setData(prev => ({ ...prev, loading: false, error: err.message }));
            }
        };

        fetchGameData();

        // Optional: Subscription logic could go here for real-time updates

    }, []);

    return data;
};
