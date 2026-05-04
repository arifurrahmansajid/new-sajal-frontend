import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from '../components/ScrollToTop';

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#011a11]">
      <ScrollToTop />
      <Header />

      {/* ── Main Content ── */}
      <main className="flex-grow pt-[80px] md:pt-[110px] bg-white">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
