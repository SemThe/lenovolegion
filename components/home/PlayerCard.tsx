import React from "react";
import Image from "next/image";

export default function PlayerCard() {
  return (
    <div className=" relative h-[308px] bg-widget-bg border border-widget-border rounded-[10px] flex flex-col items-center justify-around overflow-hidden">
      <h1 className=" absolute top-4  font-semibold">Speler van de week</h1>
      <div className="absolute w-[138] h-[138px] rounded-full bg-papaneus z-10 blur-2xl"></div>

      {/* Naam balk */}
      <h2 className="absolute bottom-0 z-30 flex flex-row items-center justify-center p-4 bg-white/10 w-full font-semibold text-lgrey border-b-4 border-papaneus backdrop-blur-xl">
        Twistzz
      </h2>

      {/* Foto van speler */}
      <div className="absolute  bottom-0 z-10">
        <Image
          src="/images/twistzz.png"
          alt="Twistzz"
          width={254}
          height={233}
          className="object-cover"
        />
      </div>
    </div>
  );
}
