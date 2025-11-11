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
import iconLua from "../../assets/icons/devicon_lua.svg";
import iconTs from "../../assets/icons/devicon_typescript.svg";
import iconLiquid from "../../assets/icons/devicon_liquid.svg";

import { getRepos } from "@/services/repositories.service";
import { GitHubRepo } from "@/interfaces/githubRepo.interface";

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
  const [allRepos, setAllRepos] = useState<GitHubRepo[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const data = await getRepos();
        setAllRepos(data);
        // Initial filter: Recentes (most recent first)
        const sortedRepos = data
          .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
          .slice(0, 3);
        setFilteredRepos(sortedRepos);
      } catch (error) {
        console.error('Error fetching repositories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const filterRepos = (filterText: string): GitHubRepo[] => {
    let filtered: GitHubRepo[] = [];

    switch (filterText) {
      case 'Recentes':
        // Sort by updated_at (most recent first)
        filtered = [...allRepos].sort((a, b) => 
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
        break;
      
      case 'Favoritos':
        // Sort by stargazers_count (most starred first)
        filtered = [...allRepos].sort((a, b) => 
          b.stargazers_count - a.stargazers_count
        );
        break;
      
      case 'TypeScript':
        // Filter by TypeScript language
        filtered = allRepos.filter(repo => 
          repo.language?.toLowerCase() === 'typescript'
        );
        // Sort by updated_at within TypeScript repos
        filtered.sort((a, b) => 
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
        break;
      
      case 'JavaScript':
        // Filter by JavaScript language
        filtered = allRepos.filter(repo => 
          repo.language?.toLowerCase() === 'javascript'
        );
        // Sort by updated_at within JavaScript repos
        filtered.sort((a, b) => 
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
        break;
      
      case 'Lua':
        // Filter by Lua language
        filtered = allRepos.filter(repo => 
          repo.language?.toLowerCase() === 'lua'
        );
        // Sort by updated_at within Lua repos
        filtered.sort((a, b) => 
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
        break;
      
      case 'CSharp':
        // Filter by C# language (GitHub API returns 'C#' as language name)
        filtered = allRepos.filter(repo => {
          const lang = repo.language?.toLowerCase();
          return lang === 'c#' || lang === 'csharp' || lang === 'c sharp';
        });
        // Sort by updated_at within C# repos
        filtered.sort((a, b) => 
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
        break;
      
      default:
        // Default to recent
        filtered = [...allRepos].sort((a, b) => 
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
    }

    // Limit to 3 repos for all filters
    return filtered.slice(0, 3);
  };

  const handlerClick = (text: string) => {
    let selected: Filter = filters[0];

    filters.forEach(btn => {
      if (btn.text === text) {
        btn.selected = true;
        selected = btn;
      } else {
        btn.selected = false;
      }
    });

    setCurrentBtn(selected);
    
    // Apply filter
    const filtered = filterRepos(text);
    setFilteredRepos(filtered);
  }

  const getLanguageIcon = (language: string | null): StaticImageData => {
    if (!language) return iconJs; // default icon
    
    const normalizedLanguage = language.toLowerCase();
    const languageMap: Record<string, StaticImageData> = {
      'typescript': iconTs,
      'javascript': iconJs,
      'liquid': iconLiquid,
      'js': iconJs,
      'lua': iconLua,
      'c#': iconCSharp,
      'csharp': iconCSharp,
      'css': iconCSS,
      'html': iconHTML,
    };

    return languageMap[normalizedLanguage] || iconJs;
  }

  const getLanguageLabel = (language: string | null): string => {
    if (!language) return 'N/A';
    
    // Shorten language names for display in small badge
    const shortNames: Record<string, string> = {
      'TypeScript': 'TS',
      'JavaScript': 'JS',
      'C#': 'C#',
      'CSharp': 'C#',
    };
    
    return shortNames[language] || language.substring(0, 5);
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
          {loading ? (
            <li className="bg-gray w-[380px] h-[280px] rounded-4xl flex items-center justify-center">
              <p className="text-light-white font-b-h4-16 bg-dark-blue px-5 py-3 rounded-full">Carregando...</p>
            </li>
          ) : filteredRepos.length > 0 ? (
            filteredRepos.map((repo) => (
              <li key={repo.id} className="bg-gray w-[380px] h-[280px] rounded-4xl hover:scale-105 transition-all duration-300" title={repo.description || 'Sem descrição'}>
                <Link 
                  className="flex h-full flex-col justify-evenly items-center" 
                  href={`/project-details/${repo.name}`}
                >
                  <div className="flex items-center gap-1.5 text-light-white px-4 w-full">
                    <p className="flex items-center justify-center font-b-s-10 bg-cian min-w-[105px] h-[26px] rounded-full truncate px-2 w-fit" title={repo.name}>
                      {repo.name}
                    </p>
                  </div>

                  <div className="flex justify-center items-center bg-dark-blue w-[340px] h-[200px] rounded-2xl relative">
                    <Image src={getLanguageIcon(repo.language)} alt={repo.language || 'Unknown language'} />
                    <p className="absolute left-3 bottom-3 flex justify-center items-center min-w-[28px] h-7 px-2 rounded-full bg-cian font-b-s-8 text-light-white" title={`Project developed in: ${repo.language || 'Unknown'}`}>
                      {getLanguageLabel(repo.language)}
                    </p>
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <li className="bg-gray w-[380px] h-[280px] rounded-4xl flex items-center justify-center">
              <p className="text-light-white font-b-h4-16 bg-dark-blue px-5 py-3 rounded-full">Nenhum repositório encontrado</p>
            </li>
          )}
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