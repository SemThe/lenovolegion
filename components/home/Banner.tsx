import React from "react";
import Image from "next/image";
import Link from "next/link";
export default function Banner() {
  return (
    <div className="relative h-[308px] bg-widget-bg border border-widget-border rounded-[10px] overflow-hidden">
      <Image
        src="/images/thelegiontournament.png"
        alt="Banner"
        fill
        className="object-cover rounded-[10px]"
      />

      {/* Overlay op de foto*/}
      <div className="absolute inset-0 bg-bg/40"></div>

      <div className="relative flex flex-col h-full items-center top-1/2 gap-10">
        <h1 className="font-bold text-2xl">The Legion Tournament</h1>
        <Link
          href=""
          className="px-5 py-2 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[5px] "
        >
          Kijk mee
        </Link>
      </div>
    </div>
  );
}
