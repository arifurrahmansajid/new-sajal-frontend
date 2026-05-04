import React from 'react';
import middleImg from '../../assets/Home 2.png';
import marbleBg from '../../assets/YOUR STORY.png';

const HomeQuote: React.FC = () => {
  return (
    <div className="w-full">
      {/* Middle Banner - High impact cinematic message */}
      <section className="relative w-full h-[360px] sm:h-[450px] md:h-[650px] overflow-hidden flex items-center justify-center text-center">
        <img 
          src={middleImg} 
          alt="Envision Moment" 
          className="absolute inset-0 w-full h-full object-cover z-0" 
        />
        {/* Subtle Dark Overlay */}
        <div className="absolute inset-0 bg-black/35 z-10" />
        <div className="relative z-20 px-6 sm:px-10 max-w-7xl mx-auto">
          <h2 
            className="text-white text-[1.75rem] sm:text-[2.6rem] md:text-[3.4rem] lg:text-[3.85rem] font-light tracking-[0.02em] leading-[1.15] uppercase drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] px-4"
            style={{ fontFamily: "'GiambattistaVsPetit', serif" }}
          >
            ENVISION WHERE EVERY<br className="hidden sm:block" />
            <span className="">FRAME TELLS A STORY AND EVERY</span><br className="hidden sm:block" />
            CLICK FREEZES TIME
          </h2>
        </div>
      </section>

      {/* Values Section - Elite Branding */}
      <section 
        className="w-full py-16 md:py-28 bg-cover bg-center border-y-[1px] border-[#E9D09A]/30 relative overflow-hidden text-center"
        style={{ backgroundImage: `url(${marbleBg})` }}
      >
        {/* Cinematic Dark Overlay */}
        {/* <div className="absolute inset-0 bg-black/60 z-0" /> */}

        <div className="max-w-[1400px] mx-auto px-6 md:px-10 relative z-10 flex flex-col items-center">
          {/* Silk Gold Heading */}
         <h2 
  className="text-[1.6rem] sm:text-[2.4rem] md:text-[3.2rem] lg:text-[4.2rem] font-bold tracking-[0.14em] leading-[1.1] mb-6 md:mb-8 uppercase transition-all duration-300 px-4 text-balance"
  style={{ 
    fontFamily: "'GiambattistaVsPetit', serif",
    background: "linear-gradient(180deg, #E8C96A 0%, #C08B20 50%, #E8C96A 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text"
  }}
>
  YOUR STORY DESERVES MORE <br className="hidden sm:block" />THAN COVERAGE.
</h2>
          
          {/* Panoramic Gold Divider */}
          <div className="w-[85%] md:w-[1050px] h-[1.5px] bg-[#E9D09A] mb-10 md:mb-12 shadow-[0_1px_3px_rgba(0,0,0,0.3)] opacity-90" />
          
          {/* White Cinematic Details */}
          <p 
            className="text-white text-[1rem] sm:text-[1.6rem] md:text-[2.1rem] lg:text-[2.35rem] font-bold tracking-[0.05em] leading-[1.4] max-w-[1200px] uppercase text-balance px-4"
            style={{ fontFamily: "'GiambattistaVsPetit', serif" }}
          >
            WE CRAFT EVERY FRAME WITH INTENTION...<br className="hidden sm:block" />
            CAPTURING EMOTION, CULTURE AND THE<br className="hidden sm:block" />
            MOMENTS THAT MATTER MOST.
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomeQuote;
