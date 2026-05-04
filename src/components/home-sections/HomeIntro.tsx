import React from 'react';
import updateImg from '../../assets/update.png';

const HomeIntro: React.FC = () => {
  return (
    <section
      className="w-full py-16 md:py-24 bg-cover bg-center bg-no-repeat border-y-[1px] border-[#E9D09A]/30 relative overflow-hidden"
      style={{
        backgroundImage: `url(${updateImg})`,
      }}
    >
      {/* Cinematic Dark Overlay */}
      {/* <div className="absolute inset-0 bg-black/60 z-0" /> */}

      {/* Main Content Container */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 relative z-10 flex flex-col items-center text-center">
        
        {/* Top Title - Silky Pale Gold */}
        <h2
  className="text-[1.5rem] sm:text-[2rem] md:text-[2.6rem] lg:text-[3.3rem] font-bold tracking-[0.14em] leading-tight mb-4 text-balance px-4"
  style={{
    fontFamily: "'GiambattistaVsPetit', serif",
    background: "linear-gradient(180deg, #E8C96A 0%, #C08B20 50%, #E8C96A 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text"
  }}
>
  WE DON'T JUST FILM WEDDINGS.
</h2>

        {/* Gold Horizontal Line - Wider as seen in image */}
        <div className="w-full max-w-[90%] md:max-w-[1000px] h-[1.8px] bg-[#E9D09A] mb-8 md:mb-10 shadow-[0_1px_3px_rgba(0,0,0,0.3)]" />

        {/* Bottom Message - Focused White Typography */}
        <p
          className="text-white text-lg sm:text-2xl md:text-3xl lg:text-[2.2rem] 
                     font-bold tracking-[0.08em] leading-[1.3] max-w-[1100px] uppercase text-balance"
          style={{ fontFamily: "'GiambattistaVsPetit', serif" }}
        >
          WE CREATE CINEMATIC STORIES YOU'LL{' '}
          <br className="hidden md:block" />
          RELIVE FOR A LIFETIME.
        </p>
      </div>
    </section>
  );
};

export default HomeIntro;
