import React from "react";
import BekijkButton from "../ui/BekijkButton";

export default function matches() {
  const matchers = [{ title: "Faraley" }];
  return (
    <div className="relative h-[440px] bg-widget-bg border border-widget-border rounded-[10px]">
      <div className="absolute bottom-5 right-5">
        <BekijkButton href="/wedstrijden" />
      </div>
    </div>
  );
}
