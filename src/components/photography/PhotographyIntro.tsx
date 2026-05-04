import React from 'react';
import introImg from '../../assets/PHOTOGRAPHY.png';

const PhotographyIntro: React.FC = () => {
  const points = [
    {
      title: "Authentic Moments",
      desc: "We specialise in candid photography, capturing genuine emotions, spontaneous interactions, and unscripted moments that make your event unique."
    },
    {
      title: "Creative Composition",
      desc: "Our photographers have an artist's eye for composition and lighting, ensuring that each photograph is not just a snapshot but a work of art."
    },
    {
      title: "Attention to Detail",
      desc: "We believe that it's the little details that make an event memorable. From the intricate decorations to the subtle expressions, we make sure nothing escapes our lens."
    },
    {
      title: "Vibrant Colours",
      desc: "Our images burst with vibrant, true-to-life colours, creating a visual feast that brings your event to life."
    },
    {
      title: "Professionalism",
      desc: "Our team of skilled photographers are not only passionate about their craft but also dedicated to delivering a professional and stress-free experience for you and your guests."
    },
    {
      title: "Client-Centric Approach",
      desc: "We understand that each event is unique, and our photography is tailored to your specific vision and preferences. We work closely with you to ensure your photos reflect your personality and style."
    },
    {
      title: "Timeless Memories",
      desc: "Our goal is to provide you with photographs that transport you back to your event, evoking the same emotions and excitement you felt on that special day."
    }
  ];

  return (
    <section className="bg-white w-full py-20 md:py-32">
      <div className="max-w-[1150px] mx-auto px-10 md:px-24 font-['Poppins',sans-serif]">
        
        {/* Intro Text */}
        <div className="space-y-6 text-[#2c2c2c] text-[0.95rem] md:text-[1.05rem] leading-[1.8] tracking-wide mb-16">
          <p className="font-bold text-[1.05rem] md:text-[1.2rem] text-[#1a1a1a]">
            At Envision Media , we pride ourselves on capturing the essence and emotion of your special occasions through the art of photography.
          </p>
          <p>
            Our distinctive photography style is all about turning your moments into visual stories that you'll treasure for a lifetime.
          </p>
          <p className="font-bold text-[#1a1a1a]">
            Our event photography style is characterised by:
          </p>
        </div>

        {/* Numbered List */}
        <div className="mb-20">
          <ul className="space-y-8">
            {points.map((item, index) => (
              <li key={index} className="flex gap-5 items-start">
                <span 
                  className="shrink-0 flex items-center justify-center w-[36px] h-[36px] rounded-full text-[#C5A059] font-bold text-lg mt-0.5 shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_4px_8px_rgba(0,0,0,0.3)]"
                  style={{
                    background: 'radial-gradient(circle at 35% 35%, #014d34 0%, #013220 50%, #001a11 100%)',
                    fontFamily: "'GiambattistaVsPetit', serif"
                  }}
                >
                  {index + 1}
                </span>
                <p className="text-[0.95rem] md:text-[1.05rem] leading-[1.8] tracking-wide text-[#2c2c2c]">
                  <strong className="text-[#111]">{item.title}:</strong> {item.desc}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Image & Text Bottom Split */}
        <div className="flex flex-col md:flex-row gap-10 lg:gap-14 items-center mb-16">
          {/* Image */}
          <div className="w-full md:w-[45%] shrink-0">
            <img
              src={introImg}
              alt="Photography capturing moments"
              className="w-full aspect-[4/3] object-cover shadow-lg"
            />
          </div>

          {/* Text Section */}
          <div className="w-full md:w-[55%] space-y-8 text-[#2c2c2c] text-[0.95rem] md:text-[1.05rem] leading-[1.8] tracking-wide">
            <p>
              We excel in a wide range of events, including weddings, corporate gatherings, parties, and more. Take a moment to explore our portfolio to see examples of our work and the stories we've captured.
            </p>
            <p>
              Let us be your visual storytellers, preserving the beauty, emotion, and memories of your event through the art of photography.
            </p>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center md:text-left">
          <p className="font-bold text-[1.05rem] md:text-[1.125rem] text-[#1a1a1a] leading-[1.6]">
            Contact us today to discuss how we can transform your event into a stunning collection of timeless images.
          </p>
        </div>

      </div>
    </section>
  );
};

export default PhotographyIntro;
