import React from 'react';
import femaleOnly from '../../assets/FEMALE ONLY.png';
const FemaleOnlyIntro: React.FC = () => {
  return (
    <section className="bg-white w-full py-20 md:py-32">
      <div className="max-w-[1150px] mx-auto px-10 md:px-24 font-['Poppins',sans-serif]">

        {/* Top Split Section */}
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-start mb-12">
          {/* Image */}
          <div className="w-full md:w-[35%] shrink-0 flex justify-center md:justify-start">
            <img
            src={femaleOnly}
              alt="Female only coverage"
              className="w-full h-[220px] md:h-auto object-cover md:mt-2"
            />
          </div>

          {/* Intro Text */}
          <div className="w-full md:w-[65%] space-y-6 text-[#2c2c2c] text-[0.95rem] md:text-[1.05rem] leading-[1.9] tracking-wide">
            <p className="font-bold text-[1.125rem] md:text-[1.325rem] leading-[1.65] text-[#1a1a1a]">
              At Envision Media, we understand that some brides and families prefer an all-female team to capture their wedding day.
            </p>
            <p>
               For religious reasons, cultural traditions, or personal comfort, our Female-Only Wedding Photography and Videography service allows you to celebrate your special moments knowing that your privacy and values are fully respected.
            </p>
          </div>
        </div>

        {/* Full Width Text Content */}
        <div className="space-y-5 text-[#2c2c2c] text-[0.95rem] md:text-[1.05rem] leading-[1.9] tracking-wide">
          <p>
            Our experienced female photographers and videographers specialise in Bengali, South Asian and Muslim weddings, capturing every moment with professionalism, discretion and care. From bridal preparation to the final celebrations, our female team ensure that you feel comfortable throughout your event while still receiving high-quality cinematic photography and wedding films.
          </p>
          <p>
            This service is especially popular for Muslim and modest weddings, where families prefer female professionals to document the occasion. Many brides choose this option for ladies-mehndi nights, holud celebrations, nikkah ceremonies, bridal preparation and other female-only events where privacy is important.
          </p>

          <p className="font-bold text-[1.05rem] md:text-[1.15rem] leading-[1.65] text-[#1a1a1a] pt-6">Coverage Options</p>
          <p>We offer two coverage options depending on the structure of your wedding and how your event is organised.</p>
          
          <p className="font-bold text-[1.05rem] md:text-[1.15rem] leading-[1.65] text-[#1a1a1a] pt-4">Female-Only Coverage</p>
          <p>Our Female-Only Coverage provides an entirely female photography and videography team. Every part of the service is handled by female professionals, from consultation and planning to the event coverage and post-production editing.</p>
          <p>This option is ideal for modest weddings, ladies-only celebrations, bridal preparations, nikkah ceremonies and events where families prefer a completely female presence.</p>

          <p className="font-bold text-[1.05rem] md:text-[1.15rem] leading-[1.65] text-[#1a1a1a] pt-4">Segregated Wedding Coverage</p>
          <p>For weddings where both men and women are present, we can provide separate teams to ensure everyone feels comfortable.</p>
          <p>Our female photographers and videographers will primarily cover the bride, the women's section and all key moments involving the bride and her family. At the same time, our male photographers and videographers will cover the groom, the men's section and wider guest coverage.</p>
          <p>At many South Asian and Muslim weddings, events may begin with separate areas for men and women but later become mixed as the celebration continues. During these moments, our female team will continue to lead coverage of the bride and bridal area, ensuring her comfort and privacy are maintained.</p>
          <p>Our male team may join the mixed environment to capture secondary angles, wider celebration shots, guest reactions and cinematic drone footage while allowing the female team to remain the primary coverage for the bride and her immediate moments.</p>
          <p>This approach allows us to capture the full atmosphere of the wedding while still respecting cultural and religious preferences.</p>

          <p className="font-bold text-[1.05rem] md:text-[1.15rem] leading-[1.65] text-[#1a1a1a] pt-4">Respectful Coverage for South Asian and Muslim Weddings</p>
          <p>Our team has extensive experience covering Bengali, South Asian and Muslim weddings across London and the UK. We understand the importance of modesty, family traditions and cultural values, and we work respectfully within these traditions to capture your memories beautifully.</p>
          <p>Whether you are planning a ladies-only mehndi night, a modest nikkah ceremony or a large South Asian wedding celebration, Envision is committed to delivering elegant photography and cinematic wedding films that preserve your special day forever.</p>

          <p className="font-bold text-[1.05rem] md:text-[1.15rem] leading-[1.65] text-[#1a1a1a] pt-4">Book Your Wedding Photography and Videography</p>
          <p>If you are planning a Bengali, Muslim or South Asian wedding and would like to discuss Female-Only Wedding Photography or Segregated Wedding Coverage, our team would be honoured to capture your special day.</p>

          <p className="font-bold text-[1.05rem] md:text-[1.2rem] leading-[1.6] text-[#111111] pt-8">
            Contact Envision today to check availability and discuss your wedding photography and videography needs.
          </p>
        </div>

      </div>
    </section>
  );
};

export default FemaleOnlyIntro;
