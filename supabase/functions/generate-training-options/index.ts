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

  let role = "Employee"; // Default for fallback scope

  try {
    const body = await req.json()
    role = body.role || "Employee"
    const { skill_level, company_niche } = body

    const apiKey = Deno.env.get('GEMINI_API_KEY');
    if (!apiKey) {
      console.error("GEMINI_API_KEY not found in environment variables.");
      throw new Error("GEMINI_API_KEY not set");
    }

    const genAI = new GoogleGenerativeAI(apiKey)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const prompt = `
            You are an expert HR and Corporate Trainer for a tech startup in the "${company_niche}" space.
            Generate 3 distinct training programs for an employee with the role "${role}" who currently has a skill level of ${skill_level}/100.

            The 3 options should be:
            1. "Quick Refresher": Low cost ($200-$500), Short duration (7 Days / 1 Week), Low skill gain (+2-4), Neutral morale.
            2. "Standard Workshop": Medium cost ($800-$1500), Medium duration (14-21 Days / 2-3 Weeks), Medium skill gain (+5-10), Good morale (+5).
            3. "Intensive Bootcamp" or "Conference": High cost ($2000-$5000), Long duration (30-60 Days / 4-8 Weeks), High skill gain (+10-20), High morale (+15) OR High Stress (-5 morale) depending on the vibe.

            Return ONLY a valid JSON array of objects with this structure (no markdown):
            [
                {
                    "id": "generated_id",
                    "title": "Program Title",
                    "description": "Short description of what they learn",
                    "cost": 500,
                    "duration_days": 14,
                    "skill_gain": 3,
                    "morale_impact": 0,
                    "type": "refresher" | "workshop" | "bootcamp"
                }
            ]
        `

    const result = await model.generateContent(prompt)
    const response = await result.response
    const text = response.text()

    let trainingOptions = []
    try {
      // strip markdown code blocks if present
      const cleanText = text.replace(/```json/g, '').replace(/```/g, '')
      trainingOptions = JSON.parse(cleanText)
    } catch (e) {
      console.error('Failed to parse AI response:', text)
      throw new Error("Invalid JSON from AI");
    }

    return new Response(
      JSON.stringify({ success: true, options: trainingOptions }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )

  } catch (error) {
    console.error('Error generating training options:', error);

    // Dynamic Fallback using the Role variable
    const fallbackOptions = [
      {
        id: 'fallback_1',
        title: `${role} Refresher`,
        description: `Basic updates on ${role} best practices.`,
        cost: 250,
        duration_days: 7, // 1 Week
        skill_gain: 3,
        morale_impact: 0,
        type: 'refresher'
      },
      {
        id: 'fallback_2',
        title: `Advanced ${role} Workshop`,
        description: `Deep dive into modern ${role} tools.`,
        cost: 950,
        duration_days: 21, // 3 Weeks
        skill_gain: 7,
        morale_impact: 5,
        type: 'workshop'
      },
      {
        id: 'fallback_3',
        title: `${role} Leadership Summit`,
        description: `Global conference for senior ${role}s.`,
        cost: 2500,
        duration_days: 42, // 6 Weeks
        skill_gain: 15,
        morale_impact: 15,
        type: 'bootcamp'
      }
    ];

    return new Response(
      JSON.stringify({ success: true, options: fallbackOptions, error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }
})
