"use client";

import Image from "next/image";

const menuItems = [
  { label: "Home", href: "/" },
  { label: "Toernooien", href: "#" },
  { label: "Bracket", href: "/bracket" },
  { label: "Wedstrijden", href: "/wedstrijden" },
  { label: "Fantasyteam", href: "#" },
];

interface NavigationHeaderProps {
  activePath?: string;
}

export function NavigationHeader({ activePath }: NavigationHeaderProps) {
  return (
    <div className="bg-[#050505] text-white border-b border-white/5">
      {/* Top navigation */}
      <nav className="flex flex-wrap items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="Legion" width={48} height={48} />
          <div>
            <p className="text-xs uppercase text-white/60 tracking-[0.25em]">
              Lenovo
            </p>
            <p className="text-lg font-semibold tracking-wide">LEGION</p>
          </div>
        </div>
        <div className="hidden md:flex justify-center items-center gap-6 text-sm text-white/70">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`transition-colors hover:text-white ${
                activePath && item.href === activePath
                  ? "text-white"
                  : "text-white/70"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3 text-white/70">
          <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
          <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          </button>
          <button className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M4 21v-2a4 4 0 0 1 3-3.87" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
          <button className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full bg-white text-black hover:bg-white/80 transition-colors">
            Login
          </button>
        </div>
      </nav>
    </div>
  );
}
