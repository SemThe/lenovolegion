"use client";

import Link from "next/link";
import Image from "next/image";
import ZoekIcon from "@/public/icons/zoekfunctie.svg";
import MeldingIcon from "@/public/icons/melding.svg";
import LoginButton from "@/components/ui/LoginButton";
import Navlinks from "@/components/layout/NavLinks";
import HamburgerMenuIcon from "@/public/icons/hamburger.svg";

export default function Header() {
  return (
    <header className="bg-bg/50 text-white w-full h-20 p-5 fixed top-0 z-50 backdrop-blur-md">
      <nav className="flex items-center justify-between mx-auto">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/images/logo.svg"
            alt="LenovoLegion-logo"
            width={107}
            height={40}
            className="w-20 md:w-[107px]"
          />
        </Link>

        <div className="hidden md:flex gap-10">
          <Navlinks />
        </div>

        <div className="flex items-center gap-5 md:gap-10">
          <ZoekIcon className="w-6 h-6" />
          <MeldingIcon className="w-6 h-6" />
          <LoginButton href="/" text="Login" />
          <div className="block md:hidden">
            <HamburgerMenuIcon className="w-6 h-6 text-white" />
          </div>
        </div>
      </nav>
    </header>
  );
}
