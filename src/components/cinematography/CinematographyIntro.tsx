import React from 'react';
import introImg from '../../assets/Cinematographyimages.png';

const CinematographyIntro: React.FC = () => {
  return (
    <section className="bg-white w-full py-20 md:py-32">
      <div className="max-w-[1150px] mx-auto px-10 md:px-24 font-['Poppins',sans-serif]">

        {/* Top Split Section */}
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start mb-16">
          {/* Image */}
          <div className="w-full md:w-[40%] shrink-0">
            <img
              src={introImg}
              alt="Cinematic storytelling"
              className="w-full aspect-[4/5] object-cover"
            />
          </div>

          {/* Intro Text */}
          <div className="w-full md:w-[60%] space-y-6 text-[#2c2c2c] text-[0.95rem] md:text-[1.05rem] leading-[1.9] tracking-wide">
            <p className="font-bold text-[1.125rem] md:text-[1.325rem] leading-[1.65] text-[#1a1a1a]">
              At Envision Media, we specialise in capturing the magic of your special moments with a distinctive cinematic touch.
            </p>
            <p>
              Our approach to filming your special day goes beyond simply recording the event; it's about storytelling through the lens.
            </p>
            <p>
              Our unique style is characterised by a blend of artistry, technical precision, and a keen eye for bdetail. We believe that every event has its own narrative, and we're here to bring that narrative to life through the power of film. Whether it's a wedding, corporate event, anniversary celebration, or any other special occasion, we're dedicated to crafting a visual masterpiece that will leave you with lasting memories to cherish.
            </p>
          </div>
        </div>

        {/* Features List Section */}
        <div className="mb-12">
          <h3 className="font-bold text-[1.125rem] md:text-[1.325rem] leading-[1.65] text-[#1a1a1a] mb-8 tracking-wide">
            Our cinematography style is marked by:
          </h3>
          <ul className="space-y-6">
            {[
              { title: "Cinematic Excellence", desc: "We employ the latest in film equipment and techniques to create cinematic masterpieces that look and feel like scenes from a movie." },
              { title: "Emotional Depth", desc: "We focus on capturing genuine emotions, candid moments, and the little details that make your event unique. Our films are designed to tug at your heartstrings and transport you back to that special day." },
              { title: "Artistic Flair", desc: "We infuse creativity and artistry into every frame, using lighting, composition, and editing to create stunning visual compositions." },
              { title: "Professionalism", desc: "Our team of experienced cinematographers and editors ensures a seamless and hassle-free experience for you and your guests. We take pride in our professionalism and commitment to delivering exceptional results." },
              { title: "Customisation", desc: "We understand that each event is one-of-a-kind. That's why we work closely with you to understand your vision and preferences, ensuring that your film reflects your unique style and personality." },
              { title: "Storytelling", desc: "Our films are not just a sequence of shots; they are narratives that unfold with a sense of pacing and emotion, making your event come to life on screen." }
            ].map((item, index) => (
              <li key={index} className="flex gap-4 items-start">
                 <span 
                  className="shrink-0 flex items-center justify-center w-[34px] h-[34px] rounded-full text-[#C5A059] font-bold text-base mt-1 shadow-[inset_0_2px_4px_rgba(255,255,255,0.1),0_4px_8px_rgba(0,0,0,0.3)]"
                  style={{
                    background: 'radial-gradient(circle at 35% 35%, #014d34 0%, #013220 50%, #001a11 100%)',
                    fontFamily: "'GiambattistaVsPetit', serif"
                  }}
                >
                  {index + 1}
                </span>
                <p className="text-[0.95rem] md:text-[1.05rem] leading-[1.9] tracking-wide text-[#2c2c2c] mt-0.5">
                  <strong className="text-[#111]">{item.title}:</strong> {item.desc}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Conclusion Paragraphs */}
        <div className="space-y-6 text-[#2c2c2c] text-[0.95rem] md:text-[1.05rem] leading-[1.9] tracking-wide">
          <p>
            We are passionate about preserving your special moments in a way that transcends traditional event videography. Explore our portfolio to see examples of our work, and get in touch to discuss how we can turn your event into a timeless masterpiece.
          </p>
          <p className="font-bold text-[1.05rem] md:text-[1.2rem] leading-[1.6] text-[#111111]">
            Let us be your storytellers, capturing the essence and emotion of your event, one frame at a time.
          </p>
        </div>

      </div>
    </section>
  );
};

export default CinematographyIntro;
