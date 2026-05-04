import React, { useEffect } from 'react';
import PhotographyHero from '../components/photography/PhotographyHero';
import PhotographyIntro from '../components/photography/PhotographyIntro';
import AboutWhyUs from '../components/about-sections/AboutWhyUs';
import AboutContact from '../components/about-sections/AboutContact';

const Photography: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full font-serif overflow-hidden">
      <PhotographyHero />
      <PhotographyIntro />
      <AboutWhyUs />
      <AboutContact />
    </div>
  );
};

export default Photography;
