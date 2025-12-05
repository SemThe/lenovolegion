import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// PandaScore API Config
const PANDASCORE_API_KEY = process.env.NEXT_PUBLIC_PANDASCORE_API_KEY;
// const MATCHES_URL = 'https://api.pandascore.co/csgo/matches/upcoming'
const MATCHES_URL = "https://api.pandascore.co/csgo/matches/past";

const PLAYERS_URL = "https://api.pandascore.co/csgo/players";

// Supabase Client
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Types aangemaakt na ESlint controle
// Types van Pandascore API data
export interface PandaMatch {
  id: number;
  begin_at: string | null;
  status: string;
  winner_id: number | null;
  tournament: PandaTournament | null;
  results?: {
    score: number;
  }[];

  opponents?: {
    opponent: PandaOpponent;
  }[];
}

export interface PandaOpponent {
  id: number;
  name: string | null;
  image_url: string | null;
  location: string | null;
}

export interface PandaTournament {
  id: number;
  name: string;
  begin_at: string | null;
  end_at: string | null;
}

export interface PandaPlayer {
  id: number;

  name?: string | null;
  nickname?: string | null;
  slug?: string | null;

  first_name?: string | null;
  last_name?: string | null;

  role?: string | null;
  nationality?: string | null;

  current_team?: {
    id: number;
    name: string | null;
    image_url: string | null;
    location: string | null;
    slug: string | null;
  } | null;

  stats?: {
    kills?: number;
    deaths?: number;
    headshots_percentage?: number;
    headshot_percentage?: number;
    kd?: number;
    kd_ratio?: number;
    rating?: number;
  };
}

// Types van supabase data

export interface MatchRow {
  id: number;
  tournament_id: number;
  team1_id: number | null;
  team2_id: number | null;
  match_date: string | null;
  score_team1: string;
  score_team2: string;
  status: string;
  winner_id: number | null;
}

export interface TeamRow {
  id: number;
  name: string | null;
  logo_url: string | null;
  country: string | null;
}

export interface TournamentRow {
  id: number;
  name: string;
  start_date: string | null;
  end_date: string | null;
  game: string;
  theme_id: number;
}

export interface PlayerRow {
  id: number;

  name: string | null;
  nickname: string | null;
  slug: string | null;

  first_name: string | null;
  last_name: string | null;

  role: string | null;
  nationality: string | null;

  current_team_id: number | null;

  kills: number | null;
  deaths: number | null;
  headshots_percentage: number | null;
  headshot_percentage: number | null;
  kd: number | null;
  kd_ratio: number | null;
  rating: number | null;
}

// ---------- UI Types ----------
export interface TeamInfo {
  id: number;
  name: string | null;
  logo_url: string | null;
  country: string | null;
}

export interface MatchListItem {
  id: number;
  match_date: string | null;
  status: string;
  score_team1: number;
  score_team2: number;

  tournament: {
    name: string | null;
  } | null;

  team1: TeamInfo | null;
  team2: TeamInfo | null;
}

// Functie: PandaScore data ophalen en opslaan in Supabase
export async function fetchAndStoreMatches() {
  try {
    // Matches ophalen
    const res = await fetch(`${MATCHES_URL}?token=${PANDASCORE_API_KEY}`);
    const data = await res.json();

    if (!Array.isArray(data)) {
      console.error("❌ PandaScore response is not an array:", data);
      return { success: false, error: "Invalid response format" };
    }

    // Default Theme aanmaken
    const defaultTheme = {
      id: 1,
      name: "Default Theme",
      primary_color: "#ff4655",
      secondary_color: "#0f1923",
      typography: "Roboto",
      logo_url: "https://example.com/logo.png",
      background_url: "https://example.com/bg.png",
    };

    await supabase.from("themes").upsert([defaultTheme], { onConflict: "id" });

    //Tournaments verzamelen
    const tournamentsMap = new Map();
    data.forEach((match: PandaMatch) => {
      if (match.tournament?.id) {
        tournamentsMap.set(match.tournament.id, {
          id: match.tournament.id,
          name: match.tournament.name,
          start_date: match.tournament.begin_at || null,
          end_date: match.tournament.end_at || null,
          game: "CS2",
          theme_id: 1,
        });
      }
    });

    const uniqueTournaments = Array.from(tournamentsMap.values());
    if (uniqueTournaments.length > 0) {
      const { error: tourError } = await supabase
        .from("tournaments")
        .upsert(uniqueTournaments, { onConflict: "id" });
      if (tourError)
        console.error("Tournament insert error:", tourError.message);
    }

    //Teams verzamelen
    const teamsMap = new Map();
    data.forEach((match: PandaMatch) => {
      match.opponents?.forEach((op: { opponent: PandaOpponent }) => {
        if (op?.opponent?.id) {
          teamsMap.set(op.opponent.id, {
            id: op.opponent.id,
            name: op.opponent.name,
            logo_url: op.opponent.image_url,
            country: op.opponent.location || null,
          });
        }
      });
    });
    const uniqueTeams = Array.from(teamsMap.values());
    if (uniqueTeams.length > 0) {
      const { error: teamError } = await supabase
        .from("teams")
        .upsert(uniqueTeams, { onConflict: "id" });
      if (teamError) console.error("Team insert error:", teamError.message);
    }

    // Matches opslaan
    const formattedMatches = data
      .filter((m: PandaMatch) => m.tournament?.id)
      .map((m: PandaMatch) => ({
        id: m.id,
        tournament_id: m.tournament!.id,
        team1_id: m.opponents?.[0]?.opponent?.id || null,
        team2_id: m.opponents?.[1]?.opponent?.id || null,
        match_date: m.begin_at,
        score_team1: m.results?.[0]?.score || 0,
        score_team2: m.results?.[1]?.score || 0,
        status: m.status,
        winner_id: m.winner_id || null,
      }));

    if (formattedMatches.length > 0) {
      const { error: matchError } = await supabase
        .from("matches")
        .upsert(formattedMatches, { onConflict: "id" });
      if (matchError) console.error("Match insert error:", matchError.message);
    }

    // Sponsors toevoegen (dummy)
    const sponsors = uniqueTournaments.map((t) => ({
      tournament_id: t.id,
      name: "HyperX",
      logo_url: "https://example.com/hyperx.png",
      display_order: 1,
    }));
    await supabase.from("sponsors").upsert(sponsors);

    // Players ophalen & opslaan
    try {
      const playersRes = await fetch(
        `${PLAYERS_URL}?token=${PANDASCORE_API_KEY}`
      );

      if (!playersRes.ok) {
        console.error(
          `❌ Players API error: ${playersRes.status} ${playersRes.statusText}`
        );
        return {
          success: false,
          error: `Players API error: ${playersRes.statusText}`,
        };
      }

      const playersData = await playersRes.json();
      console.log(
        `📥 Players API response:`,
        Array.isArray(playersData)
          ? `${playersData.length} players`
          : "Not an array"
      );

      if (!Array.isArray(playersData)) {
        console.error(
          "❌ Players data is not an array:",
          typeof playersData,
          playersData
        );
        return { success: false, error: "Players data is not an array" };
      }

      if (playersData.length === 0) {
        console.warn("⚠️ Geen players data ontvangen van API");
        return { success: true, message: "Geen players data beschikbaar" };
      }

      // Verzamel teams van players en sla ze op
      const playerTeamsMap = new Map<number, TeamRow>();

      playersData.forEach((p: PandaPlayer) => {
        if (p.current_team?.id) {
          playerTeamsMap.set(p.current_team.id, {
            id: p.current_team.id,
            name: p.current_team.name || p.current_team.slug || null,
            logo_url: p.current_team.image_url || null,
            country: p.current_team.location || null,
          });
        }
      });

      // Sla teams van players op (als ze nog niet bestaan)
      const playerTeams = Array.from(playerTeamsMap.values());
      if (playerTeams.length > 0) {
        const { error: playerTeamError } = await supabase
          .from("teams")
          .upsert(playerTeams, { onConflict: "id" });

        if (playerTeamError) {
          console.error(
            "⚠️ Player teams insert error:",
            playerTeamError.message
          );
        } else {
          console.log(`✅ ${playerTeams.length} teams van players opgeslagen`);
        }
      }

      // Haal bestaande team IDs op uit database
      const { data: existingTeams } = await supabase.from("teams").select("id");

      const existingTeamIds = new Set(
        existingTeams?.map((t: Pick<TeamRow, "id">) => t.id) || [] // Je krijgt alleen id:number terug
      );

      // Format players data - filter alleen players met bestaande team_id of null team_id
      const formattedPlayers = playersData
        .filter((p: PandaPlayer) => {
          if (!p.id) return false; // Filter players zonder ID
          const teamId = p.current_team?.id || null;
          // Alleen opslaan als team_id null is OF als team bestaat in database
          return teamId === null || existingTeamIds.has(teamId);
        })
        .map((p: PandaPlayer) => ({
          id: p.id,
          team_id: p.current_team?.id || null,
          nickname: p.name || p.nickname || p.slug || null,
          real_name:
            p.first_name && p.last_name
              ? `${p.first_name} ${p.last_name}`
              : p.first_name || p.last_name || p.slug || null,
          role: p.role || null,
          nationality: p.nationality || null,
          kills: p.stats?.kills || 0,
          deaths: p.stats?.deaths || 0,
          headshot_percentage:
            p.stats?.headshots_percentage || p.stats?.headshot_percentage || 0,
          kd_ratio: p.stats?.kd || p.stats?.kd_ratio || 0,
          rating: p.stats?.rating || 0,
        }));

      console.log(
        `📝 Formatted ${formattedPlayers.length} players voor opslag (gefilterd op bestaande teams)`
      );

      if (formattedPlayers.length === 0) {
        console.warn("⚠️ Geen players met geldige team_id gevonden");
        return { success: true, message: "Geen players met geldige team_id" };
      }

      // Sla players op
      const { data: insertedPlayers, error: playerError } = await supabase
        .from("players")
        .upsert(formattedPlayers, { onConflict: "id" })
        .select();

      if (playerError) {
        console.error("❌ Player insert error:", playerError);
        console.error(
          "❌ Error details:",
          JSON.stringify(playerError, null, 2)
        );
        return {
          success: false,
          error: `Player insert error: ${playerError.message}`,
          details: playerError,
        };
      } else {
        const count = Array.isArray(insertedPlayers)
          ? insertedPlayers.length
          : formattedPlayers.length;
        console.log(`✅ ${count} spelers succesvol opgeslagen!`);
      }
    } catch (playerErr) {
      console.error("❌ Error bij ophalen/opslaan players:", playerErr);
      return {
        success: false,
        error: `Players error: ${
          playerErr instanceof Error ? playerErr.message : "Unknown error"
        }`,
      };
    }

    console.log(`✅ Alles succesvol gesynchroniseerd!`);
    return { success: true };
  } catch (err) {
    console.error("❌ Error tijdens ophalen:", err);
    return {
      success: false,
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
}

export async function GET() {
  const result = await fetchAndStoreMatches();
  return NextResponse.json(result);
}

export async function POST() {
  const result = await fetchAndStoreMatches();
  return NextResponse.json(result);
}
