import React from "react";
import Image from "next/image";

import BekijkButton from "../ui/BekijkButton";

export default function News() {
  return (
    <div className="relative h-[308px] bg-widget-bg border border-widget-border rounded-[10px]  overflow-hidden">
      <Image
        src="/images/nieuws.png"
        alt="Banner"
        fill
        className="object-cover rounded-[10px]"
      />
      {/* Overlay op de foto*/}
      <div className="absolute inset-0 bg-bg/40 "></div>

      <h1 className="absolute top-5 left-1/2 -translate-x-1/2 font-semibold">
        Nieuws
      </h1>
      <div className="absolute bottom-5 right-5">
        <BekijkButton href="/" />
      </div>
    </div>
  );
}
