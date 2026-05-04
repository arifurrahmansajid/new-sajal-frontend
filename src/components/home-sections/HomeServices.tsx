import React from 'react';
import { Link } from 'react-router-dom';
import background from '../../assets/background.png';
import mobileBackground from '../../assets/background image mobile.png';
import updateImg from '../../assets/update.png';
import photoImg from '../../assets/card1.png';
import cinemaImg from '../../assets/card2.png';
import droneImg from '../../assets/card3.png';
import femaleImg from '../../assets/card4.png';

const HomeServices: React.FC = () => {
  const services = [
    {
      id: 'photography',
      label: 'PHOTOGRAPHY',
      path: '/photography',
      subLabel: null,
      image: photoImg,
    },
    {
      id: 'cinematography',
      label: 'CINEMATOGRAPHY',
      path: '/cinematography',
      subLabel: null,
      image: cinemaImg,
    },
    {
      id: 'drone-footage',
      label: 'DRONE FOOTAGE',
      path: '/drone-footage',
      subLabel: null,
      image: droneImg,
    },
    {
      id: 'female-only',
      label: 'FEMALE ONLY',
      path: '/female-only',
      subLabel: '(On Request)',
      image: femaleImg,
    },
  ];

  return (
    <section 
      className="w-full py-24 relative overflow-hidden"
    >
      <picture className="absolute inset-0 z-0 pointer-events-none">
          <source media="(max-width: 639px)" srcSet={mobileBackground} />
          <img
            src={background}
            alt="Services Background"
            className="w-full h-full object-cover object-center"
          />
      </picture>
      
      {/* White Overlay - Reduced opacity for more texture depth */}
      <div className="absolute inset-0 bg-white/60 z-0 hidden sm:block" />

      {/* Texture Overlays */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(26,65,50,0.06)_0%,transparent_70%)] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-1" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(26,65,50,0.06)_0%,transparent_70%)] translate-x-1/3 translate-y-1/3 pointer-events-none z-1" />

      <div className="text-center mb-16 relative z-10 font-['GiambattistaVsPetit',serif]">
        <h2 className="text-[2.6rem] font-bold tracking-[0.12em] text-[#1a4132] mb-3">
          OUR SERVICES
        </h2>
        <p className="text-[#1a4132] font-['Poppins',sans-serif] text-[0.85rem] font-medium tracking-[0.1em] max-w-2xl mx-auto px-6">
          Luxury or intimate events media across London & Beyond.
        </p>
      </div>

      <div className="max-w-[1240px] mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        {services.map((service) => (
          <Link
            key={service.id}
            to={service.path}
            className="flex flex-col h-full shadow-lg overflow-hidden group border border-[#C5A059]/10"
          >
            {/* Image Area */}
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={service.image}
                alt={service.label}
                className="w-full h-full object-cover object-center block transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            
            {/* Text Area with update.png background and Gold Frame */}
            <div 
              className="relative py-8 px-4 flex-grow flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${updateImg})` }}
            >
              {/* Gold Inner Frame */}
              <div className="relative w-full border-[1.5px] border-[#C5A059] py-5 px-2 text-center z-10">
                <span className="text-white text-[1rem] md:text-[1.1rem] font-bold tracking-[0.15em] uppercase block leading-[1.2] font-['GiambattistaVsPetit',serif]">
                  {service.label}
                </span>
                {service.subLabel && (
                  <span className="text-white/90 text-[0.65rem] font-medium tracking-widest block mt-1 uppercase font-['Poppins',sans-serif]">
                    {service.subLabel}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default HomeServices;
