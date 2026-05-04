import React from 'react';
import CinematographyHero from '../components/cinematography/CinematographyHero';
import CinematographyIntro from '../components/cinematography/CinematographyIntro';
import AboutWhyUs from '../components/about-sections/AboutWhyUs';
import AboutContact from '../components/about-sections/AboutContact';

const Cinematography: React.FC = () => {

  return (
    <div className="w-full font-serif">
      <CinematographyHero />
      <CinematographyIntro />
      <AboutWhyUs />
      <AboutContact />
    </div>
  );
};

export default Cinematography;
