"use client";

import { useEffect, useState } from "react";
import BekijkButton from "../ui/BekijkButton";
import Image from "next/image";

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

  // Alleen aankomende wedstrijden
  const upcomingMatches = matches
    .filter((m) => m.status?.toLowerCase() !== "finished")
    .slice(0, 3); // alleen de eerste 3

  return (
    <div className="relative h-[440px] bg-widget-bg border border-widget-border rounded-[10px] p-4 text-white overflow-y-auto space-y-3 modern-scrollbar">
      <div className="flex gap-5 items-center mb-5">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M23.2968 1.73217H20.217C20.2282 1.39105 20.2344 1.04791 20.2344 0.703124C20.2344 0.314758 19.9195 0 19.5313 0H4.46868C4.0805 0 3.76556 0.314758 3.76556 0.703124C3.76556 1.04791 3.77178 1.39105 3.78295 1.73217H0.703124C0.314758 1.73217 0 2.04693 0 2.4353C0 5.5858 0.823424 8.55815 2.31848 10.805C3.79632 13.0263 5.76488 14.3003 7.89146 14.4243C8.37358 14.9489 8.88316 15.3766 9.41398 15.7029V18.828H8.23442C6.8084 18.828 5.64843 19.9881 5.64843 21.414V22.5935H5.59844C5.21007 22.5935 4.89532 22.9085 4.89532 23.2966C4.89532 23.685 5.21007 23.9998 5.59844 23.9998H18.4015C18.7899 23.9998 19.1046 23.685 19.1046 23.2966C19.1046 22.9085 18.7899 22.5935 18.4015 22.5935H18.3515V21.414C18.3515 19.9881 17.1916 18.828 15.7655 18.828H14.586V15.7029C15.1168 15.3768 15.6266 14.9489 16.1087 14.4243C18.2351 14.3003 20.2036 13.0263 21.6817 10.805C23.1767 8.55815 24 5.5858 24 2.4353C24 2.04693 23.6852 1.73217 23.2968 1.73217ZM3.48925 10.0261C2.25604 8.1729 1.53149 5.74895 1.42108 3.13842H3.8615C4.1151 6.34752 4.8684 9.31382 6.04576 11.6684C6.23326 12.0434 6.42937 12.3977 6.6328 12.7313C5.46331 12.2896 4.38097 11.3664 3.48925 10.0261ZM16.9453 21.414V22.5937H7.05467V21.414C7.05467 20.7636 7.58385 20.2342 8.23442 20.2342H15.7655C16.4161 20.2342 16.9453 20.7636 16.9453 21.414ZM13.1797 18.828H10.8202V16.3139C11.2068 16.4157 11.6006 16.4687 12 16.4687C12.3993 16.4687 12.7932 16.4157 13.1797 16.3139V18.828ZM13.6151 14.6411C13.5835 14.6541 13.5531 14.6698 13.524 14.6872C13.027 14.9344 12.5163 15.0624 12 15.0624C11.4838 15.0624 10.9733 14.9344 10.4765 14.6876C10.4471 14.6698 10.4165 14.6541 10.3844 14.6407C9.83311 14.3492 9.29973 13.909 8.79527 13.3306C8.76872 13.2927 8.73887 13.2577 8.70573 13.2259C8.20494 12.6313 7.73381 11.9 7.30351 11.0394C6.01134 8.45525 5.265 5.05736 5.18004 1.40625H18.8199C18.7348 5.05736 17.9884 8.45543 16.6964 11.0394C16.2661 11.9 15.795 12.6313 15.2944 13.2259C15.2611 13.2577 15.2309 13.2929 15.2045 13.3308C14.7 13.9094 14.1665 14.3494 13.6151 14.6411ZM20.5107 10.0261C19.619 11.3664 18.5366 12.2896 17.3672 12.7313C17.5706 12.3977 17.7667 12.0434 17.9542 11.6684C19.1316 9.31382 19.8847 6.34752 20.1384 3.13842H22.5789C22.4685 5.74895 21.7439 8.1729 20.5107 10.0261Z"
            fill="currentColor"
          />
        </svg>

        <h1 className="text-xl font-semibold">Wedstrijden</h1>
      </div>

      {/* Loading */}
      {loading && (
        <div className="py-10 text-center text-white/60 text-sm border border-white/10 rounded-2xl bg-black/20">
          Data ophalen...
        </div>
      )}

      {/* Geen wedstrijden */}
      {!loading && upcomingMatches.length === 0 && (
        <div className="py-10 text-center text-white/60 text-sm border border-white/10 rounded-2xl bg-black/20">
          Geen aankomende wedstrijden
        </div>
      )}

      {/* Matches */}
      {!loading &&
        upcomingMatches.map((match) => (
          <div
            key={match.id}
            className="bg-[#242424] rounded-[5px] overflow-hidden"
          >
            <div className="relative flex items-center justify-between px-4 py-2 bg-[#525252]">
              <div className="flex flex-row gap-4 text-sm leading-tight">
                <span className="font-semibold">
                  {match.tournament?.name || "The Legion Tournament"}
                </span>

                <span className="text-white/60 text-xs uppercase tracking-[0.35em]">
                  Ronde 2
                </span>
              </div>

              <div className="absolute left-1/2 transform -translate-x-1/2 hidden sm:flex items-center justify-center">
                {match.status?.toLowerCase() === "running" ||
                match.status?.toLowerCase() === "live" ? (
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

              {/* Date & Time */}
              <div className="flex flex-row gap-2 items-end text-sm uppercase tracking-wide font-semibold">
                <span>
                  {(() => {
                    const d = new Date(match.match_date);
                    return `${String(d.getDate()).padStart(2, "0")}.${String(
                      d.getMonth() + 1
                    ).padStart(2, "0")}.${String(d.getFullYear()).slice(-2)}`;
                  })()}
                </span>
                <span className="font-light">|</span>
                <span>
                  {(() => {
                    const d = new Date(match.match_date);
                    const hours = d.getHours();
                    const minutes = String(d.getMinutes()).padStart(2, "0");
                    const ampm = hours >= 12 ? "PM" : "AM";
                    return `${hours % 12 || 12}:${minutes} ${ampm}`;
                  })()}
                </span>
              </div>
            </div>

            {/* Teams */}
            <div className="flex items-center justify-between gap-4 px-4 py-3 bg-[#343434]">
              <div className="flex items-center gap-2 flex-1 min-w-0">
                {match.team1?.logo_url && (
                  <Image
                    src={match.team1.logo_url}
                    alt={match.team1?.name}
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                )}

                <span className="font-semibold text-[#C0C0C0] uppercase truncate text-xs">
                  {match.team1?.name || "Team 1"}
                </span>
              </div>

              <div className="flex flex-col items-center min-w-[60px]">
                <p className="text-lg font-bold tracking-wide leading-none text-[#525252] ">
                  {match.score_team1 || "-"}
                  <span className="text-sm px-1">
                    {match.status?.toLowerCase() === "finished" ? "-" : "VS"}
                  </span>
                  {match.score_team2 || "-"}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-1 min-w-0 justify-end">
                <span className="font-semibold text-[#C0C0C0] uppercase truncate text-xs text-right">
                  {match.team2?.name || "Team 2"}
                </span>

                {match.team2?.logo_url && (
                  <Image
                    src={match.team2.logo_url}
                    alt={match.team2?.name}
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                )}
              </div>
            </div>
          </div>
        ))}

      {/* Bekijk button */}
      <div className="absolute bottom-5 right-5">
        <BekijkButton href="/wedstrijden" />
      </div>
    </div>
  );
}
