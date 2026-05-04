import React from 'react';
import { Link } from 'react-router-dom';
import updateImg from '../../assets/background.png';
import mobileBackground from '../../assets/background image mobile.png';
import p1 from '../../assets/pot1.png';
// import p2 from '../../assets/pot2.png';
// import p3 from '../../assets/pot3.png';
// import p4 from '../../assets/pot4.png';
import p5 from '../../assets/pot5.png';
import p6 from '../../assets/portfolio9.png';

const HomePortfolio: React.FC = () => {
  const images = [p1, p5, p6];

  return (
    <section 
      className="w-full py-24 text-center relative overflow-hidden border-b-2 border-[#cfab65]"
    >
      <picture className="absolute inset-0 z-0 pointer-events-none">
          <source media="(max-width: 639px)" srcSet={mobileBackground} />
          <img
            src={updateImg}
            alt="Portfolio Background"
            className="w-full h-full object-cover object-center"
          />
      </picture>
  
      {/* White Overlay - Reduced opacity for more texture depth */}
      <div className="absolute inset-0 bg-white/60 z-0 hidden sm:block" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-10 relative z-10">
        <h2 className="text-[#013220] font-['GiambattistaVsPetit',serif] text-[1.8rem] sm:text-[2.5rem] md:text-[3.2rem] font-bold tracking-[0.14em] mb-3 uppercase px-4 text-balance">
          PHOTOGRAPHY
        </h2>
        <p className="text-[#013220] font-['Poppins',sans-serif] text-[0.85rem] md:text-[1rem] tracking-[0.1em] mb-14 opacity-90 max-w-2xl mx-auto uppercase font-medium">
          A glimpse into real moments we've captured
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 px-4">
          {images.map((img, idx) => (
            <div 
              key={idx} 
              className="bg-white p-2 shadow-[0_8px_25px_rgba(0,0,0,0.06)] border-[1px] border-gray-100 transition-all duration-300 hover:shadow-[0_15px_40px_rgba(0,0,0,0.1)] hover:-translate-y-1"
            >
              <div className="h-[280px] overflow-hidden rounded-[1px]">
                <img 
                  src={img} 
                  alt={`Portfolio ${idx + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-500 cursor-pointer"
                />
              </div>
            </div>
          ))}
        </div>

        <Link 
          to="/portfolio"
          className="inline-block px-14 py-4 rounded-full border-[1.5px] border-[#013220] text-[#013220] font-['GiambattistaVsPetit',serif] text-[0.85rem] font-bold tracking-[0.25em] uppercase hover:bg-[#013220] hover:text-white transition-all duration-300 shadow-md relative z-10"
        >
          FULL PHOTOGRAPHY
        </Link>
      </div>
    </section>
  );
};

export default HomePortfolio;
