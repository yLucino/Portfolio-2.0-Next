import Image from "next/image";
import Link from "next/link";

import iconUser from "../../assets/icons/solar_user-bold.svg";
import iconDownlaod from "../../assets/icons/solar_download-bold.svg";
import iconArrow from "../../assets/icons/solar_arrow.svg";
import bgEffect from "../../assets/BG-Section-Home.png";

export default function Home() {
  return (
    <section id="home" className="w-full min-h-screen bg-dark-blue pt-24 sm:pt-28 md:pt-32 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 relative overflow-hidden">
      <div className="flex flex-col mt-12 sm:mt-16 md:mt-22 items-center lg:items-start justify-center h-full">
        <p className="text-light-white font-b-h3-21 uppercase">Portfolio: Luciano Chiodini</p>
        <h1 className="text-cian font-bold my-10 text-[40px] sm:text-[45px] lg:text-[100px] uppercase max-w-full lg:max-w-[810px]">Full - Stack Developer</h1>

        <div className="flex flex-col pl-10 pr-10 sm:pl-0 sm:pr-0 sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto">
          <Link href={'https://www.linkedin.com/in/luciano-chiodini-6a35092b3'} target="_blank" className="flex items-center justify-center text-light-white font-b-h4-16 gap-2 rounded-4xl bg-cian w-full sm:w-[207px] h-[43px] cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-cian">
            Contate-me
            <Image src={iconUser} alt="" />
          </Link>

          <Link href={'/curriculo-luciano-chiodini.pdf'} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center text-light-white font-b-h4-16 gap-3 rounded-4xl bg-gray w-full sm:w-[207px] h-[43px] cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-gray">
            Download CV
            <Image src={iconDownlaod} alt="" />
          </Link>
        </div>
      </div>

      <Link href={'#about-me'} className="hidden lg:flex justify-center items-center bg-gray size-[66px] absolute bottom-20 left-1/2 lg:left-96 -translate-x-1/2 md:translate-x-0 cursor-pointer transition-all duration-300 hover:rounded-4xl hover:shadow-2xl shadow-gray">
        <Image src={iconArrow} alt="" />
      </Link>

      <div className="absolute bottom-20 right-0 lg:right-8 w-full flex lg:justify-end justify-center">
        <Image className="bottom-20 right-0 lg:right-8 max-w-[40vw]" src={bgEffect} alt="" />
      </div>
    </section>
  )
}