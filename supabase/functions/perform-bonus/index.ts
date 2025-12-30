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
        const { company_id, employee_id, bonus_amount } = await req.json()

        if (!company_id || !employee_id || !bonus_amount) {
            throw new Error('Missing required fields: company_id, employee_id, bonus_amount')
        }

        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        // 1. Fetch Company (Check Cash)
        const { data: company, error: companyError } = await supabaseClient
            .from('companies')
            .select('cash')
            .eq('id', company_id)
            .single()

        if (!company) throw new Error('Company not found')

        // 2. Check Affordability
        if (company.cash < bonus_amount) {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: `Insufficient funds. Need $${bonus_amount.toLocaleString()} but only have $${company.cash.toLocaleString()}`
                }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
        }

        // 3. Fetch Employee
        const { data: employee, error: empError } = await supabaseClient
            .from('employees')
            .select('*')
            .eq('id', employee_id)
            .single()

        if (!employee) throw new Error('Employee not found')

        // 4. Deduct Cash
        await supabaseClient
            .from('companies')
            .update({ cash: company.cash - bonus_amount })
            .eq('id', company_id)

        // 5. Boost Employee Morale & Reduce Burnout
        // Morale boost scales with bonus size (relative to salary)
        const salaryRatio = bonus_amount / (employee.salary || 50000);
        const moraleBoost = Math.min(25, Math.floor(salaryRatio * 100)); // Max 25 points
        const burnoutReduction = Math.min(20, Math.floor(salaryRatio * 80)); // Max 20 points

        const newMorale = Math.min(100, (employee.morale || 50) + moraleBoost);
        const newBurnout = Math.max(0, (employee.burnout || 0) - burnoutReduction);

        await supabaseClient
            .from('employees')
            .update({
                morale: newMorale,
                burnout: newBurnout
            })
            .eq('id', employee_id)

        return new Response(
            JSON.stringify({
                success: true,
                bonus_paid: bonus_amount,
                new_cash: company.cash - bonus_amount,
                morale_boost: moraleBoost,
                burnout_reduction: burnoutReduction,
                new_morale: newMorale,
                new_burnout: newBurnout
            }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )

    } catch (error: any) {
        return new Response(
            JSON.stringify({ error: error.message || String(error) }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }
})
