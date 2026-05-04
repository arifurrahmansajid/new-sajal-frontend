import React from 'react';
import drone from '../../assets/Picsart-AiImageEnhancer.png';

const DroneIntro: React.FC = () => {
  return (
     <section className="bg-white w-full py-20 md:py-32">
      <div className="max-w-[1150px] mx-auto px-10 md:px-24 font-['Poppins',sans-serif]">

        {/* Top Split Section */}
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start mb-16">
          {/* Image */}
          <div className="w-full md:w-[28%] shrink-0 flex justify-center md:justify-start">
            <img
              src={drone}
              alt="DJI Drone"
              className="w-[220px] md:w-full h-auto object-contain"
            />
          </div>

          {/* Intro Text */}
          <div className="w-full md:w-[72%] space-y-6 text-[#2c2c2c] text-[0.95rem] md:text-[1.05rem] leading-[1.9] tracking-wide">
            <p className="font-bold text-[1.125rem] md:text-[1.325rem] leading-[1.65] text-[#1a1a1a]">
              At Envision Media , we elevate your event to new heights with the cutting-edge technology and creativity using DJI drones.
            </p>
            <p>
               Our unique drone video style offers a fresh perspective, capturing stunning aerial views that add an extra dimension to your event memories.
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
              { title: "Aerial Elegance", desc: "We harness the power of DJI drones to capture breathtaking aerial shots that showcase the scale and grandeur of your event. From sweeping panoramic views to dynamic overhead angles, our drone footage adds a touch of cinematic magic." },
              { title: "Unique Perspectives", desc: "Our drones can reach vantage points that traditional video simply cannot, providing you with unique angles and views that make your event stand out." },
              { title: "Dynamic Motion", desc: "We excel in capturing dynamic shots that showcase the energy and movement of your event, whether it's a lively dance floor, a bustling crowd, or an outdoor celebration." },
              { title: "Technical Precision", desc: "Our skilled drone operators are trained to navigate DJI drones with precision, ensuring that every shot is stable, clear, and visually captivating." },
              { title: "Versatility", desc: "From weddings and outdoor parties to corporate events and scenic landscapes, our DJI drones can be tailored to suit a wide range of occasions and settings." },
              { title: "Safety First", desc: "We prioritise safety in all our drone operations, adhering to all regulations and guidelines to ensure a secure and stress-free experience for you and your guests." },
              { title: "Customised Creativity", desc: "We work closely with you to understand your vision and event goals, incorporating drones seamlessly into your overall package." }
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
          Experience the excitement and wonder of your event from a bird's-eye view with our DJI drone videography. Explore our portfolio to witness the magic we can create from the skies above.
          </p>
          <p className="font-bold text-[1.05rem] md:text-[1.2rem] leading-[1.6] text-[#111111]">
            Let us take your event to new heights, capturing the moments and landscapes that make your occasion truly unforgettable.
          </p>
        </div>

      </div>
    </section>
  );
};

export default DroneIntro;
