"use client";

import { useState, useEffect } from "react";
import Achtergrond from "../../components/Achtergrond";
import Image from "next/image";

type AvailablePlayer = {
  name: string;
  value: string;
  team: string;
  teamColor: string; // "orange" or "yellow"
  image?: string;
  isSelected: boolean;
};

const FantasyTeam = () => {
  const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);
  const [isPuntentellingModalOpen, setIsPuntentellingModalOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<{ team: "MySquad" | "Subs"; index: number } | null>(null);
  const [activeTab, setActiveTab] = useState<"team" | "individual">("team");
  
  // State voor geselecteerde spelers
  const [mySquadPlayers, setMySquadPlayers] = useState<(AvailablePlayer | null)[]>([
    null,
    null,
    null,
    null,
    null,
  ]);
  
  const [subsPlayers, setSubsPlayers] = useState<(AvailablePlayer | null)[]>([
    null,
    null,
  ]);

  // Startbudget
  const START_BUDGET = 16000;

  // Functie om prijs string te converteren naar getal (bijv. "3K" -> 3000, "1.5K" -> 1500)
  const parsePrice = (priceString: string): number => {
    const cleaned = priceString.replace(/[^0-9.]/g, "");
    const number = parseFloat(cleaned);
    if (priceString.toUpperCase().includes("K")) {
      return number * 1000;
    }
    return number;
  };

  // Functie om getal te converteren naar prijs string (bijv. 3000 -> "3K", 1500 -> "1.5K")
  const formatPrice = (price: number): string => {
    if (price >= 1000) {
      const kValue = price / 1000;
      return kValue % 1 === 0 ? `${kValue}K` : `${kValue.toFixed(1)}K`;
    }
    return price.toString();
  };

  // Bereken totaal uitgegeven budget
  const calculateTotalSpent = (): number => {
    const mySquadTotal = mySquadPlayers
      .filter((p): p is AvailablePlayer => p !== null)
      .reduce((sum, player) => sum + parsePrice(player.value), 0);
    
    const subsTotal = subsPlayers
      .filter((p): p is AvailablePlayer => p !== null)
      .reduce((sum, player) => sum + parsePrice(player.value), 0);
    
    return mySquadTotal + subsTotal;
  };

  // Bereken resterend budget
  const remainingBudget = START_BUDGET - calculateTotalSpent();

  // Functie om team op te slaan in localStorage
  const saveTeamToLocalStorage = () => {
    if (typeof window === 'undefined') return;
    
    try {
      const teamData = {
        mySquad: mySquadPlayers,
        subs: subsPlayers,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem('fantasyTeam', JSON.stringify(teamData));
      console.log('Team opgeslagen in localStorage');
    } catch (error) {
      console.error('Error saving team to localStorage:', error);
    }
  };

  // Functie om team te laden uit localStorage
  const loadTeamFromLocalStorage = () => {
    if (typeof window === 'undefined') return;
    
    try {
      const savedTeam = localStorage.getItem('fantasyTeam');
      if (savedTeam) {
        const teamData = JSON.parse(savedTeam);
        setMySquadPlayers(teamData.mySquad || [null, null, null, null, null]);
        setSubsPlayers(teamData.subs || [null, null]);
        console.log('Team geladen uit localStorage');
      }
    } catch (error) {
      console.error('Error loading team from localStorage:', error);
    }
  };

  // Laad team bij mount
  useEffect(() => {
    loadTeamFromLocalStorage();
  }, []);

  // Sla team automatisch op wanneer spelers worden toegevoegd/verwijderd (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      saveTeamToLocalStorage();
    }, 500); // Debounce: save 0.5 second after last change

    return () => clearTimeout(timer);
  }, [mySquadPlayers, subsPlayers]);


  // Beschikbare spelers voor selectie
  const [availablePlayers, setAvailablePlayers] = useState<AvailablePlayer[]>([
    { name: "TWISTZZ", value: "3K", team: "PAPANEUS", teamColor: "orange", isSelected: false },
    { name: "FLAMEZ", value: "3.5K", team: "MORROG", teamColor: "yellow", isSelected: false },
    { name: "ULTIMATE", value: "2K", team: "PAPANEUS", teamColor: "orange", isSelected: false },
    { name: "NERTZ", value: "2.5K", team: "PAPANEUS", teamColor: "orange", isSelected: false },
    { name: "NAF", value: "2K", team: "PAPANEUS", teamColor: "orange", isSelected: false },
    { name: "SIUHY", value: "2.5K", team: "PAPANEUS", teamColor: "orange", isSelected: false },
    { name: "MEZII", value: "3K", team: "MORROG", teamColor: "yellow", isSelected: false },
    { name: "ZYWOO", value: "1K", team: "MORROG", teamColor: "yellow", isSelected: false },
    { name: "ROPZ", value: "2K", team: "MORROG", teamColor: "yellow", isSelected: false },
  ]);


  // Functie om te checken of een speler al gebruikt wordt
  const isPlayerAlreadyUsed = (playerName: string): boolean => {
    return (
      mySquadPlayers.some((p) => p?.name === playerName) ||
      subsPlayers.some((p) => p?.name === playerName)
    );
  };

  // Functie om speler toe te voegen aan My Squad of Subs
  const handleAddPlayer = (player: AvailablePlayer) => {
    if (!selectedSlot) return;
    
    // Check of speler al gebruikt wordt
    if (isPlayerAlreadyUsed(player.name)) {
      alert("Deze speler is al geselecteerd!");
      return;
    }
    
    const playerPrice = parsePrice(player.value);
    if (remainingBudget < playerPrice) {
      alert("Niet genoeg budget!");
      return;
    }

    if (selectedSlot.team === "MySquad") {
      setMySquadPlayers((prev) => {
        const newPlayers = [...prev];
        newPlayers[selectedSlot.index] = { ...player, isSelected: true };
        return newPlayers;
      });
    } else {
      setSubsPlayers((prev) => {
        const newPlayers = [...prev];
        newPlayers[selectedSlot.index] = { ...player, isSelected: true };
        return newPlayers;
      });
    }

    setIsPlayerModalOpen(false);
    setSelectedSlot(null);
  };

  // Functie om speler te verwijderen
  const handleRemovePlayer = (team: "MySquad" | "Subs", index: number) => {
    if (team === "MySquad") {
      setMySquadPlayers((prev) => {
        const newPlayers = [...prev];
        newPlayers[index] = null;
        return newPlayers;
      });
    } else {
      setSubsPlayers((prev) => {
        const newPlayers = [...prev];
        newPlayers[index] = null;
        return newPlayers;
      });
    }
  };

  // Functie om modal te openen met geselecteerde slot
  const handleOpenPlayerModal = (team: "MySquad" | "Subs", index: number) => {
    setSelectedSlot({ team, index });
    setIsPlayerModalOpen(true);
  };

  // Sample data voor Top 10
  const top10 = [
    { rank: 1, username: "PlayerOne", xp: "300 XP", avatar: null },
    { rank: 2, username: "GamerPro", xp: "285 XP", avatar: null },
    { rank: 3, username: "ElitePlayer", xp: "270 XP", avatar: null },
    { rank: 4, username: "Champion", xp: "255 XP", avatar: null },
    { rank: 5, username: "MasterGamer", xp: "240 XP", avatar: null },
    { rank: 6, username: "ProGamer", xp: "225 XP", avatar: null },
    { rank: 7, username: "TopPlayer", xp: "210 XP", avatar: null },
    { rank: 8, username: "BestPlayer", xp: "195 XP", avatar: null },
    { rank: 9, username: "GreatGamer", xp: "180 XP", avatar: null },
    { rank: 10, username: "GoodPlayer", xp: "165 XP", avatar: null },
  ];

  const userRank = { rank: 150, username: "Jij", xp: "80 XP", avatar: null };

  return (
    <div className="relative h-screen bg-[#0b0b0b] overflow-hidden">
      {/* Achtergrond met V-vormige lichtbundels */}
      <div className="absolute inset-0 z-0">
        <Achtergrond />
      </div>

      <div className="relative z-10">
        {/* Hoofdcontent */}
        <div className="w-full px-6 pt-24 pb-24 flex flex-row gap-8 overflow-visible">
          {/* Linkerzijde - Fantasyteam sectie */}
          <div className="flex-1 overflow-visible">
            {/* Titel Banner */}
            <div className="rounded-lg px-6 py-4 mb-6 flex items-center gap-3">
              {/* Linkerzijde - Tekst */}
              <div className="flex flex-col">
                <h1 className="text-white font-bold text-lg leading-tight">Lenovo</h1>
                <h1 className="text-white font-bold text-lg leading-tight">Fantasyteam</h1>
              </div>
              {/* Rechterzijde - CS:GO Logo */}
              <div className="w-15 h-15 rounded-lg overflow-hidden">
                <img
                  src="/images/csgo.png"
                  alt="CS:GO Logo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* My Squad sectie */}
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-3">
                <h2 className="text-base font-bold text-white ml-6 w-20">My Squad</h2>
                {/* Puntentelling knop */}
                <button
                  type="button"
                  onClick={() => setIsPuntentellingModalOpen(true)}
                  className="bg-[#2b5eff] hover:bg-[#1e4fe6] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors ml-265"
                >
                  Puntentelling
                </button>
              </div>
              <div className="flex gap-4 flex-wrap justify-center overflow-visible">
                {/* My Squad spelerkaarten */}
                {mySquadPlayers.map((player, index) => (
                  player ? (
                    <div
                      key={index}
                      className="w-48 h-48 rounded-2xl overflow-hidden shadow-lg relative border-2 border-[#f68b32] bg-[#1a1a1a] flex flex-col"
                    >
                      {/* Prullenbak icoon rechtsboven */}
                      <button
                        type="button"
                        className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70 rounded-full p-1.5 transition-colors"
                        aria-label="Verwijderen"
                        onClick={() => handleRemovePlayer("MySquad", index)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>

                      {/* Team logo in hoek */}
                      <div className="absolute top-2 left-2 w-12 h-12 rounded flex items-center justify-center z-10 overflow-hidden">
                        <img
                          src={player.team === "PAPANEUS" ? "/images/papaneus.png" : "/images/morrog.png"}
                          alt={player.team}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Speler afbeelding */}
                      <div className="w-full h-32 bg-gray-800 flex items-center justify-center shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-20 w-20 text-gray-600"
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

                      {/* Naamtag op donkere balk */}
                      <div className="bg-[#1a1a1a] px-1 py-2 flex flex-col justify-center shrink -mt-2">
                        <h3 className="text-white font-semibold text-sm text-center pt-0">
                          {player.name}
                        </h3>
                        {/* Lijn met fade */}
                        <div className="w-full h-px bg-linear-to-r from-transparent via-gray-600 to-transparent my-0.5"></div>
                        {/* Waarde */}
                        <div className="text-center pb-0">
                          <span className="text-gray-300 text-xs">{player.value}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      key={index}
                      className="w-48 h-48 rounded-2xl border-2 border-dashed border-[#f68b32] bg-[#f68b32]/10 flex items-center justify-center shadow-lg cursor-pointer hover:bg-[#f68b32]/20 transition-colors"
                      onClick={() => handleOpenPlayerModal("MySquad", index)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </div>
                  )
                ))}
              </div>
            </div>

            {/* Scheidingslijn */}
            <div className="flex justify-center my-4">
              <div className="w-3/4 h-px bg-linear-to-r from-transparent via-gray-700 to-transparent"></div>
            </div>

            {/* Subs sectie */}
            <div className="mb-6">
              <h2 className="text-base font-bold text-white mb-3 ml-6">Subs</h2>
              <div className="flex gap-4 items-center justify-center overflow-visible">
                {subsPlayers.map((player, index) => (
                  player ? (
                    <div
                      key={index}
                      className="w-48 h-48 rounded-2xl overflow-hidden shadow-lg relative border-2 border-[#2b5eff] bg-[#1a1a1a] flex flex-col"
                    >
                      {/* Prullenbak icoon rechtsboven */}
                      <button
                        type="button"
                        className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70 rounded-full p-1.5 transition-colors"
                        aria-label="Verwijderen"
                        onClick={() => handleRemovePlayer("Subs", index)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>

                      {/* Team logo in hoek */}
                      <div className="absolute top-2 left-2 w-12 h-12 rounded flex items-center justify-center z-10 overflow-hidden">
                        <img
                          src={player.team === "PAPANEUS" ? "/images/papaneus.png" : "/images/morrog.png"}
                          alt={player.team}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      {/* Speler afbeelding */}
                      <div className="w-full h-32 bg-gray-800 flex items-center justify-center shrink-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-20 w-20 text-gray-600"
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

                      {/* Naamtag op donkere balk */}
                      <div className="bg-[#1a1a1a] px-2 sm:px-3 py-0 flex flex-col justify-center shrink-0">
                        <h3 className="text-white font-semibold text-xs sm:text-sm text-center pt-1">
                          {player.name}
                        </h3>
                        {/* Lijn met fade */}
                        <div className="w-full h-px bg-linear-to-r from-transparent via-gray-600 to-transparent my-0.5"></div>
                        {/* Waarde */}
                        <div className="text-center pb-1">
                          <span className="text-gray-300 text-[10px] sm:text-xs">{player.value}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      key={index}
                      className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-xl sm:rounded-2xl border-2 border-dashed border-[#2b5eff] bg-[#2b5eff]/10 flex items-center justify-center shadow-lg cursor-pointer hover:bg-[#2b5eff]/20 transition-colors"
                      onClick={() => handleOpenPlayerModal("Subs", index)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>

          {/* Rechterzijpaneel - Top 10 */}
          <div className="w-[353px] bg-[#1a1a1a] rounded-2xl p-[21px] shadow-lg mt-4">
            <h2 className="text-base font-bold text-white mb-[17px]">Top 10</h2>

            <div className="space-y-[11px] mb-4">
              {top10.map((player) => (
                <div
                  key={player.rank}
                  className="flex items-center gap-[13px] p-[9px] rounded-lg hover:bg-[#0c0c0c] transition-colors"
                >
                  {/* Rangnummer */}
                  <span className="text-gray-400 font-bold text-xs w-7">#{player.rank}</span>

                  {/* Avatar */}
                  <div className="w-[37px] h-[37px] rounded-full bg-gray-700 flex items-center justify-center shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 text-gray-400"
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

                  
                  <span className="text-white text-xs font-medium flex-1 truncate">
                    {player.username}
                  </span>

                  
                  <span className="bg-gray-700 text-gray-300 text-[10px] px-[13px] py-1 rounded-full">
                    {player.xp}
                  </span>
                </div>
              ))}
            </div>

          
            <div className="border-t border-gray-700 pt-[17px]">
              <div className="flex items-center gap-[13px] p-[9px] rounded-lg bg-[#0c0c0c]">
              
                <span className="text-gray-400 font-bold text-xs w-7">#{userRank.rank}</span>

                
                <div className="w-[37px] h-[37px] rounded-full bg-[#2b5eff] flex items-center justify-center shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
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

                {/* Username */}
                <span className="text-white text-xs font-medium flex-1 truncate">{userRank.username}</span>

                {/* XP badge */}
                <span className="bg-gray-700 text-gray-300 text-[10px] px-[13px] py-1 rounded-full">
                  {userRank.xp}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Budget en Opslaan - Fixed onderaan */}
        <div className="fixed bottom-0 left-0 z-20 bg-[#0c0c0c]">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between bg-[#1a1a1a] rounded-xl px-6 py-4" style={{ width: 'calc((118vw - 3rem) * 0.65)' }}>
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold">Budget:</span>
                <span className={`font-bold text-lg ${remainingBudget < 0 ? "text-red-500" : "text-[#2b5eff]"}`}>
                  {formatPrice(remainingBudget)}
                </span>
              </div>
              <button
                type="button"
                className="bg-[#2b5eff] hover:bg-[#1e4fe6] text-white px-8 py-3 rounded-lg font-bold transition-colors"
              >
                Opslaan
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Spelers Modal - Van rechts */}
      {isPlayerModalOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/50 z-30"
            onClick={() => {
              setIsPlayerModalOpen(false);
              setSelectedSlot(null);
            }}
          />

          {/* Modal */}
          <div className="fixed right-0 top-0 bottom-0 w-[500px] bg-[#1a1a1a] z-40 shadow-2xl overflow-y-auto transform transition-transform duration-300 ease-out">
            {/* Header */}
            <div className="sticky top-0 bg-[#1a1a1a] border-b border-gray-800 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Spelers</h2>
              <div className="flex items-center gap-4">
                {/* Search icon */}
                <button
                  type="button"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Zoeken"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>

                {/* Filter icon */}
                <button
                  type="button"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Filter"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                </button>

                {/* Close button */}
                <button
                  type="button"
                  className="text-white hover:text-gray-400 transition-colors"
                  onClick={() => {
                    setIsPlayerModalOpen(false);
                    setSelectedSlot(null);
                  }}
                  aria-label="Sluiten"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Spelerlijst */}
            <div className="p-4 space-y-2">
              {availablePlayers.map((player, index) => {
                const isUsed = isPlayerAlreadyUsed(player.name);
                return (
                <div
                  key={index}
                  className={`bg-[#0c0c0c] rounded-lg p-4 flex items-center gap-4 border-b-2 ${
                    isUsed 
                      ? "opacity-50 border-gray-600"
                      : player.teamColor === "orange"
                      ? "border-[#f68b32]"
                      : "border-[#fbbf24]"
                  }`}
                >
                  {/* Speler afbeelding */}
                  <div className="w-16 h-16 rounded-lg bg-gray-800 flex items-center justify-center shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-gray-600"
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

                  {/* Speler info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-bold text-lg mb-1">
                      {player.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      {/* Team logo */}
                      <div className="w-4 h-4 rounded flex items-center justify-center shrink-0 overflow-hidden relative">
                        <Image
                          src={
                            player.team === "PAPANEUS"
                              ? "/images/papaneus.png"
                              : "/images/morrog.png"
                          }
                          alt={player.team}
                          fill
                          className="object-contain"
                        />
                      </div>

                      <span
                        className={`text-sm font-medium ${
                          player.teamColor === "orange"
                            ? "text-[#f68b32]"
                            : "text-[#fbbf24]"
                        }`}
                      >
                        {player.team}
                      </span>
                    </div>
                  </div>

                  {/* Waarde */}
                  <div className="text-white font-semibold mr-4">
                    {player.value}
                  </div>

                  {/* Actie button */}
                  <button
                    type="button"
                    className="text-white hover:text-gray-400 transition-colors shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => {
                      if (selectedSlot) {
                        handleAddPlayer(player);
                      }
                    }}
                    disabled={!selectedSlot || remainingBudget < parsePrice(player.value) || isPlayerAlreadyUsed(player.name)}
                    aria-label="Toevoegen"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                  </button>
                </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* Puntentelling Modal */}
      {isPuntentellingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-[#1a1a1a] rounded-lg w-full max-w-2xl mx-4 overflow-hidden shadow-2xl relative">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setIsPuntentellingModalOpen(false)}
              className="absolute top-4 right-4 z-10 bg-black/70 hover:bg-black/90 rounded-full p-2 transition-colors"
              aria-label="Sluiten"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Counter-Strike 2 Image */}
            <div className="w-full h-48 bg-gradient-to-r from-gray-800 via-orange-600 to-gray-800 relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-white text-2xl font-bold mb-2">COUNTER STRIKE 2</h2>
                  <p className="text-white/80 text-sm">LIMITED TEST</p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-gray-700">
              <button
                type="button"
                onClick={() => setActiveTab("team")}
                className={`flex-1 py-4 px-6 text-white font-semibold transition-colors ${
                  activeTab === "team"
                    ? "bg-[#2b5eff]"
                    : "bg-[#8b4513] hover:bg-[#a0522d]"
                }`}
              >
                teamprestaties
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("individual")}
                className={`flex-1 py-4 px-6 text-white font-semibold transition-colors ${
                  activeTab === "individual"
                    ? "bg-[#2b5eff]"
                    : "bg-[#8b4513] hover:bg-[#a0522d]"
                }`}
              >
                individueleprestaties
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {activeTab === "team" ? (
                <div className="grid grid-cols-3 gap-4">
                  {/* Round Win Card */}
                  <div className="bg-[#0c0c0c] rounded-lg p-4 border border-gray-700">
                    <h3 className="text-white text-sm font-semibold mb-3">round win</h3>
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded font-semibold transition-colors">
                      +5 p
                    </button>
                  </div>

                  {/* Game Win Card */}
                  <div className="bg-[#0c0c0c] rounded-lg p-4 border border-gray-700">
                    <h3 className="text-white text-sm font-semibold mb-3">game win</h3>
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded font-semibold transition-colors">
                      +10 p
                    </button>
                  </div>

                  {/* Round Lose Card */}
                  <div className="bg-[#0c0c0c] rounded-lg p-4 border border-gray-700">
                    <h3 className="text-white text-sm font-semibold mb-3">round lose</h3>
                    <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded font-semibold transition-colors">
                      -5 p
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  {/* Kills */}
                  <div className="bg-[#0c0c0c] rounded-lg p-4 border border-gray-700 flex items-center justify-between">
                    <span className="text-white text-sm font-semibold">Kills</span>
                    <button className="bg-green-600 hover:bg-green-700 text-white py-1 px-4 rounded font-semibold transition-colors">
                      +2p
                    </button>
                  </div>

                  {/* Deaths */}
                  <div className="bg-[#0c0c0c] rounded-lg p-4 border border-gray-700 flex items-center justify-between">
                    <span className="text-white text-sm font-semibold">Deaths</span>
                    <button className="bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded font-semibold transition-colors">
                      -2p
                    </button>
                  </div>

                  {/* Assist */}
                  <div className="bg-[#0c0c0c] rounded-lg p-4 border border-gray-700 flex items-center justify-between">
                    <span className="text-white text-sm font-semibold">Assist</span>
                    <button className="bg-green-600 hover:bg-green-700 text-white py-1 px-4 rounded font-semibold transition-colors">
                      +3p
                    </button>
                  </div>

                  {/* KAST <70% */}
                  <div className="bg-[#0c0c0c] rounded-lg p-4 border border-gray-700 flex items-center justify-between">
                    <span className="text-white text-sm font-semibold">KAST &lt;70%</span>
                    <button className="bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded font-semibold transition-colors">
                      -1p
                    </button>
                  </div>

                  {/* KAST 70% - 80% */}
                  <div className="bg-[#0c0c0c] rounded-lg p-4 border border-gray-700 flex items-center justify-between">
                    <span className="text-white text-sm font-semibold">KAST 70% - 80%</span>
                    <button className="bg-green-600 hover:bg-green-700 text-white py-1 px-4 rounded font-semibold transition-colors">
                      +1p
                    </button>
                  </div>

                  {/* KAST 80% - 90% */}
                  <div className="bg-[#0c0c0c] rounded-lg p-4 border border-gray-700 flex items-center justify-between">
                    <span className="text-white text-sm font-semibold">KAST 80% - 90%</span>
                    <button className="bg-green-600 hover:bg-green-700 text-white py-1 px-4 rounded font-semibold transition-colors">
                      +2p
                    </button>
                  </div>

                  {/* KAST 90%> */}
                  <div className="bg-[#0c0c0c] rounded-lg p-4 border border-gray-700 flex items-center justify-between">
                    <span className="text-white text-sm font-semibold">KAST 90%&gt;</span>
                    <button className="bg-green-600 hover:bg-green-700 text-white py-1 px-4 rounded font-semibold transition-colors">
                      +3p
                    </button>
                  </div>

                  {/* DMG 1500> */}
                  <div className="bg-[#0c0c0c] rounded-lg p-4 border border-gray-700 flex items-center justify-between">
                    <span className="text-white text-sm font-semibold">DMG 1500&gt;</span>
                    <button className="bg-green-600 hover:bg-green-700 text-white py-1 px-4 rounded font-semibold transition-colors">
                      +4p
                    </button>
                  </div>

                  {/* MVP per ronde */}
                  <div className="bg-[#0c0c0c] rounded-lg p-4 border border-gray-700 flex items-center justify-between">
                    <span className="text-white text-sm font-semibold">MVP per ronde</span>
                    <button className="bg-green-600 hover:bg-green-700 text-white py-1 px-4 rounded font-semibold transition-colors">
                      +1p
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FantasyTeam;
