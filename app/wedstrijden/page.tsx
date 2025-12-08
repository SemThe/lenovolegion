"use client";

import { useEffect, useState } from "react";
import BackgroundLines from "@/components/layout/BackgroundLines";
import Image from "next/image";

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
  return (
    status?.toLowerCase() === "running" || status?.toLowerCase() === "live"
  );
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
    <div className="flex flex-col">
      <BackgroundLines leftColor="#2872FD" rightColor="#FD822A" />

      <main className="flex-1 flex justify-center px-4 pb-12">
        <section className="w-full mt-10">
          <div className="bg-[#262626] border border-[#393939] rounded-[10px]">
            {/* Header */}
            <header className="px-6 pt-6 pb-2 space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                {/* Logo */}
                <div className="flex items-center justify-center">
                  <Image
                    src="/images/csgo-logo.png"
                    alt="Legion"
                    className="rounded-[5px]"
                    width={48}
                    height={48}
                  />
                </div>

                {/* Tabs */}
                <div className="flex gap-3 ml-auto">
                  <button
                    onClick={() => setActiveTab("upcoming")}
                    className={`px-5 py-2 rounded-[5px] text-base font-semibold transition-colors ${
                      activeTab === "upcoming"
                        ? "bg-white text-black"
                        : "text-white border border-[#393939]"
                    }`}
                  >
                    Aankomende wedstrijden
                  </button>

                  <button
                    onClick={() => setActiveTab("results")}
                    className={`px-6 py-2 rounded-[5px] text-base font-semibold transition-colors ${
                      activeTab === "results"
                        ? "bg-white text-black"
                        : "text-white border border-[#393939]"
                    }`}
                  >
                    Afgeronde wedstrijden
                  </button>
                </div>
              </div>

              <span className="block w-full h-px bg-linear-to-r from-[#999999]/20 via-[#CCCCCC]/80 to-[#999999]/20"></span>
            </header>

            {/* Scroll-container */}
            <div className="px-6 pt-6 pb-6 h-[620px] overflow-y-auto modern-scrollbar mx-32">
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
                  const leftScoreDisplay = hasScore ? match.score_team1 : "-";
                  const rightScoreDisplay = hasScore ? match.score_team2 : "-";

                  return (
                    <div
                      key={match.id}
                      className="bg-[#242424] rounded-[5px] overflow-hidden"
                    >
                      {/* Card Header */}
                      <div className="relative flex items-center justify-between px-5 py-3 bg-[#525252]">
                        {/* Tournament & Round */}
                        <div className="flex items-center gap-3">
                          <div className="flex flex-row gap-6 text-sm leading-tight">
                            <span className="font-semibold">
                              {match.tournament?.name ||
                                "The Legion Tournament"}
                            </span>

                            <span className="text-white/60 text-xs uppercase tracking-[0.35em]">
                              {activeTab === "results"
                                ? "Resultaten"
                                : "Ronde 2"}
                            </span>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div className="absolute left-1/2 transform -translate-x-1/2 hidden sm:flex items-center justify-center">
                          {live ? (
                            <span className="inline-flex items-center gap-1 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-[5px]">
                              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                              LIVE
                            </span>
                          ) : (
                            <span
                              className={`inline-flex items-center gap-1 text-xs font-bold px-3 py-1 rounded-[5px] ${
                                match.status?.toLowerCase() === "finished"
                                  ? "bg-green-500 text-white"
                                  : "bg-[#3A3A3A] text-white/90 border border-white/10"
                              }`}
                            >
                              {match.status?.toLowerCase() === "finished"
                                ? "AFGEROND"
                                : "NOG NIET GESTART"}
                            </span>
                          )}
                        </div>

                        {/* Date + Time */}
                        <div className="flex flex-row gap-2 items-end text-lg uppercase tracking-wide font-semibold">
                          <span>{date}</span>
                          <span className="font-normal">|</span>
                          <span>{time}</span>
                        </div>
                      </div>

                      {/* Teams */}
                      <div className="flex items-center justify-between gap-4 px-5 py-4 bg-[#343434]">
                        {/* Team 1 */}
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          {match.team1?.logo_url && (
                            <Image
                              src={match.team1.logo_url}
                              alt={match.team1?.name}
                              width={48}
                              height={48}
                              className="object-cover"
                            />
                          )}

                          <span className="font-semibold text-[#C0C0C0] uppercase truncate">
                            {match.team1?.name || "Team 1"}
                          </span>
                        </div>

                        {/* Score */}
                        <div className="flex flex-col items-center min-w-[120px]">
                          <p className="text-2xl font-bold tracking-wide">
                            {leftScoreDisplay}
                            <span className="text-white/50 text-xl px-2">
                              {activeTab === "results" ? "-" : "VS"}
                            </span>
                            {rightScoreDisplay}
                          </p>
                        </div>

                        {/* Team 2 */}
                        <div className="flex items-center gap-3 flex-1 min-w-0 justify-end">
                          <span className="font-semibold text-[#C0C0C0] text-right uppercase truncate">
                            {match.team2?.name || "Team 2"}
                          </span>

                          {match.team2?.logo_url && (
                            <Image
                              src={match.team2.logo_url}
                              alt={match.team2?.name}
                              width={48}
                              height={48}
                              className="object-cover"
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
