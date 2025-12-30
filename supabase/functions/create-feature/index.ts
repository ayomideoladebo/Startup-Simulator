import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { GoogleGenerativeAI } from 'https://esm.sh/@google/generative-ai'

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
    // Handle CORS preflight request
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        console.log("Request received");
        const { company_id, name, feature_type, dev_points, budget } = await req.json()
        console.log("Payload:", { company_id, name, feature_type, dev_points, budget });

        // Initialize Supabase Client
        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        // 1. Fetch Company Context
        const { data: company, error: companyError } = await supabaseClient
            .from('companies')
            .select('niche, stage, cash, dev_points')
            .eq('id', company_id)
            .maybeSingle()

        if (companyError) {
            console.error("Company Fetch Error:", companyError);
            throw new Error(`DB Error: ${companyError.message}`);
        }
        if (!company) {
            console.error("Company not found for ID:", company_id);
            throw new Error("Company not found");
        }

        console.log("Company found:", company);

        if (company.cash < budget) {
            throw new Error(`Insufficient funds. Cash: $${company.cash}, Budget: $${budget}`);
        }

        // Check Dev Points
        const requiredDevPoints = dev_points;
        const currentDevPoints = company.dev_points || 0;
        if (currentDevPoints < requiredDevPoints) {
            throw new Error(`Insufficient Dev Points. Available: ${currentDevPoints}, Required: ${requiredDevPoints}`);
        }

        // 2. AI Analysis
        const apiKey = Deno.env.get('GEMINI_API_KEY');
        if (!apiKey) {
            console.error("Missing GEMINI_API_KEY");
            throw new Error("Server Misconfiguration: Missing AI Key");
        }

        const genAI = new GoogleGenerativeAI(apiKey)
        // User requested 2.0-flash (using -exp for preview availability)
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' })

        const prompt = `
            Context: Startup Game.
            Player Company: Niche: ${company.niche}, Stage: ${company.stage}.
            
            Action: Player is designing a new feature.
            - Name: "${name}"
            - Type: ${feature_type}
            - Dev Effort Allocated: ${dev_points} points (Range 10-500)
            - Budget: $${budget} (Range $1k-$100k)

            Task: Analyze this feature proposal.
            1. Estimate 'Market Fit Score' (0-100): How well does this fit the niche? High budget/effort usually helps, but "nonsense" names should fail.
            2. Estimate 'Complexity Score' (0-100): Higher points = higher complexity.
            3. Estimate 'Innovation Score' (0-100): Is it novel?
            4. Potential Risk (Low/Med/High): Chance of bugs.
            5. Estimated Weeks to Build: (Roughly Dev Points / 7, but adjust for complexity).
            
            Return JSON only:
            {
                "market_fit": 85,
                "complexity": 40,
                "innovation": 60,
                "risk": "Low",
                "weeks": 4
            }
        `;

        const result = await model.generateContent(prompt)
        const text = result.response.text().replace(/```json/g, '').replace(/```/g, '')
        const analysis = JSON.parse(text)

        // 3. Deduct Cash AND Dev Points
        await supabaseClient
            .from('companies')
            .update({
                cash: company.cash - budget,
                dev_points: currentDevPoints - requiredDevPoints
            })
            .eq('id', company_id)

        // 4. Calculate Maintenance Cost (Deterministic Formula: $100-$500 range)
        // Base: $100
        // Complexity: (dev_points / 100) * $100 (500 points = +$500, capped)
        // Type: AI=$150, Core=$100, Growth=$50, Other=$0
        // Impact: ((market_fit + innovation) / 200) * $100
        const baseCost = 100;
        const complexityBonus = Math.min(200, Math.round((dev_points / 100) * 50));
        const typeBonus = feature_type === 'ai' ? 150
            : feature_type === 'core' ? 100
                : feature_type === 'growth' ? 50
                    : 0;
        const impactBonus = Math.round(((analysis.market_fit + analysis.innovation) / 200) * 100);
        const maintenanceCost = Math.min(500, Math.max(100, baseCost + complexityBonus + typeBonus + impactBonus));

        // 5. Create Feature Record
        const { data: newFeature, error } = await supabaseClient
            .from('product_features')
            .insert({
                company_id: company_id,
                name: name,
                feature_type: feature_type,
                status: 'planned', // Changed: User must explicitly click "Build" later
                progress: 0,
                market_fit_score: analysis.market_fit,
                complexity_score: analysis.complexity,
                innovation_score: analysis.innovation,
                estimated_days: Math.ceil(dev_points / 7), // Explicit day estimation
                maintenance_cost: maintenanceCost, // Dynamic maintenance cost
                description: `Risk: ${analysis.risk}. Est. time: ${analysis.weeks} weeks.`
            })
            .select()
            .single()

        if (error) throw error

        return new Response(JSON.stringify({ success: true, feature: newFeature, analysis }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })

    } catch (error) {
        console.error("Handler Error:", error);
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
    }
})
