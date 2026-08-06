import Image from "next/image";
import Link from "next/link";

import iconSend from "../../assets/icons/solar_send-bold.svg";
import iconWhatsapp from "../../assets/icons/solar_whatsapp-bold-with-shadow.svg";
import iconEmail from "../../assets/icons/solar_email-bold-with-shadow.svg";
import iconLinkedIn from "../../assets/icons/solar_linkedin-bold-with-shadow.svg";

export default function Contact() {
  const list = [
    {
      icon: iconWhatsapp,
      text: 'Entre em contato pelo meu',
      textContrast: 'WhatsApp',
      url: 'https://wa.me/5547992486476',
      title: 'Meu número: +55 (47) 9 9248-6476'
    },
    {
      icon: iconEmail,
      text: 'Envie sua mensagem pelo meu',
      textContrast: 'E-mail',
      url: 'mailto:chiodiniluciano@gmail.com?subject=Contato%20profissional&body=Olá%20Luciano,%20gostaria%20de%20conversar%20sobre...',
      title: 'Meu E-mail: chiodiniluciano@gmail.com'
    },
    {
      icon: iconLinkedIn,
      text: 'Conecte-se comigo pelo me',
      textContrast: 'LinkedIn',
      url: 'https://www.linkedin.com/in/luciano-chiodini-6a35092b3',
      title: 'Meu LinkedIn: Luciano Chiodini Fullstack'
    },
  ]

  return (
    <section id="contact" className="w-full min-h-screen bg-dark-blue pt-24 sm:pt-28 md:pt-32 pb-10 md:pb-0">
      <h1 className="text-light-white font-b-title-mobile-38 md:font-b-title-desktop-64 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 mb-10 md:mb-28">Quer entrar em <span>contato?</span></h1>

      <ul className="flex flex-col gap-8 md:gap-16 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
        {list.map(item => (
          <li key={item.text} className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-12 items-stretch sm:items-center">
            <div className="hidden sm:block h-[80px] md:h-[114px] w-16 md:w-32 bg-gray rounded-tr-3xl rounded-br-3xl shrink-0"></div>
            
            <Link href={item.url} title={item.title} target="_blank" className="hover:scale-105 transition-all duration-300 self-center sm:self-auto shrink-0">
              <Image className="w-[60px] h-auto md:w-auto" src={item.icon} alt={""}/>          
            </Link>
            
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0 min-h-[80px] md:h-[114px] w-full bg-gray rounded-3xl sm:rounded-tl-3xl sm:rounded-bl-3xl sm:rounded-tr-none sm:rounded-br-none px-6 sm:pl-6 md:pl-10 sm:pr-6 md:pr-16 py-4 sm:py-0">
              <p className="text-light-white font-r-h4-16 text-center sm:text-left text-sm md:text-base">{item.text} <span>{item.textContrast}</span></p>

              <Link href={item.url} title={item.title} target="_blank" className="flex justify-center items-center bg-cian rounded-2xl w-16 h-[46px] cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-cian shrink-0">
                <Image src={iconSend} alt="" />
              </Link>
            </div>
          </li>
        ))}
      
      </ul>
    </section>
  )
}