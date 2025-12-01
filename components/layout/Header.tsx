"use client";

import Link from "next/link";
import Image from "next/image";
import LoginButton from "@/components/ui/LoginButton";
import Navlinks from "@/components/layout/NavLinks";

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
          {/* Zoek Icon */}
          <button type="button" className="text-white hover:text-[#2b5eff] transition-colors" aria-label="Zoeken">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
              <g clipPath="url(#clip0_17_51)">
                <path fillRule="evenodd" clipRule="evenodd" d="M9.17634 0C4.11241 0 0 4.11241 0 9.17634C0 14.2403 4.11241 18.3527 9.17634 18.3527C14.2403 18.3527 18.3527 14.2403 18.3527 9.17634C18.3527 4.11241 14.2403 0 9.17634 0ZM9.17634 1.41174C13.4624 1.41174 16.9409 4.89028 16.9409 9.17634C16.9409 13.4624 13.4624 16.9409 9.17634 16.9409C4.89028 16.9409 1.41174 13.4624 1.41174 9.17634C1.41174 4.89028 4.89028 1.41174 9.17634 1.41174Z" fill="currentColor"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M23.7934 22.794L15.6632 14.6652C15.3879 14.3899 14.9404 14.3899 14.6651 14.6652C14.3898 14.9405 14.3898 15.388 14.6651 15.6633L22.7939 23.7935C23.0706 24.0688 23.5167 24.0688 23.7934 23.7935C24.0687 23.5168 24.0687 23.0707 23.7934 22.794Z" fill="currentColor"/>
              </g>
              <defs>
                <clipPath id="clip0_17_51">
                  <rect width="24" height="24" fill="currentColor"/>
                </clipPath>
              </defs>
            </svg>
          </button>
          
          {/* Melding Icon */}
          <button type="button" className="text-white hover:text-[#2b5eff] transition-colors" aria-label="Meldingen">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
              <path d="M13.5 4.18C13.224 4.18 13 3.956 13 3.68V2C13 1.449 12.551 1 12 1C11.449 1 11 1.449 11 2V3.68C11 3.956 10.776 4.18 10.5 4.18C10.224 4.18 10 3.957 10 3.68V2C10 0.897 10.897 0 12 0C13.103 0 14 0.897 14 2V3.68C14 3.957 13.776 4.18 13.5 4.18Z" fill="currentColor"/>
              <path d="M12 24C10.07 24 8.5 22.43 8.5 20.5C8.5 20.224 8.724 20 9 20C9.276 20 9.5 20.224 9.5 20.5C9.5 21.878 10.622 23 12 23C13.378 23 14.5 21.878 14.5 20.5C14.5 20.224 14.724 20 15 20C15.276 20 15.5 20.224 15.5 20.5C15.5 22.43 13.93 24 12 24Z" fill="currentColor"/>
              <path d="M20.5 21H3.5C2.673 21 2 20.327 2 19.5C2 19.061 2.191 18.646 2.525 18.36C4.101 17.028 5 15.09 5 13.038V10C5 6.14 8.14 3 12 3C15.86 3 19 6.14 19 10V13.038C19 15.091 19.899 17.028 21.467 18.353C21.809 18.646 22 19.061 22 19.5C22 20.327 21.328 21 20.5 21ZM12 4C8.691 4 6 6.691 6 10V13.038C6 15.386 4.972 17.601 3.179 19.117C3.064 19.215 3 19.354 3 19.5C3 19.776 3.224 20 3.5 20H20.5C20.776 20 21 19.776 21 19.5C21 19.354 20.936 19.215 20.825 19.12C19.029 17.601 18 15.385 18 13.038V10C18 6.691 15.309 4 12 4Z" fill="currentColor"/>
            </svg>
          </button>
          
          <LoginButton href="/" text="Login" />
          
          {/* Hamburger Menu Icon */}
          <div className="block md:hidden">
            <button type="button" className="text-white hover:text-[#2b5eff] transition-colors" aria-label="Menu">
              <svg fill="none" height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6">
                <path d="m19 11h-18c-.265216 0-.51957-.1054-.707107-.2929-.187536-.1875-.292893-.4419-.292893-.7071 0-.26522.105357-.51957.292893-.70711.187537-.18753.441891-.29289.707107-.29289h18c.2652 0 .5196.10536.7071.29289.1875.18754.2929.44189.2929.70711 0 .2652-.1054.5196-.2929.7071s-.4419.2929-.7071.2929zm0-7h-18c-.265216 0-.51957-.10536-.707107-.29289-.187536-.18754-.292893-.44189-.292893-.70711s.105357-.51957.292893-.70711c.187537-.18753.441891-.29289.707107-.29289h18c.2652 0 .5196.10536.7071.29289.1875.18754.2929.44189.2929.70711s-.1054.51957-.2929.70711c-.1875.18753-.4419.29289-.7071.29289zm0 14h-18c-.265216 0-.51957-.1054-.707107-.2929-.187536-.1875-.292893-.4419-.292893-.7071s.105357-.5196.292893-.7071c.187537-.1875.441891-.2929.707107-.2929h18c.2652 0 .5196.1054.7071.2929s.2929.4419.2929.7071-.1054.5196-.2929.7071-.4419.2929-.7071.2929z" fill="currentColor"/>
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
