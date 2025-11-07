"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";

import iconJS from "../../assets/icons/devicon_javascript.svg";
import iconTS from "../../assets/icons/devicon_typescript.svg";
import iconNodeJs from "../../assets/icons/devicon_nodejs.svg";
import iconLua from "../../assets/icons/devicon_lua.svg";
import iconAngular from "../../assets/icons/devicon_angular.svg";
import iconReact from "../../assets/icons/devicon_react.svg";
import iconNext from "../../assets/icons/devicon_nextjs.svg";
import iconLiquid from "../../assets/icons/devicon_liquid.svg";
import iconMaterialUI from "../../assets/icons/devicon_materialui.svg";
import iconMySQL from "../../assets/icons/devicon_mysql.svg";
import iconExpress from "../../assets/icons/devicon_express.svg";
import iconTailwindCSS from "../../assets/icons/devicon_tailwindcss.svg";
import iconJSON from "../../assets/icons/devicon_json.svg";
import iconHTML from "../../assets/icons/devicon_html.svg";
import iconCSS from "../../assets/icons/devicon_css.svg";
import iconAxios from "../../assets/icons/devicon_axios.svg";
import iconFigma from "../../assets/icons/devicon_figma.svg";
import iconCsharp from "../../assets/icons/devicon_csharp.svg";

export default function Skills() {
  const cards = [
    {
      name: 'JavaScript',
      imgUrl: iconJS
    },
    {
      name: 'TypeScript',
      imgUrl: iconTS
    },
    {
      name: 'NodeJs',
      imgUrl: iconNodeJs
    },
    {
      name: 'Lua',
      imgUrl: iconLua
    },
    {
      name: 'Angular',
      imgUrl: iconAngular
    },
    {
      name: 'React',
      imgUrl: iconReact
    },
    {
      name: 'NextJs',
      imgUrl: iconNext
    },
    {
      name: 'Liquid',
      imgUrl: iconLiquid
    },
    {
      name: 'MaterialUI',
      imgUrl: iconMaterialUI
    },
    {
      name: 'MySQL',
      imgUrl: iconMySQL
    },
    {
      name: 'Express',
      imgUrl: iconExpress
    },
    {
      name: 'TailwindCSS',
      imgUrl: iconTailwindCSS
    },
    {
      name: 'JSON',
      imgUrl: iconJSON
    },
    {
      name: 'HTML5',
      imgUrl: iconHTML
    },
    {
      name: 'CSS3',
      imgUrl: iconCSS
    },
    {
      name: 'Axios',
      imgUrl: iconAxios
    },
    {
      name: 'Figma',
      imgUrl: iconFigma
    },
    {
      name: 'Csharp',
      imgUrl: iconCsharp
    },
  ]

  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    cardRefs.current.forEach((card) => {
      if (card) {
        VanillaTilt.init(card, {
          max: 15,
          speed: 300,
          glare: true,
          "max-glare": 0.3,
          scale: 1.1,
        });
      }
    });
  }, []);

  return (
    <section id="skills" className="flex flex-col justify-center items-center w-full h-screen bg-dark-blue pt-32 px-32">
      <div className="flex items-center justify-between mb-[84px] w-full">
        <h1 className="text-light-white font-b-title-desktop-64 ">Minhas <span>habilidades</span></h1>
        <button className="bg-gray font-b-h4-16 text-cian rounded-full w-[121px] h-[46px] cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-gray">
          <Link href={'https://www.linkedin.com/in/luciano-chiodini-6a35092b3/details/education'} target="_blank">
            Ver mais
          </Link>
        </button>
      </div>

      <ul className="flex flex-wrap gap-5 w-[1060px]">
        {cards.map((card, i) => (
          <li
            key={card.name}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="size-[160px] rounded-2xl bg-dark-blue shadow-[5px_5px_9px_rgba(0,0,0,0.25)] flex flex-col items-center justify-center text-light-white font-b-h4-16 gap-2.5 transition-transform duration-300"
          >
            <div className="flex items-center justify-center size-[85px]">
              <Image className="h-[85px]" src={card.imgUrl} alt={card.name} />
            </div>
            {card.name}
          </li>
        ))}
      </ul>
    </section>
  )
}