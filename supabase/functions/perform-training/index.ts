import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { company_id, employee_id, cost, skill_gain, morale_impact, training_program_name, duration_days } = await req.json()

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // 1. Fetch Company
    const { data: company, error: companyError } = await supabaseClient
      .from('companies')
      .select('cash')
      .eq('id', company_id)
      .single()

    if (!company) throw new Error('Company not found')

    // 2. Check Funds
    if (company.cash < cost) {
      return new Response(
        JSON.stringify({
          success: false,
          error: `Insufficient funds.`
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    }

    // 3. Execute Transaction

    // A. Deduct Cash
    await supabaseClient
      .from('companies')
      .update({ cash: company.cash - cost })
      .eq('id', company_id)

    // B. Queue Training on Employee (Set is_training = true)
    await supabaseClient
      .from('employees')
      .update({
        is_training: true,
        training_program_name: training_program_name || 'Training',
        training_remaining_days: duration_days || 7,
        training_pending_skill: skill_gain || 0,
        training_pending_morale: morale_impact || 0
      })
      .eq('id', employee_id)

    return new Response(
      JSON.stringify({
        success: true,
        message: "Training started",
        new_cash: company.cash - cost
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    )
  }
})
