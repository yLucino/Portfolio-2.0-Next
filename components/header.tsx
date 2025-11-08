'use client';

import Image from "next/image";
import logo from "../assets/logo5x.png";
import Link from "next/link";
import { useEffect, useState, useRef, useMemo } from "react";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  interface NavLink {
    name: string;
    href: string;
    focus: boolean;
  }

  const navLinks: NavLink[] = useMemo(() => ([
    { name: 'Início', href: '#home', focus: true },
    { name: 'Sobre mim', href: '#about-me', focus: false },
    { name: 'Habilidades', href: '#skills', focus: false },
    { name: 'Projetos', href: '#projects', focus: false },
    { name: 'Contato', href: '#contact', focus: false }
  ]), []);

  const navLink: NavLink = { name: 'Voltar', href: '/', focus: true };

  const [currentLink, setCurrentLink] = useState<NavLink | null>(navLinks[0]);

  const lastActiveIdRef = useRef<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const top = window.scrollY;

      let activeId: string | null = null;

      sections.forEach((sec) => {
        const el = sec as HTMLElement;
        const offset = el.offsetTop - 150;
        const height = el.offsetHeight;
        const id = el.getAttribute('id');

        if (id && top >= offset && top < offset + height) {
          activeId = id;
        }
      });

      if (activeId && lastActiveIdRef.current !== activeId) {
        lastActiveIdRef.current = activeId;

        const found = navLinks.find((l) => l.href.replace('#', '') === activeId);
        if (found) {
          navLinks.forEach((l) => {
            l.focus = l === found;
          });
          setCurrentLink({ ...found });
        }
      }
    };

    window.addEventListener('scroll', onScroll);
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, [navLinks])


  const handleClick = (link: NavLink) => {
    navLinks.forEach((childLink) => {
      if (childLink.name !== link.name) {
        childLink.focus = false;
      } else {
        childLink.focus = true;
      }
    });

    setCurrentLink(link);
  }

  return (
    <header className="w-full fixed flex justify-between items-center py-7 px-32 bg-blue-drak border-b-2 border-gray bg-dark-blue z-50">
      <div className="flex items-center gap-2">
        <Image className="w-16" src={logo} alt="Logo YL" />
        <h1 className="text-light-white font-b-h2-28">yLucino</h1>
      </div>

      <nav>
        <ul className="flex items-center gap-10 font-r-h4-16 ">
          {pathname === '/certifications' || pathname?.split('/')[1] === 'project-details' ? (
            <li key={navLink.name} className={currentLink?.name === navLink.name ? 'text-cian' : 'text-light-white hover:text-cian transition-all duration-300'} onClick={() => handleClick(navLink)}>
              <Link href={navLink.href}>
                {navLink.name}
              </Link>
            </li>
          ) : (
            navLinks.map((link) => (
              <li key={link.name} className={currentLink?.name === link.name ? 'text-cian' : 'text-light-white hover:text-cian transition-all duration-300'} onClick={() => handleClick(link)}>
                <Link href={link.href}>
                  {link.name}
                </Link>
              </li>
            ))
          )}
        </ul>
      </nav>
    </header>
  );
}