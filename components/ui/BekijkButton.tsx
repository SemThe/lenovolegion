import Link from "next/link";
import BekijkIcon from "@/public/icons/bekijken.svg";

interface BekijkBtnProps {
  href: string;
}

const BekijkButton = ({ href }: BekijkBtnProps) => {
  return (
    <Link
      href={href}
      className=" flex items-center justify-center w-10 h-10  bg-white/5 backdrop-blur-2xl rounded-[5px] border border-white/10 "
    >
      <BekijkIcon />
    </Link>
  );
};

export default BekijkButton;
