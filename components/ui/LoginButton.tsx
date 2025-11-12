import Link from "next/link";

interface LoginButtonProps {
  href: string;
  text: string;
}

const InlogButton = ({ href, text }: LoginButtonProps) => {
  return (
    <Link
      href={href}
      className="bg-button-color h-[35px] w-[75px] rounded-[5px] flex items-center justify-center"
    >
      {text}
    </Link>
  );
};

export default InlogButton;
