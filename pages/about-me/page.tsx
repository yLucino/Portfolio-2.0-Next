'use client';

import Link from "next/link";
import Image from "next/image";

import iconGitHub from "../../assets/icons/solar_github-bold.svg";
import iconInstagram from "../../assets/icons/solar_instagram-bold.svg";
import perfilPhoto from "../../assets/perfil-photo.png";
import bg from "../../assets/BG-Section-About-me.png";
import { useEffect, useState } from "react";

export default function AboutMe() {
  const [age, setAge] = useState<number>(0);
  const todayDay = new Date().getDate();
  const todayMonth = new Date().getMonth();
  const todayYear = new Date().getFullYear();
  const dayOfBirth = 29;
  const monthOfBirth = 11;
  const yearOfBirth = 2005;

  const ageCalculated = todayYear - yearOfBirth + (todayMonth >= monthOfBirth && todayDay >= dayOfBirth ? 0 : -1);

  useEffect(() => {
    setAge(ageCalculated);
  }, []);

  return (
    <section id="about-me" className="w-full flex flex-col lg:flex-row justify-center lg:justify-between items-center gap-10 lg:gap-8 min-h-screen bg-dark-blue pt-24 sm:pt-28 md:pt-32 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 relative overflow-hidden">
      <div className="w-full lg:w-auto lg:-mt-16 order-2 lg:order-1">
        <h1 className="text-light-white font-b-title-mobile-38 md:font-b-title-desktop-64">Sobre <span>mim</span></h1>

        <p className="w-full max-w-[560px] text-light-white font-r-p-12 !leading-6 my-6 md:my-10">
          Me chamo <span>Luciano Chiodini</span>. Tenho {age} anos e sou nascido e residente em Blumenau, Santa Catarina, Brasil.
          <br /><br />
          Sou uma pessoa <span>comprometida e dedicada</span>, sempre em busca de novas informações e tecnologias.
          Minha paixão pela tecnologia me motiva a continuar aprendendo e me aprimorando a cada dia. 
          <br /><br />
          Atualmente, estou almejando uma vaga como <span>Desenvolvedor FullStack</span>. Tenho grande interesse em desenvolver interfaces de usuário interativas e funcionais, utilizando as melhores práticas e ferramentas disponíveis no mercado.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link href={'/certifications'} className="h-[43px] w-full sm:w-[218px] flex justify-center items-center rounded-full bg-cian text-light-white font-b-h4-16 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-cian">Ver mais</Link>
          <Link href={'https://github.com/yLucino'} target="_blank" className="size-[43px] rounded-full bg-gray flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-gray"><Image src={iconGitHub} alt=""/></Link>
          <Link href={'https://www.instagram.com/luci_ano_chi'} target="_blank" className="size-[43px] rounded-full bg-gray flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-gray"><Image src={iconInstagram} alt=""/></Link>
        </div>
      </div>

      <Image className="w-[200px] sm:w-[280px] md:w-auto max-w-full h-auto lg:-mt-16 order-1 lg:order-2 shrink-0" src={perfilPhoto} alt="Perfil photo"/>
      <Image className="absolute -left-1 bottom-0 bg-repeat w-full max-h-[80px] md:max-h-[121px] object-cover" src={bg} alt=""/>
    </section>
  )
}