import Image from "next/image";
import Link from "next/link";

import logo from "../assets/logo5x.png";
import iconArrow from "../assets/icons/solar_arrow-gray.png";

export default function Footer() {
  return(
    <footer className="w-full h-[162px] bg-dark-blue px-32 flex justify-between items-center border-t-2 border-gray">
      <div className="flex items-center gap-1.5">
        <Image className="size-[61px]" src={logo} alt=""/>
        <p className="font-b-h4-16 text-light-white">Copyright © 2025 by yLucino | All Rights Reserved.</p>
      </div>

      <Link href={'/'} className="size-[61px] flex items-center justify-center bg-cian rounded-full cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-cian">
        <Image src={iconArrow} alt=""/>
      </Link>
    </footer>
  )
}