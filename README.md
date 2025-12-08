## Pandascore Bracket & Wedstrijden

Next.js 15 app voor het tonen van CSGO/CS2-wedstrijden en een bracket-overzicht. Data komt uit Supabase; de `/api/matches` route kan PandaScore synchroniseren naar de Supabase-tabellen.

### Snel starten
1) Vereisten: Node 18+, npm.
2) Installeer dependencies:
```bash
npm install
```
3) Voeg een `.env.local` toe (zie Omgevingsvariabelen).
4) Start dev-server op http://localhost:3000:
```bash
npm run dev
```

### Omgevingsvariabelen
Plaats in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
# Optioneel voor PandaScore sync:
NEXT_PUBLIC_PANDASCORE_API_KEY=...
```
- `SUPABASE_KEY` kan ook gebruikt worden server-side in plaats van `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- Zonder PandaScore key werkt de site, maar `/api/matches` kan niet syncen.

### Belangrijke scripts
- `npm run dev` – ontwikkelserver.
- `npm run build` – production build.
- `npm run start` – start de gebuilde app.

### Belangrijke routes & pagina's
- `app/wedstrijden/page.tsx` – lijst met aankomende/afgeronde wedstrijden, tabs, live-status.
- `app/bracket/page.tsx` – bracketweergave (3 rondes) met dezelfde wedstrijddata.
- `app/api/wedstrijden/route.ts` – leest wedstrijden uit Supabase (`matches` view met joins op `tournaments`, `teams`).
- `app/api/matches/route.ts` – haalt PandaScore data op en schrijft naar Supabase (tournaments, teams, matches, sponsors, players).

### Datamodel (verwacht in Supabase)
- `matches` (id, tournament_id, team1_id, team2_id, match_date, score_team1, score_team2, status, winner_id)
- `tournaments` (id, name, start_date, end_date, game, theme_id)
- `teams` (id, name, logo_url, country)
- `players` (id, team_id, nickname, real_name, role, nationality, kills, deaths, headshot_percentage, kd_ratio, rating)
- `themes`, `sponsors` worden gevuld met defaults/dummy data door de sync.

### Data ophalen
- Productie/gebruik: `GET /api/wedstrijden` wordt client-side aangeroepen door de wedstrijden- en bracketpagina.
- Sync (optioneel): `GET` of `POST /api/matches` om PandaScore -> Supabase te schrijven. Zorg dat de Supabase- en PandaScore-sleutels aanwezig zijn.

### Styling & componenten
- Tailwind (v4) utility-classes in `app/globals.css` en componenten.
- Herbruikbare UI: `NavigationHeader`, `MatchesList`, `Bracket`.

### Probleemoplossing
- 500 bij `/api/wedstrijden`: controleer `NEXT_PUBLIC_SUPABASE_URL` en sleutel.
- Lege lijsten: check of de tabel `matches` gevuld is; run `/api/matches` (met PandaScore key) of seed handmatig.
- PandaScore fouten: bevestig geldige `NEXT_PUBLIC_PANDASCORE_API_KEY` en dat de API toegang heeft tot CSGO/CS2 endpoints.
