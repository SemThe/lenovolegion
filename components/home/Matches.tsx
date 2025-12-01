"use client";

import { useEffect, useState } from "react";
import BekijkButton from "../ui/BekijkButton";

interface Match {
  id: number;
  match_date: string;
  status: string;
  score_team1: number | null;
  score_team2: number | null;
  tournament: { name: string } | null;
  team1: { name: string; logo_url: string } | null;
  team2: { name: string; logo_url: string } | null;
}

export default function MatchesWidget() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/wedstrijden");
        const data = await res.json();
        setMatches(data.matches || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="relative h-[440px] bg-widget-bg border border-widget-border rounded-[10px] p-4 text-white overflow-y-auto space-y-3 modern-scrollbar">
      {/* Loading */}
      {loading && (
        <div className="py-10 text-center text-white/60 text-sm border border-white/10 rounded-2xl bg-black/20">
          Data ophalen...
        </div>
      )}

      {/* Geen wedstrijden */}
      {!loading && matches.length === 0 && (
        <div className="py-10 text-center text-white/60 text-sm border border-white/10 rounded-2xl bg-black/20">
          Geen wedstrijden gevonden
        </div>
      )}

      {/* Matches */}
      {!loading &&
        matches.map((match) => (
          <div
            key={match.id}
            className="bg-[#222] p-3 rounded-xl border border-white/10"
          >
            <p className="text-sm font-semibold">
              {match.tournament?.name || "Onbekend Toernooi"}
            </p>

            <p className="text-xs text-white/50">
              {new Date(match.match_date).toLocaleDateString()} •{" "}
              {new Date(match.match_date).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>

            <div className="mt-2 flex items-center justify-between">
              <span className="text-sm truncate max-w-[9ch]">
                {match.team1?.name}
              </span>
              <span className="font-bold">
                {match.score_team1 ?? "-"} - {match.score_team2 ?? "-"}
              </span>
              <span className="text-sm truncate max-w-[9ch] text-right">
                {match.team2?.name}
              </span>
            </div>

            <p className="text-[11px] text-white/40 mt-1 uppercase">
              {match.status}
            </p>
          </div>
        ))}

      {/* Bekijk button */}
      <div className="absolute bottom-5 right-5">
        <BekijkButton href="/wedstrijden" />
      </div>
    </div>
  );
}
