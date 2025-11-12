import React from "react";
interface BackgroundLinesProps {
  leftColor?: string;
  rightColor?: string;
}

export default function BackgroundLines({
  leftColor = "#8b8a8a",
  rightColor = "#8b8a8a",
}: BackgroundLinesProps) {
  return (
    <div className="fixed inset-0  -z-10">
      <div
        className="fixed top-0 right-[-550px] w-[900px] lg:w-[1200px] h-[40px] rotate-[-25deg] rounded-full blur-[30px] "
        style={{ background: rightColor }}
      />
      <div
        className="fixed top-0 left-[-550px] w-[900px] lg:w-[1200px] h-[40px] -rotate-[-25deg] rounded-full blur-[30px] "
        style={{ background: leftColor }}
      />
    </div>
  );
}
