import Image from "next/image";
import Link from "next/link";

import logo from "../assets/logo5x.png";
import iconArrow from "../assets/icons/solar_arrow-gray.png";

export default function Footer() {
  return(
    <footer className="w-full min-h-[120px] md:h-[162px] bg-dark-blue px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 py-6 md:py-0 flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 border-t-2 border-gray">
      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-1.5 text-center sm:text-left">
        <Image className="size-[48px] md:size-[61px]" src={logo} alt=""/>
        <p className="font-b-s-10 sm:font-b-h4-16 text-light-white max-w-[280px] sm:max-w-none">Copyright © 2025 by yLucino | All Rights Reserved.</p>
      </div>

      <Link href={'/'} className="size-[48px] md:size-[61px] shrink-0 flex items-center justify-center bg-cian rounded-full cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-cian">
        <Image src={iconArrow} alt=""/>
      </Link>
    </footer>
  )
}