"use client";

import type { MatchListItem, TeamInfo } from "@/app/api/matches/route";

import { useState } from "react";

import Image from "next/image";

export function MatchesList({ matches }: { matches: MatchListItem[] }) {
  return (
    <div className="bg-[#1a1a1a] p-4 rounded-xl w-full max-w-3xl space-y-4">
      {matches.map((m) => (
        <div
          key={m.id}
          className="bg-[#0f0f0f] rounded-xl px-4 py-3 flex items-center justify-between shadow-md"
        >
          {/* TOERNOOI NAAM */}
          <div className="text-gray-400 text-sm">{m.tournament?.name}</div>

          {/* TEAMS */}
          <div className="flex items-center gap-4">
            <TeamBlock team={m.team1} />
            <span className="text-lg font-bold">
              {m.score_team1} - {m.score_team2}
            </span>
            <TeamBlock team={m.team2} />
          </div>

          {/* STATUS + DATUM */}
          <div className="text-right">
            <div
              className={`text-sm font-semibold ${
                m.status === "running"
                  ? "text-red-500"
                  : m.status === "finished"
                  ? "text-green-500"
                  : "text-gray-400"
              }`}
            >
              {m.status === "running" ? "LIVE" : m.status}
            </div>
            <div className="text-gray-500 text-sm">
              {(() => {
                const date = m.match_date ? new Date(m.match_date) : null;

                return date ? (
                  <>
                    {date.toLocaleDateString()} •{" "}
                    {date.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </>
                ) : (
                  <span className="text-gray-500">Geen datum</span>
                );
              })()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function TeamBlock({ team }: { team: TeamInfo | null }) {
  if (!team) {
    return (
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-gray-500 text-sm">-</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 min-w-0">
      {team.logo_url && (
        <Image
          src={team.logo_url}
          alt={team.name || "Team Logo"}
          className="object-cover rounded-full"
          width={24}
          height={24}
        />
      )}
      <span
        className="text-sm font-medium text-white truncate max-w-[9ch]"
        title={team.name ?? undefined}
      >
        {team.name}
      </span>
    </div>
  );
}

export function Bracket({ matches }: { matches: (MatchListItem | null)[] }) {
  // Rounds mapping
  const round1 = matches.slice(0, 4);
  const semi = matches.slice(4, 6);
  const finale = matches.slice(6, 7);

  // Create empty slots for semi-finals and finals if needed
  const semiWithEmpty = [...semi];
  while (semiWithEmpty.length < 2) {
    semiWithEmpty.push(null);
  }
  const finaleWithEmpty = [...finale];
  while (finaleWithEmpty.length < 1) {
    finaleWithEmpty.push(null);
  }

  return (
    <div className="p-6 rounded-xl h-full relative overflow-visible">
      {/* BRACKET GRID - Piramide vorm zoals op hoofdpagina */}
      <div className="flex flex-row items-center justify-center gap-4 h-full overflow-x-auto">
        {/* Kwartfinales - Links */}
        <div className="flex-1 min-w-0 space-y-2 flex flex-col items-center">
          <div className="text-xs font-semibold text-white/80 mb-2 w-full text-center">Kwartfinales</div>
          <BracketRound matches={round1} />
        </div>

        {/* Verbindingslijnen naar Halve Finale */}
        <div className="relative w-8 flex-shrink-0 flex items-center" style={{ height: `${(124 + 8) * 4}px` }}>
          <BracketLinesRound1ToSemi />
        </div>

        {/* Halve Finale - Midden */}
        <div className="flex-1 min-w-0 space-y-4 flex flex-col items-center">
          <div className="text-xs font-semibold text-white/80 mb-2 w-full text-center">Halve Finale</div>
          <BracketRound matches={semiWithEmpty} showEmpty={true} />
        </div>

        {/* Verbindingslijnen naar Finale */}
        <div className="relative w-8 flex-shrink-0 flex items-center" style={{ height: `${(124 + 16) * 2}px` }}>
          <BracketLinesSemiToFinal />
        </div>

        {/* Finale - Rechts */}
        <div className="flex-1 min-w-0 flex flex-col items-center justify-center">
          <div className="text-xs font-semibold text-white/80 mb-2 w-full text-center">Finale</div>
          <BracketRound matches={finaleWithEmpty} showEmpty={true} />
        </div>
      </div>
    </div>
  );
}

/* BRACKET LINES - Round 1 to Semi-Finals */
function BracketLinesRound1ToSemi() {
  // Berekeningen gebaseerd op werkelijke card structuur
  // BracketRound: date (~20px mb-3) + team rows (~48px elk) + margin (8px mb-2) = ~124px totaal
  const cardHeight = 124; // Totale card hoogte inclusief date
  const cardGap = 8; // space-y-2 = 8px
  const dateHeight = 20; // Date label hoogte
  const cardContentHeight = cardHeight - dateHeight; // 104px (zonder date)
  // Midden van card content: dateHeight + cardContentHeight / 2 = 20 + 52 = 72px
  const cardCenterOffset = dateHeight + cardContentHeight / 2;

  return (
    <div className="absolute inset-0">
      {/* Match 1 & 2 naar Halve Finale 1 */}
      <div className="absolute" style={{ top: `${cardCenterOffset}px` }}>
        <div className="absolute left-0 w-4 h-[1px] bg-white/25" style={{ top: "0px" }} />
        <div className="absolute left-0 w-4 h-[1px] bg-white/25" style={{ top: `${cardHeight + cardGap}px` }} />
        <div className="absolute left-4 w-[1px] bg-white/25" style={{ top: "0px", height: `${cardHeight + cardGap}px` }} />
        <div className="absolute left-4 w-4 h-[1px] bg-white/25" style={{ top: `${(cardHeight + cardGap) / 2}px` }} />
      </div>

      {/* Match 3 & 4 naar Halve Finale 2 */}
      <div className="absolute" style={{ top: `${cardCenterOffset + (cardHeight + cardGap) * 2}px` }}>
        <div className="absolute left-0 w-4 h-[1px] bg-white/25" style={{ top: "0px" }} />
        <div className="absolute left-0 w-4 h-[1px] bg-white/25" style={{ top: `${cardHeight + cardGap}px` }} />
        <div className="absolute left-4 w-[1px] bg-white/25" style={{ top: "0px", height: `${cardHeight + cardGap}px` }} />
        <div className="absolute left-4 w-4 h-[1px] bg-white/25" style={{ top: `${(cardHeight + cardGap) / 2}px` }} />
      </div>
    </div>
  );
}

/* BRACKET LINES - Semi-Finals to Final */
function BracketLinesSemiToFinal() {
  // Berekeningen voor lijn positionering - aangepast voor piramide layout
  const cardHeight = 124; // Totale card hoogte inclusief date (zelfde als kwartfinales)
  const cardGap = 16; // space-y-4 voor halve finale = 16px
  const dateHeight = 20; // Date label hoogte
  const cardContentHeight = cardHeight - dateHeight; // Hoogte zonder date (104px)
  const cardCenterOffset = dateHeight + cardContentHeight / 2; // Midden van card content (72px)

  return (
    <div className="absolute inset-0">
      {/* Halve Finale 1 & 2 naar Finale */}
      <div className="absolute" style={{ top: `${cardCenterOffset}px` }}>
        <div className="absolute left-0 w-4 h-[1px] bg-white/25" style={{ top: "0px" }} />
        <div className="absolute left-0 w-4 h-[1px] bg-white/25" style={{ top: `${cardHeight + cardGap}px` }} />
        <div className="absolute left-4 w-[1px] bg-white/25" style={{ top: "0px", height: `${cardHeight + cardGap}px` }} />
        <div className="absolute left-4 w-4 h-[1px] bg-white/25" style={{ top: `${(cardHeight + cardGap) / 2}px` }} />
      </div>
    </div>
  );
}

/* ----------------------------------------------------
   BRACKET ROUND BOXES
---------------------------------------------------- */
function BracketRound({
  matches,
  showEmpty = false,
}: {
  matches: (MatchListItem | null)[];
  showEmpty?: boolean;
}) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${day}.${month}.${year}`;
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes} ${ampm}`;
  };

  return (
    <div className="space-y-2">
      {matches.map((m, index) => {
        if (!m && showEmpty) {
          return (
            <div
              key={`empty-${index}`}
              className="bg-[#0f0f0f] rounded-xl p-4 border border-white/10 h-[100px] flex items-center justify-center"
            >
              <span className="text-gray-500 text-sm">-</span>
            </div>
          );
        }

        // 👉 ENIGE toegevoegde regel
        if (!m) return null;

        const hasScore =
          m.score_team1 !== null &&
          m.score_team2 !== null &&
          (m.score_team1 > 0 || m.score_team2 > 0);

        return (
          <div key={m.id} className=" p-4 relative ">
            {/* Date - top left */}
            {m.match_date && (
              <div className="text-xs text-gray-400 mb-3 text-left">
                {formatDate(m.match_date)}
                {!hasScore && ` ${formatTime(m.match_date)}`}
              </div>
            )}

            {/* Team 1 Row */}
            <div className="rounded-xl flex items-center justify-between mb-2 py-[16px] px-[8px] border border-white/10 bg-white/5">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {m.team1?.logo_url && (
                  <Image
                    src={m.team1.logo_url}
                    alt={m.team1.name || "Team Logo"}
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                  />
                )}
                <span
                  className="text-xs font-semibold text-white truncate"
                  title={m.team1?.name ?? undefined}
                >
                  {m.team1?.name || "Team 1"}
                </span>
              </div>
              {hasScore && (
                <span className="text-xs font-bold text-white">
                  {m.score_team1}
                </span>
              )}
            </div>

            {/* Team 2 Row */}
            <div className="rounded-xl flex items-center justify-between pt-2 py-[16px] px-[8px] border border-white/10 bg-white/5">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {m.team2?.logo_url && (
                  <Image
                    src={m.team2.logo_url}
                    alt={m.team2.name || "Team Logo"}
                    width={32}
                    height={32}
                    className="rounded-full object-cover"
                  />
                )}
                <span
                  className="text-xs font-semibold text-white truncate"
                  title={m.team2?.name ?? undefined}
                >
                  {m.team2?.name || "Team 2"}
                </span>
              </div>
              {hasScore && (
                <span className="text-xs font-bold text-white">
                  {m.score_team2}
                </span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
