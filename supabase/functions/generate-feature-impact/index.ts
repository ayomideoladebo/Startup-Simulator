import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { GoogleGenerativeAI } from 'https://esm.sh/@google/generative-ai'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Deterministic maintenance cost calculation (same as create-feature)
function calculateMaintenanceCost(feature: any): number {
  const baseCost = 100;
  const estimatedDays = feature.estimated_days || 14;
  const complexityBonus = Math.min(200, Math.round((estimatedDays / 14) * 100));
  const typeBonus = feature.feature_type === 'ai' ? 150
    : feature.feature_type === 'core' ? 100
      : feature.feature_type === 'growth' ? 50
        : 0;
  const marketFit = feature.market_fit_score || 50;
  const innovation = feature.innovation_score || 50;
  const impactBonus = Math.round(((marketFit + innovation) / 200) * 100);
  return Math.min(500, Math.max(100, baseCost + complexityBonus + typeBonus + impactBonus));
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { feature_id } = await req.json()

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // 1. Fetch Feature and Company
    const { data: feature, error: featureError } = await supabaseClient
      .from('product_features')
      .select('*, companies(*)')
      .eq('id', feature_id)
      .single()

    if (!feature) throw new Error('Feature not found')

    // 2. Check if analysis already exists
    if (feature.impact_analysis && Object.keys(feature.impact_analysis).length > 0) {
      return new Response(
        JSON.stringify(feature.impact_analysis),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    }

    // 3. Calculate maintenance cost deterministically (NO AI needed for cost!)
    const maintenanceCost = feature.maintenance_cost || calculateMaintenanceCost(feature);

    // 4. Generate Impact Analysis with Gemini (only impact, not cost)
    const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') || '')
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' })

    const prompt = `
        Task: Analyze the projected impact for a product feature deployment.
        
        Feature: "${feature.name}"
        Description: "${feature.description || 'No description provided'}"
        Type: ${feature.feature_type}
        Company Niche: ${feature.companies.niche}
        Stage: ${feature.companies.stage}
        Market Fit: ${feature.market_fit_score}/100
        Innovation: ${feature.innovation_score}/100

        Generate realistic, slightly optimistic impact metrics.

        Return JSON ONLY:
        {
            "impact": {
                "conversion": "String (e.g. '+24%')",
                "satisfaction": "String (e.g. 'Positive' or 'High')"
            },
            "summary": "Short sentence explaining the result."
        }
    `

    let analysis: any = {};
    try {
      const result = await model.generateContent(prompt)
      const text = result.response.text();
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[0]);
      }
    } catch (e) {
      console.error("AI Generation failed:", e);
      // Fallback based on scores
      const conversionBoost = Math.round(5 + (feature.market_fit_score || 50) / 5);
      analysis = {
        impact: { conversion: `+${conversionBoost}%`, satisfaction: "Positive" },
        summary: "Standard feature rollout expected."
      }
    }

    // Add cost to analysis (deterministic, not from AI)
    analysis.cost = { deployment: 0, maintenance: maintenanceCost };

    // 5. Update Database
    await supabaseClient
      .from('product_features')
      .update({
        impact_analysis: analysis,
        maintenance_cost: maintenanceCost
      })
      .eq('id', feature_id)

    return new Response(
      JSON.stringify(analysis),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )

  } catch (error: any) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }
})
