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
        const { company_id, employee_id, duration_days, cost, burnout_reduction } = await req.json()

        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        // 1. Fetch Company (Check Cash)
        const { data: company } = await supabaseClient
            .from('companies')
            .select('cash')
            .eq('id', company_id)
            .single()

        if (!company) throw new Error('Company not found')

        // 2. Check Affordability
        if (company.cash < cost) {
            return new Response(JSON.stringify({ error: 'Insufficient funds' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
        }

        // 3. Deduct Cash
        await supabaseClient
            .from('companies')
            .update({ cash: company.cash - cost })
            .eq('id', company_id)

        // 4. Update Employee (Set Vacation, Reduce Burnout instantly or over time?)
        // Plan says over time in advance-day, but 'Reset to 0' option might need instant effect?
        // Let's do instant reduction for "Long Weekend" type, but set "vacation_remaining_days" for the duration.
        // Actually, advance-day handles "while on vacation, reduce burnout". 
        // But if I want an instant hit (like -15), I can do it here too.

        // Let's rely on advance-day for the "duration" effect, but apply the "cost" effect here.
        // Wait, if I set vacation_remaining_days = 3, and advance-day handles it, that's good.
        // But if the user selects "Reset Burnout", I should probably reset it here or set a flag.

        let updatePayload: any = {
            vacation_remaining_days: duration_days,
            is_training: false, // Cancel training if any
            training_remaining_days: 0
        };

        if (burnout_reduction === 100) {
            updatePayload.burnout = 0; // Instant reset for expensive package
        } else if (burnout_reduction > 0) {
            // Apply instant reduction? Or let the days handle it? 
            // Let's apply instant reduction partially so they see immediate benefit?
            // Or just let the daily loop handle it (e.g. -5 per day).
            // Let's update `burnout` here for the "instant" effect if passed.
            // Fetch current burnout first?
            const { data: emp } = await supabaseClient.from('employees').select('burnout').eq('id', employee_id).single();
            const newBurnout = Math.max(0, (emp.burnout || 0) - burnout_reduction);
            updatePayload.burnout = newBurnout;
        }

        await supabaseClient
            .from('employees')
            .update(updatePayload)
            .eq('id', employee_id)

        return new Response(
            JSON.stringify({ success: true, new_cash: company.cash - cost }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
        )

    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
        )
    }
})
