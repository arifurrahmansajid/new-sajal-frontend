import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import { API, IMG_BASE } from '../config';


interface Blog {
  _id: string;
  title: string;
  author: string;
  date: string;
  image: string;
  additionalImages: string[];
  content: string;
  slug: string;
  updatedAt: string;
}

const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`${API}/blogs/${slug}`)
      .then(r => r.json())
      .then(d => setBlog(d.blog || null))
      .catch(() => setBlog(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!blog) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
      <h2 className="text-2xl font-['GiambattistaVsPetit',serif] text-[#013220]">Blog post not found.</h2>
      <Link to="/blog" className="text-[#C5A059] hover:underline text-sm">← Back to Wedding Insights</Link>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-[#f7f7f2]">
      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}>
          <button className="absolute top-5 right-5 text-white/60 hover:text-white"
            onClick={() => setLightbox(null)}>
            <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
          <img src={lightbox} alt="Enlarged" className="max-w-full max-h-full object-contain rounded-xl" onClick={e => e.stopPropagation()} />
        </div>
      )}

      {/* Hero Banner */}
      <section className="relative w-full overflow-hidden border-b border-[#e5e5e0]">
        <img src={`${IMG_BASE}${blog.image}?v=${new Date(blog.updatedAt).getTime()}`} alt={blog.title}
          className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/60" />

        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 py-20">
          <div className="flex flex-col gap-5">
            <Link to="/blog"
              className="w-fit inline-flex items-center gap-2 rounded-full bg-black/20 px-4 py-2 text-xs uppercase tracking-[0.35em] text-white/85 backdrop-blur-sm hover:bg-black/30 transition-colors">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/>
              </svg>
              Back to Blog
            </Link>
            <div className="max-w-4xl">
              <p className="text-[0.8rem] uppercase tracking-[0.35em] text-white/70 mb-3">Stories & Insights</p>
              <h1 className="text-white text-4xl sm:text-[3.6rem] md:text-[4.8rem] leading-tight font-light tracking-tight">
                {blog.title}
              </h1>
              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-white/75">
                <span>{blog.author}</span>
                <span className="hidden md:inline">•</span>
                <span>{new Date(blog.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-16 grid gap-10 xl:grid-cols-[2.2fr_0.95fr]">
        <article className="space-y-10">
          <div className="bg-white rounded-[2rem] p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)] border border-gray-200">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-[#64748b] mb-2">About the story</p>
                <h2 className="text-2xl font-semibold text-[#0f172a]">A refined blog reading experience</h2>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#f3f4f6] px-4 py-2 text-sm text-[#475569]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]" />
                Published
              </div>
            </div>
            <div className="prose prose-neutral prose-lg max-w-none text-[#334155] leading-8">
              {blog.content}
            </div>
          </div>

          {blog.additionalImages && blog.additionalImages.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-[#0f172a]">Gallery</h3>
                <p className="text-sm text-[#64748b]">Click to preview</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {blog.additionalImages.map((img, idx) => (
                  <button key={idx} type="button"
                    className="aspect-square overflow-hidden rounded-[1.5rem] bg-gray-100"
                    onClick={() => setLightbox(`${IMG_BASE}${img}?v=${new Date(blog.updatedAt).getTime()}`)}>
                    <img src={`${IMG_BASE}${img}?v=${new Date(blog.updatedAt).getTime()}`} alt={`Gallery ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                  </button>
                ))}
              </div>
            </div>
          )}
        </article>

        <aside className="space-y-6">
          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-200">
            <h3 className="text-base font-semibold text-[#0f172a] mb-4">Post Summary</h3>
            <div className="space-y-3 text-sm text-[#475569]">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[#94a3b8]">Author</span>
                <span>{blog.author}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-[#94a3b8]">Published</span>
                <span>{new Date(blog.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="text-[#94a3b8]">Images</span>
                <span>{blog.additionalImages?.length || 0}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-200">
            <h3 className="text-base font-semibold text-[#0f172a] mb-4">Quick Actions</h3>
            <div className="grid gap-3">
              <Link to="/blog"
                className="inline-flex items-center justify-center rounded-full border border-[#cbd5e1] bg-[#f8fafc] px-4 py-3 text-sm font-medium text-[#0f172a] hover:bg-[#eef2ff] transition-colors">
                Back to All Posts
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default BlogDetail;
