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
    const { company_id } = await req.json()

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // 1. Fetch Company & Employees
    const { data: company, error: companyError } = await supabaseClient
      .from('companies')
      .select('*')
      .eq('id', company_id)
      .single()

    if (!company) throw new Error('Company not found')

    const { data: employees } = await supabaseClient
      .from('employees')
      .select('*')
      .eq('company_id', company_id)

    // 2. Calculate Total Monthly Cost
    // Salary in DB is Annual. 
    const totalAnnual = employees?.reduce((acc, curr) => acc + curr.salary, 0) || 0;
    const monthlyCost = Math.ceil(totalAnnual / 12);

    // 3. Check Funds
    if (company.cash < monthlyCost) {
      return new Response(
        JSON.stringify({
          success: false,
          error: `Insufficient funds. Need $${monthlyCost.toLocaleString()} but only have $${company.cash.toLocaleString()}`
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      )
    }

    // 4. Determine Current Turn (Date)
    const { data: gameState } = await supabaseClient
      .from('game_state')
      .select('turn_count')
      .eq('company_id', company_id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    const currentTurn = gameState?.turn_count || 0;

    // 5. Execute Payment

    // A. Deduct Cash & Update Payroll Timestamp
    await supabaseClient
      .from('companies')
      .update({
        cash: company.cash - monthlyCost,
        last_payroll_turn: currentTurn,
        payroll_due: false
      })
      .eq('id', company_id)

    // B. Boost Morale (Bonus for getting paid!)
    if (employees && employees.length > 0) {
      for (const emp of employees) {
        // Cap morale at 100
        const newMorale = Math.min(100, (emp.morale || 50) + 5);
        await supabaseClient
          .from('employees')
          .update({ morale: newMorale })
          .eq('id', emp.id)
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        paid: monthlyCost,
        new_cash: company.cash - monthlyCost
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
