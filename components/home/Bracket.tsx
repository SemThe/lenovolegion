import React from "react";
import BekijkButton from "../ui/BekijkButton";

export default function Bracket() {
  return (
    <div className="relative h-[440px] bg-widget-bg border border-widget-border rounded-[10px]">
      <div className="absolute bottom-5 right-5">
        <BekijkButton href="/bracket" />
      </div>
    </div>
  );
}
