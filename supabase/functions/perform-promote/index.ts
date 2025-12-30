import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Role progression paths - each role can be promoted to specific roles
const ROLE_PROGRESSIONS: { [key: string]: { title: string; salaryMultiplier: number; track: string }[] } = {
    // Engineering Track
    'Junior Developer': [
        { title: 'Developer', salaryMultiplier: 1.25, track: 'Technical' },
    ],
    'Developer': [
        { title: 'Senior Developer', salaryMultiplier: 1.30, track: 'Technical' },
    ],
    'Senior Developer': [
        { title: 'Lead Developer', salaryMultiplier: 1.25, track: 'Technical' },
        { title: 'Engineering Manager', salaryMultiplier: 1.35, track: 'Management' },
    ],
    'Lead Developer': [
        { title: 'Principal Engineer', salaryMultiplier: 1.20, track: 'Technical' },
        { title: 'VP of Engineering', salaryMultiplier: 1.50, track: 'Management' },
    ],

    // Marketing Track
    'Marketing Associate': [
        { title: 'Marketing Specialist', salaryMultiplier: 1.25, track: 'Technical' },
    ],
    'Marketing Specialist': [
        { title: 'Senior Marketing Specialist', salaryMultiplier: 1.25, track: 'Technical' },
    ],
    'Senior Marketing Specialist': [
        { title: 'Marketing Lead', salaryMultiplier: 1.25, track: 'Technical' },
        { title: 'Marketing Manager', salaryMultiplier: 1.35, track: 'Management' },
    ],
    'Marketing Manager': [
        { title: 'Head of Marketing', salaryMultiplier: 1.40, track: 'Management' },
    ],

    // Design Track
    'Junior Designer': [
        { title: 'Designer', salaryMultiplier: 1.25, track: 'Technical' },
    ],
    'Designer': [
        { title: 'Senior Designer', salaryMultiplier: 1.30, track: 'Technical' },
    ],
    'Senior Designer': [
        { title: 'Lead Designer', salaryMultiplier: 1.25, track: 'Technical' },
        { title: 'Design Manager', salaryMultiplier: 1.35, track: 'Management' },
    ],

    // Sales Track
    'Sales Representative': [
        { title: 'Senior Sales Representative', salaryMultiplier: 1.25, track: 'Technical' },
    ],
    'Senior Sales Representative': [
        { title: 'Sales Lead', salaryMultiplier: 1.25, track: 'Technical' },
        { title: 'Sales Manager', salaryMultiplier: 1.40, track: 'Management' },
    ],

    // Support Track
    'Support Specialist': [
        { title: 'Senior Support Specialist', salaryMultiplier: 1.20, track: 'Technical' },
    ],
    'Senior Support Specialist': [
        { title: 'Support Team Lead', salaryMultiplier: 1.25, track: 'Technical' },
        { title: 'Support Manager', salaryMultiplier: 1.35, track: 'Management' },
    ],

    // Generic fallbacks for any role
    'default': [
        { title: 'Senior {role}', salaryMultiplier: 1.25, track: 'Technical' },
        { title: '{role} Manager', salaryMultiplier: 1.35, track: 'Management' },
    ]
}

function getPromotionOptions(currentRole: string, currentSalary: number) {
    let options = ROLE_PROGRESSIONS[currentRole];

    if (!options) {
        // Try to find a partial match or use default
        const baseParts = currentRole.toLowerCase().split(' ');
        for (const [key, value] of Object.entries(ROLE_PROGRESSIONS)) {
            if (key.toLowerCase().includes(baseParts[baseParts.length - 1])) {
                options = value;
                break;
            }
        }
    }

    if (!options) {
        // Use default with role substitution
        options = ROLE_PROGRESSIONS['default'].map(opt => ({
            ...opt,
            title: opt.title.replace('{role}', currentRole)
        }));
    }

    // Calculate new salaries
    return options.map(opt => ({
        ...opt,
        newSalary: Math.round(currentSalary * opt.salaryMultiplier),
        salaryIncrease: Math.round(currentSalary * (opt.salaryMultiplier - 1))
    }));
}

Deno.serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const { company_id, employee_id, new_role, new_salary, promotion_bonus } = await req.json()

        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        // For "get options" request (no new_role means they're just fetching options)
        if (!new_role && employee_id) {
            const { data: employee } = await supabaseClient
                .from('employees')
                .select('role, salary')
                .eq('id', employee_id)
                .single()

            if (!employee) {
                throw new Error('Employee not found')
            }

            const options = getPromotionOptions(employee.role, employee.salary)

            return new Response(
                JSON.stringify({ success: true, options, current_role: employee.role, current_salary: employee.salary }),
                { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
        }

        // Execute promotion
        if (!company_id || !employee_id || !new_role || !new_salary) {
            throw new Error('Missing required fields for promotion')
        }

        // 1. Fetch Company
        const { data: company } = await supabaseClient
            .from('companies')
            .select('cash')
            .eq('id', company_id)
            .single()

        if (!company) throw new Error('Company not found')

        // 2. Check Affordability (promotion bonus)
        const bonusAmount = promotion_bonus || 5000
        if (company.cash < bonusAmount) {
            return new Response(
                JSON.stringify({ success: false, error: 'Insufficient funds for promotion bonus' }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
        }

        // 3. Fetch Employee
        const { data: employee } = await supabaseClient
            .from('employees')
            .select('*')
            .eq('id', employee_id)
            .single()

        if (!employee) throw new Error('Employee not found')

        // 4. Deduct Bonus
        await supabaseClient
            .from('companies')
            .update({ cash: company.cash - bonusAmount })
            .eq('id', company_id)

        // 5. Update Employee Role & Salary + Level Increase
        const newMorale = Math.min(100, (employee.morale || 50) + 30) // Big morale boost
        const newBurnout = Math.max(0, (employee.burnout || 0) + 10)  // Slight stress increase
        const newLevel = Math.min(10, (employee.level || 1) + 1)     // +1 Level on promotion (max 10)
        const bonusXp = 100  // Bonus XP for promotion
        const newExperience = (employee.experience || 0) + bonusXp

        await supabaseClient
            .from('employees')
            .update({
                role: new_role,
                salary: new_salary,
                morale: newMorale,
                burnout: newBurnout,
                level: newLevel,
                experience: newExperience
            })
            .eq('id', employee_id)

        return new Response(
            JSON.stringify({
                success: true,
                old_role: employee.role,
                new_role: new_role,
                old_salary: employee.salary,
                new_salary: new_salary,
                bonus_paid: bonusAmount,
                new_cash: company.cash - bonusAmount
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
