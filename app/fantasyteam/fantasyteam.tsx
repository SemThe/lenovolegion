"use client";

import { useState } from "react";
import Image from "next/image";
import Achtergrond from "../../components/Achtergrond";

const FantasyTeam = () => {
  // Sample data voor gevulde spelerkaarten
  const filledPlayers = [
    {
      name: "Twistzz",
      value: "3K",
      team: "Papaneus",
      image: null, // Kan later worden toegevoegd
    },
    {
      name: "Nertz",
      value: "3.5K",
      team: "Papaneus",
      image: null,
    },
  ];

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
    <div className="relative min-h-screen bg-[#0b0b0b] overflow-hidden">
      {/* Achtergrond met V-vormige lichtbundels */}
      <div className="absolute inset-0 z-0">
        <Achtergrond />
      </div>

      <div className="relative z-10">
        {/* Navigatiebalk */}
        <nav className="w-full bg-[#0c0c0c] border-b border-gray-800 px-6 py-4">
          <div className="max-w-[1400px] mx-auto flex items-center justify-between">
            {/* Links: Logo en menu */}
            <div className="flex items-center gap-8">
              {/* Logo */}
              <div className="text-white font-bold text-xl">LOGO</div>
              
              {/* Menu items */}
              <div className="flex items-center gap-6">
                <a href="#" className="text-white text-sm hover:text-[#2b5eff] transition-colors">
                  Home
                </a>
                <a href="#" className="text-white text-sm hover:text-[#2b5eff] transition-colors">
                  Toernooien
                </a>
                <a href="#" className="text-white text-sm hover:text-[#2b5eff] transition-colors">
                  Bracket
                </a>
                <a href="#" className="text-white text-sm hover:text-[#2b5eff] transition-colors">
                  Wedstrijden
                </a>
                <a href="#" className="text-white text-sm font-semibold hover:text-[#2b5eff] transition-colors">
                  Fantasyteam
                </a>
              </div>
            </div>

            {/* Rechts: Zoek, bel, login */}
            <div className="flex items-center gap-4">
              {/* Zoek icoon */}
              <button
                type="button"
                className="text-white hover:text-[#2b5eff] transition-colors"
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

              {/* Bel icoon */}
              <button
                type="button"
                className="text-white hover:text-[#2b5eff] transition-colors relative"
                aria-label="Meldingen"
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
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
              </button>

              {/* Login knop */}
              <button
                type="button"
                className="bg-[#2b5eff] hover:bg-[#1e4fe6] text-white px-6 py-2 rounded-lg font-semibold transition-colors"
              >
                Login
              </button>
            </div>
          </div>
        </nav>

        {/* Hoofdcontent */}
        <div className="max-w-[1400px] mx-auto px-6 py-8 flex gap-8">
          {/* Linkerzijde - Fantasyteam sectie */}
          <div className="flex-1">
            {/* Titel */}
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-[#f68b32] rounded-lg p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-white"
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
              <h1 className="text-2xl font-bold text-white">Lenovo Fantasyteam</h1>
            </div>

            {/* My Squad sectie */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white">My Squad</h2>
                {/* Puntentelling knop rechts */}
                <button
                  type="button"
                  className="bg-[#2b5eff] hover:bg-[#1e4fe6] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                >
                  Puntentelling
                </button>
              </div>
              <div className="flex gap-4 flex-wrap">
                {/* 2 gevulde spelerkaarten */}
                {filledPlayers.map((player, index) => (
                  <div
                    key={index}
                    className="w-40 h-52 rounded-2xl overflow-hidden shadow-lg relative border-2 border-[#f68b32]"
                  >
                    {/* Prullenbak icoon rechtsboven */}
                    <button
                      type="button"
                      className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70 rounded-full p-1.5 transition-colors"
                      aria-label="Verwijderen"
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
                    <div className="absolute top-2 left-2 w-6 h-6 bg-[#f68b32] rounded flex items-center justify-center z-10">
                      <span className="text-white text-xs font-bold">P</span>
                    </div>

                    {/* Speler afbeelding */}
                    <div className="w-full h-32 bg-gray-800 flex items-center justify-center">
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

                    {/* Naamtag op donkere balk */}
                    <div className="bg-[#1a1a1a] px-3 py-2">
                      <h3 className="text-white font-semibold text-sm text-center mb-1">
                        {player.name}
                      </h3>
                      {/* Waarde */}
                      <div className="text-center">
                        <span className="text-gray-300 text-xs">{player.value}</span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* 3 lege selectie-vakken */}
                {[0, 1, 2].map((index) => (
                  <div
                    key={index}
                    className="w-40 h-52 rounded-2xl border-2 border-dashed border-[#f68b32] bg-[#f68b32]/10 flex items-center justify-center shadow-lg"
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
                ))}
              </div>
            </div>

            {/* Subs sectie */}
            <div className="mb-8">
              <h2 className="text-lg font-bold text-white mb-4">Subs</h2>
              <div className="flex gap-4">
                {[0, 1].map((index) => (
                  <div
                    key={index}
                    className="w-40 h-52 rounded-2xl border-2 border-dashed border-[#2b5eff] bg-[#2b5eff]/10 flex items-center justify-center shadow-lg"
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
                ))}
              </div>
            </div>

            {/* Budget en Opslaan */}
            <div className="flex items-center justify-between bg-[#1a1a1a] rounded-xl px-6 py-4">
              <div className="flex items-center gap-2">
                <span className="text-white font-semibold">Budget:</span>
                <span className="text-[#2b5eff] font-bold text-lg">16K</span>
              </div>
              <button
                type="button"
                className="bg-[#2b5eff] hover:bg-[#1e4fe6] text-white px-8 py-3 rounded-lg font-bold transition-colors"
              >
                Opslaan
              </button>
            </div>
          </div>

          {/* Rechterzijpaneel - Top 10 */}
          <div className="w-80 bg-[#1a1a1a] rounded-2xl p-6 shadow-lg">
            <h2 className="text-xl font-bold text-white mb-6">Top 10</h2>

            {/* Top 10 lijst */}
            <div className="space-y-3 mb-6">
              {top10.map((player) => (
                <div
                  key={player.rank}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-[#0c0c0c] transition-colors"
                >
                  {/* Rangnummer */}
                  <span className="text-gray-400 font-bold text-sm w-8">#{player.rank}</span>

                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-400"
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
                  <span className="text-white text-sm font-medium flex-1 truncate">
                    {player.username}
                  </span>

                  {/* XP badge */}
                  <span className="bg-gray-700 text-gray-300 text-xs px-3 py-1 rounded-full">
                    {player.xp}
                  </span>
                </div>
              ))}
            </div>

            {/* Eigen positie */}
            <div className="border-t border-gray-700 pt-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-[#0c0c0c]">
                {/* Rangnummer */}
                <span className="text-gray-400 font-bold text-sm w-8">#{userRank.rank}</span>

                {/* Avatar */}
                <div className="w-10 h-10 rounded-full bg-[#2b5eff] flex items-center justify-center shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-white"
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
                <span className="text-white text-sm font-medium flex-1">{userRank.username}</span>

                {/* XP badge */}
                <span className="bg-gray-700 text-gray-300 text-xs px-3 py-1 rounded-full">
                  {userRank.xp}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FantasyTeam;
