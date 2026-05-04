import React from 'react';
import AboutHero from '../components/about-sections/AboutHero';
import AboutIntroduction from '../components/about-sections/AboutIntroduction';
import AboutWhyUs from '../components/about-sections/AboutWhyUs';
import AboutServices from '../components/about-sections/AboutServices';
import AboutContact from '../components/about-sections/AboutContact';

const About: React.FC = () => {
  return (
    <div className="w-full font-serif">
      <AboutHero />
      <AboutIntroduction />
      <AboutServices />
      <AboutWhyUs />
      <AboutContact />
    </div>
  );
};

export default About;
