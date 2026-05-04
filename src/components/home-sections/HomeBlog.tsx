import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import sectionBg from '../../assets/background.png';
import updateImg from '../../assets/update.png';
import mobileBackground from '../../assets/background image mobile.png';

import { API, IMG_BASE } from '../../config';


interface Blog {
  _id: string;
  title: string;
  author: string;
  date: string;
  image: string;
  content: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

const HomeBlog: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/blogs`)
      .then(r => r.json())
      .then(d => {
        const allBlogs = d.blogs || [];
        const sorted = [...allBlogs].sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          if (dateB !== dateA) return dateB - dateA;
          // Tie-breaker: use createdAt (newest first)
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        setBlogs(sorted.slice(0, 3));
      })
      .catch(() => { })
      .finally(() => setLoading(false));
  }, []);

  const excerpt = (text: string, len = 140) =>
    text.replace(/<[^>]+>/g, '').slice(0, len) + (text.length > len ? '...' : '');

  if (loading) return null;
  if (blogs.length === 0) return null;

  return (
    <section className="w-full py-24 relative overflow-hidden border-b-2 border-[#cfab65]">
      <picture className="absolute inset-0 z-0 pointer-events-none">
        <source media="(max-width: 639px)" srcSet={mobileBackground} />
        <img
          src={sectionBg}
          alt="Blog Background"
          className="w-full h-full object-cover object-center"
        />
      </picture>
      <div className="absolute inset-0 bg-white/60 z-0 hidden sm:block" />

      <div className="max-w-[1200px] mx-auto px-4 sm:px-10 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          <p className="text-[#013220]/60 font-['Poppins',sans-serif] text-[0.7rem] tracking-[0.4em] uppercase mb-3">
            Tips & Inspiration
          </p>
          <h2 className="text-[#013220] font-['GiambattistaVsPetit',serif] text-[2.2rem] sm:text-[3rem] tracking-[0.1em] uppercase">
            Wedding Insights
          </h2>
          <div className="flex items-center justify-center gap-3 mt-4">
            <div className="h-px w-16 bg-[#013220]/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-[#013220]/60" />
            <div className="h-px w-16 bg-[#013220]/30" />
          </div>
        </div>

        {/* FEATURED SLIDER — large hero card (Commented out) 
        <div className="relative mb-10 overflow-hidden rounded-2xl"
          style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.5)' }}>
          ...
        </div>
        */}

        {/* Dot Indicators (Commented out)
        {blogs.length > 1 && (
          <div className="flex justify-center gap-2 mb-12">
            ...
          </div>
        )}
        */}

        {/* GRID CARDS — latest 3 posts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs
            .slice(0, 3)
            .map(blog => (
              <Link key={blog._id} to={`/blog/${blog.slug}`}
                className="group bg-[#011a11] rounded-xl overflow-hidden border border-[#C5A059]/10
                  hover:border-[#C5A059]/30 transition-all duration-300 hover:-translate-y-1"
                style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.3)' }}>
                <div className="h-48 overflow-hidden">
                  <img src={`${IMG_BASE}${blog.image}?v=${new Date(blog.updatedAt).getTime()}`} alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div
                  className="relative p-5 bg-cover bg-center bg-no-repeat"
                  style={{ backgroundImage: `url(${updateImg})` }}
                >
                  <div className="absolute inset-0 " />
                  <div className="relative z-10">
                    <p className="text-[#C5A059] font-['Poppins',sans-serif] text-[0.65rem] tracking-[0.2em] uppercase mb-2">
                      {new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                    <h4 className="text-[#C5A059] font-['GiambattistaVsPetit',serif] text-[1.1rem] tracking-wide leading-snug mb-3 line-clamp-2">
                      {blog.title}
                    </h4>
                    <p className="text-white font-['Poppins',sans-serif] text-[0.78rem] line-clamp-2 leading-relaxed">
                      {excerpt(blog.content, 90)}
                    </p>
                    <div className="flex items-center gap-1.5 mt-4 text-[#C5A059] group-hover:text-[#C5A059] transition-colors">
                      <span className="font-['Poppins',sans-serif] text-[0.7rem] tracking-[0.15em] uppercase">Read More</span>
                      <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link to="/blog"
            className="inline-flex items-center gap-2 px-10 py-4 border border-[2px] border-[#cfab65] text-[#C5A059] rounded-full
              font-['GiambattistaVsPetit',serif] text-[0.85rem] tracking-[0.25em] uppercase
              hover:bg-[#C5A059] hover:text-[#011a11] transition-all duration-300">
            View All Posts
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeBlog;
