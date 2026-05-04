import React, { useEffect } from 'react';
import HomeHero from '../components/home-sections/HomeHero';
import HomeIntro from '../components/home-sections/HomeIntro';
import HomeServices from '../components/home-sections/HomeServices';
import HomeQuote from '../components/home-sections/HomeQuote';
import HomePortfolio from '../components/home-sections/HomePortfolio';
import HomeVideo from '../components/home-sections/HomeVideo';
import AboutWhyUs from '../components/about-sections/AboutWhyUs';
import HomeContact from '../components/home-sections/HomeContact';
import HomeBlog from '../components/home-sections/HomeBlog';

const Home: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full font-serif overflow-hidden">
      <HomeHero />
      <HomeIntro />
      <HomeServices />
      <HomeQuote />
      <HomePortfolio />
      <HomeVideo />
      <AboutWhyUs />
      <HomeBlog />
      <HomeContact />
    </div>
  );
};

export default Home;
