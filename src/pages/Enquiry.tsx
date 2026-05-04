import React from 'react';
import EnquiryHero from '../components/enquiry-sections/EnquiryHero';
import EnquiryForm from '../components/enquiry-sections/EnquiryForm';
import AboutWhyUs from '../components/about-sections/AboutWhyUs';
import AboutContact from '../components/about-sections/AboutContact';

const Enquiry: React.FC = () => {
  return (
    <div className="w-full">
      <EnquiryHero />
      <EnquiryForm />
      <AboutWhyUs />
      <AboutContact />
    </div>
  );
};

export default Enquiry;
