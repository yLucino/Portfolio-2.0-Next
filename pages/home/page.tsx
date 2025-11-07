import Image from "next/image";
import Link from "next/link";

import iconUser from "../../assets/icons/solar_user-bold.svg";
import iconDownlaod from "../../assets/icons/solar_download-bold.svg";
import iconArrow from "../../assets/icons/solar_arrow.svg";
import bgEffect from "../../assets/BG-Section-Home.png";

export default function Home() {
  return (
    <section id="home" className="w-full h-screen bg-dark-blue pt-32 px-32 relative">
      <div className="flex flex-col h-full justify-center -mt-22">
        <p className="text-light-white font-b-h1-38 uppercase">Portfolio: Luciano Chiodini</p>
        <h1 className="text-cian font-b-thumb-120 uppercase max-w-[810] !leading-28 py-4 -ml-1.5">Full - Stack Developer</h1>

        <div className="flex gap-6">
          <button className="flex items-center justify-center text-light-white font-b-h4-16 gap-2 rounded-4xl bg-cian w-[207px] h-[43px] cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-cian">
            Contrate-me
            <Image src={iconUser} alt="" />
          </button>

          <button className="flex items-center justify-center text-light-white font-b-h4-16 gap-3 rounded-4xl bg-gray w-[207px] h-[43px] cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-gray">
            Donwload CV
            <Image src={iconDownlaod} alt="" />
          </button>
        </div>
      </div>

      <button className="flex justify-center items-center bg-gray size-[66px] absolute bottom-20 left-96 cursor-pointer transition-all duration-300 hover:rounded-4xl hover:shadow-2xl shadow-gray">
        <Link href={'#about-me'}>
          <Image src={iconArrow} alt="" />
        </Link>
      </button>

      <Image className="absolute bottom-20 right-32" src={bgEffect} alt="" />
    </section>
  )
}