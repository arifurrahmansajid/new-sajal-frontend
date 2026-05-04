import React from 'react';
import PortfolioBg from '../assets/Portfolio.png';
import AboutWhyUs from '../components/about-sections/AboutWhyUs';
import AboutContact from '../components/about-sections/AboutContact';
import HomeVideo from '../components/home-sections/HomeVideo';

const imageCount = 34;
const images = Array.from({ length: imageCount }, (_, index) => `/portfolio${index + 1}.png`).filter(src => src !== '/portfolio25.png');

const Portfolio: React.FC = () => {
  return (
    <main className="w-full bg-[#ffffff] text-[#0d0d0d]">
      {/* <section
        className="w-full py-24 pb-[120px] text-white bg-cover bg-center relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0.35)), url(${PortfolioBg})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 relative z-10">
          <h1 className="text-center text-[3.6rem] tracking-[0.14em] mb-[80px] font-bold font-['GiambattistaVsPetit',serif] text-white">
            PORTFOLIO
          </h1>
        </div>
      </section> */}

      <section className="relative w-full overflow-hidden border-y-[3px] border-[#8B7344]">
        {/* Background Image */}
        <img
          src={PortfolioBg}
          alt="Female Only services hero"
          className="w-full h-[220px] sm:h-[300px] md:h-[400px] object-cover object-center block"
        />

        {/* Subtle Gradient Overlay to make text pop without washing out colors */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20" />

        {/* Text Container */}
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <h1
            className="text-white text-[2.5rem] sm:text-5xl md:text-[5.5rem] font-light uppercase m-0 text-center text-balance"
            style={{
              fontFamily: "'GiambattistaVsPetit', serif",
              fontWeight: 300
            }}
          >
            PHOTOGRAPHY
          </h1>
        </div>

        <div className="absolute top-0 left-0 w-full h-[1px] bg-white/20" />
      </section>

      <section className="max-w-[1200px] mx-auto px-6 lg:px-10 pt-16 md:pt-24 pb-24">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-1 md:gap-2">
          {images.map((src, idx) => {
            const pattern = [
              'md:col-span-4', 'md:col-span-4', 'md:col-span-4',
              'md:col-span-5', 'md:col-span-7',
              'md:col-span-6', 'md:col-span-6',
              'md:col-span-4', 'md:col-span-8',
              'md:col-span-6', 'md:col-span-6',
              'md:col-span-7', 'md:col-span-5',
            ];
            const colSpan = pattern[idx % pattern.length];
            return (
              <div key={src} className={`overflow-hidden relative h-[250px] md:h-[320px] ${colSpan}`}>
                <img
                  src={src}
                  alt={`Portfolio ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out hover:scale-105 cursor-pointer"
                />
              </div>
            );
          })}
        </div>
      </section>

      <HomeVideo />
      <AboutWhyUs />
      <AboutContact />
    </main>
  );
};

export default Portfolio;
