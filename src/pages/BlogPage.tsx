import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import aboutHero from '../assets/Aboutherobanner.png';
import updateImg from '../assets/update.png';

import { API, IMG_BASE } from '../config';


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

const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${API}/blogs`)
      .then(r => r.json())
      .then(d => {
        const allBlogs = d.blogs || [];
        // Sort by date descending, then by updatedAt descending
        const sorted = [...allBlogs].sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          if (dateB !== dateA) return dateB - dateA;
          // Tie-breaker: use createdAt (newest first)
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });
        setBlogs(sorted);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const excerpt = (text: string, len = 120) =>
    text.replace(/<[^>]+>/g, '').slice(0, len) + (text.length > len ? '...' : '');

  return (
    <div className="w-full min-h-screen">
      {/* Hero Banner */}
      <section className="relative w-full overflow-hidden border-y-[3px] border-[#8B7344]">
        <img
          src={aboutHero}
          alt="Blog hero"
          className="w-full h-[220px] sm:h-[300px] md:h-[400px] object-cover object-center block"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/20" />

        <div className="absolute inset-0 flex items-center justify-center px-4">
          <div className="text-center">
            <p className="text-white/70 font-['Poppins',sans-serif] text-[0.75rem] tracking-[0.4em] uppercase mb-3">
              Tips & Inspiration
            </p>
            <h1
              className="text-white text-[2.5rem] sm:text-5xl md:text-[5.5rem] font-light uppercase m-0 text-center text-balance"
              style={{ fontFamily: "'GiambattistaVsPetit', serif", fontWeight: 300 }}
            >
              WEDDING INSIGHTS
            </h1>
          </div>
        </div>

        <div className="absolute top-0 left-0 w-full h-[1px] bg-white/20" />
      </section>

      {/* Blog Grid */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-10 py-20">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <p className="text-lg font-['GiambattistaVsPetit',serif] text-[#013220]">No posts yet. Check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map(blog => (
              <Link key={blog._id} to={`/blog/${blog.slug}`}
                className="group bg-[#011a11] rounded-2xl overflow-hidden shadow-sm border border-[#C5A059]/10
                  hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="h-56 overflow-hidden bg-gray-100">
                  <img src={`${IMG_BASE}${blog.image}?v=${new Date(blog.updatedAt).getTime()}`} alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div
                  className="relative p-6 bg-cover bg-center"
                  style={{ backgroundImage: `url(${updateImg})` }}
                >
                  <div className="absolute inset-0" />
                  <div className="relative z-10">
                    <p className="text-[#C5A059] font-['Poppins',sans-serif] text-[0.65rem] tracking-[0.25em] uppercase mb-2">
                      {new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      {' · '}By {blog.author}
                    </p>
                    <h2 className="text-[#F4D68B] font-['GiambattistaVsPetit',serif] text-[1.3rem] tracking-wide leading-snug mb-3 line-clamp-2">
                      {blog.title}
                    </h2>
                    <p className="text-white font-['Poppins',sans-serif] text-[0.82rem] leading-relaxed line-clamp-3">
                      {excerpt(blog.content)}
                    </p>
                    <div className="flex items-center gap-1.5 mt-5 text-[#F4D68B] group-hover:text-[#F4D68B] transition-colors">
                      <span className="font-['Poppins',sans-serif] text-[0.75rem] tracking-[0.15em] uppercase font-medium">Read Article</span>
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="m9 18 6-6-6-6"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
