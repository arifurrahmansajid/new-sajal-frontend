import React from 'react';
import updateImg from '../../assets/update.png';
import familyImg from '../../assets/family-min (1).png';
import { DotLottiePlayer } from '@dotlottie/react-player';
import { FaHandshakeSimple } from "react-icons/fa6";

interface WhyUsItem {
  title: string;
  desc: string;
  type: 'svg' | 'lottie';
  icon: React.ReactNode | string;
}

const AboutWhyUs: React.FC = () => {
  const whyUsData: WhyUsItem[] = [
    {
      title: "EXPERIENCED TEAM",
      desc: "We have a strong, dedicated & respectful team with years of valuable experience & knowledge, catering towards all occasions & all sized events - whether lavish or intimate.",
      type: 'svg',
      icon: (
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-20 h-20">
          <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
        </svg>
      )
    },
    {
      title: "CINEMATIC APPROACH",
      desc: "We upgrade our gear & softwares on release, to provide the latest in cutting edge technology to capture & edit your special day.",
      type: 'svg',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-20 h-20">
          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
          <circle cx="12" cy="13" r="4" />
        </svg>
      )
    },
    {
      title: "FEMALE ONLY SERVICE",
      desc: "We offer a Female Only service by client request only, for those who require this due to religious beliefs, personal preference or other.",
      type: 'svg',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-20 h-20">
          <circle cx="12" cy="9" r="6" />
          <path d="M12 15v7M9 19h6" />
        </svg>
      )
    },
    {
      title: "DIRECT COMMUNICATION",
      desc: "We give you direct access so you are left happy & fulfilled with the end product of the service you paid for.",
      type: 'svg',
      icon: <FaHandshakeSimple className="w-20 h-20" />
    },
   {
      title: "FAMILY RUN BUSINESS",
      desc: "Envision Media is a family run business, we take care of you like you are one of us & we will not be satisfied until you are.",
      type: 'svg',
      icon: (
        <img src={familyImg} alt="Family" className="w-40 h-40 object-contain" />
      )
    }
  ];

  return (
    <section 
      className="w-full py-24 pb-[120px] text-white border-t-[3px] border-[#C5A059] bg-cover bg-center relative overflow-hidden"
      style={{ backgroundImage: `linear-gradient(rgba(0, 31, 22, 0.4), rgba(0, 31, 22, 0.4)), url(${updateImg})` }}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 relative z-10">
        <h2 className="text-center text-[2.2rem] sm:text-[3rem] md:text-[3.6rem] tracking-[0.14em] mb-[40px] md:mb-[80px] font-bold font-['GiambattistaVsPetit',serif] text-white">
          WHY US?
        </h2>
 
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 text-center">
          {whyUsData.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center">
              {/* Circular Icon Circle with improved luminosity */}
              <div className="w-[130px] h-[130px] rounded-full border-[2.5px] border-[#C5A059] flex items-center justify-center mb-8 bg-[#021F10] shadow-[0_0_20px_rgba(197,160,89,0.1)] relative overflow-hidden">
                 {/* Luminous White-Teal Icon / Lottie Container */}
                 <div className="text-[#4D8D77] px-2 w-full h-full flex items-center justify-center">
                    {item.type === 'lottie' ? (
                      <DotLottiePlayer
                        src={(item.icon as unknown) as string}
                        autoplay
                        loop
                        style={{ width: '85%', height: '85%' }}
                      />
                    ) : (
                      item.icon as React.ReactNode
                    )}
                 </div>
              </div>

              {/* Gold Title in Cinzel */}
              <h3 className="text-[#C5A059] font-['GiambattistaVsPetit',serif] text-[1.15rem] font-bold mb-4 tracking-[0.05em] leading-[1.2] px-2 min-h-[3rem] flex items-center justify-center">
                {item.title}
              </h3>

              {/* Feature Description - White Poppins */}
              <p className="text-[0.8rem] leading-[1.65] text-white/95 font-['Poppins',sans-serif] px-4 font-normal tracking-wide">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutWhyUs;
