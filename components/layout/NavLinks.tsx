"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLink {
  href: string;
  label: string;
}

export default function NavLinks() {
  const pathname = usePathname();

  const links: NavLink[] = [
    { href: "/", label: "Home" },
    { href: "/bracket", label: "Bracket" },
    { href: "/wedstrijden", label: "Wedstrijden" },
    { href: "/fantasyteam", label: "Fantasyteam" },
  ];
  return (
    <div className="flex gap-10">
      {links.map((link) => {
        const isActive = pathname === link.href;
        const isFantasy = link.label === "Fantasyteam";
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`relative pb-1 transition-all duration-300 ${
              isFantasy
                ? "font-semibold bg-gradient-to-r from-[#2872FD] to-[#184497] bg-clip-text text-transparent"
                : isActive
                ? "after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-[#184497] "
                : "text-white "
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}
