import React from 'react';
import VideoHeroImg from '../../assets/PHOTOGRAPHYhero.png';

const VideoHero: React.FC = () => {
  return (
    <section className="relative w-full overflow-hidden border-y-[3px] border-[#8B7344]">
      {/* Background Image */}
      <img
        src={VideoHeroImg}
        alt="Video hero"
        className="w-full h-[220px] sm:h-[300px] md:h-[400px] object-cover object-center block"
      />

      {/* Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20" />

      {/* Text Container */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <h1
          className="text-white text-[2.5rem] sm:text-5xl md:text-[5.5rem] font-light uppercase m-0 tracking-[0.05em] text-center text-balance"
          style={{
            fontFamily: "'GiambattistaVsPetit', serif",
            fontWeight: 300
          }}
        >
          CINEMATIC TRAILERS
        </h1>
      </div>

      {/* Top Gold Line Detail */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-white/20" />
    </section>
  );
};

export default VideoHero;
