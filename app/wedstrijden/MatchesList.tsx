"use client";

import { useState } from "react";

export function MatchesList({ matches }: { matches: any[] }) {
    return (
        <div className="bg-[#1a1a1a] p-4 rounded-xl w-full max-w-3xl space-y-4">
            {matches.map((m) => (
                <div
                    key={m.id}
                    className="bg-[#0f0f0f] rounded-xl px-4 py-3 flex items-center justify-between shadow-md"
                >
                    {/* TOERNOOI NAAM */}
                    <div className="text-gray-400 text-sm">
                        {m.tournament?.name}
                    </div>

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
                            className={`text-sm font-semibold ${m.status === "running"
                                ? "text-red-500"
                                : m.status === "finished"
                                    ? "text-green-500"
                                    : "text-gray-400"
                                }`}
                        >
                            {m.status === "running"
                                ? "LIVE"
                                : m.status}
                        </div>
                        <div className="text-gray-500 text-sm">
                            {new Date(m.match_date).toLocaleDateString()} •{" "}
                            {new Date(m.match_date).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

function TeamBlock({ team }: { team: any }) {
    return (
        <div className="flex items-center gap-2 min-w-0">
            {team?.logo_url && (
                <img
                    src={team.logo_url}
                    className="w-6 h-6 object-cover rounded-full"
                />
            )}
            <span
                className="text-sm font-medium text-white truncate max-w-[9ch]"
                title={team?.name}
            >
                {team?.name}
            </span>
        </div>
    );
}


export function Bracket({ matches }: { matches: any[] }) {
    const [activeTab, setActiveTab] = useState<"ronde1" | "halve" | "finale">("ronde1");

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
        <div className=" p-6 rounded-xl h-full relative overflow-visible">
            {/* Tabs */}
            <div className="flex gap-2 mb-6 border-b border-white/10 pb-2">
                <button
                    onClick={() => setActiveTab("ronde1")}
                    className={`px-4 py-2 text-sm font-semibold transition-colors ${activeTab === "ronde1"
                        ? "text-white border-b-2 border-white"
                        : "text-gray-400 hover:text-white"
                        }`}
                >
                    Ronde 1
                </button>
                <button
                    onClick={() => setActiveTab("halve")}
                    className={`px-4 py-2 text-sm font-semibold transition-colors ${activeTab === "halve"
                        ? "text-white border-b-2 border-white"
                        : "text-gray-400 hover:text-white"
                        }`}
                >
                    Halve Finale
                </button>
                <button
                    onClick={() => setActiveTab("finale")}
                    className={`px-4 py-2 text-sm font-semibold transition-colors ${activeTab === "finale"
                        ? "text-white border-b-2 border-white"
                        : "text-gray-400 hover:text-white"
                        }`}
                >
                    Finale
                </button>
            </div>

            {/* BRACKET GRID - Responsive columns */}
            <div className="relative flex flex-col xl:flex-row gap-6 xl:gap-8 items-stretch xl:items-start min-h-[500px]">
                {/* Round 1 Column */}
                <div className="w-full xl:flex-1 min-w-0">
                    <BracketRound matches={round1} />
                </div>

                {/* Connection Lines Column 1 (Round 1 to Semi) */}
                <div className="relative w-full xl:w-16 flex-shrink-0 hidden xl:block">
                    <BracketLinesRound1ToSemi />
                </div>

                {/* Semi-Finals Column */}
                <div className="w-full xl:flex-1 min-w-0">
                    <BracketRound matches={semiWithEmpty} showEmpty={true} />
                </div>

                {/* Connection Lines Column 2 (Semi to Final) */}
                <div className="relative w-full xl:w-16 flex-shrink-0 hidden xl:block">
                    <BracketLinesSemiToFinal />
                </div>

                {/* Finals Column */}
                <div className="w-full xl:flex-1 min-w-0">
                    <BracketRound matches={finaleWithEmpty} showEmpty={true} />
                </div>
            </div>
        </div>
    );
}


/* BRACKET LINES - Round 1 to Semi-Finals */
function BracketLinesRound1ToSemi() {
    // Layout baseline for the connector math:
    // - Bracket cards are fixed at 100px tall (see BracketRound h-[100px])
    // - Tailwind space-y-6 keeps 24px between cards
    // - Date label/padding offsets the first card ~40px from the top
    const matchHeight = 100;
    const matchGap = 24;
    const matchStart = 40;
    const cardHeight = matchHeight;

    return (
        <div className="relative h-full">
            {/* Match 1 & 2 to Semi-Final 1 */}
            <div className="absolute" style={{ top: `${matchStart}px` }}>
                {/* Horizontal line from match 1 */}
                <div className="absolute left-0 w-8 h-[1px] bg-white/20" style={{ top: `${cardHeight / 2 - 1}px` }} />
                {/* Horizontal line from match 2 */}
                <div className="absolute left-0 w-8 h-[1px] bg-white/20" style={{ top: `${cardHeight / 2 - 1 + matchHeight + matchGap}px` }} />
                {/* Vertical line connecting to semi-final */}
                <div
                    className="absolute left-8 w-[1px] bg-white/20"
                    style={{
                        top: `${cardHeight / 2 - 1}px`,
                        height: `${matchHeight + matchGap + 1}px`
                    }}
                />
                {/* Horizontal line to semi-final 1 */}
                <div
                    className="absolute left-8 w-8 h-[1px] bg-white/20"
                    style={{
                        top: `${cardHeight / 2 - 1 + (matchHeight + matchGap) / 2}px`
                    }}
                />
            </div>

            {/* Match 3 & 4 to Semi-Final 2 */}
            <div className="absolute" style={{ top: `${matchStart + (matchHeight + matchGap) * 2}px` }}>
                {/* Horizontal line from match 3 */}
                <div className="absolute left-0 w-8 h-[1px] bg-white/20" style={{ top: `${cardHeight / 2 - 1}px` }} />
                {/* Horizontal line from match 4 */}
                <div className="absolute left-0 w-8 h-[1px] bg-white/20" style={{ top: `${cardHeight / 2 - 1 + matchHeight + matchGap}px` }} />
                {/* Vertical line connecting to semi-final */}
                <div
                    className="absolute left-8 w-[1px] bg-white/20"
                    style={{
                        top: `${cardHeight / 2 - 1}px`,
                        height: `${matchHeight + matchGap + 1}px`
                    }}
                />
                {/* Horizontal line to semi-final 2 */}
                <div
                    className="absolute left-8 w-8 h-[1px] bg-white/20"
                    style={{
                        top: `${cardHeight / 2 - 1 + (matchHeight + matchGap) / 2}px`
                    }}
                />
            </div>
        </div>
    );
}

/* BRACKET LINES - Semi-Finals to Final */
function BracketLinesSemiToFinal() {
    const matchHeight = 100;
    const matchGap = 24;
    const matchStart = 40;
    const cardHeight = matchHeight;

    return (
        <div className="relative h-full">
            {/* Semi-Final 1 & 2 to Final */}
            <div className="absolute" style={{ top: `${matchStart}px` }}>
                {/* Horizontal line from semi-final 1 */}
                <div className="absolute left-0 w-8 h-[1px] bg-white/20" style={{ top: `${cardHeight / 2 - 1}px` }} />
                {/* Horizontal line from semi-final 2 */}
                <div className="absolute left-0 w-8 h-[1px] bg-white/20" style={{ top: `${cardHeight / 2 - 1 + matchHeight + matchGap}px` }} />
                {/* Vertical line connecting to final */}
                <div
                    className="absolute left-8 w-[1px] bg-white/20"
                    style={{
                        top: `${cardHeight / 2 - 1}px`,
                        height: `${matchHeight + matchGap + 1}px`
                    }}
                />
                {/* Horizontal line to final */}
                <div
                    className="absolute left-8 w-8 h-[1px] bg-white/20"
                    style={{
                        top: `${cardHeight / 2 - 1 + (matchHeight + matchGap) / 2}px`
                    }}
                />
            </div>
        </div>
    );
}


/* ----------------------------------------------------
   BRACKET ROUND BOXES
---------------------------------------------------- */
function BracketRound({ matches, showEmpty = false }: { matches: any[]; showEmpty?: boolean }) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        return `${day}.${month}.${year}`;
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        const hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        return `${displayHours}:${minutes} ${ampm}`;
    };

    return (
        <div className="space-y-6">
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

                const hasScore =
                    m.score_team1 !== null &&
                    m.score_team2 !== null &&
                    (m.score_team1 > 0 || m.score_team2 > 0);

                return (
                    <div
                        key={m.id}
                        className=" p-4 relative "
                    >
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
                                    <img
                                        src={m.team1.logo_url}
                                        alt={m.team1.name}
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                )}
                                <span
                                    className="text-xs font-semibold text-white truncate"
                                    title={m.team1?.name}
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
                                    <img
                                        src={m.team2.logo_url}
                                        alt={m.team2.name}
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                )}
                                <span
                                    className="text-xs font-semibold text-white truncate"
                                    title={m.team2?.name}
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
