# 🎮 Lenovo Legion Esports Platform

Een modern esports tournament platform gebouwd met Next.js voor het weergeven en beheren van CS2/CS:GO toernooien, wedstrijden, brackets en fantasy teams.

![Next.js](https://img.shields.io/badge/Next.js-16.0.7-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19.2.0-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat-square&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-2.86.0-green?style=flat-square&logo=supabase)

## 📋 Inhoudsopgave

- [Overzicht](#-overzicht)
- [Features](#-features)
- [Technologie Stack](#-technologie-stack)
- [Vereisten](#-vereisten)
- [Installatie](#-installatie)
- [Configuratie](#-configuratie)
- [Gebruik](#-gebruik)
- [Project Structuur](#-project-structuur)
- [API Routes](#-api-routes)
- [Database Schema](#-database-schema)
- [Development](#-development)
- [Deployment](#-deployment)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

## 🎯 Overzicht

Lenovo Legion Esports Platform is een full-stack web applicatie voor het beheren en weergeven van esports toernooien. Het platform biedt real-time match informatie, tournament brackets, team statistieken en een fantasy team feature waar gebruikers hun eigen esports team kunnen samenstellen.

### Hoofdfunctionaliteiten

- **Live Match Tracking**: Real-time updates van CS2/CS:GO wedstrijden
- **Tournament Brackets**: Visuele weergave van tournament brackets met verschillende rondes
- **Fantasy Teams**: Gebruikers kunnen hun eigen esports team samenstellen met een budget systeem
- **Match History**: Overzicht van aankomende en afgeronde wedstrijden
- **Player Statistics**: Gedetailleerde informatie over spelers en teams

## ✨ Features

### 🏠 Home Pagina
- **Player of the Week**: Uitgelichte speler met statistieken
- **Tournament Banner**: Promotie voor aankomende toernooien
- **News Feed**: Laatste nieuws en updates
- **Live Matches Widget**: Overzicht van aankomende wedstrijden
- **Bracket Preview**: Snelle blik op de tournament bracket

### 🎮 Wedstrijden Pagina
- **Tabbed Interface**: Scheiding tussen aankomende en afgeronde wedstrijden
- **Match Details**: Team logos, scores, status en datums
- **Live Status Indicators**: Visuele indicatoren voor live, upcoming en finished matches
- **Responsive Design**: Volledig responsive voor alle schermformaten

### 🏆 Bracket Pagina
- **Interactive Bracket View**: Visuele weergave van tournament brackets
- **Multiple Rounds**: Ondersteuning voor verschillende tournament rondes (Ronde 1, Halve Finale, Finale)
- **Team Matchups**: Duidelijke weergave van team confrontaties
- **Score Display**: Real-time score updates

### 👥 Fantasy Team
- **Budget System**: Startbudget van 16.000 voor team samenstelling
- **Player Selection**: Kies uit beschikbare spelers met prijzen
- **Team Management**: Beheer je squad en reserves
- **Local Storage**: Automatische opslag van je team
- **Price Formatting**: Intuïtieve prijsweergave (bijv. "3K" voor 3000)

## 🛠 Technologie Stack

### Frontend
- **Next.js 16.0.7**: React framework met App Router
- **React 19.2.0**: UI library
- **TypeScript 5.0**: Type-safe JavaScript
- **Tailwind CSS 4.0**: Utility-first CSS framework
- **SVGR**: SVG component support

### Backend & Database
- **Supabase**: Backend-as-a-Service voor database en authenticatie
- **PandaScore API**: Esports data provider voor matches en players

### Development Tools
- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **Turbopack**: Next.js bundler (development)

## 📦 Vereisten

Voordat je begint, zorg ervoor dat je de volgende software hebt geïnstalleerd:

- **Node.js** 18.0 of hoger
- **npm**, **yarn**, **pnpm** of **bun** (package manager)
- **Git** voor versiebeheer
- **Supabase Account** (gratis tier is voldoende)
- **PandaScore API Key** (optioneel, voor automatische data sync)

## 🚀 Installatie

### 1. Clone het repository

```bash
git clone <repository-url>
cd Roch-Esport
```

### 2. Installeer dependencies

```bash
npm install
# of
yarn install
# of
pnpm install
```

### 3. Configureer environment variables

Maak een `.env.local` bestand in de root directory:

```env
# Supabase Configuration (Verplicht)
NEXT_PUBLIC_SUPABASE_URL=https://zrryrepwoqakgzdqncdv.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# PandaScore API (Optioneel - voor automatische data sync)
NEXT_PUBLIC_PANDASCORE_API_KEY=your_pandascore_api_key_here
```

### 4. Start de development server

```bash
npm run dev
# of
yarn dev
# of
pnpm dev
```

De applicatie is nu beschikbaar op [http://localhost:3000](http://localhost:3000)

> **Tip**: Als poort 3000 in gebruik is, gebruik dan `npm run dev -- -p 3001` voor poort 3001

## ⚙️ Configuratie

### Supabase Setup

1. Maak een account op [supabase.com](https://supabase.com)
2. Maak een nieuw project aan
3. Ga naar **Settings** > **API**
4. Kopieer de **Project URL** en **anon public key**
5. Plak deze in je `.env.local` bestand

### Database Schema

Het project verwacht de volgende tabellen in Supabase:

- `matches`: Wedstrijd informatie
- `teams`: Team gegevens
- `players`: Speler informatie
- `tournaments`: Toernooi details
- `themes`: Tournament thema's
- `sponsors`: Sponsor informatie

Zie [SETUP.md](./SETUP.md) voor gedetailleerde database setup instructies.

### PandaScore API (Optioneel)

Voor automatische data synchronisatie:

1. Maak een account op [pandascore.co](https://pandascore.co)
2. Genereer een API key
3. Voeg deze toe aan `.env.local`

## 📖 Gebruik

### Data Synchronisatie

#### Automatisch (met PandaScore API)

```bash
# Via browser console
fetch('/api/matches', { method: 'POST' })
  .then(r => r.json())
  .then(console.log)

# Via curl
curl -X POST http://localhost:3000/api/matches
```

#### Handmatig

Voeg data toe via het Supabase Dashboard:
1. Ga naar je Supabase project
2. Navigeer naar **Table Editor**
3. Voeg matches, teams en players handmatig toe

### Development Commands

```bash
# Development server starten
npm run dev

# Production build maken
npm run build

# Production server starten
npm start

# Code linting
npm run lint
```

## 📁 Project Structuur

```
Roch-Esport/
├── app/                      # Next.js App Router
│   ├── (home)/              # Home route group
│   │   └── page.tsx         # Home pagina
│   ├── api/                  # API routes
│   │   ├── matches/         # Match data API
│   │   └── wedstrijden/    # Wedstrijden API
│   ├── bracket/             # Bracket pagina
│   ├── fantasyteam/        # Fantasy team pagina
│   ├── wedstrijden/        # Wedstrijden pagina
│   ├── layout.tsx          # Root layout
│   └── globals.css         # Global styles
├── components/              # React components
│   ├── home/               # Home page components
│   ├── layout/             # Layout components
│   └── ui/                 # UI components
├── lib/                     # Utility libraries
│   └── supabase.ts        # Supabase client
├── public/                  # Static assets
│   ├── images/             # Afbeeldingen
│   └── icons/              # SVG icons
├── .env.local              # Environment variables (niet in git)
├── next.config.ts          # Next.js configuratie
├── tailwind.config.ts      # Tailwind configuratie
└── package.json            # Dependencies
```

## 🔌 API Routes

### `/api/wedstrijden`

**GET** - Haal alle wedstrijden op

```typescript
Response: {
  matches: MatchListItem[]
}
```

### `/api/matches`

**GET** - Haal matches op en sync met PandaScore

**POST** - Synchroniseer matches van PandaScore naar Supabase

```typescript
Response: {
  success: boolean,
  message?: string,
  error?: string
}
```

## 🗄️ Database Schema

### Matches Table
```sql
- id: number (primary key)
- tournament_id: number (foreign key)
- team1_id: number (foreign key)
- team2_id: number (foreign key)
- match_date: timestamp
- status: string
- score_team1: number
- score_team2: number
- winner_id: number (nullable)
```

### Teams Table
```sql
- id: number (primary key)
- name: string
- logo_url: string
- country: string (nullable)
```

### Players Table
```sql
- id: number (primary key)
- name: string
- team_id: number (foreign key)
- image_url: string (nullable)
- role: string (nullable)
```

Zie Supabase dashboard voor volledige schema definitie.

## 💻 Development

### Code Style

Het project gebruikt:
- **ESLint** voor code kwaliteit
- **TypeScript** voor type safety
- **Tailwind CSS** voor styling

### Best Practices

- Gebruik TypeScript interfaces voor alle data types
- Componenten zijn georganiseerd per functionaliteit
- API routes gebruiken Next.js Route Handlers
- Error handling is geïmplementeerd in alle API routes

### Debugging

```bash
# Check voor linting errors
npm run lint

# Development server met verbose output
npm run dev -- --turbo
```

## 🚢 Deployment

### Vercel (Aanbevolen)

1. Push je code naar GitHub
2. Importeer het project in Vercel
3. Voeg environment variables toe in Vercel dashboard
4. Deploy automatisch bij elke push

### Andere Platforms

Het project kan worden gedeployed op:
- **Netlify**
- **Railway**
- **AWS Amplify**
- **Docker** (maak een Dockerfile)

Zorg ervoor dat alle environment variables zijn ingesteld in je deployment platform.

## 🔧 Troubleshooting

### "Missing Supabase key" Error

**Oplossing**: Controleer of `.env.local` bestaat en de juiste keys bevat.

### Geen data zichtbaar

**Mogelijke oorzaken**:
1. Database is leeg - sync data via `/api/matches` POST
2. Verkeerde Supabase credentials
3. Network errors - check browser console

### Port al in gebruik

```bash
# Gebruik een andere poort
npm run dev -- -p 3001
```

### Build errors

```bash
# Verwijder .next folder en rebuild
rm -rf .next
npm run build
```

## 🤝 Contributing

Bijdrage van Doaa Altair:

Binnen dit project was ik verantwoordelijk voor de volledige implementatie van de Wedstrijden-pagina, de Bracket-weergave, en de koppeling tussen de Supabase-database en de PandaScore API.

Mijn belangrijkste bijdragen:

Wedstrijden pagina (Matches)
Ik heb de volledige wedstrijdenpagina ontworpen en gebouwd, inclusief de tabstructuur (“Aankomende” / “Afgelopen”), statusbadges, scoreweergave en real-time dataverwerking. Hierbij zorgde ik voor een duidelijke UI-hiërarchie en een optimale mobile-first ervaring.

Bracket Pagina
Ik ontwikkelde de bracketstructuur op basis van tournament rounds, inclusief visuele elementen, teamkoppelingen en een consistente styling die aansluit op de rest van het platform. 

API Koppeling (PandaScore)
Ik onderzocht en implementeerde de PandaScore API als betrouwbare bron voor e-sportdata. Hierbij schreef ik de API-routes in Next.js voor het ophalen, syncen en updaten van wedstrijdinformatie. De data werd netjes gevalideerd en verwerkt tot een uniform format voor de UI.

Supabase Database Architectuur
Ik heb de database in Supabase ontworpen, getest en gevuld met gestructureerde tournament-, team-, speler- en wedstijdbestanden. Daarnaast bouwde ik de koppeling tussen Supabase en de API: inclusief tabellen, normalisatie, error-handling en de sync-logica.

Integratie binnen het teamproject
Ik heb mijn volledige onderdeel geïntegreerd in een aparte branch

### Code Guidelines

- Volg de bestaande code style
- Voeg TypeScript types toe voor nieuwe features
- Test je changes lokaal voordat je pusht
- Update documentatie waar nodig

## 📝 License

Dit project is privé en eigendom van Lenovo Legion.

## 👥 Contact & Support

Voor vragen of ondersteuning:
- Open een issue in de repository
- Check de [SETUP.md](./SETUP.md) voor gedetailleerde setup instructies

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org) - React framework
- [Supabase](https://supabase.com) - Backend platform
- [PandaScore](https://pandascore.co) - Esports data API
- [Tailwind CSS](https://tailwindcss.com) - CSS framework

---

