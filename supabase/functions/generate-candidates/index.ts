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
        const { company_id, role = 'Developer', min_skill = 0 } = await req.json()

        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        // 1. Fetch Company for Context
        const { data: company, error: companyError } = await supabaseClient
            .from('companies')
            .select('niche, stage, cash')
            .eq('id', company_id)
            .single()

        if (!company) throw new Error('Company not found')

        // 2. AI Generation
        const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY') || '')
        const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' })

        // Adjust generation count and quality based on min_skill
        const count = min_skill > 85 ? 1 : min_skill > 70 ? 2 : 3;
        const skillRequirement = min_skill > 0 ? `Minimum Skill Level: ${min_skill}/100.` : '';

        const prompt = `
            Task: Generate ${count} job candidates for a startup in the "${company.niche}" niche (Stage: ${company.stage}).
            Role to Hire: ${role}
            ${skillRequirement}

            Generate ${count} distinct personas.
            - Name: Realistic full name.
            - Role: ${role} (or specialized variant, e.g., "Frontend Ninja").
            - Salary Ask: Yearly salary in USD (realistic for startup stage and skill level).
            - Skill Speed (0-100): Coding/working speed. MUST be around or above ${min_skill}.
            - Skill Quality (0-100): Code quality/bug-free rate. MUST be around or above ${min_skill}.
            - Traits: Array of 1-2 string traits (e.g., "Fast Learner", "Lazy", "Perfectionist", "Toxic").
            - Overview: One sentence bio.

            Return JSON:
            {
                "candidates": [
                    { "name": "...", "role": "...", "salary": 80000, "speed": 80, "quality": 60, "traits": ["Fast"], "overview": "..." }
                ]
            }
        `

        const result = await model.generateContent(prompt)
        const text = result.response.text().replace(/```json/g, '').replace(/```/g, '')
        const data = JSON.parse(text)

        // 3. Insert Candidates
        const candidatesToInsert = data.candidates.map((cand: any) => ({
            company_id,
            name: cand.name,
            role: cand.role,
            avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${cand.name}`,
            salary_ask: cand.salary,
            skill_speed: cand.speed,
            skill_quality: cand.quality,
            traits: cand.traits
        }))

        const { error: insertError } = await supabaseClient
            .from('job_candidates')
            .insert(candidatesToInsert)

        if (insertError) throw insertError

        return new Response(JSON.stringify({ success: true, candidates: candidatesToInsert }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })

    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
    }
})
