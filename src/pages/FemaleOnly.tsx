import React from 'react';
import FemaleOnlyHero from '../components/female-only/FemaleOnlyHero';
import FemaleOnlyIntro from '../components/female-only/FemaleOnlyIntro';
import AboutWhyUs from '../components/about-sections/AboutWhyUs';
import AboutContact from '../components/about-sections/AboutContact';

const FemaleOnly: React.FC = () => {
  return (
    <div className="w-full">
      <FemaleOnlyHero />
      <FemaleOnlyIntro />
      <AboutWhyUs />
      <AboutContact />
    </div>
  );
};

export default FemaleOnly;
