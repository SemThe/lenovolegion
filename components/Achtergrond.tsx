"use client";

const Achtergrond = () => {
  return (
    <svg
      className="pointer-events-none w-full h-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      style={{ overflow: "visible" }}
    >
      <defs>
        <filter id="blur">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
        </filter>
      </defs>
      
      {/* Linker blauwe lijn - van linksboven naar midden */}
      <line
        x1="0"
        y1="0"
        x2="50"
        y2="45"
        stroke="#2b5eff"
        strokeWidth="4.5"
        strokeLinecap="round"
        filter="url(#blur)"
      />
      
      {/* Rechter oranje lijn - van rechtsboven naar midden */}
      <line
        x1="100"
        y1="0"
        x2="50"
        y2="45"
        stroke="#f68b32"
        strokeWidth="4.5"
        strokeLinecap="round"
        filter="url(#blur)"
      />
    </svg>
  );
};

export default Achtergrond;
