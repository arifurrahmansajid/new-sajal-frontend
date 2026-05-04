import React from 'react';

const Services: React.FC = () => {
  return (
    <section className="w-full py-16 md:py-24 pb-[80px] md:pb-[120px] text-white bg-cover bg-center relative overflow-hidden" style={{ backgroundImage: `linear-gradient(rgba(0, 31, 22, 0.4), rgba(0, 31, 22, 0.4)), url('/header-bg.png')` }}>
      <div className="max-w-[1400px] mx-auto px-6 sm:px-10 relative z-10">
        <h1 className="text-center text-[2.2rem] sm:text-[3rem] md:text-[3.6rem] tracking-[0.14em] mb-10 md:mb-[80px] font-bold font-['GiambattistaVsPetit',serif] text-white text-balance">
          OUR SERVICES
        </h1>
        <div className="text-center">
          <p className="text-[1.2rem] leading-[1.8] text-white/95 font-['Poppins',sans-serif] max-w-4xl mx-auto">
            Discover our comprehensive range of photography and videography services tailored to capture your most precious moments.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
