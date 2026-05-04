import React from 'react';
import { Link } from 'react-router-dom';
import homeHero from '../../assets/Homebanner.png';
import homeHeroMobile from '../../assets/Mobile banner images.png';

const HomeHero: React.FC = () => {
  return (
    <section className="relative w-full h-[450px] sm:h-[650px] md:h-[600px] lg:h-[calc(100vw*656/1577)] lg:min-h-[700px] max-h-[850px] overflow-hidden flex flex-col items-center justify-center text-center text-white bg-black">
      
      {/* IMAGE FIX: 
          - Changed mobile height to 450px (zooms out slightly by reducing vertical stretch)
          - Changed object-position to 'center' for mobile (object-top on mobile often zooms too much on hair)
          - Added 'scale-100' to ensure no browser-level zooming
      */}
      <picture className="absolute inset-0 z-0">
        <source media="(max-width: 639px)" srcSet={homeHeroMobile} />
        <img
          src={homeHero}
          alt="Celebration Hero"
          className="w-full h-full object-cover object-center sm:object-top scale-100"
        />
      </picture>
      
      {/* Slightly heavier overlay for mobile readability */}
      <div className="absolute inset-0 bg-black/45 z-10" />

      {/* Content Container */}
      <div className="relative z-20 px-6 max-w-7xl mx-auto flex flex-col items-center">

        {/* Main Heading - Adjusted mobile font size and spacing */}
        <div className="mb-4 sm:mb-6">
          <h1
            className="text-white text-[1.75rem] leading-[1.1] sm:text-4xl md:text-5xl lg:text-[3.8rem] font-bold tracking-[0.02em] drop-shadow-[0_4px_15px_rgba(0,0,0,0.6)] text-balance"
            style={{
              fontFamily: "'GiambattistaVsPetit', serif",
              textTransform: 'uppercase'
            }}
          >
            Your Celebration, Told Like A Film... <br className="hidden sm:block" />Not Just Captured
          </h1>
        </div>

        {/* Subtext - Reduced gap and tweaked mobile font size */}
        <div className="flex flex-col items-center gap-1 mb-10 sm:mb-14">
          <p 
            className="text-[1rem] sm:text-[1.8rem] md:text-[2.1rem] lg:text-[2.35rem] tracking-[0.1em] font-bold uppercase bg-gradient-to-b from-[#f4e0a1] via-[#c4a468] to-[#8b6b3f] bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] leading-tight text-balance text-center"
            style={{ fontFamily: "'GiambattistaVsPetit', serif" }}
          >
            Limited 2026 Dates Remaining
          </p>
          <p 
            className="text-[1rem] sm:text-[1.8rem] md:text-[2.1rem] lg:text-[2.35rem] tracking-[0.1em] font-bold uppercase bg-gradient-to-b from-[#f4e0a1] via-[#c4a468] to-[#8b6b3f] bg-clip-text text-transparent drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] leading-tight text-balance text-center"
            style={{ fontFamily: "'GiambattistaVsPetit', serif" }}
          >
            Enquire Now To Secure Your Date
          </p>
        </div>

        {/* Buttons - Stacked on mobile for better UI, horizontal on desktop */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center w-full max-w-[300px] sm:max-w-none">
          <Link to="/enquiry" className="w-full sm:w-auto min-w-[240px] px-8 py-3 rounded-full border-[3px] border-white bg-black/40 backdrop-blur-[3px] uppercase text-[0.75rem] sm:text-[0.85rem] font-light tracking-[0.18em] text-white hover:bg-white hover:text-[#011a11] transition-all duration-500 inline-flex justify-center items-center text-center">
            Check Availability
          </Link>

          <Link to="/about" className="w-full sm:w-auto min-w-[240px] px-8 py-3 rounded-full border-[3px] border-[#c4a468] bg-black/40 backdrop-blur-[3px] uppercase text-[0.75rem] sm:text-[0.85rem] font-light tracking-[0.18em] text-[#c4a468] hover:bg-[#c4a468] hover:text-white transition-all duration-500 inline-flex justify-center items-center text-center">
            About Us
          </Link>
        </div>
      </div>

      {/* Stronger bottom fade to blend into the next section */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/80 to-transparent z-10" />
    </section>
  );
};

export default HomeHero;