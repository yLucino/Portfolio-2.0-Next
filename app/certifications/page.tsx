'use client'

import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import { useEffect, useState } from 'react';

import iconLinkedin from "../../assets/icons/solar_linkedin-bold.svg";
import iconGithub from "../../assets/icons/solar_github-bold.svg";
import certificateEntra21_1 from "../../assets/certificate/Certificado-Entra21-pag1.png";
import certificateEntra21_2 from "../../assets/certificate/Certificado-Entra21-pag2.png";
import certificateDevQuestFrontend from "../../assets/certificate/Certificado-DevQuest-Frontend.png";
import certificateDevQuestBackend from "../../assets/certificate/Certificado-DevQuest-Backend.png";
import certificateKarstenEletrica from "../../assets/certificate/Certificado Karsten 01.jpg";
import certificateKarstenLitio from "../../assets/certificate/Certificado Karsten 02.jpg";

import bigInfo from "../../assets/Big-Ellipse-BG-Section-Certification.svg";
import smallInfo from "../../assets/Small-Ellipse-BG-Section-Certification.png";

import bg from "../../assets/BG-Section-Certification.png";

export default function Certifications() {
  interface Filter {
    text: string,
    focus: boolean
  }

  interface Certificate {
    title: string,
    tagType: string,
    subTitle: string,
    img_1: StaticImageData,
    img_2?: StaticImageData,
    zoomImg: boolean
  }
  
  const filters: Filter[] = [
    {
      text: 'Todos',
      focus: true
    },
    {
      text: 'Full Stack',
      focus: false
    },
    {
      text: 'Backend',
      focus: false
    },
    {
      text: 'Frontend',
      focus: false
    },
    {
      text: 'Logística',
      focus: false
    },
  ]

  const certificationsData: Certificate[] = [
    {
      title: 'Entra 21  |  19ª Edição  |  ProWay  |  C#  |  Angular',
      tagType: 'Full Stack',
      subTitle: '360 horas | Aulas não Técnicas: 120 horas',
      img_1: certificateEntra21_1,
      img_2: certificateEntra21_2,
      zoomImg: false
    },
    {
      title: 'Dev Em Dobro | DevQuest | React',
      tagType: 'Frontend',
      subTitle: '+80 horas',
      img_1: certificateDevQuestFrontend,
      zoomImg: false
    },
    {
      title: 'Dev Em Dobro | DevQuest | NodeJs',
      tagType: 'Backend',
      subTitle: '+20 horas',
      img_1: certificateDevQuestBackend,
      zoomImg: false
    },
    {
      title: 'Karsten | Empilhadeira Elétrica',
      tagType: 'Logística',
      subTitle: '40 horas',
      img_1: certificateKarstenEletrica,
      zoomImg: false
    },
    {
      title: 'Karsten | Empilhadeira Lítio',
      tagType: 'Logística',
      subTitle: '40 horas',
      img_1: certificateKarstenLitio,
      zoomImg: false
    },
  ] 

  const [certifications, setCertifications] = useState<Certificate[]>(certificationsData);
  const [currentBtn, setCurrentBtn] = useState<Filter>(filters[0]);
  const [zoomedImage, setZoomedImage] = useState<StaticImageData | null>(null);

  const hendlerClick = (btn: Filter) => {
    setCurrentBtn(btn);

    if (btn.text === 'Todos') {
      setCertifications(certificationsData);
    } else {
      const filteredArray = certificationsData.filter(cert => cert.tagType === btn.text);
      setCertifications(filteredArray);
    }
  }

  const openZoom = (img: StaticImageData) => {
    setZoomedImage(img);
  }

  const closeZoom = () => {
    setZoomedImage(null);
  }

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
  }, [zoomedImage]);

  return(
    <section className="w-full min-h-screen flex flex-col justify-between bg-dark-blue pt-32 px-32 relative">
      <div className="mb-28">
        <h1 className="font-b-title-desktop-64 text-light-white">Minhas <span>Certificações</span></h1>

        <ul className="flex gap-2.5">
          {filters.map(btn => (
            <li key={btn.text} className={currentBtn.text === btn.text ? 'font-b-h4-16 text-light-white bg-cian w-[132px] h-[43px] rounded-4xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-cian flex items-center justify-center' : 'font-b-h4-16 text-light-white bg-gray w-[132px] h-[43px] rounded-4xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-gray flex items-center justify-center'} onClick={() => hendlerClick(btn)}>
              {btn.text}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex">
        <div className="h-auto w-1.5 rounded-full bg-cian"></div>

        <ul>
          {certifications.map(cert => (
            <li key={cert.title} className="flex gap-5 -ml-[30px] mt-28 last:mb-50">
              <div className="flex flex-col items-center gap-[22px]">
                <Image src={bigInfo} alt=""/>
                <Image src={smallInfo} alt=""/>
              </div>

              <div className="w-[495px] flex flex-col justify-evenly">
                <p className="font-b-h3-21 text-light-white">{cert.title}</p>

                <p className="bg-gray rounded-full font-b-s-8 text-cian w-[100px] h-[15px] flex items-center justify-center">{cert.tagType}</p>

                <p className="font-r-p-12 text-light-white"><strong className="font-b-p-12">Carga hóraria:</strong> Aulas Técnicas: {cert.subTitle}</p>
              </div>

              <div className="flex gap-5">
                <div className="w-[215px] h-[108px] rounded-[20px] bg-gray flex items-center justify-center cursor-pointer hover:opacity-65 transition-opacity" onClick={() => openZoom(cert.img_1)}>
                  <Image className="w-[190px] h-[80px] border-4 border-cian rounded-[10px]" src={cert.img_1} alt={"Imagem 1 do certificado de " + cert.tagType} />
                </div>

                {cert.img_2 ? (
                  <div className="w-[215px] h-[108px] rounded-[20px] bg-gray flex items-center justify-center cursor-pointer hover:opacity-65 transition-opacity" onClick={() => openZoom(cert.img_2!)}>
                    <Image className="w-[190px] h-[80px] border-4 border-cian rounded-[10px]" src={cert.img_2} alt={"Imagem 2 do certificado de " + cert.tagType} />
                  </div>
                ) : ('')}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full flex justify-end pr-16 -mt-[100px] mb-20">
        <div className="w-[445px] h-[100px] flex flex-col items-center justify-between">
          <p className="flex justify-center gap-1 items-center rounded-full bg-gray w-full h-[42px] font-b-h4-16 text-light-white"><span>Acompanhe</span> também em:</p>
        
          <div className="flex w-full items-center justify-between">
            <Link target="_blank" className="flex items-center justify-center gap-2.5 rounded-full bg-cian font-b-h4-16 text-light-white w-[215px] h-[42px] cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-cian" href={'https://www.linkedin.com/in/luciano-chiodini-6a35092b3'}>
              Ir para
              <Image src={iconLinkedin} alt=""/>
            </Link>
        
            <Link target="_blank" className="flex items-center justify-center gap-2.5 rounded-full bg-cian font-b-h4-16 text-light-white w-[215px] h-[42px] cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-cian" href={'https://github.com/yLucino'}>
              Ir para
              <Image src={iconGithub} alt=""/>
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute right-0 bottom-0">
        <Image src={bg} alt=""/>         
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
                alt="Certificado em zoom"
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}