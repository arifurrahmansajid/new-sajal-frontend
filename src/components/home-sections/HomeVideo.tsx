import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { API } from '../../config';
import updateImg from '../../assets/background.png';
import mobileBackground from '../../assets/background image mobile.png';
import { FaPlay, FaPause } from 'react-icons/fa';

const HomeVideo: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await fetch(`${API}/settings/homeVideo`);
        if (res.ok) {
          const data = await res.json();
          setVideoUrl(data.value || '');
        }
      } catch (err) {
        console.error('Failed to fetch video:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchVideo();
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const getEmbedUrl = (url: string) => {
    if (!url) return '';

    // Check if it's our internal video route
    if (url.includes('/api/settings/video/')) {
      return url.startsWith('http') ? url : `${API.replace('/api', '')}${url}`;
    }

    // Check for YouTube
    const ytMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/);
    if (ytMatch) {
      return `https://www.youtube.com/embed/${ytMatch[1]}`;
    }

    // Check for Vimeo
    const vimeoMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:vimeo\.com)\/(.+)/);
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }

    return url;
  };

  if (loading || !videoUrl) return null;

  const isInternalVideo = videoUrl.includes('/api/settings/video/');
  const finalUrl = getEmbedUrl(videoUrl);

  return (
    <section className="w-full py-24 text-center relative overflow-hidden border-b-2 border-[#cfab65]">
      <picture className="absolute inset-0 z-0 pointer-events-none">
        <source media="(max-width: 639px)" srcSet={mobileBackground} />
        <img
          src={updateImg}
          alt="Video Background"
          className="w-full h-full object-cover object-center opacity-40"
        />
      </picture>

      <div className="max-w-[1000px] mx-auto px-4 relative z-10">
        <Link to="/video" className="block hover:opacity-80 transition-opacity">
          <h2 className="text-[#013220] font-['GiambattistaVsPetit',serif] text-[1.8rem] sm:text-[2.5rem] md:text-[3.2rem] font-bold tracking-[0.14em] mb-3 uppercase text-balance">
            FULL CINEMATIC TRAILERS
          </h2>
        </Link>
        <p className="text-[#013220] font-['Poppins',sans-serif] text-[0.85rem] md:text-[1rem] tracking-[0.1em] mb-12 opacity-90 uppercase font-medium">
          A Glimpse Into Stories We've Crafted
        </p>

        <div 
          className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl border-8 border-white/30 backdrop-blur-sm bg-black group cursor-pointer"
          onClick={isInternalVideo ? togglePlay : undefined}
        >
          {isInternalVideo ? (
            <>
              <video
                ref={videoRef}
                src={finalUrl}
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />
              {/* Modern Overlay with Play/Pause button */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                 <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white scale-90 group-hover:scale-100 transition-transform duration-300">
                    {isPlaying ? <FaPause size={24} /> : <FaPlay size={24} className="ml-1" />}
                 </div>
              </div>
            </>
          ) : (
            <iframe
              src={`${finalUrl}${finalUrl.includes('?') ? '&' : '?'}autoplay=1&mute=1&loop=1&controls=0&playlist=${finalUrl.split('/').pop()?.split('?')[0]}`}
              className="absolute inset-0 w-full h-full"
              title="Featured Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          )}
        </div>

        <div className="mt-10 md:mt-14 flex justify-center">
          <Link 
            to="/video" 
            className="px-10 py-3.5 rounded-full border-[3px] border-[#013220] bg-transparent text-[#013220] font-['GiambattistaVsPetit',serif] text-[0.8rem] sm:text-[0.9rem] font-bold tracking-[0.18em] uppercase hover:bg-[#013220] hover:text-white transition-all duration-500 shadow-md hover:shadow-xl transform hover:-translate-y-1"
          >
            Full Cinematic Trailers
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeVideo;
