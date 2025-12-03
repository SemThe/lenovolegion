import Link from "next/link";
import BekijkIcon from "@/public/icons/bekijk.svg";
interface BekijkBtnProps {
  href: string;
}

const BekijkButton = ({ href }: BekijkBtnProps) => {
  return (
    <Link
      href={href}
      className=" flex items-center justify-center w-10 h-10  bg-white/5 backdrop-blur-2xl rounded-[5px] border border-white/10 "
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white">
        <path fillRule="evenodd" clipRule="evenodd" d="M16.4697 20.5303C16.1768 20.2374 16.1768 19.7626 16.4697 19.4697L18.1893 17.75H9C5.8244 17.75 3.25 15.1756 3.25 12C3.25 8.8244 5.8244 6.25 9 6.25L16 6.25C16.4142 6.25 16.75 6.5858 16.75 7C16.75 7.4142 16.4142 7.75 16 7.75L9 7.75C6.6528 7.75 4.75 9.6528 4.75 12C4.75 14.3472 6.6528 16.25 9 16.25H18.1893L16.4697 14.5303C16.1768 14.2374 16.1768 13.7626 16.4697 13.4697C16.7626 13.1768 17.2374 13.1768 17.5303 13.4697L20.5303 16.4697C20.8232 16.7626 20.8232 17.2374 20.5303 17.5303L17.5303 20.5303C17.2374 20.8232 16.7626 20.8232 16.4697 20.5303Z" fill="currentColor"/>
      </svg>
    </Link>
  );
};

export default BekijkButton;
