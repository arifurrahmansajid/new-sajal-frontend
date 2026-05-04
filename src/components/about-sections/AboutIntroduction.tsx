import React from 'react';

const AboutIntroduction: React.FC = () => {
  return (
    <section className="bg-white w-full py-16 md:py-32">
      <div className="max-w-[1050px] mx-auto px-6 sm:px-10 md:px-24 text-left font-['Poppins',sans-serif]">
        <h2 className="font-bold text-[1rem] md:text-[1.325rem] leading-[1.65] text-[#1a1a1a] mb-8 md:mb-12 tracking-wide text-balance">
          At Envision Media, we believe that every wedding and celebration tells a unique<br className="hidden lg:block" />
          story... A story filled with emotion, beauty, and unforgettable moments.
        </h2>

        <div className="space-y-12 font-regular text-[0.95rem] md:text-[1.05rem] leading-[1.9] text-[#2c2c2c] tracking-wide">
          <p>
            Our passion lies in capturing these moments in a way that feels natural,
            authentic and timeless. From the quiet anticipation before a ceremony to the joy
            and celebration that follows, we focus on preserving the atmosphere and
            emotions that make your day truly special.
          </p>

          <p>
            We take pride in connecting with every couple on a personal level. By
            understanding your vision, style and the moments that matter most to you, we
            ensure that every photograph and film reflects the essence of your celebration.
          </p>

          <p>
            Creativity and innovation are at the heart of what we do. We continuously refine
            our craft, combining modern technology with artistic storytelling to deliver
            imagery and films that feel both elegant and cinematic.
          </p>

          <p>
            For us, this work is about more than simply documenting an event. It's about
            preserving memories that will be treasured for years to come... moments that
            you, your family and future generations will look back on and relive.
          </p>
        </div>

        <p className="font-bold text-[1.05rem] md:text-[1.2rem] leading-[1.6] text-[#111111] mt-12 tracking-wide">
          At Envision Media, we are honoured to be part of life's most meaningful celebrations,
          capturing the moments that turn into memories for a lifetime.
        </p>
      </div>
    </section>
  );
};

export default AboutIntroduction;
