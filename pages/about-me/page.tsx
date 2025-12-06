import Link from "next/link";
import Image from "next/image";

import iconGitHub from "../../assets/icons/solar_github-bold.svg";
import iconInstagram from "../../assets/icons/solar_instagram-bold.svg";
import perfilPhoto from "../../assets/perfil-photo.png";
import bg from "../../assets/BG-Section-About-me.png";

export default function AboutMe() {
  return (
    <section id="about-me" className="w-full flex justify-between items-center h-screen bg-dark-blue pt-32 px-32 relative">
      <div className="-mt-16">
        <h1 className="text-light-white font-b-title-desktop-64">Sobre <span>mim</span></h1>

        <p className="max-w-[560px] min-w-[336px] text-light-white font-r-p-12 !leading-6 my-10">
          Me chamo <span>Luciano Chiodini</span>. Tenho 19 anos e sou nascido e residente em Blumenau, Santa Catarina, Brasil.
          <br /><br />
          Sou uma pessoa <span>comprometida e dedicada</span>, sempre em busca de novas informações e tecnologias.
          Minha paixão pela tecnologia me motiva a continuar aprendendo e me aprimorando a cada dia. 
          <br /><br />
          Atualmente, estou almejando uma vaga como <span>Desenvolvedor FullStack</span>. Tenho grande interesse em desenvolver interfaces de usuário interativas e funcionais, utilizando as melhores práticas e ferramentas disponíveis no mercado.
        </p>

        <div className="flex gap-3">
          <Link href={'/certifications'} className="h-[43px] w-[218px] flex justify-center items-center rounded-full bg-cian text-light-white font-b-h4-16 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-cian">Ver mais</Link>
          <Link href={'https://github.com/yLucino'} target="_blank" className="size-[43px] rounded-full bg-gray flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-gray"><Image src={iconGitHub} alt=""/></Link>
          <Link href={'https://www.instagram.com/luci_ano_chi'} target="_blank" className="size-[43px] rounded-full bg-gray flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-gray"><Image src={iconInstagram} alt=""/></Link>
        </div>
      </div>

      <Image className="-mt-16" src={perfilPhoto} alt="Perfil photo"/>
      <Image className="absolute -left-1 bottom-0 bg-repeat w-full max-h-[121px]" src={bg} alt=""/>
    </section>
  )
}