import React from 'react';
import VideoHero from '../components/video-sections/videoHero';

import AboutWhyUs from '../components/about-sections/AboutWhyUs';
import AboutServices from '../components/about-sections/AboutServices';
import AboutContact from '../components/about-sections/AboutContact';
import VideoVideo from '../components/video-sections/videovideo';

const Video: React.FC = () => {
  return (
    <div className="w-full font-serif">
      <VideoHero />
      <VideoVideo />
      <AboutServices />
      <AboutWhyUs />
      <AboutContact />
    </div>
  );
};

export default Video;
