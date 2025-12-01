"use client";

import Link from "next/link";
import Image from "next/image";
import ZoekIcon from "@/public/icons/zoekfunctie.svg";
import MeldingIcon from "@/public/icons/melding.svg";
import LoginButton from "@/components/ui/LoginButton";
import Navlinks from "@/components/layout/NavLinks";

export default function Header() {
  return (
    <header className="bg-background/50 text-white w-full p-5">
      <nav className="flex items-center justify-between">
        <Link href="/">
          <Image
            src="/images/logo.svg"
            alt="LenovoLegion-logo"
            width={107}
            height={40}
          />
        </Link>
        <div className="flex gap-10">
          <Navlinks />
        </div>

        <div className="flex items-center gap-10">
          <ZoekIcon />
          <MeldingIcon />
          <LoginButton href="/" text="Login" />
        </div>
      </nav>
    </header>
  );
}
