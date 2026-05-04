import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import updateImg from '../assets/update.png';
import headerLogo from '../assets/header logo.png';
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok, FaBars, FaTimes } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';

const Header: React.FC = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when location changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const servicesLinks = [
    { name: 'PHOTOGRAPHY', path: '/photography' },
    { name: 'CINEMATOGRAPHY', path: '/cinematography' },
    { name: 'DRONE FOOTAGE', path: '/drone-footage' },
    { name: 'FEMALE ONLY', path: '/female-only' },
  ];

  const portfolioLinks = [
    { name: 'PHOTOGRAPHY', path: '/portfolio' },
    { name: 'CINEMATIC TRAILERS', path: '/video' },
  ];

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT US', path: '/about' },
    { name: 'SERVICES', path: '#', isDropdown: true, dropdownLinks: servicesLinks },
    { name: 'OUR WORK', path: '#', isDropdown: true, dropdownLinks: portfolioLinks },
    { name: 'ENQUIRY FORM', path: '/enquiry' },
  ];

  const socialIcons = [
    { name: 'tiktok', path: 'https://www.tiktok.com/@myenvisionltd', icon: <FaTiktok size={14} /> },
    { name: 'youtube', path: 'https://www.youtube.com/channel/UCnk0OBVdy2d_3mGgiXqwkEw', icon: <FaYoutube size={15} /> },
    { name: 'facebook', path: 'https://www.facebook.com/myenvisionltd', icon: <FaFacebookF size={13} /> },
    { name: 'instagram', path: 'https://www.instagram.com/myenvisionltd', icon: <FaInstagram size={15} /> },
    { name: 'email', path: 'mailto:Enquiries@myenvisionltd.com', icon: <HiOutlineMail size={16} /> },
  ];

  return (
    <header
      className="flex items-center h-[80px] md:h-[110px] fixed top-0 w-full z-[1000] border-b-[3px] border-[#C5A059] shadow-[0_4px_10px_rgba(0,0,0,0.3)] bg-[#013220] bg-cover bg-center"
      style={{ backgroundImage: `linear-gradient(rgba(1, 50, 32, 0.4), rgba(1, 50, 32, 0.4)), url(${updateImg})` }}
    >
      <div className="container mx-auto px-4 sm:px-10 flex items-center justify-between h-full">

        {/* Logo Section */}
        <Link to="/" className="flex items-center group cursor-pointer relative no-underline">
          <img
            src={headerLogo}
            alt="Envision Media Logo"
            className="h-[50px] md:h-[70px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center lg:gap-4 xl:gap-10 h-full">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group flex items-center h-[110px]">
              <Link
                to={link.path}
                className={`font-['GiambattistaVsPetit',serif] text-[0.75rem] xl:text-[0.85rem] font-bold tracking-[0.12em] transition-all duration-300 no-underline hover:opacity-80 flex items-center h-full ${location.pathname === link.path ? 'text-white' : 'text-[#C5A059]'
                  }`}
              >
                {link.name}
                {link.isDropdown && (
                  <svg className="ml-2 w-4 h-4 transition-transform group-hover:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                )}
              </Link>

              {/* Dropdown Menu */}
              {link.isDropdown && link.dropdownLinks && (
                <div className="absolute top-[110px] left-0 w-[240px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-500 transform translate-y-2 group-hover:translate-y-0 z-[1100]">
                  <div
                    className="py-6 border-[2px] border-[#C5A059] shadow-2xl relative bg-cover bg-center"
                    style={{ backgroundImage: `linear-gradient(rgba(1, 40, 25, 0.95), rgba(1, 40, 25, 0.95)), url(${updateImg})` }}
                  >
                    <div className="flex flex-col gap-1">
                      {link.dropdownLinks.map((s) => (
                        <Link
                          key={s.name}
                          to={s.path}
                          className="px-8 py-3 text-[#C5A059] font-['GiambattistaVsPetit',serif] text-[0.75rem] font-bold tracking-[0.15em] no-underline hover:bg-[#C5A059] hover:text-[#011a11] transition-all duration-300"
                        >
                          {s.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop Social Icons */}
        <div className="hidden lg:flex items-center gap-3">
          {socialIcons.map((social) => (
            <a
              key={social.name}
              href={social.path}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-[#C5A059] border-[1.5px] border-[#C5A059] bg-black/10 transition-all duration-300 hover:bg-[#C5A059] hover:text-[#011a11] shadow-[0_2px_8px_rgba(0,0,0,0.3)]"
            >
              {social.icon}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-[#C5A059] p-2 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes size={28} /> : <FaBars size={28} />}
        </button>

      </div>

      {/* Mobile Sidebar Navigation */}
      <div
        className={`fixed inset-0 z-[1001] lg:hidden transition-all duration-500 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
      >
        {/* Backdrop overlay */}
        <div
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Sidebar */}
        <div
          className={`absolute top-0 right-0 w-[80%] max-w-[350px] h-full bg-[#013220] border-l-[2px] border-[#C5A059] shadow-2xl transition-transform duration-500 ease-in-out bg-cover bg-center ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          style={{ backgroundImage: `linear-gradient(rgba(1, 40, 25, 0.98), rgba(1, 40, 25, 0.98)), url(${updateImg})` }}
        >
          <div className="flex flex-col h-full p-8">
            <div className="flex justify-between items-center mb-12">
              <Link to="/" onClick={() => setIsMenuOpen(false)}>
                <img src={headerLogo} alt="Logo" className="h-[45px] w-auto object-contain" />
              </Link>
              <button onClick={() => setIsMenuOpen(false)} className="text-[#C5A059]">
                <FaTimes size={28} />
              </button>
            </div>

            <nav className="flex flex-col gap-6 overflow-y-auto pb-8">
              {navLinks.map((link) => (
                <div key={link.name} className="flex flex-col gap-4">
                  {!link.isDropdown ? (
                    <Link
                      to={link.path}
                      className="font-['GiambattistaVsPetit',serif] text-[1.1rem] font-bold tracking-[0.1em] text-[#C5A059] no-underline py-2 border-b border-[#C5A059]/30"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ) : (
                    <div className="flex flex-col gap-4">
                      <span className="font-['GiambattistaVsPetit',serif] text-[1.1rem] font-bold tracking-[0.1em] text-[#C5A059] py-2 border-b border-[#C5A059]/30">
                        {link.name}
                      </span>
                      <div className="flex flex-col gap-3 pl-4">
                        {link.dropdownLinks?.map((s) => (
                          <Link
                            key={s.name}
                            to={s.path}
                            className="font-['GiambattistaVsPetit',serif] text-[0.9rem] font-bold tracking-[0.1em] text-[#C5A059]/80 no-underline"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {s.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="mt-auto pt-8 border-t border-[#C5A059]/30">
              <div className="flex items-center gap-4 justify-center">
                {socialIcons.map((social) => (
                  <a
                    key={social.name}
                    href={social.path}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-[#C5A059] border-[1.5px] border-[#C5A059] bg-black/10"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
