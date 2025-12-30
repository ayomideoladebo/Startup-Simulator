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
        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        // 1. Fetch Player Company to get Niche
        const { data: company } = await supabaseClient
            .from('companies')
            .select('niche')
            .eq('id', company_id)
            .single()

        if (!company) throw new Error('Company not found')

        // 2. Initialize Gemini
        const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') || '')
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' })

        // 3. Prompt for Rivals AND Market Trends
        const prompt = `
      You are the Game Master for a startup simulation game.
      The player has started a company in the "${company.niche}" niche.
      
      Part 1: Generate 5 AI Competitor Companies in this niche.
      - Names should be realistic but legally distinct parodies (e.g., "Amazone" instead of Amazon, "SalesForce" -> "ForceSales").
      - "aggression" (1-100): How likely they are to attack/copy.
      - "innovation" (1-100): How fast they build tech.
      - "market_share" (1-100): Current dominance (Total sum excluding player should be around 80-90%).
      
      Part 2: Generate the Initial Market Trend for this niche.
      - "hype_score" (1-100).
      - "regulation_intensity" (1-100).
      - "event_summary": A one-line news headline about the state of this industry (e.g., "AI Regulation Looming").

      Return ONLY valid JSON in this format:
      {
        "competitors": [
          { "name": "...", "description": "...", "ai_persona": { "aggression": 50, "innovation": 80 }, "market_share": 30 }
        ],
        "market": {
          "hype_score": 80,
          "regulation_intensity": 20,
          "event_summary": "..."
        }
      }
    `

        const result = await model.generateContent(prompt)
        const responseText = result.response.text()

        // Clean up markdown block if present
        const cleanedJson = responseText.replace(/```json/g, '').replace(/```/g, '')
        const generatedData = JSON.parse(cleanedJson)

        // 4. Insert Competitors
        const competitorsToInsert = generatedData.competitors.map((comp: any) => ({
            name: comp.name,
            niche: company.niche,
            is_player: false,
            description: comp.description,
            ai_persona: comp.ai_persona,
            owner_id: null, // AI owned
            cash: 10000000, // AI has deep pockets
            stage: 'Series B'
        }))

        const { error: compError } = await supabaseClient
            .from('companies')
            .insert(competitorsToInsert)

        if (compError) throw compError

        // 5. Insert Market Trend
        const { error: marketError } = await supabaseClient
            .from('market_trends')
            .insert({
                niche: company.niche,
                week_number: 1,
                hype_score: generatedData.market.hype_score,
                regulation_intensity: generatedData.market.regulation_intensity,
                market_event_summary: generatedData.market.event_summary,
                competition_density: 50 // Default
            })

        if (marketError) throw marketError

        return new Response(JSON.stringify({ success: true, data: generatedData }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
    }
})
