import React from 'react';
import { Link } from 'react-router-dom';
import contactBg from '../../assets/contact-bg.png';
import cardBg from '../../assets/conatus center background.png';

const HomeContact: React.FC = () => {
  const socialIcons = [
    { name: 'tiktok', path: 'https://www.tiktok.com/@myenvisionltd', d: 'M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5' },
    { name: 'youtube', path: 'https://www.youtube.com/channel/UCnk0OBVdy2d_3mGgiXqwkEw', d: 'M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z M10 8l6 4-6 4V8z' },
    { name: 'facebook', path: 'https://www.facebook.com/myenvisionltd', d: 'M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z' },
    { name: 'instagram', path: 'https://www.instagram.com/myenvisionltd', d: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z M17.5 6.5h.01' },
    { name: 'email', path: 'mailto:Enquiries@myenvisionltd.com', d: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1-.9-2 2-2z M22 6l-10 7L2 6' },
  ];

  return (
    <section
      className="w-full py-30 relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${contactBg})` }}
    >
      {/* Lightening Overlay */}
      <div className="absolute inset-0 bg-white/70 pointer-events-none" />

      <div className="absolute top-0 left-0 w-full h-[300px] bg-[radial-gradient(ellipse_at_top,rgba(197,160,89,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-[1050px] mx-auto px-4 sm:px-10 relative">
        <div
          className="relative pt-20 sm:pt-25 px-4 sm:px-10 pb-16 sm:pb-24 text-center border border-[#C5A059]/15 rounded-[2px] shadow-[0_15px_40px_rgba(0,0,0,0.08)]"
        >
          {/* Card Background */}
          <div
            className="absolute inset-0 bg-cover bg-center rounded-[2px] z-0"
            style={{ backgroundImage: `url(${cardBg})` }}
          />

          {/* Header Badge */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#012015] px-8 sm:px-16 py-4 sm:py-5 rounded-[4px] shadow-[0_10px_30px_rgba(0,0,0,0.3)] border border-[#C5A059]/30 z-20 w-[85%] md:w-auto">
            <h2 className="text-[#C5A059] font-['GiambattistaVsPetit',serif] text-[1.4rem] sm:text-[1.8rem] md:text-[2.2rem] font-bold tracking-[0.14em] m-0 uppercase leading-none text-balance">
              CONTACT US
            </h2>
          </div>

          <div className="mt-4 sm:mt-8 mb-6 sm:mb-10 relative z-10">
            <h3 className="text-[#011a11] font-['GiambattistaVsPetit',serif] text-[1.1rem] md:text-[1.8rem] font-bold tracking-[0.12em] mb-2 uppercase text-balance">
              CHECK YOUR DATE & AVAILABILITY
            </h3>
            <p className="text-[#011a11] font-['Poppins',sans-serif] text-[0.7rem] md:text-[0.85rem] font-medium tracking-wide text-balance">
              Tell us all about your wedding and we'll get in touch with availability and a free quote
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-4 max-w-[850px] mx-auto relative z-10">
            {/* Left Column: Phone & Socials */}
            <div className="flex flex-col items-center gap-8">
              <a
                href="tel:+447922390123"
                className="bg-gradient-to-r from-[#d4b06a] via-[#c5a059] to-[#8b6b3f] w-full py-4 px-6 rounded-full flex items-center justify-center gap-4 text-[#012015] shadow-[0_10px_20px_rgba(139,107,63,0.25)] cursor-pointer transition-transform duration-300 hover:scale-105 no-underline decoration-transparent"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span className="text-[1.35rem] font-bold tracking-widest font-sans">
                  +44 7922 390123
                </span>
              </a>

              <div className="flex flex-wrap justify-center gap-4">
                {socialIcons.map((s) => (
                  <a
                    key={s.name}
                    href={s.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-[48px] h-[48px] bg-[#012015] border-[4px] border-[#cfab65] rounded-[6px] flex items-center justify-center text-[#C5A059] cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-[0_5px_15px_rgba(0,0,0,0.3)] group"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[#d4b06a]">
                      {s.name === 'instagram' ? <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect> : null}
                      <path d={s.d}></path>
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Right Column: WhatsApp & Submit */}
            <div className="flex flex-col items-center gap-8">
              <a
                href="https://wa.me/447922390123"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-[#d4b06a] via-[#c5a059] to-[#8b6b3f] w-full py-4 px-6 rounded-full flex items-center justify-center gap-4 text-[#012015] shadow-[0_10px_20px_rgba(139,107,63,0.25)] cursor-pointer transition-transform duration-300 hover:scale-102 no-underline decoration-transparent"
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.396.015 12.035c0 2.123.554 4.197 1.604 6.046L0 24l6.105-1.602a11.832 11.832 0 005.937 1.594h.005c6.635 0 12.031-5.397 12.034-12.037a11.83 11.83 0 00-3.527-8.515z"></path>
                </svg>
                <span className="text-[1.35rem] font-bold tracking-widest font-sans">
                  WhatsApp
                </span>
              </a>

              <Link to="/enquiry" className="w-full no-underline">
                <div className="bg-[#012015] w-full py-4 px-6 rounded-full border-[4px] border-[#cfab65] flex items-center justify-center text-[#C5A059] cursor-pointer transition-all duration-300 hover:bg-[#cfab65] hover:text-[#012015] hover:border-[#012015] shadow-[0_5px_15px_rgba(0,0,0,0.2)]">
                  <span className="font-['GiambattistaVsPetit',serif] text-[1.15rem] font-bold tracking-[0.2em] uppercase">
                    SUBMIT ENQUIRY
                  </span>
                </div>
              </Link>


            </div>

          </div>

        </div>
        {/* MOVED INSIDE THE MAX-WIDTH WRAPPER BUT OUTSIDE THE PADDED CARD FOR FULL WIDTH ALIGNMENT */}
        <div className="w-full bg-[#011a11] py-4 relative z-10 border-x border-b border-[#C5A059]/20 flex justify-center text-center px-4 rounded-b-[2px]">
          <span className="text-white font-['Poppins',sans-serif] text-[0.7rem] sm:text-[0.8rem] md:text-[0.95rem] font-medium tracking-[0.08em] opacity-90 leading-snug">
            Limited Dates Available For 2026-2027 Weddings
          </span>
        </div>
      </div>

    </section>
  );
};

export default HomeContact;
