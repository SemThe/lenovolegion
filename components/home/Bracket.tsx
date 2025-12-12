"use client";

import React, { useState, useEffect, useMemo } from "react";
import BekijkButton from "../ui/BekijkButton";
import BracketPreview from "./BracketPreview";

import type { MatchListItem } from "@/app/api/matches/route";

export default function BracketView() {
  const [matches, setMatches] = useState<MatchListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMatches() {
      try {
        const res = await fetch("/api/wedstrijden");
        if (!res.ok) throw new Error("Kon wedstrijden niet ophalen");
        const data = await res.json();
        setMatches(data.matches || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Onbekende fout");
      } finally {
        setIsLoading(false);
      }
    }
    fetchMatches();
  }, []);

  const bracketMatches = useMemo(() => {
    const sorted = [...matches].sort((a, b) => {
      const dateA = new Date(a.match_date || "").getTime();
      const dateB = new Date(b.match_date || "").getTime();
      return dateA - dateB;
    });

    const upcomingOrLive = sorted.filter(
      (match) => match.status?.toLowerCase() !== "finished"
    );

    const source =
      upcomingOrLive.length >= 8
        ? upcomingOrLive
        : sorted.length > 0
        ? sorted
        : [];

    return source.slice(0, 8);
  }, [matches]);

  return (
    <div className="relative h-[440px] bg-widget-bg border border-widget-border rounded-[10px] flex flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto px-6 pt-6 pb-16">
        {error && (
          <div className="py-10 text-center text-red-400 text-sm border border-red-500/30 rounded-2xl bg-red-500/10">
            {error}
          </div>
        )}

        {!error && isLoading && (
          <div className="py-10 text-center text-white/60 text-sm border border-white/10 rounded-2xl bg-black/20">
            Bracket laden...
          </div>
        )}

        {!error && !isLoading && bracketMatches.length === 0 && (
          <div className="py-10 text-center text-white/60 text-sm border border-white/10 rounded-2xl bg-black/20">
            Nog geen wedstrijden beschikbaar voor deze bracket.
          </div>
        )}

        {!error && !isLoading && bracketMatches.length > 0 && (
          <BracketPreview matches={bracketMatches} />
        )}
      </div>
      <div className="absolute bottom-5 right-5 z-10">
        <BekijkButton href="/bracket" />
      </div>
    </div>
  );
}
