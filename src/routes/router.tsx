import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import Home from '../pages/Home';
import About from '../pages/About';
import Contact from '../pages/Contact';
import Services from '../pages/Services';
import Portfolio from '../pages/Portfolio';
import Enquiry from '../pages/Enquiry';
import Cinematography from '../pages/Cinematography';
import Photography from '../pages/Photography';
import DroneFootage from '../pages/DroneFootage';
import FemaleOnly from '../pages/FemaleOnly';
import BlogPage from '../pages/BlogPage';
import BlogDetail from '../pages/BlogDetail';
import AdminLogin from '../pages/AdminLogin';
import AdminDashboard from '../pages/AdminDashboard';
import PrivacyPolicy from '../pages/legal/PrivacyPolicy';
import TermsAndConditions from '../pages/legal/TermsAndConditions';
import Video from '../pages/video';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/',                element: <Home /> },
      { path: '/about',           element: <About /> },
      { path: '/contact',         element: <Contact /> },
      { path: '/services',        element: <Services /> },
      { path: '/portfolio',       element: <Portfolio /> },
      { path: '/video',           element: <Video /> },
      { path: '/enquiry',         element: <Enquiry /> },
      { path: '/cinematography',  element: <Cinematography /> },
      { path: '/photography',     element: <Photography /> },
      { path: '/drone-footage',   element: <DroneFootage /> },
      { path: '/female-only',     element: <FemaleOnly /> },
      { path: '/blog',            element: <BlogPage /> },
      { path: '/blog/:slug',      element: <BlogDetail /> },
      { path: '/privacy-policy', element: <PrivacyPolicy /> },
      { path: '/terms-conditions', element: <TermsAndConditions /> },
    ],
  },
  // Admin routes — outside MainLayout (no header/footer)
  { path: '/admin',            element: <AdminLogin /> },
  { path: '/admin/dashboard',  element: <AdminDashboard /> },
]);
