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
    <section id="contact" className="w-full h-screen bg-dark-blue pt-32">
      <h1 className="text-light-white font-b-title-desktop-64 px-32 mb-28">Quer entrar em <span>contato?</span></h1>

      <ul className="flex flex-col gap-16">
        {list.map(item => (
          <li key={item.text} className="flex gap-12 items-center">
            <div className="h-[114px] w-32 bg-gray rounded-tr-3xl rounded-br-3xl"></div>
            
            <Link href={item.url} title={item.title} target="_blank" className="hover:scale-105 transition-all duration-300">
              <Image src={item.icon} alt={""}/>          
            </Link>
            
            <div className="flex justify-between items-center h-[114px] w-full bg-gray rounded-tl-3xl rounded-bl-3xl pl-10 pr-32">
              <p className="text-light-white font-r-h4-16">{item.text} <span>{item.textContrast}</span></p>

              <Link href={item.url} title={item.title} target="_blank" className="flex justify-center items-center bg-cian rounded-2xl w-16 h-[46px] cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-cian">
                <Image src={iconSend} alt="" />
              </Link>
            </div>
          </li>
        ))}
      
      </ul>
    </section>
  )
}