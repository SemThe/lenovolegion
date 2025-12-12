"use client";

import React from "react";
import Image from "next/image";
import type { MatchListItem } from "@/app/api/matches/route";

interface BracketPreviewProps {
  matches: MatchListItem[];
}

// Compacte bracket preview in horizontale piramide vorm (links naar rechts)
export default function BracketPreview({ matches }: BracketPreviewProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("nl-NL", {
      day: "numeric",
      month: "short",
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
    return `${displayHours}:${minutesStr} ${ampm}`;
  };

  // Rounds mapping - Kwartfinales, Halve Finale, Finale
  const kwartfinales = matches.slice(0, 4);
  const halveFinale = matches.slice(4, 6);
  const finale = matches.slice(6, 7);

  // Create empty slots if needed
  const halveFinaleWithEmpty = [...halveFinale];
  while (halveFinaleWithEmpty.length < 2) {
    halveFinaleWithEmpty.push(null);
  }
  const finaleWithEmpty = [...finale];
  while (finaleWithEmpty.length < 1) {
    finaleWithEmpty.push(null);
  }

  const renderMatchCard = (match: MatchListItem | null, index: number) => {
    if (!match) {
      return (
        <div
          key={`empty-${index}`}
          className="bg-[#0f0f0f] rounded-lg p-2 border border-white/10 h-[60px] flex items-center justify-center"
        >
          <span className="text-gray-500 text-[9px]">-</span>
        </div>
      );
    }

    const hasScore =
      match.score_team1 !== null &&
      match.score_team2 !== null &&
      (match.score_team1 > 0 || match.score_team2 > 0);

    return (
      <div key={match.id} className="space-y-1">
        {match.match_date && (
          <div className="text-[9px] text-gray-400">
            {formatDate(match.match_date)}
            {!hasScore && ` ${formatTime(match.match_date)}`}
          </div>
        )}

        {/* Team 1 */}
        <div className="rounded-lg flex items-center justify-between py-1 px-2 border border-white/10 bg-white/5">
          <div className="flex items-center gap-1 flex-1 min-w-0">
            {match.team1?.logo_url && (
              <Image
                src={match.team1.logo_url}
                alt={match.team1.name || "Team Logo"}
                width={14}
                height={14}
                className="rounded-full object-cover flex-shrink-0"
              />
            )}
            <span className="text-[9px] font-semibold text-white truncate">
              {match.team1?.name || "Team 1"}
            </span>
          </div>
          {hasScore && (
            <span className="text-[9px] font-bold text-white ml-1">
              {match.score_team1}
            </span>
          )}
        </div>

        {/* Team 2 */}
        <div className="rounded-lg flex items-center justify-between py-1 px-2 border border-white/10 bg-white/5">
          <div className="flex items-center gap-1 flex-1 min-w-0">
            {match.team2?.logo_url && (
              <Image
                src={match.team2.logo_url}
                alt={match.team2.name || "Team Logo"}
                width={14}
                height={14}
                className="rounded-full object-cover flex-shrink-0"
              />
            )}
            <span className="text-[9px] font-semibold text-white truncate">
              {match.team2?.name || "Team 2"}
            </span>
          </div>
          {hasScore && (
            <span className="text-[9px] font-bold text-white ml-1">
              {match.score_team2}
            </span>
          )}
        </div>
      </div>
    );
  };

  // Berekeningen voor lijn positionering
  const cardHeight = 50;
  const cardGap = 8;
  const dateHeight = 12;
  const cardCenterOffset = dateHeight + cardHeight / 2;

  return (
    <div className="flex flex-row items-center justify-center gap-4 h-full overflow-x-auto">
      {/* Kwartfinales - Links */}
      <div className="flex-1 min-w-0 space-y-2 flex flex-col items-center">
        <div className="text-xs font-semibold text-white/80 mb-2 w-full text-center">Kwartfinales</div>
        {kwartfinales.map((match, index) => (
          <div key={match?.id || `empty-${index}`} className="w-full">
            {renderMatchCard(match, index)}
          </div>
        ))}
      </div>

      {/* Verbindingslijnen naar Halve Finale */}
      <div className="relative w-8 flex-shrink-0 flex items-center" style={{ height: `${(cardHeight + cardGap) * 4 + dateHeight}px` }}>
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
      </div>

      {/* Halve Finale - Midden */}
      <div className="flex-1 min-w-0 space-y-4 flex flex-col items-center">
        <div className="text-xs font-semibold text-white/80 mb-2 w-full text-center">Halve Finale</div>
        {halveFinaleWithEmpty.map((match, index) => (
          <div key={match?.id || `empty-${index + 4}`} className="w-full">
            {renderMatchCard(match, index + 4)}
          </div>
        ))}
      </div>

      {/* Verbindingslijnen naar Finale */}
      <div className="relative w-8 flex-shrink-0 flex items-center" style={{ height: `${(cardHeight + 16) * 2 + dateHeight}px` }}>
        <div className="absolute inset-0">
          {/* Halve Finale 1 & 2 naar Finale */}
          <div className="absolute" style={{ top: `${cardCenterOffset}px` }}>
            <div className="absolute left-0 w-4 h-[1px] bg-white/25" style={{ top: "0px" }} />
            <div className="absolute left-0 w-4 h-[1px] bg-white/25" style={{ top: `${cardHeight + 16}px` }} />
            <div className="absolute left-4 w-[1px] bg-white/25" style={{ top: "0px", height: `${cardHeight + 16}px` }} />
            <div className="absolute left-4 w-4 h-[1px] bg-white/25" style={{ top: `${(cardHeight + 16) / 2}px` }} />
          </div>
        </div>
      </div>

      {/* Finale - Rechts */}
      <div className="flex-1 min-w-0 flex flex-col items-center justify-center">
        <div className="text-xs font-semibold text-white/80 mb-2 w-full text-center">Finale</div>
        {finaleWithEmpty.map((match, index) => (
          <div key={match?.id || `empty-${index + 6}`} className="w-full">
            {renderMatchCard(match, index + 6)}
          </div>
        ))}
      </div>
    </div>
  );
}
