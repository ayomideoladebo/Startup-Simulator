-- Allow users to INSERT game_state if they own the linked company
create policy "Users can insert own game state" on public.game_state
    for insert with check (
        exists (
            select 1 from public.companies
            where companies.id = game_state.company_id
            and companies.owner_id = auth.uid()
        )
    );

-- Allow users to UPDATE game_state if they own the linked company
create policy "Users can update own game state" on public.game_state
    for update using (
        exists (
            select 1 from public.companies
            where companies.id = game_state.company_id
            and companies.owner_id = auth.uid()
        )
    );
