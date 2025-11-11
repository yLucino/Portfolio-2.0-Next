'use client'

import { useEffect, useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { getRepoById, getRepoLanguages } from "@/services/repositories.service";
import { GitHubRepo } from "@/interfaces/githubRepo.interface";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

import iconGithub from "../../../assets/icons/solar_github-bold.svg";
import iconCopy from "../../../assets/icons/solar_copy-bold.svg";
import iconDownload from "../../../assets/icons/solar_download-bold.svg";
import iconCSharp from "../../../assets/icons/devicon_csharp.svg";
import iconCSS from "../../../assets/icons/devicon_css.svg";
import iconHTML from "../../../assets/icons/devicon_html.svg";
import iconJs from "../../../assets/icons/devicon_javascript.svg";
import iconLua from "../../../assets/icons/devicon_lua.svg";
import iconTs from "../../../assets/icons/devicon_typescript.svg";
import iconLiquid from "../../../assets/icons/devicon_liquid.svg";
import iconReact from "../../../assets/icons/devicon_react.svg";
import iconNodeJs from "../../../assets/icons/devicon_nodejs.svg";
import iconAngular from "../../../assets/icons/devicon_angular.svg";
import iconNext from "../../../assets/icons/devicon_nextjs.svg";
import iconTailwind from "../../../assets/icons/devicon_tailwindcss.svg";
import iconMySQL from "../../../assets/icons/devicon_mysql.svg";
import iconExpress from "../../../assets/icons/devicon_express.svg";
import iconScss from "../../../assets/icons/devicon_scss.svg";
import thumbNoImage from "../../../public/image/thumb-no-image.png";
import previewNoImage from "../../../public/image/preview-no-image.png";

interface LanguageData {
  name: string;
  percentage: number;
  icon: string;
}

const languageIconMap: Record<string, string> = {
  'JavaScript': iconJs,
  'TypeScript': iconTs,
  'C#': iconCSharp,
  'CSharp': iconCSharp,
  'HTML': iconHTML,
  'CSS': iconCSS,
  'Lua': iconLua,
  'Liquid': iconLiquid,
  'React': iconReact,
  'JSX': iconReact,
  'TSX': iconReact,
  'Node.js': iconNodeJs,
  'Angular': iconAngular,
  'Next.js': iconNext,
  'Tailwind CSS': iconTailwind,
  'MySQL': iconMySQL,
  'Express': iconExpress,
  'SCSS': iconScss
};

const getLanguageIcon = (languageName: string): string => {
  return languageIconMap[languageName] || iconJs;
};

const calculateLanguagePercentages = (langData: Record<string, number>): LanguageData[] => {
  const total = Object.values(langData).reduce((sum, bytes) => sum + bytes, 0);
  const langArray = Object.entries(langData)
    .map(([name, bytes]) => ({
      name,
      percentage: (bytes / total) * 100,
      icon: getLanguageIcon(name),
    }))
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 4);

  return langArray;
};

interface ProjectImages {
  thumb: string | null;
  preview01: string | null;
  preview02: string | null;
  preview03: string | null;
  preview04: string | null;
}

export default function ProjectDetails() {
  const pathname = usePathname()?.split('/')[2];
  const [repo, setRepo] = useState<GitHubRepo>();
  const [languages, setLanguages] = useState<LanguageData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [images, setImages] = useState<ProjectImages>({
    thumb: null,
    preview01: null,
    preview02: null,
    preview03: null,
    preview04: null,
  });
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const handleCopyCloneUrl = async () => {
    if (repo?.clone_url) {
      try {
        await navigator.clipboard.writeText(repo.clone_url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const handleDownloadZip = () => {
    if (repo?.default_branch && repo?.full_name) {
      const zipUrl = `https://github.com/${repo.full_name}/archive/refs/heads/${repo.default_branch}.zip`;
      window.open(zipUrl, '_blank');
    }
  };

  const getImageUrls = (repoName: string, branch: string, owner: string = 'yLucino'): ProjectImages => {
    const baseUrl = `https://raw.githubusercontent.com/${owner}/${repoName}/${branch}/src/public/image`;
    return {
      thumb: `${baseUrl}/thumb.png`,
      preview01: `${baseUrl}/preview-01.png`,
      preview02: `${baseUrl}/preview-02.png`,
      preview03: `${baseUrl}/preview-03.png`,
      preview04: `${baseUrl}/preview-04.png`,
    };
  };

  const openZoom = useCallback((imgUrl: string | StaticImageData) => {
    const url = typeof imgUrl === 'string' ? imgUrl : imgUrl.src;
    setZoomedImage(url);
  }, []);

  const closeZoom = useCallback(() => {
    setZoomedImage(null);
  }, []);

  useEffect(() => {
    const fetchRepoData = async () => {
      try {
        const [repoData, languagesData] = await Promise.all([
          getRepoById(pathname),
          getRepoLanguages(pathname),
        ]);
        setRepo(repoData);
        const langPercentages = calculateLanguagePercentages(languagesData);
        setLanguages(langPercentages);
        
        // Generate image URLs
        if (repoData?.default_branch && repoData?.full_name) {
          const owner = repoData.full_name.split('/')[0];
          const repoName = repoData.full_name.split('/')[1];
          const imageUrls = getImageUrls(repoName, repoData.default_branch, owner);
          setImages(imageUrls);
        }
      } catch (err) {
        console.error('Error fetching repository data:', err);
      } finally {
        setLoading(false);
      }
    }

    if (pathname) {
      fetchRepoData();
    }
  }, [pathname])

  useEffect(() => {
    if (zoomedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [zoomedImage]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && zoomedImage) {
        closeZoom();
      }
    }

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [zoomedImage, closeZoom]);

  return (
    <section className="flex flex-col w-full h-screen justify-evenly bg-dark-blue pt-32 px-32">
      <h1 className="font-b-title-desktop-64 text-light-white">Detalhes do <span>Projeto</span></h1>

      <div className="flex justify-between w-full">
        <div className="flex flex-col gap-5 max-w-[360px]">
          <p className="font-extralight text-light-white"><span className="font-b-h4-16">Nome:</span> {repo?.name}</p>
          <p className="font-extralight text-light-white !leading-7"><span className="font-b-h4-16">Descrição:</span> {repo?.description || 'Sem Descrição'}</p>
        </div>

        <div className="flex flex-col gap-5 max-w-[440px]">
          <div 
            className="cursor-pointer hover:opacity-65 transition-opacity rounded-lg overflow-hidden bg-gray"
            onClick={() => {
              const imgToZoom = failedImages.has('thumb') ? thumbNoImage : (images.thumb || thumbNoImage);
              openZoom(imgToZoom);
            }}
          >
            <Image 
              src={failedImages.has('thumb') ? thumbNoImage : (images.thumb || thumbNoImage)} 
              alt="Thumbnail do projeto" 
              width={440}
              height={260}
              className="rounded-lg"
              unoptimized
              onError={() => {
                setFailedImages(prev => new Set(prev).add('thumb'));
              }}
            />
          </div>

          <div className="grid grid-cols-4 gap-5">
            <div 
              className="cursor-pointer hover:opacity-65 transition-opacity rounded-lg overflow-hidden bg-gray"
              onClick={() => {
                const imgToZoom = failedImages.has('preview01') ? previewNoImage : (images.preview01 || previewNoImage);
                openZoom(imgToZoom);
              }}
            >
              <Image 
                src={failedImages.has('preview01') ? previewNoImage : (images.preview01 || previewNoImage)} 
                alt="Preview 01 do projeto" 
                width={130}
                height={90}
                className="rounded-lg"
                unoptimized
                onError={() => {
                  setFailedImages(prev => new Set(prev).add('preview01'));
                }}
              />
            </div>
            <div 
              className="cursor-pointer hover:opacity-65 transition-opacity rounded-lg overflow-hidden bg-gray"
              onClick={() => {
                const imgToZoom = failedImages.has('preview02') ? previewNoImage : (images.preview02 || previewNoImage);
                openZoom(imgToZoom);
              }}
            >
              <Image 
                src={failedImages.has('preview02') ? previewNoImage : (images.preview02 || previewNoImage)} 
                alt="Preview 02 do projeto" 
                width={130}
                height={90}
                className="rounded-lg"
                unoptimized
                onError={() => {
                  setFailedImages(prev => new Set(prev).add('preview02'));
                }}
              />
            </div>
            <div 
              className="cursor-pointer hover:opacity-65 transition-opacity rounded-lg overflow-hidden bg-gray"
              onClick={() => {
                const imgToZoom = failedImages.has('preview03') ? previewNoImage : (images.preview03 || previewNoImage);
                openZoom(imgToZoom);
              }}
            >
              <Image 
                src={failedImages.has('preview03') ? previewNoImage : (images.preview03 || previewNoImage)} 
                alt="Preview 03 do projeto" 
                width={130}
                height={90}
                className="rounded-lg"
                unoptimized
                onError={() => {
                  setFailedImages(prev => new Set(prev).add('preview03'));
                }}
              />
            </div>
            <div 
              className="cursor-pointer hover:opacity-65 transition-opacity rounded-lg overflow-hidden bg-gray"
              onClick={() => {
                const imgToZoom = failedImages.has('preview04') ? previewNoImage : (images.preview04 || previewNoImage);
                openZoom(imgToZoom);
              }}
            >
              <Image 
                src={failedImages.has('preview04') ? previewNoImage : (images.preview04 || previewNoImage)} 
                alt="Preview 04 do projeto" 
                width={130}
                height={90}
                className="rounded-lg"
                unoptimized
                onError={() => {
                  setFailedImages(prev => new Set(prev).add('preview04'));
                }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between w-full">
        <div className="bg-gray rounded-[20px] flex flex-col justify-between py-3 items-center w-[410px] h-[190px]">
          <p className="font-r-h4-16 text-light-white"><span>Linguagens</span> utilizadas no projeto</p>

          <ul className="bg-dark-blue rounded-[12px] flex flex-col justify-between py-3 items-center gap-auto w-[380px] h-[130px]">
            {loading ? (
              <li className="flex w-full px-3 gap-2 items-center justify-center">
                <p className="font-r-p-12 text-light-white">Carregando...</p>
              </li>
            ) : languages.length > 0 ? (
              languages.map((lang, index) => (
                <li key={index} className="flex w-full px-3 gap-2 items-center">
                  <Image className="size-[22px]" src={lang.icon} title={lang.name} alt={lang.name} />

                  <div className="w-full h-2.5 bg-gray rounded-full" title={`${lang.name}: ${lang.percentage.toFixed(1)}%`}>
                    <div 
                      className="bg-linear-gradient rounded-full h-2.5 transition-all duration-300" 
                      style={{ width: `${lang.percentage}%` }}
                    ></div>
                  </div>
                </li>
              ))
            ) : (
              <li className="flex w-full px-3 gap-2 items-center justify-center">
                <p className="font-r-p-12 text-light-white">Nenhuma linguagem encontrada</p>
              </li>
            )}
            {languages.length < 4 && Array.from({ length: 4 - languages.length }).map((_, index) => (
              <li key={`empty-${index}`} className="flex w-full px-3 gap-2 items-center opacity-0 pointer-events-none">
                <div className="size-[22px]"></div>
                <div className="w-full h-2.5"></div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-gray rounded-[20px] flex flex-col justify-between py-3 items-center w-[410px] h-[190px]">
          <p className="font-r-h4-16 text-light-white"><span>Ações</span> disponíveis</p>

          <div className="bg-dark-blue rounded-[12px] flex flex-col justify-between py-3 px-3 items-center gap-auto w-[380px] h-[130px]">
            <p className="font-r-p-12 text-light-white">Repositório GitHub: <span>Público</span></p>
            <p className="font-r-p-12 text-light-white">Autor do Projeto: <span>yLucino</span></p>
            <hr className="h-[2px] w-full border-none bg-gray rounded-full" />

            <nav className="flex justify-between w-full">
              <Link 
                className="bg-cian font-b-s-10 text-light-white flex gap-2 justify-center items-center rounded-[5px] h-[35px] w-[110px] hover:opacity-65 transition-opacity" 
                href={repo?.html_url || '#'} 
                target="_blank"
                rel="noopener noreferrer"
              >
                Ir para
                <Image className="size-[15px]" src={iconGithub} alt="GitHub"/>
              </Link>
              <button 
                className="bg-cian font-b-s-10 text-light-white flex gap-2 justify-center items-center rounded-[5px] h-[35px] w-[110px] hover:opacity-65 transition-opacity cursor-pointer disabled:opacity-50" 
                onClick={handleCopyCloneUrl}
                disabled={!repo?.clone_url}
                title={copied ? "Copiado!" : "Copiar URL de clonagem"}
              >
                {copied ? 'Copiado!' : 'Clonar'}
                <Image className="size-[15px]" src={iconCopy} alt="Copiar"/>
              </button>
              <button 
                className="bg-cian font-b-s-10 text-light-white flex gap-2 justify-center items-center rounded-[5px] h-[35px] w-[110px] hover:opacity-65 transition-opacity cursor-pointer disabled:opacity-50" 
                onClick={handleDownloadZip}
                disabled={!repo?.default_branch || !repo?.full_name}
                title="Baixar repositório como ZIP"
              >
                Download ZIP
                <Image className="size-[15px]" src={iconDownload} alt="Download"/>
              </button>
            </nav>
          </div>
        </div>
      </div>

      {/* Zoom Modal */}
      {zoomedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-lg flex items-center justify-center p-4 animate-fade-in"
          onClick={closeZoom}
        >
          <div className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center animate-zoom-in">
            <button
              onClick={closeZoom}
              className="absolute top-4 right-4 z-[101] bg-cian hover:bg-opacity-80 text-light-white font-b-h4-16 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer"
              aria-label="Fechar zoom"
            >
              ✕
            </button>
            <div 
              className="relative" 
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={zoomedImage}
                alt="Preview do projeto em zoom"
                width={1200}
                height={800}
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                unoptimized
                priority
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}