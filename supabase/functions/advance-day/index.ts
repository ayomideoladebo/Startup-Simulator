import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { GoogleGenerativeAI } from 'https://esm.sh/@google/generative-ai'

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { company_id } = await req.json()
        const authHeader = req.headers.get('Authorization')

        console.log("Auth Header present:", !!authHeader);

        if (!authHeader) {
            throw new Error('Missing Authorization Header')
        }

        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_ANON_KEY') ?? '',
            {
                global: { headers: { Authorization: authHeader } },
                auth: { persistSession: false }
            }
        )

        const { data: { user }, error: userError } = await supabaseClient.auth.getUser()

        if (userError || !user) {
            console.error("Auth Error:", userError);
            return new Response(JSON.stringify({
                error: 'Unauthorized',
                details: userError?.message || 'No user found'
            }), {
                status: 401,
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        const adminClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        // 1. Fetch Current State
        const { data: company } = await adminClient.from('companies').select('*').eq('id', company_id).single()
        if (!company) throw new Error(`Company not found for ID ${company_id}`)

        const { data: gameState } = await adminClient.from('game_state').select('*').eq('company_id', company_id).order('created_at', { ascending: false }).limit(1).maybeSingle()
        if (!gameState) throw new Error(`Game state not found for company ${company_id}`)

        const { data: market } = await adminClient.from('market_trends').select('*').eq('niche', company.niche).eq('week_number', gameState.current_week).maybeSingle()





        // 1b. Fetch Active Features (IN_PROGRESS or TESTING)
        const { data: activeFeatures } = await adminClient
            .from('product_features')
            .select('*')
            .eq('company_id', company_id)
            .in('status', ['in_progress', 'testing'])

        console.log('Found active features:', activeFeatures?.length || 0);

        // 2. Daily Burn Rate
        const burnRate = Math.floor((2000 + (gameState.customers * 0.1) + (1000 * Math.random())) / 30);
        const revenue = gameState.mrr;
        const profit = revenue - burnRate;
        const newCash = company.cash + profit;

        // 3. Increment Date
        const newDay = (gameState.current_day || 0) + 1;
        // Standardize: 7 days per week, 4 weeks per month, 12 months per year (48 weeks/year)
        const newWeek = Math.ceil(newDay / 7);
        const newMonth = Math.ceil(newWeek / 4);

        // 1.1 Competitor Logic: Initialization & Simulation
        // Check if competitors exist for this simulation
        let { data: competitors } = await adminClient.from('competitors').select('*').eq('company_id', company_id).eq('is_active', true);

        if (!competitors || competitors.length < 10) {
            console.log('Initializing Global 10 competitors for simulation...');

            const parodyNames = [
                'Awason', 'Facetome', 'Goggle', 'Mcrosoft', 'Spytify',
                'Netflicks', 'AirTnT', 'Ubar', 'Disscird', 'Instaglam'
            ];
            const niches = ['Fintech', 'E-commerce', 'Social Media', 'AI', 'Healthcare'];

            const newCompetitors = [];

            // Generate distinct startups until we have 10 total
            let needed = 10 - (competitors ? competitors.length : 0);

            for (let i = 0; i < needed; i++) {
                const isDirect = i < 5; // First 5 are direct competitors
                const niche = isDirect ? company.niche : niches[Math.floor(Math.random() * niches.length)];
                const name = i < parodyNames.length ? parodyNames[i] : `Startup ${Math.floor(Math.random() * 1000)}`;

                newCompetitors.push({
                    company_id,
                    name: isDirect ? `${name} (Rival)` : name,
                    niche: niche,
                    market_share: Math.floor(Math.random() * 30) + 1,
                    valuation: Math.floor(Math.random() * 50000000) + 1000000,
                    is_direct_competitor: isDirect,
                    is_active: true,
                    attributes: {
                        aggressiveness: Math.random().toFixed(2),
                        innovation: Math.random().toFixed(2)
                    }
                });
            }

            if (newCompetitors.length > 0) {
                const { data: created } = await adminClient.from('competitors').insert(newCompetitors).select();
                competitors = [...(competitors || []), ...(created || [])];
            }
        }

        // New Entrant Logic (Every ~30-40 days)
        // Simple check: if day % 35 === 0
        if (newDay > 1 && newDay % 35 === 0) {
            const isDirect = Math.random() > 0.7; // 30% chance of direct competitor
            const newC = {
                company_id,
                name: `Rising Star ${newDay}`,
                niche: isDirect ? company.niche : 'AI',
                market_share: 1,
                valuation: 500000,
                is_direct_competitor: isDirect,
                is_active: true,
                attributes: { aggressiveness: 0.9, innovation: 0.9 }
            };
            await adminClient.from('competitors').insert(newC);
        }

        /* Old Logic Removed:
        if (newDay % 7 === 0) {
            newWeek++;
            if (newWeek % 4 === 0) newMonth++;
        }
        */

        let aiDecision = {
            news_headline: null,
            market: { hype_score: market?.hype_score || 50, regulation: market?.regulation_intensity || 10 },
            growth_factor: 1.0,
            churn_factor: 0.0
        };

        const isNewWeek = newDay % 7 === 0;

        if (isNewWeek) {
            try {
                const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') || '')
                const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
                const prompt = `Current Game State: Week: ${newWeek}, Niche: ${company.niche}, Company: ${company.name} (Stage: ${company.stage}, Cash: $${newCash}, MRR: $${revenue}). Task: Simulate next week. Return JSON: {"news_headline": "...", "market": { "hype_score": 50, "regulation": 20 }, "growth_factor": 1.05, "churn_factor": 0.02}`
                const result = await model.generateContent(prompt)
                const text = result.response.text().replace(/```json/g, '').replace(/```/g, '')
                aiDecision = JSON.parse(text)
            } catch (e) {
                console.error("AI Gen Failed:", e);
                aiDecision = { news_headline: "Market is stable.", market: { hype_score: 50, regulation: 10 }, growth_factor: 1.01, churn_factor: 0.01 };
            }
        }

        let growthMult = isNewWeek ? aiDecision.growth_factor : 1.0 + (Math.random() * 0.005);
        let churnMult = isNewWeek ? aiDecision.churn_factor : 0.001;


        // Competitor Actions (Weekly)
        if (isNewWeek && competitors && competitors.length > 0) {
            console.log('Simulating competitor actions...');
            for (const comp of competitors) {
                // Simple AI or Random logic for now (can be replaced with LLM call later)
                const roll = Math.random();
                let action = null;
                let desc = '';

                if (comp.attributes.aggressiveness > 0.7 && roll > 0.5) {
                    action = 'marketing_blitz';
                    desc = `${comp.name} is running a massive ad campaign!`;
                } else if (comp.attributes.innovation > 0.8 && roll > 0.7) {
                    action = 'feature_launch';
                    desc = `${comp.name} launched a cutting-edge feature.`;
                }

                if (action) {
                    await adminClient.from('competitor_actions').insert({
                        competitor_id: comp.id,
                        week_number: newWeek,
                        action_type: action,
                        description: desc,
                        impact_score: 5 // Placeholder
                    });

                    // Direct impact on user? (Maybe increase user churn temporarily)
                    if (action === 'marketing_blitz') {
                        // Increase user churn slightly this week
                        churnMult += 0.005;
                    }
                }
            }
        }

        let newCustomers = Math.floor(gameState.customers * (growthMult - churnMult))
        const finalCustomers = Math.max(0, newCustomers);
        const newMrr = finalCustomers * 10;

        // Add 100 Dev Points per day
        const newDevPoints = (company.dev_points || 0) + 100;

        await adminClient.from('companies').update({
            cash: newCash,
            dev_points: newDevPoints
        }).eq('id', company_id)

        // B. Update Feature Progress (FIX: Round to integer!)
        if (activeFeatures && activeFeatures.length > 0) {
            for (const feat of activeFeatures) {
                console.log(`Processing feature ${feat.name}, status: ${feat.status}, progress: ${feat.progress}`);

                if (feat.status === 'in_progress') {
                    const days = feat.estimated_days || 14;
                    const progressBump = 100 / days;
                    // FIX: Round to integer since progress column is INTEGER
                    let newProgress = Math.round((feat.progress || 0) + progressBump);
                    if (newProgress >= 100) newProgress = 100;

                    console.log(`Feature ${feat.name}: progress ${feat.progress} -> ${newProgress}`);

                    const { error: updateError } = await adminClient
                        .from('product_features')
                        .update({ progress: newProgress })
                        .eq('id', feat.id);

                    if (updateError) console.error(`Failed to update feature ${feat.name}:`, updateError);
                } else if (feat.status === 'testing') {
                    const progressBump = 20;
                    let newProgress = Math.round((feat.progress || 0) + progressBump);
                    let newStatus = 'testing';
                    if (newProgress >= 100) {
                        newProgress = 100;
                        newStatus = 'ready_to_launch';
                    }
                    await adminClient.from('product_features').update({ progress: newProgress, status: newStatus }).eq('id', feat.id)
                }
            }
        }

        // C. Update Game State
        await adminClient.from('game_state').update({
            current_day: newDay,
            current_week: newWeek,
            current_month: newMonth,
            mrr: newMrr,
            customers: finalCustomers,
            turn_count: gameState.turn_count + 1
        }).eq('id', gameState.id)

        if (isNewWeek && aiDecision.news_headline) {
            await adminClient.from('market_trends').insert({
                niche: company.niche,
                week_number: newWeek,
                hype_score: aiDecision.market.hype_score,
                regulation_intensity: aiDecision.market.regulation,
                market_event_summary: aiDecision.news_headline
            })
        }

        // D. Payroll Check
        const turnsSincePayroll = (gameState.turn_count + 1) - (company.last_payroll_turn || 0);
        let payrollStatus = company.payroll_due;
        if (turnsSincePayroll >= 30 && !company.payroll_due) {
            payrollStatus = true;
            await adminClient.from('companies').update({ payroll_due: true }).eq('id', company_id)
        }

        // E. Process Employees (Training, Burnout, Vacation, Experience, Level)
        const { data: allEmployees } = await adminClient.from('employees').select('*').eq('company_id', company_id);
        const levelThresholds = [0, 100, 250, 450, 700, 1000, 1350, 1750, 2200, 2700];

        if (allEmployees && allEmployees.length > 0) {
            for (const emp of allEmployees) {
                if (emp.vacation_remaining_days > 0) {
                    await adminClient.from('employees').update({
                        vacation_remaining_days: emp.vacation_remaining_days - 1,
                        burnout: Math.max(0, (emp.burnout || 0) - 5),
                        days_employed: (emp.days_employed || 0) + 1
                    }).eq('id', emp.id);
                    continue;
                }

                if (emp.is_training) {
                    const newRemaining = Math.max(0, (emp.training_remaining_days || 0) - 1);
                    const trainingXp = 2;

                    if (newRemaining <= 0) {
                        const newSkill = Math.min(100, (emp.skill_quality || 50) + (emp.training_pending_skill || 0));
                        const newMorale = Math.max(0, Math.min(100, (emp.morale || 100) + (emp.training_pending_morale || 0)));
                        const newXp = (emp.experience || 0) + trainingXp + 20;
                        let newLevel = emp.level || 1;
                        for (let lvl = 9; lvl >= 0; lvl--) { if (newXp >= levelThresholds[lvl]) { newLevel = lvl + 1; break; } }

                        await adminClient.from('employees').update({
                            is_training: false, training_remaining_days: 0, skill_quality: newSkill, morale: newMorale,
                            training_program_name: null, training_pending_skill: 0, training_pending_morale: 0,
                            experience: newXp, level: newLevel, days_employed: (emp.days_employed || 0) + 1
                        }).eq('id', emp.id);
                    } else {
                        await adminClient.from('employees').update({
                            training_remaining_days: newRemaining,
                            experience: (emp.experience || 0) + trainingXp,
                            days_employed: (emp.days_employed || 0) + 1
                        }).eq('id', emp.id);
                    }
                } else {
                    // Normal Work: Burnout + Experience
                    const burnoutGain = (emp.morale > 80) ? 0.5 : 1;
                    const newBurnout = Math.min(100, Math.round((emp.burnout || 0) + burnoutGain));
                    const skillFactor = (emp.skill_quality || 50) / 100;
                    const moraleFactor = (emp.morale || 50) / 100;
                    const dailyXp = Math.floor(3 * (1 + (skillFactor + moraleFactor) / 2));
                    const newXp = (emp.experience || 0) + dailyXp;

                    let newLevel = emp.level || 1;
                    for (let lvl = 9; lvl >= 0; lvl--) { if (newXp >= levelThresholds[lvl]) { newLevel = lvl + 1; break; } }

                    await adminClient.from('employees').update({
                        burnout: newBurnout, experience: newXp,
                        days_employed: (emp.days_employed || 0) + 1, level: newLevel
                    }).eq('id', emp.id);
                }
            }
        }

        return new Response(JSON.stringify({
            success: true,
            ai_update: aiDecision,
            game_state: { turn: gameState.turn_count + 1, payroll_due: payrollStatus }
        }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })

    } catch (error: any) {
        console.error('Advance day error:', error);
        return new Response(JSON.stringify({ error: error.message || String(error) }), {
            status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        })
    }
})
