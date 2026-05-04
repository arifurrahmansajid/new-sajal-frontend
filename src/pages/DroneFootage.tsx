import React from 'react';
import DroneHero from '../components/drone-sections/DroneHero';
import DroneIntro from '../components/drone-sections/DroneIntro';
import AboutWhyUs from '../components/about-sections/AboutWhyUs';
import AboutContact from '../components/about-sections/AboutContact';

const DroneFootage: React.FC = () => {
  return (
    <div className="w-full">
      <DroneHero />
      <DroneIntro />
      <AboutWhyUs />
      <AboutContact />
    </div>
  );
};

export default DroneFootage;
