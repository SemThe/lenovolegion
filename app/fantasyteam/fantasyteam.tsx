"use client";

import Image from "next/image";
import Achtergrond from "../../components/Achtergrond";

type Player = {
  name: string;
  price: string;
  image?: string; // URL of path to player image
};

const FantasyTeam = () => {
  // Spelers data
  // Voeg een "image" veld toe met een URL of pad naar de afbeelding
  // Voorbeeld: { name: "Twistzz", price: "6k", image: "/images/twistzz.jpg" }
  // Of externe URL: { name: "Twistzz", price: "6k", image: "https://example.com/twistzz.jpg" }
  const papaneusPlayers: Player[] = [
    { name: "Twistzz", price: "6k" },
    { name: "Ultimate", price: "3k" },
    { name: "Nertz", price: "3.5k" },
    { name: "Naf", price: "4k" },
    { name: "Siuhy", price: "3.5k" },
  ];

  const morrogPlayers: Player[] = [
    { name: "MEZII", price: "3k" },
    { name: "Flamez", price: "5k" },
    { name: "ZTWOO", price: "4k" },
    { name: "ROPZ", price: "2k" },
    { name: "APEX", price: "1.5k" },
  ];

  return (
    <div className="relative min-h-screen bg-[#0b0b0b] overflow-hidden">
      {/* Achtergrond met V-vormige lichtbundels */}
      <Achtergrond />
      
      <div className="max-w-[1200px] mx-auto px-4 py-10 relative z-10">
        {/* 1. TITELBLOK */}
        <section className="flex items-center justify-between mb-10 pt-10">
          <div className="flex items-center gap-4">
            {/* Oranje pictogram met speler silhouet */}
            <div className="bg-[#f68b32] rounded-lg p-3 shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 2C10.5 2 9 3 9 4.5v2c0 1.5 1.5 2.5 3 2.5s3-1 3-2.5v-2C15 3 13.5 2 12 2z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 7h6M8 8v8h8V8M10 10h4M10 12h4M10 14h4"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 16h10M6 18h12"
                />
              </svg>
            </div>
            {/* Logo tekst */}
            <h1 className="text-xl font-bold text-white tracking-wide">
              Lenovo fantasytteam
            </h1>
          </div>
          
          {/* Puntentelling knop */}
          <button
            type="button"
            className="bg-[#2b5eff] hover:bg-[#1e4fe6] text-white px-3 py-1.5 rounded-xl text-[13px] font-bold transition-colors shadow-lg"
          >
            puntentelling
          </button>
        </section>

        {/* 2. MYSQUAD SECTIE */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-white mb-5">mysquad</h2>
          <div className="flex justify-center gap-4 flex-wrap">
            {[0, 1, 2, 3, 4].map((index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className={`w-40 h-40 rounded-2xl flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.3)] ${
                    index % 2 === 0 ? "bg-[#f68b32]" : "bg-[#2b5eff]"
                  }`}
                >
                  <span className="text-white text-4xl font-light">+</span>
                </div>
                <p className="text-white text-sm mt-2 text-center tracking-[0.5px] lowercase">
                  voeg speler toe
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* 3. SUBS SECTIE */}
        <section className="mb-16">
          <h2 className="text-lg font-bold text-white mb-5">subs</h2>
          <div className="flex justify-center gap-4 flex-wrap max-w-md mx-auto">
            <div className="flex flex-col items-center">
              <div className="w-40 h-40 rounded-2xl flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.3)] bg-[#2b5eff]">
                <span className="text-white text-4xl font-light">+</span>
              </div>
              <p className="text-white text-sm mt-2 text-center tracking-[0.5px] lowercase">
                voeg speler toe
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-40 h-40 rounded-2xl flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.3)] bg-[#f68b32]">
                <span className="text-white text-4xl font-light">+</span>
              </div>
              <p className="text-white text-sm mt-2 text-center tracking-[0.5px] lowercase">
                voeg speler toe
              </p>
            </div>
          </div>
        </section>

        {/* 4. PUNTENTELLER */}
        <section className="mb-16">
          <h2 className="text-lg font-bold text-white text-center mb-4">punten</h2>
          <div className="w-full max-w-[960px] mx-auto">
            {/* Progress bar */}
            <div className="relative h-3 bg-[#f68b32] rounded-full overflow-hidden shadow-inner">
              {/* Blauw vulling (27% = 80/300) */}
              <div
                className="absolute left-0 top-0 h-full bg-[#2b5eff] rounded-full"
                style={{ width: "27%" }}
              ></div>
            </div>
            {/* Schaal markeringen */}
            <div className="flex justify-between mt-2 px-1">
              <span className="text-white text-[13px] font-light">0</span>
              <span className="text-white text-[13px] font-light">100</span>
              <span className="text-white text-[13px] font-light">200</span>
              <span className="text-white text-[13px] font-light">300</span>
            </div>
            {/* 80/300 tekst */}
            <div className="text-center mt-2">
              <span className="text-white text-[13px] font-light">80/300</span>
            </div>
          </div>
        </section>

        {/* 5. PLAYERS SECTIE */}
        <section>
          {/* Titelbalk */}
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xl font-bold text-white">players</h2>
            <p className="text-white text-sm opacity-80">budget: 16000</p>
          </div>

          {/* Team 1 - Papaneus */}
          <div className="mb-10">
            {/* Team header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#f68b32] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <h3 className="text-lg font-bold text-white">Papaneus</h3>
            </div>
            {/* Spelersgrid */}
            <div className="grid grid-cols-5 gap-4">
              {papaneusPlayers.map((player, index) => (
                <div
                  key={index}
                  className="bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-[0_4px_10px_rgba(0,0,0,0.4)] p-3 hover:scale-[1.03] transition-transform relative"
                >
                  {/* Team logo linksboven */}
                  <div className="absolute top-2 left-2 w-5 h-5 bg-[#f68b32] rounded flex items-center justify-center">
                    <span className="text-white text-xs font-bold">P</span>
                  </div>
                  {/* Speler foto */}
                  <div className="relative w-full aspect-3/4 bg-gray-800 rounded-lg mb-2 overflow-hidden">
                    {player.image ? (
                      <Image
                        src={player.image}
                        alt={player.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 20vw, 200px"
                        unoptimized={player.image.startsWith("http")}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-16 w-16 text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  {/* Speler naam */}
                  <h4 className="text-white font-bold text-base text-center mb-2">
                    {player.name}
                  </h4>
                  {/* Prijs balk */}
                  <div className="bg-[#f68b32] text-white px-2 py-1 rounded-md text-xs font-semibold text-center">
                    {player.price}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team 2 - Morrog */}
          <div>
            {/* Team header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-[#ffd94d] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <h3 className="text-lg font-bold text-white">morrog</h3>
            </div>
            {/* Spelersgrid */}
            <div className="grid grid-cols-5 gap-4">
              {morrogPlayers.map((player, index) => (
                <div
                  key={index}
                  className="bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-[0_4px_10px_rgba(0,0,0,0.4)] p-3 hover:scale-[1.03] transition-transform relative"
                >
                  {/* Team logo linksboven */}
                  <div className="absolute top-2 left-2 w-5 h-5 bg-[#ffd94d] rounded flex items-center justify-center z-10">
                    <span className="text-white text-xs font-bold">M</span>
                  </div>
                  {/* Speler foto */}
                  <div className="relative w-full aspect-3/4 bg-gray-800 rounded-lg mb-2 overflow-hidden">
                    {player.image ? (
                      <Image
                        src={player.image}
                        alt={player.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 20vw, 200px"
                        unoptimized={player.image.startsWith("http")}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-16 w-16 text-gray-600"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  {/* Speler naam */}
                  <h4 className="text-white font-bold text-base text-center mb-2">
                    {player.name}
                  </h4>
                  {/* Prijs balk (geel) */}
                  <div className="bg-[#ffd94d] text-white px-2 py-1 rounded-md text-xs font-semibold text-center">
                    {player.price}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FantasyTeam;
