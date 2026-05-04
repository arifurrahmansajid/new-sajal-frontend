import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';

import FooterLogo from '../assets/Footerlogo.png';

const Footer: React.FC = () => {
  const socialIcons = [
    { name: 'tiktok', path: 'https://www.tiktok.com/@myenvisionltd', icon: <FaTiktok size={14} /> },
    { name: 'youtube', path: 'https://www.youtube.com/channel/UCnk0OBVdy2d_3mGgiXqwkEw', icon: <FaYoutube size={15} /> },
    { name: 'facebook', path: 'https://www.facebook.com/myenvisionltd', icon: <FaFacebookF size={13} /> },
    { name: 'instagram', path: 'https://www.instagram.com/myenvisionltd', icon: <FaInstagram size={15} /> },
    { name: 'email', path: 'mailto:Enquiries@myenvisionltd.com', icon: <HiOutlineMail size={16} /> },
  ];

  return (
    <footer
      className="pt-16 pb-[60px] border-t-2 border-[#C5A059] text-[#C5A059] font-['GiambattistaVsPetit',serif] bg-cover bg-center"
      style={{ backgroundImage: 'linear-gradient(rgba(1, 40, 25, 0.5), rgba(1, 40, 25, 0.5)), url("/header-bg.png")' }}
    >
      <div className="container mx-auto px-4 sm:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 sm:gap-8 md:gap-4 items-center text-center md:text-left">

          {/* Column 1: Logo */}
          <div className="flex justify-center md:justify-start">
            <img
              src={FooterLogo}
              alt="Envision Media Logo"
              className="w-[150px] md:w-[130px] lg:w-[180px] h-auto object-contain"
            />
          </div>

          {/* Column 2: Site Links */}
          <div className="flex flex-col gap-3">
            {[
              { name: 'HOME', path: '/' },
              { name: 'ABOUT US', path: '/about' },
              // { name: 'CATE', path: '/services' },
              { name: 'PHOTO GALLERY', path: '/portfolio' },
              { name: 'CINEMATIC TRAILERS', path: '/video' },
              { name: 'WEDDING INSIGHTS', path: '/blog' },
              { name: 'ENQUIRY FORM', path: '/enquiry' }
            ].map(link => (
              <Link
                key={link.name}
                to={link.path}
                className="text-[0.85rem] md:text-[0.7rem] lg:text-[0.85rem] tracking-[0.1em] no-underline text-[#C5A059] hover:opacity-70 transition-opacity"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Column 3: Service Links */}
          <div className="flex flex-col gap-3">
            {[
              { name: 'PHOTOGRAPHY', path: '/photography' },
              { name: 'CINEMATOGRAPHY', path: '/cinematography' },
              { name: 'DRONE FOOTAGE', path: '/drone-footage' },
              { name: 'FEMALE ONLY', path: '/female-only' }
            ].map(service => (
              <Link
                key={service.name}
                to={service.path}
                className="text-[0.85rem] md:text-[0.7rem] lg:text-[0.85rem] tracking-[0.1em] no-underline text-[#C5A059] hover:opacity-70 transition-opacity"
              >
                {service.name}
              </Link>
            ))}
          </div>

          {/* Column 4: Legal & Socials */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <Link to="/privacy-policy" className="text-[0.85rem] md:text-[0.7rem] lg:text-[0.85rem] tracking-[0.1em] no-underline text-[#C5A059] hover:opacity-70 transition-opacity">
                PRIVACY POLICY
              </Link>
              <Link to="/terms-conditions" className="text-[0.85rem] md:text-[0.7rem] lg:text-[0.85rem] tracking-[0.1em] no-underline text-[#C5A059] hover:opacity-70 transition-opacity">
                TERMS & CONDITIONS
              </Link>
            </div>

            {/* Social Icons - Luxury Rounded Square Design */}
            <div className="flex items-center justify-center md:justify-start gap-3 md:gap-1.5 lg:gap-3">
              {socialIcons.map((social) => (
                <a
                  key={social.name}
                  href={social.path}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-[#C5A059] border-[1.5px] border-[#C5A059] bg-black/10 transition-all duration-300 hover:bg-[#C5A059] hover:text-[#011a11] shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

        </div>

        <div className="mt-20 text-center opacity-80 text-[0.7rem] tracking-[0.4em] uppercase font-medium">
          <p className="font-['Poppins',sans-serif]">
            &copy; {new Date().getFullYear()} Envision Media. <span className="block sm:inline">All rights reserved.</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
