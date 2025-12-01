"use client";

import { useEffect, useState } from "react";
import { NavigationHeader } from "./NavigationHeader";

interface Match {
    id: number;
    match_date: string;
    status: string;
    score_team1: number;
    score_team2: number;
    tournament: { name: string } | null;
    team1: { name: string; logo_url: string } | null;
    team2: { name: string; logo_url: string } | null;
}

type TabValue = "upcoming" | "results";

function formatMatchDate(dateString: string): { date: string; time: string } {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;

    return {
        date: `${day}.${month}.${year}`,
        time: `${displayHours}:${minutes} ${ampm}`,
    };
}

function isLive(status: string): boolean {
    return status?.toLowerCase() === "running" || status?.toLowerCase() === "live";
}

export default function WedstrijdenPage() {
    const [matches, setMatches] = useState<Match[]>([]);
    const [activeTab, setActiveTab] = useState<TabValue>("upcoming");

    useEffect(() => {
        async function fetchMatches() {
            const res = await fetch("/api/wedstrijden");
            const data = await res.json();
            setMatches(data.matches || []);
        }
        fetchMatches();
    }, []);

    const filteredMatches = matches.filter((match) => {
        if (activeTab === "results") {
            return match.status?.toLowerCase() === "finished";
        }
        return match.status?.toLowerCase() !== "finished";
    });

    return (
        <div className="h-screen min-h-screen bg-[#050505] text-white flex flex-col">
            <NavigationHeader activePath="/wedstrijden" />

            <main className="flex-1 overflow-y-auto flex justify-center px-4 pb-12 modern-scrollbar">
                <section className="w-full max-w-5xl mt-10">
                    <div className="bg-[#111111] border border-white/5 rounded-[32px] shadow-[0_25px_80px_rgba(0,0,0,0.65)]">
                        <header className="px-6 pt-6 pb-2 space-y-4">
                            <div className="flex flex-wrap items-center gap-3">
                                <div className="w-12 h-12 flex items-center justify-center">
                                    <img src="/legion.png" alt="Legion" className="" />
                                </div>

                                <div className="flex gap-2 bg-white/5 rounded-full p-1 border border-white/10">
                                    <button
                                        onClick={() => setActiveTab("upcoming")}
                                        className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${activeTab === "upcoming"
                                            ? "bg-white text-black shadow-[0_12px_28px_rgba(0,0,0,0.35)]"
                                            : "text-white/70"
                                            }`}
                                    >
                                        Aankomende wedstrijden
                                    </button>
                                    <button
                                        onClick={() => setActiveTab("results")}
                                        className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors ${activeTab === "results"
                                            ? "bg-white text-black shadow-[0_12px_28px_rgba(0,0,0,0.35)]"
                                            : "text-white/70"
                                            }`}
                                    >
                                        Afgeronde wedstrijden
                                    </button>
                                </div>
                            </div>
                        </header>

                        <div className="px-6 pb-6">
                            <div className="space-y-3">
                                {filteredMatches.length === 0 && (
                                    <div className="py-10 text-center text-white/60 text-sm border border-white/10 rounded-2xl bg-black/20">
                                        loading....
                                    </div>
                                )}

                                {filteredMatches.map((match) => {
                                    const live = isLive(match.status);
                                    const hasScore =
                                        typeof match.score_team1 === "number" &&
                                        typeof match.score_team2 === "number" &&
                                        (match.score_team1 !== 0 || match.score_team2 !== 0);
                                    const { date, time } = formatMatchDate(match.match_date);
                                    const scoreLeft = hasScore ? match.score_team1 : 0; // kept for potential future use
                                    const scoreRight = hasScore ? match.score_team2 : 0; // kept for potential future use

                                    const leftScoreDisplay = hasScore ? match.score_team1 : "-";
                                    const rightScoreDisplay = hasScore ? match.score_team2 : "-";

                                    return (
                                        <div
                                            key={match.id}
                                            className="bg-[#242424] rounded-2xl border border-white/10 overflow-hidden"
                                        >
                                            <div className="relative flex items-center justify-between px-5 py-3 bg-[#2C2C2C]">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex flex-row gap-6 text-sm leading-tight">
                                                        <span className="font-semibold">
                                                            {match.tournament?.name || "The Legion Tournament"}
                                                        </span>
                                                        <span className="text-white/60 text-xs uppercase tracking-[0.35em]">
                                                            {activeTab === "results" ? "Resultaten" : "Ronde 2"}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="absolute left-1/2 transform -translate-x-1/2 hidden sm:flex items-center justify-center">
                                                    {live ? (
                                                        <span className="inline-flex items-center gap-1 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                                                            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                                            LIVE
                                                        </span>
                                                    ) : (
                                                        <span
                                                            className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-full ${match.status?.toLowerCase() === "finished"
                                                                ? "bg-green-500 text-white"
                                                                : "bg-gray-600 text-white"
                                                                }`}
                                                        >
                                                            {match.status?.toLowerCase() === "finished"
                                                                ? "FINISHED"
                                                                : "NOT STARTED"}
                                                        </span>
                                                    )}
                                                </div>

                                                <div className="flex flex-row gap-2 items-end text-xs uppercase tracking-wide text-white/70">
                                                    <span className="text-white/80 normal-case text-sm tracking-normal">
                                                        {date}
                                                    </span>
                                                    <span className="text-white/60 normal-case text-xs tracking-normal">
                                                        {time}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between gap-4 px-5 py-4 bg-[#343434]">
                                                <div className="flex items-center gap-3 flex-1 min-w-0">
                                                    {match.team1?.logo_url && (
                                                        <img
                                                            src={match.team1.logo_url}
                                                            alt={match.team1?.name}
                                                            className="w-12 h-12 rounded-xl object-cover"
                                                        />
                                                    )}
                                                    <span className="font-semibold text-white truncate">
                                                        {match.team1?.name || "Team 1"}
                                                    </span>
                                                </div>

                                                <div className="flex flex-col items-center min-w-[120px]">
                                                    <p className="text-2xl font-bold tracking-wide">
                                                        {leftScoreDisplay}
                                                        <span className="text-white/50 text-xl px-2">
                                                            {activeTab === "results" ? "-" : "VS"}
                                                        </span>
                                                        {rightScoreDisplay}
                                                    </p>
                                                </div>

                                                <div className="flex items-center gap-3 flex-1 min-w-0 justify-end">
                                                    <span className="font-semibold text-white text-right truncate">
                                                        {match.team2?.name || "Team 2"}
                                                    </span>
                                                    {match.team2?.logo_url && (
                                                        <img
                                                            src={match.team2.logo_url}
                                                            alt={match.team2?.name}
                                                            className="w-12 h-12 rounded-xl object-cover"
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}

