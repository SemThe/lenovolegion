"use client";
 
import { useEffect, useMemo, useState } from "react";
import { NavigationHeader } from "../wedstrijden/NavigationHeader";
import { Bracket } from "../wedstrijden/MatchesList";
 
import type { MatchListItem } from "@/app/api/matches/route";
 
export default function BracketPage() {
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
            const dateA = a.match_date ? new Date(a.match_date).getTime() : 0;
            const dateB = b.match_date ? new Date(b.match_date).getTime() : 0;
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
        <div className="h-screen min-h-screen bg-[#050505] text-white flex flex-col">
            <NavigationHeader activePath="/bracket" />
 
            <main className="flex-1 overflow-y-auto flex justify-center px-4 pb-12 modern-scrollbar">
                <section className="w-full max-w-5xl mt-10">
                    <div className="bg-[#111111] border border-white/5 rounded-[32px] shadow-[0_25px_80px_rgba(0,0,0,0.65)]">
 
                        <div className="px-6 pb-6">
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
                                <Bracket matches={bracketMatches} />
                            )}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}