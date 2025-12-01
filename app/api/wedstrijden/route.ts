import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zrryrepwoqakgzdqncdv.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_KEY

export async function GET() {
    try {
        if (!supabaseKey) {
            return NextResponse.json(
                { error: 'Missing Supabase key. Please add NEXT_PUBLIC_SUPABASE_ANON_KEY or SUPABASE_KEY to your environment variables.' },
                { status: 500 }
            )
        }

        const supabase = createClient(supabaseUrl, supabaseKey)
        const { data, error } = await supabase
            .from("matches")
            .select(`
                id,
                match_date,
                status,
                score_team1,
                score_team2,
                tournament:tournament_id(name),
                team1:team1_id(name, logo_url),
                team2:team2_id(name, logo_url)
            `)
            .order("match_date", { ascending: true });

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json({ matches: data || [] });
    } catch (err) {
        console.error('Error fetching matches:', err);
        return NextResponse.json(
            { error: err instanceof Error ? err.message : 'Unknown error' },
            { status: 500 }
        );
    }
}

