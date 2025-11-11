'use client';

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef, useMemo } from "react";
import { usePathname } from "next/navigation";

import logo from "../assets/logo5x.png";
import iconMenu from "../assets/icons/solar_hamburguer-menu-bold.svg";

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
    { name: 'Contato', href: '#contact', focus: false },
    { name: 'Certificados', href: '/certifications', focus: false }
  ]), []);

  const navLink: NavLink = { name: 'Voltar', href: pathname === '/certifications'  ?  '/#about-me' : '/#projects', focus: true };

  const [currentLink, setCurrentLink] = useState<NavLink | null>(navLinks[0]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  // Close menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])


  const handleClick = (link: NavLink) => {
    navLinks.forEach((childLink) => {
      if (childLink.name !== link.name) {
        childLink.focus = false;
      } else {
        childLink.focus = true;
      }
    });

    setCurrentLink(link);
    setIsMenuOpen(false); // Close menu when link is clicked
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <header className="w-full fixed flex justify-between items-center py-7 px-4 md:px-32 bg-blue-drak border-b-2 border-gray bg-dark-blue z-50">
      <div className="flex items-center gap-2">
        <Link href={'/'}>
          <Image className="md:size-16 size-[50px]" src={logo} alt="Logo YL" />
        </Link>
      </div>

      <nav className="relative">
        {/* Hamburger Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex items-center justify-center p-2 hover:opacity-80 transition-opacity"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <Image src={iconMenu} alt="Menu" className="size-[30px]" />
        </button>

        {/* Desktop Navigation */}
        <ul className="md:flex hidden items-center gap-10 font-r-h4-16 ">
          {pathname === '/certifications' || pathname?.split('/')[1] === 'project-details' ? (
            <li key={navLink.name} className={currentLink?.name === navLink.name ? 'text-cian' : 'text-light-white hover:text-cian transition-all duration-300'} onClick={() => handleClick(navLink)}>
              <Link href={navLink.href}>
                {navLink.name}
              </Link>
            </li>
          ) : (
            navLinks.map((link) => (
              <li key={link.name} className={currentLink?.name === link.name ? 'text-cian' : 'text-light-white hover:text-cian transition-all duration-300'} onClick={() => handleClick(link)}>
                <Link className={link.name === 'Certificados' ? 'bg-gray rounded-full px-4 py-1' : ''} href={link.href}>
                  {link.name}
                </Link>
              </li>
            ))
          )}
        </ul>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <ul className="absolute top-full right-0 mt-2 bg-dark-blue border-2 border-gray rounded-lg shadow-lg md:hidden flex flex-col font-r-h4-16 z-50 py-5 px-3">
            {pathname === '/certifications' || pathname?.split('/')[1] === 'project-details' ? (
              <li key={navLink.name} className={currentLink?.name === navLink.name ? 'text-cian' : 'text-light-white hover:text-cian transition-all duration-300'}>
                <Link href={navLink.href} onClick={() => handleClick(navLink)} className="block px-4 py-2">
                  {navLink.name}
                </Link>
              </li>
            ) : (
              navLinks.map((link) => (
                <li key={link.name} className={currentLink?.name === link.name ? 'text-cian' : 'text-light-white hover:text-cian transition-all duration-300'}>
                  <Link 
                    className={`block px-4 py-2 ${link.name === 'Certificados' ? 'bg-gray rounded-full mx-2 mb-2 text-center' : ''}`} 
                    href={link.href}
                    onClick={() => handleClick(link)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))
            )}
          </ul>
        )}
      </nav>
    </header>
  );
}