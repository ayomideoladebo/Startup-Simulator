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
        const { company_id, employee_id } = await req.json()

        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        // 1. Fetch Employee Data (to calculate severance)
        const { data: employee, error: empError } = await supabaseClient
            .from('employees')
            .select('*')
            .eq('id', employee_id)
            .eq('company_id', company_id)
            .single()

        if (!employee) throw new Error('Employee not found')

        // 2. Calculate Severance (e.g., 2 months salary)
        // Salary is annual.
        const monthlySalary = Math.ceil(employee.salary / 12);
        const severancePay = monthlySalary * 2;

        // 3. Fetch Company Data (to check cash)
        const { data: company, error: compError } = await supabaseClient
            .from('companies')
            .select('cash')
            .eq('id', company_id)
            .single()

        if (!company) throw new Error('Company not found')

        // OPTIONAL: Check if they can afford severance? 
        // Usually firing is allowed even if it puts you in debt, or maybe block it.
        // For now, allow negative cash (debt).

        // 4. Execute Firing

        // A. Deduct Cash
        await supabaseClient
            .from('companies')
            .update({ cash: company.cash - severancePay })
            .eq('id', company_id)

        // B. Delete Employee
        await supabaseClient
            .from('employees')
            .delete()
            .eq('id', employee_id)

        // C. Apply Morale Penalty to Remaining Team
        // Penalty: -15 morale
        const { data: remainingEmployees } = await supabaseClient
            .from('employees')
            .select('id, morale')
            .eq('company_id', company_id)

        if (remainingEmployees && remainingEmployees.length > 0) {
            for (const emp of remainingEmployees) {
                const newMorale = Math.max(0, (emp.morale || 100) - 15);
                await supabaseClient
                    .from('employees')
                    .update({ morale: newMorale })
                    .eq('id', emp.id)
            }
        }

        return new Response(
            JSON.stringify({
                success: true,
                severance_paid: severancePay,
                morale_penalty: 15
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
