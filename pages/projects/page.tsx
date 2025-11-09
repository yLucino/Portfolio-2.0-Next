'use client'
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import iconClockWhite from "../../assets/icons/solar_clock-bold-white.svg";
import iconStarWhite from "../../assets/icons/solar_star-bold-white.svg";
import iconTsWhite from "../../assets/icons/solar_ts-bold-white.svg";
import iconJsWhite from "../../assets/icons/solar_js-bold-white.svg";
import iconLuaWhite from "../../assets/icons/solar_lua-bold-white.svg";
import iconCsharpWhite from "../../assets/icons/solar_csharp-bold-white.svg";

import iconClockGray from "../../assets/icons/solar_clock-bold-gray.svg";
import iconStarGray from "../../assets/icons/solar_star-bold-gray.svg";
import iconTsGray from "../../assets/icons/solar_ts-bold-gray.svg";
import iconJsGray from "../../assets/icons/solar_js-bold-gray.svg";
import iconLuaGray from "../../assets/icons/solar_lua-bold-gray.svg";
import iconCsharpGray from "../../assets/icons/solar_csharp-bold-gray.svg";

import iconGithub from "../../assets/icons/solar_github-bold.svg";
import bg_Left from "../../assets/BG-Section-Project-Left.png";
import bg_Right from "../../assets/BG-Section-Project-Right.png";
import bg_ArrowRight from "../../assets/BG-Arrow-Section-Project-Right.png";
import bg_ArrowLeft from "../../assets/BG-Arrow-Section-Project-Left.png";

import iconCSharp from "../../assets/icons/devicon_csharp.svg";
import iconCSS from "../../assets/icons/devicon_css.svg";
import iconHTML from "../../assets/icons/devicon_html.svg";
import iconJs from "../../assets/icons/devicon_javascript.svg";
import iconLiquid from "../../assets/icons/devicon_liquid.svg";
import iconLua from "../../assets/icons/devicon_lua.svg";
import iconTs from "../../assets/icons/devicon_typescript.svg";

export default function Projects() {
  interface Filter {
    text: string,
    selected: boolean,
    iconGray: StaticImageData,
    iconWhite: StaticImageData
  }

  const filters: Filter[] = [
    {
      text: 'Recentes',
      iconGray: iconClockGray,
      iconWhite: iconClockWhite,
      selected: true
    },
    {
      text: 'Favoritos',
      iconGray: iconStarGray,
      iconWhite: iconStarWhite,
      selected: false
    },
    {
      text: 'TypeScript',
      iconGray: iconTsGray,
      iconWhite: iconTsWhite,
      selected: false
    },
    {
      text: 'JavaScript',
      iconGray: iconJsGray,
      iconWhite: iconJsWhite,
      selected: false
    },
    {
      text: 'Lua',
      iconGray: iconLuaGray,
      iconWhite: iconLuaWhite,
      selected: false
    },
    {
      text: 'CSharp',
      iconGray: iconCsharpGray,
      iconWhite: iconCsharpWhite,
      selected: false
    },
  ]

  const [currentBtn, setCurrentBtn] = useState<Filter>(filters[0]);

  useEffect(() => {

  }, [])

  const handlerClick = (text: string) => {
    let selected: Filter = filters[0];

    filters.forEach(btn => {
      if (btn.text === text) {
        btn.selected = true;
        selected = btn;
      } else {
        btn.selected = false;
      }
    })

    setCurrentBtn(selected);
  }


  return (
    <section id="projects" className="flex flex-col w-full h-screen justify-between bg-dark-blue pt-32">
      <div className="flex w-full justify-between">
        <Image src={bg_Left} alt="" />

        <div className="">
          <h1 className="text-light-white font-b-title-desktop-64 mb-4">Meus <span>Projetos</span></h1>

          <ul className="flex gap-3.5">
            {filters.map(btn => (
              <li key={btn.text} className={currentBtn.text === btn.text ? "w-[207px] h-[43px] bg-cian rounded-full text-gray font-b-h4-16 flex justify-center items-center gap-3 cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-cian" : "size-[43px] bg-gray rounded-full text-light-white flex justify-center items-center cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-gray"} onClick={() => handlerClick(btn.text)}>
                {currentBtn.text === btn.text ? btn.text : ''}
                <Image className="text-light-white" src={currentBtn.text === btn.text ? btn.iconGray : btn.iconWhite} alt={btn.text}/>
              </li>
            ))}
          </ul>
        </div>

        <Image src={bg_Right} alt="" />
      </div>

      <div className="flex w-full justify-center items-center">
        <ul className="flex gap-6">

          <li className="bg-gray w-[380px] h-[280px] rounded-4xl hover:scale-105 transition-all duration-300">
            <Link className="flex h-full flex-col justify-evenly items-center" href={'/project-details/1'}>
              <div className="flex items-center gap-1.5 text-light-white">
                <p className="flex items-center justify-center font-b-h4-16 bg-cian w-[105px] h-[26px] rounded-full">Projeto 01</p>
                <p className="font-r-p-12 w-[229px]">Is simply dummy text of the printing...</p>
              </div>

              <div className="flex justify-center items-center bg-dark-blue w-[340px] h-[200px] rounded-2xl relative">
                <Image src={iconCSharp} alt="" />
                <p className="absolute left-3 bottom-3 flex justify-center items-center size-7 rounded-full bg-cian font-b-s-8 text-light-white" title="Project developed in: C#">C#</p>
              </div>
            </Link>
          </li>
          <li className="bg-gray w-[380px] h-[280px] rounded-4xl hover:scale-105 transition-all duration-300">
            <Link className="flex h-full flex-col justify-evenly items-center" href={'/project-details/1'}>
              <div className="flex items-center gap-1.5 text-light-white">
                <p className="flex items-center justify-center font-b-h4-16 bg-cian w-[105px] h-[26px] rounded-full">Projeto 01</p>
                <p className="font-r-p-12 w-[229px]">Is simply dummy text of the printing...</p>
              </div>

              <div className="flex justify-center items-center bg-dark-blue w-[340px] h-[200px] rounded-2xl relative">
                <Image src={iconJs} alt="" />
                <p className="absolute left-3 bottom-3 flex justify-center items-center size-7 rounded-full bg-cian font-b-s-8 text-light-white" title="Project developed in: JS">JS</p>
              </div>
            </Link>
          </li>
          <li className="bg-gray w-[380px] h-[280px] rounded-4xl hover:scale-105 transition-all duration-300">
            <Link className="flex h-full flex-col justify-evenly items-center" href={'/project-details/1'}>
              <div className="flex items-center gap-1.5 text-light-white">
                <p className="flex items-center justify-center font-b-h4-16 bg-cian w-[105px] h-[26px] rounded-full">Projeto 01</p>
                <p className="font-r-p-12 w-[229px]">Is simply dummy text of the printing...</p>
              </div>

              <div className="flex justify-center items-center bg-dark-blue w-[340px] h-[200px] rounded-2xl relative">
                <Image src={iconTs} alt="" />
                <p className="absolute left-3 bottom-3 flex justify-center items-center size-7 rounded-full bg-cian font-b-s-8 text-light-white" title="Project developed in: TS">TS</p>
              </div>
            </Link>
          </li>

        </ul>
      </div>

      <div className="flex justify-center w-full gap-10">
        <Image src={bg_ArrowLeft} alt="" />

        <Link className="flex items-center justify-center gap-4 bg-cian rounded-full text-light-white font-b-h4-16 w-[207px] h-[43px] cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-cian" href={'https://github.com/yLucino?tab=repositories'} target="_blank">
          Ver todos
          <Image src={iconGithub} alt="" />
        </Link>

        <Image src={bg_ArrowRight} alt="" />
      </div>
    </section>
  )
}