import React from 'react';
import background from '../../assets/background.png';
import updateImg from '../../assets/update.png';
import photoImg from '../../assets/card1.png';
import cinemaImg from '../../assets/card2.png';
import droneImg from '../../assets/card3.png';
import femaleImg from '../../assets/card4.png';

const AboutServices: React.FC = () => {
  const services = [
    {
      id: 'photography',
      label: 'PHOTOGRAPHY',
      subLabel: null,
      image: photoImg,
    },
    {
      id: 'cinematography',
      label: 'CINEMATOGRAPHY',
      subLabel: null,
      image: cinemaImg,
    },
    {
      id: 'drone-footage',
      label: 'DRONE FOOTAGE',
      subLabel: null,
      image: droneImg,
    },
    {
      id: 'female-only',
      label: 'FEMALE ONLY',
      subLabel: '(On Request)',
      image: femaleImg,
    },
  ];

  return (
    <section 
      className="w-full py-24 relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${background})` }}
    >
      {/* Texture Overlays to match the 'smoky' look in the image */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(26,65,50,0.06)_0%,transparent_70%)] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(26,65,50,0.06)_0%,transparent_70%)] translate-x-1/3 translate-y-1/3 pointer-events-none" />
      <div className="absolute top-1/4 right-[5%] w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(26,65,50,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="text-center mb-16 relative z-10 font-['GiambattistaVsPetit',serif]">
        <h2 className="text-[2.6rem] font-bold tracking-[0.1em] text-[#1a4132] mb-3">
          OUR SERVICES
        </h2>
      </div>

      <div className="max-w-[1240px] mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 relative z-10">
        {services.map((service) => (
          <div
            key={service.id}
            className="flex flex-col h-full shadow-lg overflow-hidden group"
          >
            {/* Image Area */}
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={service.image}
                alt={service.label}
                className="w-full h-full object-cover object-center block transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            
            {/* Text Area with update.png background and Gold Frame */}
            <div 
              className="relative py-8 px-4 flex-grow flex items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${updateImg})` }}
            >
              {/* Gold Inner Frame */}
              <div className="relative w-full border-[1.5px] border-[#C5A059] py-4 px-2 text-center z-10">
                <span className="text-white text-[1rem] md:text-[1.1rem] font-bold tracking-[0.15em] uppercase block leading-[1.2] font-['GiambattistaVsPetit',serif]">
                  {service.label}
                </span>
                {service.subLabel && (
                  <span className="text-white text-[0.7rem] font-medium tracking-wide block mt-1 uppercase opacity-90 font-['Poppins',sans-serif]">
                    {service.subLabel}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutServices;
