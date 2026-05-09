import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/header logo.png';
import Swal from 'sweetalert2';


import { API, IMG_BASE } from '../config';


const resolveImageUrl = (src: string) =>
  src && src.startsWith('http') ? src : `${IMG_BASE}${src}?t=${new Date().getTime()}`;

interface Blog {
  _id: string;
  title: string;
  author: string;
  date: string;
  image: string;
  additionalImages: string[];
  content: string;
  published: boolean;
  slug: string;
  createdAt: string;
}

interface Enquiry {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  servicesRequired: string;
  budgetRange: string;
  eventVenue: string;
  guestCount: string;
  eventDate: string;
  eventType: string;
  referralSource: string;
  message: string;
  status: 'unread' | 'read' | 'spam';
  createdAt: string;
}

interface FormState {
  title: string;
  content: string;
  author: string;
  date: string;
  published: boolean;
}

const emptyForm: FormState = {
  title: '',
  content: '',
  author: '',
  date: new Date().toISOString().split('T')[0],
  published: true,
};

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'dashboard' | 'list' | 'add' | 'edit' | 'messages' | 'settings'>('dashboard');
  const [editTarget, setEditTarget] = useState<Blog | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState('');
  const [additionalFiles, setAdditionalFiles] = useState<File[]>([]);
  const [additionalPreviews, setAdditionalPreviews] = useState<string[]>([]);
  const [existingAdditional, setExistingAdditional] = useState<string[]>([]);
  const [removedAdditional, setRemovedAdditional] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState('');
  const [messageFilter, setMessageFilter] = useState<'all' | 'unread' | 'spam'>('all');

  const markAsRead = async (id: string) => {
    try {
      await fetch(`${API}/enquiry/${id}/read`, { method: 'PATCH', headers: authHeaders() });
      setEnquiries(prev => prev.map(e => e._id === id ? { ...e, status: 'read' } : e));
    } catch (err) { console.error('Mark read failed'); }
  };

  const handleSelectEnquiry = (enq: Enquiry) => {
    setSelectedEnquiry(enq);
    if (enq.status === 'unread') markAsRead(enq._id);
  };

  const toggleSpam = async (enq: Enquiry) => {
    const newStatus = enq.status === 'spam' ? 'unread' : 'spam';
    try {
      const res = await fetch(`${API}/enquiry/${enq._id}/spam`, {
        method: 'PATCH',
        headers: { ...authHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setEnquiries(prev => prev.map(e => e._id === enq._id ? { ...e, status: newStatus } : e));
        setSelectedEnquiry(prev => prev?._id === enq._id ? { ...prev, status: newStatus } : prev);
        showToast(newStatus === 'spam' ? 'Moved to Spam' : 'Moved to Inbox');
      }
    } catch (err) { showToast('Action failed'); }
  };
  const [toast, setToast] = useState('');
  const [deleteData, setDeleteData] = useState<{ id: string, type: 'blog' | 'enquiry' } | null>(null);
  const mainRef = useRef<HTMLInputElement>(null);
  const addRef = useRef<HTMLInputElement>(null);

  const token = localStorage.getItem('adminToken');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const authHeaders = () => ({ Authorization: `Bearer ${token}` });

  useEffect(() => {
    if (!token) { navigate('/admin'); return; }
    fetchBlogs();
    fetchEnquiries();
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch(`${API}/settings/homeVideo`);
      if (res.ok) {
        const data = await res.json();
        setVideoUrl(data.value || '');
        if (data.value && data.value.includes('/api/settings/video/')) {
          setVideoPreview(resolveImageUrl(data.value));
        }
      }
    } catch (err) { console.error('Failed to fetch settings'); }
  };

  const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setVideoFile(file);
    setVideoPreview(URL.createObjectURL(file));
    setVideoUrl(''); // Clear URL if file is selected
  };

  const handleSaveVideo = async () => {
    setSaving(true);
    try {
      const fd = new FormData();
      if (videoFile) {
        fd.append('video', videoFile);
      } else {
        fd.append('value', videoUrl);
      }

      const res = await fetch(`${API}/settings/homeVideo`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }, // No Content-Type header for FormData
        body: fd,
      });
      if (res.ok) {
        Swal.fire({
          title: 'Success!',
          text: 'Video has been updated successfully.',
          icon: 'success',
          confirmButtonColor: '#013220',
          customClass: { popup: 'rounded-[2rem]' }
        });
        fetchSettings();
      } else {
        const data = await res.json();
        throw new Error(data.message);
      }
    } catch (err: any) {
      showToast(err.message || 'Failed to save video');
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveVideo = async () => {
    const result = await Swal.fire({
      title: 'Remove Video?',
      text: 'This will hide the video section from the home page.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#013220',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!',
      background: '#fff',
      customClass: {
        popup: 'rounded-[2rem]',
        confirmButton: 'rounded-xl px-6 py-3',
        cancelButton: 'rounded-xl px-6 py-3'
      }
    });

    if (!result.isConfirmed) return;

    setSaving(true);
    try {
      const res = await fetch(`${API}/settings/homeVideo`, {
        method: 'PUT',
        headers: { ...authHeaders(), 'Content-Type': 'application/json' },
        body: JSON.stringify({ value: '' }),
      });
      if (res.ok) {
        Swal.fire({
          title: 'Removed!',
          text: 'The video has been removed from your home page.',
          icon: 'success',
          confirmButtonColor: '#013220',
          customClass: { popup: 'rounded-[2rem]' }
        });
        setVideoUrl('');
        setVideoFile(null);
        setVideoPreview('');
      } else {
        const data = await res.json();
        throw new Error(data.message);
      }
    } catch (err: any) {
      Swal.fire({
        title: 'Error',
        text: err.message || 'Failed to remove video',
        icon: 'error',
        confirmButtonColor: '#013220',
        customClass: { popup: 'rounded-[2rem]' }
      });
    } finally {
      setSaving(false);
    }
  };

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/blogs/admin/all`, { headers: authHeaders() });
      if (res.status === 401) { logout(); return; }
      const data = await res.json();
      setBlogs(data.blogs || []);
    } catch { showToast('Failed to load blogs'); }
    finally { setLoading(false); }
  };

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/enquiry`, { headers: authHeaders() });
      if (res.status === 401) { logout(); return; }
      const data = await res.json();
      setEnquiries(data.enquiries || []);
    } catch { showToast('Failed to load messages'); }
    finally { setLoading(false); }
  };

  const deleteEnquiry = async (id: string) => {
    try {
      const res = await fetch(`${API}/enquiry/${id}`, { method: 'DELETE', headers: authHeaders() });
      if (res.ok) {
        showToast('Message deleted');
        setEnquiries(prev => prev.filter(e => e._id !== id));
      }
    } catch { showToast('Delete failed'); }
    finally { setDeleteData(null); }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
    navigate('/admin');
  };

  const openAdd = () => {
    setForm(emptyForm);
    setMainImage(null); setMainImagePreview('');
    setAdditionalFiles([]); setAdditionalPreviews([]);
    setExistingAdditional([]); setRemovedAdditional([]);
    setEditTarget(null);
    setView('add');
  };

  const openEdit = (blog: Blog) => {
    setEditTarget(blog);
    setForm({
      title: blog.title, content: blog.content,
      author: blog.author, published: blog.published,
      date: blog.date ? blog.date.split('T')[0] : new Date().toISOString().split('T')[0],
    });
    setMainImage(null);
    setMainImagePreview(resolveImageUrl(blog.image));
    setAdditionalFiles([]);
    setAdditionalPreviews([]);
    setExistingAdditional(blog.additionalImages || []);
    setRemovedAdditional([]);
    setView('edit');
  };

  const handleMainImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMainImage(file);
    setMainImagePreview(URL.createObjectURL(file));
  };

  const handleAdditionalImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setAdditionalFiles(prev => [...prev, ...files]);
    const previews = files.map(f => URL.createObjectURL(f));
    setAdditionalPreviews(prev => [...prev, ...previews]);
  };

  const removeNewAdditional = (idx: number) => {
    setAdditionalFiles(prev => prev.filter((_, i) => i !== idx));
    setAdditionalPreviews(prev => prev.filter((_, i) => i !== idx));
  };

  const removeExistingAdditional = (filename: string) => {
    setExistingAdditional(prev => prev.filter(f => f !== filename));
    setRemovedAdditional(prev => [...prev, filename]);
  };

  const buildFormData = () => {
    const fd = new FormData();
    fd.append('title', form.title);
    fd.append('content', form.content);
    fd.append('author', form.author);
    fd.append('date', form.date);
    fd.append('published', String(form.published));
    if (mainImage) fd.append('image', mainImage);
    additionalFiles.forEach(f => fd.append('additionalImages', f));
    if (removedAdditional.length) fd.append('removeAdditionalImages', JSON.stringify(removedAdditional));
    return fd;
  };

  const handleSave = async () => {
    if (!form.title || !form.content || !form.author) {
      showToast('Title, content and author are required'); return;
    }
    if (view === 'add' && !mainImage) {
      showToast('Please select a main image'); return;
    }
    setSaving(true);
    try {
      const fd = buildFormData();
      const url = view === 'edit' ? `${API}/blogs/${editTarget!._id}` : `${API}/blogs`;
      const method = view === 'edit' ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: authHeaders(), body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      showToast(view === 'edit' ? 'Blog updated successfully!' : 'Blog created successfully!');
      await fetchBlogs();
      setView('list');
    } catch (err: any) {
      showToast(err.message || 'Save failed');
    } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`${API}/blogs/${id}`, { method: 'DELETE', headers: authHeaders() });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      showToast('Blog deleted.');
      setBlogs(prev => prev.filter(b => b._id !== id));
    } catch (err: any) { showToast(err.message); }
    finally { setDeleteData(null); }
  };

  const adminInfo = JSON.parse(localStorage.getItem('adminInfo') || '{}');
  const publishedCount = blogs.filter(b => b.published).length;
  const draftCount = blogs.length - publishedCount;

  return (
    <div className="min-h-screen font-['Poppins',sans-serif]"
      style={{ background: '#f1f5f2' }}>

      {/* Toast */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 px-5 py-3 rounded-xl shadow-lg text-white text-sm"
          style={{ background: '#013220' }}>
          {toast}
        </div>
      )}

      {/* Confirm Delete Modal */}
      {deleteData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#010f08]/60 backdrop-blur-md animate-fade-in">
          <div className="bg-white rounded-[2.5rem] shadow-2xl p-10 max-w-sm w-full mx-4 border border-gray-100 text-center">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
               <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
               </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
               Delete {deleteData.type === 'blog' ? 'Blog Post' : 'Enquiry'}?
            </h3>
            <p className="text-gray-500 text-sm mb-8 leading-relaxed px-4">
               Are you sure? This action is permanent and cannot be reversed.
            </p>
            <div className="flex flex-col gap-3">
              <button onClick={() => {
                 if (deleteData.type === 'blog') handleDelete(deleteData.id);
                 else deleteEnquiry(deleteData.id);
              }}
                className="w-full py-4 rounded-2xl text-white text-sm font-bold uppercase tracking-widest transition-all hover:opacity-90 shadow-lg shadow-red-200"
                style={{ background: 'linear-gradient(135deg, #c0392b, #e74c3c)' }}>
                Confirm Delete
              </button>
              <button onClick={() => setDeleteData(null)}
                className="w-full py-3.5 text-gray-400 hover:text-gray-600 transition-colors text-xs font-bold uppercase tracking-widest">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar + Content */}
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 hidden md:flex flex-col py-8 px-5 shadow-lg"
          style={{ background: 'linear-gradient(180deg, #010f08 0%, #013220 100%)' }}>
          <div className="mb-10">
            <Link to="/" className="block">
              <img src={logo} alt="Envision Logo" className="h-10 w-auto" />
            </Link>
            <p className="text-[#C5A059]/40 text-[0.65rem] tracking-[0.25em] uppercase mt-0.5">
              Admin Panel
            </p>
          </div>

          <nav className="flex flex-col gap-1 flex-1">
            <button onClick={() => setView('dashboard')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm transition-all duration-200 ${
                view === 'dashboard' ? 'bg-[#C5A059]/15 text-[#C5A059]' : 'text-white/50 hover:text-white/80 hover:bg-white/5'
              }`}>
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                 <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              Dashboard
            </button>
            <button onClick={() => setView('list')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm transition-all duration-200 ${
                view === 'list' ? 'bg-[#C5A059]/15 text-[#C5A059]' : 'text-white/50 hover:text-white/80 hover:bg-white/5'
              }`}>
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
              </svg>
              All Blogs
            </button>
            <button onClick={openAdd}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm transition-all duration-200 ${
                view === 'add' ? 'bg-[#C5A059]/15 text-[#C5A059]' : 'text-white/50 hover:text-white/80 hover:bg-white/5'
              }`}>
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/>
                <line x1="8" y1="12" x2="16" y2="12"/>
              </svg>
              New Blog Post
            </button>
            <button onClick={() => { setView('messages'); fetchEnquiries(); }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm transition-all duration-200 ${
                view === 'messages' ? 'bg-[#C5A059]/15 text-[#C5A059]' : 'text-white/50 hover:text-white/80 hover:bg-white/5'
              }`}>
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              Enquiries
            </button>
            <button onClick={() => setView('settings')}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm transition-all duration-200 ${
                view === 'settings' ? 'bg-[#C5A059]/15 text-[#C5A059]' : 'text-white/50 hover:text-white/80 hover:bg-white/5'
              }`}>
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              Site Settings
            </button>
          </nav>

          <div className="mt-auto border-t border-white/10 pt-5">
            <p className="text-white/40 text-xs mb-1">{adminInfo.name || 'Super Admin'}</p>
            <p className="text-white/25 text-[0.65rem] truncate mb-3">{adminInfo.email}</p>
            <button onClick={logout}
              className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-left text-red-400/70 hover:text-red-400 hover:bg-red-400/10 transition-all duration-200 text-sm">
              <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              Logout
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10 overflow-y-auto bg-[#eef3ef]">
          {/* Mobile Header */}
          <div className="md:hidden flex items-center justify-between mb-6">
            <Link to="/">
              <img src={logo} alt="Envision Logo" className="h-8 w-auto brightness-0" 
                style={{ filter: 'invert(16%) sepia(21%) saturate(2335%) hue-rotate(113deg) brightness(91%) contrast(101%)' }} />
            </Link>
            <button onClick={logout} className="text-red-500 text-sm">Logout</button>
          </div>

          {/* ── DASHBOARD VIEW ───────────────────────── */}
          {view === 'dashboard' && (
            <div>
               <div className="mb-8">
                  <h2 className="text-2xl font-['GiambattistaVsPetit',serif] text-[#013220] tracking-wide text-center md:text-left">Welcome Back, {adminInfo.name || 'Admin'}</h2>
                  <p className="text-gray-500 text-sm mt-1 text-center md:text-left">Here is an overview of your website performance.</p>
               </div>

               <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-10">
                  <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                     <div className="w-12 h-12 bg-[#013220]/5 rounded-full flex items-center justify-center mb-4 text-[#013220]">
                        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
                           <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                           <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                        </svg>
                     </div>
                     <p className="text-[0.65rem] uppercase tracking-[0.2em] text-gray-400 mb-1">Total Blogs</p>
                     <p className="text-3xl font-bold text-[#013220]">{blogs.length}</p>
                  </div>

                  <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                     <div className="w-12 h-12 bg-[#C5A059]/10 rounded-full flex items-center justify-center mb-4 text-[#C5A059]">
                        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
                           <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                        </svg>
                     </div>
                     <p className="text-[0.65rem] uppercase tracking-[0.2em] text-gray-400 mb-1">Total Enquiries</p>
                     <p className="text-3xl font-bold text-[#013220]">{enquiries.length}</p>
                  </div>

                  <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                     <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-4 text-red-500">
                        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
                           <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                        </svg>
                     </div>
                     <p className="text-[0.65rem] uppercase tracking-[0.2em] text-gray-400 mb-1">Unread Mail</p>
                     <p className="text-3xl font-bold text-red-500">{enquiries.filter(e => e.status === 'unread').length}</p>
                  </div>

                  <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                     <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-4 text-green-600">
                        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
                           <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                     </div>
                     <p className="text-[0.65rem] uppercase tracking-[0.2em] text-gray-400 mb-1">Published</p>
                     <p className="text-3xl font-bold text-green-600">{blogs.filter(b => b.published).length}</p>
                  </div>
               </div>

               <div className="grid gap-6 lg:grid-cols-2">
                  <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
                     <h3 className="text-lg font-bold text-[#013220] mb-6 flex items-center gap-2">
                        <span className="w-1.5 h-6 bg-[#C5A059] rounded-full"></span>
                        Recent Blogs
                     </h3>
                     <div className="space-y-4">
                        {blogs.slice(0, 3).map(blog => (
                           <div key={blog._id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer" onClick={() => openEdit(blog)}>
                              <img src={resolveImageUrl(blog.image)} className="w-12 h-12 rounded-xl object-cover" />
                              <div className="flex-1 min-w-0">
                                 <p className="text-sm font-semibold text-gray-800 truncate">{blog.title}</p>
                                 <p className="text-xs text-gray-400">{new Date(blog.date).toLocaleDateString()}</p>
                              </div>
                              <span className="text-[0.6rem] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500 uppercase">{blog.published ? 'Live' : 'Draft'}</span>
                           </div>
                        ))}
                        <button onClick={() => setView('list')} className="w-full mt-4 text-[#C5A059] text-xs font-bold uppercase tracking-widest hover:underline">View All Blogs</button>
                     </div>
                  </div>

                  <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
                     <h3 className="text-lg font-bold text-[#013220] mb-6 flex items-center gap-2">
                        <span className="w-1.5 h-6 bg-[#C5A059] rounded-full"></span>
                        Recent Enquiries
                     </h3>
                     <div className="space-y-4">
                        {enquiries.slice(0, 3).map(enq => (
                           <div key={enq._id} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-2xl transition-colors cursor-pointer" onClick={() => handleSelectEnquiry(enq)}>
                              <div className="w-12 h-12 rounded-xl bg-[#013220]/5 flex items-center justify-center text-[#C5A059] font-bold text-lg">
                                 {enq.firstName[0]}
                              </div>
                              <div className="flex-1 min-w-0">
                                 <p className="text-sm font-semibold text-gray-800 truncate">{enq.firstName} {enq.lastName}</p>
                                 <p className="text-xs text-gray-400 truncate">{enq.email}</p>
                              </div>
                              {enq.status === 'unread' && <span className="w-2 h-2 rounded-full bg-[#C5A059]"></span>}
                           </div>
                        ))}
                        <button onClick={() => setView('messages')} className="w-full mt-4 text-[#C5A059] text-xs font-bold uppercase tracking-widest hover:underline">View All Messages</button>
                     </div>
                  </div>
               </div>
            </div>
          )}

          {/* ── LIST VIEW ─────────────────────────────── */}
          {view === 'list' && (
            <div>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-['GiambattistaVsPetit',serif] text-[#013220] tracking-wide">Blog Posts</h2>
                  <p className="text-gray-500 text-sm mt-1">Manage posts, drafts, and featured content from one place.</p>
                </div>
                <button onClick={openAdd}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-medium shadow-md transition-all hover:opacity-90"
                  style={{ background: 'linear-gradient(135deg, #013220, #025c38)' }}>
                  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  New Post
                </button>
              </div>
              <div className="grid gap-4 sm:grid-cols-3 mb-8">
                <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-200">
                  <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-3">Total Posts</p>
                  <p className="text-4xl font-semibold text-[#013220]">{blogs.length}</p>
                </div>
                <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-200">
                  <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-3">Published</p>
                  <p className="text-4xl font-semibold text-green-600">{publishedCount}</p>
                </div>
                <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-200">
                  <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-3">Drafts</p>
                  <p className="text-4xl font-semibold text-[#d04747]">{draftCount}</p>
                </div>
              </div>

              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="w-10 h-10 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : blogs.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                  <svg viewBox="0 0 24 24" className="w-12 h-12 mb-3 opacity-30" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                  </svg>
                  <p className="text-sm">No blog posts yet.</p>
                  <button onClick={openAdd} className="mt-3 text-[#C5A059] text-sm hover:underline">Create your first post →</button>
                </div>
              ) : (
                <div className="grid gap-4">
                  {blogs.map(blog => (
                    <div key={blog._id}
                      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col sm:flex-row">
                      <div className="w-full sm:w-36 h-36 sm:h-full flex-shrink-0 overflow-hidden bg-gray-100">
                        <img src={resolveImageUrl(blog.image)} alt={blog.title}
                          className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 p-5 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start gap-2 flex-wrap">
                            <h3 className="text-base font-semibold text-gray-800 leading-snug flex-1">{blog.title}</h3>
                            <span className={`text-[0.65rem] px-2.5 py-1 rounded-full font-medium whitespace-nowrap ${
                              blog.published ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'
                            }`}>
                              {blog.published ? 'Published' : 'Draft'}
                            </span>
                          </div>
                          <p className="text-gray-400 text-xs mt-1.5">
                            By {blog.author} · {new Date(blog.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </p>
                          <p className="text-gray-500 text-sm mt-2 line-clamp-2 leading-relaxed">
                            {blog.content.replace(/<[^>]+>/g, '')}
                          </p>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <button onClick={() => openEdit(blog)}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[0.75rem] font-medium border border-[#013220]/20 text-[#013220] hover:bg-[#013220]/5 transition-colors">
                            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                            </svg>
                            Edit
                          </button>
                          <button onClick={() => setDeleteData({ id: blog._id, type: 'blog' })}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[0.75rem] font-medium border border-red-200 text-red-500 hover:bg-red-50 transition-colors">
                            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/>
                              <path d="M10 11v6"/><path d="M14 11v6"/>
                              <path d="M9 6V4h6v2"/>
                            </svg>
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* ── ADD / EDIT VIEW ───────────────────────── */}
          {(view === 'add' || view === 'edit') && (
            <div className="w-full max-w-screen-2xl mx-auto grid gap-8 lg:grid-cols-[1.6fr_1fr]">
              <div className="space-y-6">
                <div className="flex items-center gap-3 mb-8">
                  <button onClick={() => setView('list')}
                    className="p-2 rounded-xl hover:bg-gray-200 transition-colors text-gray-500">
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/>
                    </svg>
                  </button>
                  <div>
                    <h2 className="text-2xl font-['GiambattistaVsPetit',serif] text-[#013220] tracking-wide">
                      {view === 'edit' ? 'Edit Blog Post' : 'New Blog Post'}
                    </h2>
                  </div>
                </div>

                <div className="space-y-6">
                  {/* Title */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-700 mb-4 tracking-wide uppercase">Post Details</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs text-gray-500 mb-1.5 tracking-wide">Title *</label>
                        <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                          placeholder="Enter blog title..."
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 text-sm outline-none focus:border-[#C5A059] transition-colors" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs text-gray-500 mb-1.5 tracking-wide">Author *</label>
                          <input value={form.author} onChange={e => setForm(f => ({ ...f, author: e.target.value }))}
                            placeholder="Author name"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 text-sm outline-none focus:border-[#C5A059] transition-colors" />
                        </div>
                        <div>
                          <label className="block text-xs text-gray-500 mb-1.5 tracking-wide">Date</label>
                          <input type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 text-sm outline-none focus:border-[#C5A059] transition-colors" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs text-gray-500 mb-1.5 tracking-wide">Content *</label>
                        <textarea value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                          rows={8} placeholder="Write your blog content here..."
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-800 text-sm outline-none focus:border-[#C5A059] transition-colors resize-y" />
                      </div>
                      <div className="flex items-center gap-3">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))}
                            className="sr-only peer" />
                          <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer
                            peer-checked:after:translate-x-5 peer-checked:bg-[#013220]
                            after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white
                            after:rounded-full after:h-4 after:w-4 after:transition-all" />
                        </label>
                        <span className="text-sm text-gray-600">Published (visible on website)</span>
                      </div>
                    </div>
                  </div>

                  {/* Main Image */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-700 mb-4 tracking-wide uppercase">Main Featured Image *</h3>
                    <div className="flex flex-col gap-4">
                      {mainImagePreview && (
                        <div className="relative w-full h-56 rounded-xl overflow-hidden bg-gray-100">
                          <img src={mainImagePreview} alt="Main preview" className="w-full h-full object-cover" />
                          <button onClick={() => { setMainImage(null); setMainImagePreview(''); if (mainRef.current) mainRef.current.value = ''; }}
                            className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors">
                            <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                          </button>
                        </div>
                      )}
                      <button onClick={() => mainRef.current?.click()}
                        className="w-full py-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 text-sm hover:border-[#C5A059] hover:text-[#C5A059] transition-colors flex items-center justify-center gap-2">
                        <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                          <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                        </svg>
                        {mainImagePreview ? 'Change Image' : 'Upload Main Image'}
                      </button>
                      <input ref={mainRef} type="file" accept="image/*" onChange={handleMainImage} className="hidden" />
                    </div>
                  </div>

                  {/* Additional Images */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-700 mb-4 tracking-wide uppercase">Additional Gallery Images</h3>
                    
                    {/* Existing additional images (edit mode) */}
                    {existingAdditional.length > 0 && (
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-4">
                        {existingAdditional.map((img, idx) => (
                          <div key={idx} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                            <img src={resolveImageUrl(img)} alt="" className="w-full h-full object-cover" />
                            <button onClick={() => removeExistingAdditional(img)}
                              className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-red-600 transition-colors">
                              <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* New additional images preview */}
                    {additionalPreviews.length > 0 && (
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-4">
                        {additionalPreviews.map((src, idx) => (
                          <div key={idx} className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                            <img src={src} alt="" className="w-full h-full object-cover" />
                            <button onClick={() => removeNewAdditional(idx)}
                              className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-red-600 transition-colors">
                              <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    <button onClick={() => addRef.current?.click()}
                      className="w-full py-4 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 text-sm hover:border-[#C5A059] hover:text-[#C5A059] transition-colors flex items-center justify-center gap-2">
                      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                      </svg>
                      Add More Images (up to 10)
                    </button>
                    <input ref={addRef} type="file" accept="image/*" multiple onChange={handleAdditionalImages} className="hidden" />
                  </div>

                  {/* Save / Cancel */}
                  <div className="flex gap-3 pb-8">
                    <button onClick={() => setView('list')}
                      className="flex-1 py-3.5 border border-gray-200 rounded-xl text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors">
                      Cancel
                    </button>
                    <button onClick={handleSave} disabled={saving}
                      className="flex-1 py-3.5 rounded-xl text-white text-sm font-medium shadow-md transition-all hover:opacity-90 disabled:opacity-50"
                      style={{ background: 'linear-gradient(135deg, #013220, #025c38)' }}>
                      {saving ? 'Saving...' : view === 'edit' ? 'Update Post' : 'Publish Post'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Preview</h3>
                    <p className="text-xs text-gray-400">Live preview of the post content.</p>
                  </div>
                  <span className="text-xs text-gray-400">{form.published ? 'Published' : 'Draft'}</span>
                </div>
                <div className="space-y-5">
                  <div className="rounded-3xl overflow-hidden bg-gray-100 h-56 flex items-center justify-center">
                    {mainImagePreview ? (
                      <img src={mainImagePreview} alt="Preview main" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-sm text-gray-500">Main image preview will appear here</div>
                    )}
                  </div>
                  <div>
                    <p className="text-[0.65rem] uppercase tracking-[0.2em] text-gray-400 mb-2">{form.author || 'Author name'}</p>
                    <h3 className="text-xl font-semibold text-gray-900 leading-tight">{form.title || 'Blog title preview'}</h3>
                    <p className="text-xs text-gray-400 mt-1">{new Date(form.date).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
                  </div>
                  <div className="text-sm leading-relaxed text-gray-600 space-y-3">
                    {form.content ? (
                      <p>{form.content.length > 260 ? `${form.content.slice(0, 260)}...` : form.content}</p>
                    ) : (
                      <p className="text-gray-400">Blog content preview will appear here once you type.</p>
                    )}
                  </div>
                  {(existingAdditional.length > 0 || additionalPreviews.length > 0) && (
                    <div>
                      <p className="text-xs uppercase tracking-[0.2em] text-gray-400 mb-3">Gallery preview</p>
                      <div className="grid grid-cols-2 gap-2">
                        {[...existingAdditional.map(img => resolveImageUrl(img)), ...additionalPreviews].slice(0, 4).map((src, idx) => (
                          <div key={idx} className="aspect-square rounded-2xl overflow-hidden bg-gray-100">
                            <img src={src} alt={`additional-${idx}`} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── MESSAGES VIEW ───────────────────────── */}
          {view === 'messages' && (
            <div>
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-['GiambattistaVsPetit',serif] text-[#013220] tracking-wide">
                    {selectedEnquiry ? 'Enquiry Details' : 'Client Enquiries'}
                  </h2>
                  <p className="text-gray-500 text-sm mt-1">
                    {selectedEnquiry ? `Viewing message from ${selectedEnquiry.firstName}` : 'All messages submitted via the Enquiry Form.'}
                  </p>
                </div>
                {selectedEnquiry && (
                  <button onClick={() => setSelectedEnquiry(null)}
                    className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-100 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all">
                    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/>
                    </svg>
                    Back to List
                  </button>
                )}
              </div>

              {!selectedEnquiry && (
                 <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                   <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-200">
                     <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-3">Total</p>
                     <p className="text-4xl font-semibold text-[#013220]">{enquiries.filter(e => e.status !== 'spam').length}</p>
                   </div>
                   <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-100">
                     <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-3">Unread</p>
                     <p className="text-4xl font-semibold text-[#C5A059]">{enquiries.filter(e => e.status === 'unread').length}</p>
                   </div>
                   <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-gray-200">
                     <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-3">Replied/Read</p>
                     <p className="text-4xl font-semibold text-green-600">{enquiries.filter(e => e.status === 'read').length}</p>
                   </div>
                   <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-red-100">
                     <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-3">Spam caught</p>
                     <p className="text-4xl font-semibold text-red-500">{enquiries.filter(e => e.status === 'spam').length}</p>
                   </div>
                 </div>
              )}

              {!selectedEnquiry && (
                <div className="flex gap-2 mb-6">
                  <button onClick={() => setMessageFilter('all')} 
                    className={`px-5 py-2 rounded-xl text-[0.65rem] font-bold uppercase tracking-widest transition-all ${messageFilter === 'all' ? 'bg-[#013220] text-[#C5A059]' : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-100'}`}>
                    Inbox
                  </button>
                  <button onClick={() => setMessageFilter('unread')} 
                    className={`px-5 py-2 rounded-xl text-[0.65rem] font-bold uppercase tracking-widest transition-all ${messageFilter === 'unread' ? 'bg-[#013220] text-[#C5A059]' : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-100'}`}>
                    Unread
                  </button>
                  <button onClick={() => setMessageFilter('spam')} 
                    className={`px-5 py-2 rounded-xl text-[0.65rem] font-bold uppercase tracking-widest transition-all ${messageFilter === 'spam' ? 'bg-red-600 text-white' : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-100'}`}>
                    Spam
                  </button>
                </div>
              )}

              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="w-10 h-10 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin" />
                </div>
              ) : !selectedEnquiry ? (
                /* List View for Enquiries (Matching Blog List Style) */
                enquiries.filter(enq => {
                  if (messageFilter === 'unread') return enq.status === 'unread';
                  if (messageFilter === 'spam') return enq.status === 'spam';
                  return enq.status !== 'spam';
                }).length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-gray-400 bg-white rounded-3xl border border-gray-100 shadow-sm">
                    <svg viewBox="0 0 24 24" className="w-12 h-12 mb-3 opacity-30" fill="none" stroke="currentColor" strokeWidth="1">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                    </svg>
                    <p className="text-sm font-medium">No {messageFilter === 'spam' ? 'spam' : 'enquiries'} here.</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {enquiries
                      .filter(enq => {
                        if (messageFilter === 'unread') return enq.status === 'unread';
                        if (messageFilter === 'spam') return enq.status === 'spam';
                        return enq.status !== 'spam';
                      })
                      .map(enq => (
                        <div key={enq._id} className={`bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col sm:flex-row min-h-[120px] ${enq.status === 'spam' ? 'opacity-75 grayscale-[0.5]' : ''}`}>
                          <div className={`w-full sm:w-24 h-24 sm:h-auto flex-shrink-0 flex items-center justify-center ${enq.status === 'spam' ? 'bg-red-50' : 'bg-[#013220]/5'}`}>
                             <div className={`font-bold text-xl uppercase ${enq.status === 'spam' ? 'text-red-300' : 'text-[#C5A059]'}`}>
                                {enq.firstName[0]}{enq.lastName[0]}
                             </div>
                          </div>
                        <div className="flex-1 p-5 flex flex-col justify-between">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                             <div onClick={() => handleSelectEnquiry(enq)} className="cursor-pointer group">
                                <div className="flex items-center gap-2">
                                   <h3 className="text-base font-semibold text-gray-800 leading-tight group-hover:text-[#C5A059] transition-colors">
                                      {enq.firstName} {enq.lastName}
                                   </h3>
                                   {enq.status === 'unread' && (
                                      <span className="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse"></span>
                                   )}
                                </div>
                                <p className="text-gray-400 text-xs mt-1">
                                   <span className="group-hover:text-[#C5A059]/80 transition-colors">{enq.email}</span> · {new Date(enq.createdAt).toLocaleDateString()}
                                </p>
                             </div>
                             <span className="text-[0.65rem] px-2.5 py-1 rounded-full bg-green-50 text-[#013220] font-bold uppercase tracking-wider">
                                {enq.servicesRequired}
                             </span>
                          </div>
                          
                          <p className="text-gray-500 text-sm mt-3 line-clamp-1 italic">
                             "{enq.message}"
                          </p>

                          <div className="flex gap-2 mt-4">
                            <button onClick={() => handleSelectEnquiry(enq)}
                              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[0.75rem] font-medium border border-[#013220]/20 text-[#013220] hover:bg-[#013220]/5 transition-colors">
                              View Details
                            </button>
                            <button onClick={() => setDeleteData({ id: enq._id, type: 'enquiry' })}
                              className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-[0.75rem] font-medium border border-red-200 text-red-500 hover:bg-red-50 transition-colors">
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                /* Detail View (Matching Blog Add/Edit UI Style) */
                <div className="w-full max-w-screen-2xl mx-auto grid gap-8 lg:grid-cols-[1.6fr_1fr] animate-fade-in">
                  <div className="space-y-6">
                     <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <h3 className="text-sm font-semibold text-gray-700 mb-6 tracking-wide uppercase border-b pb-4">Client Information</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
                           <div>
                              <label className="block text-[0.65rem] uppercase tracking-widest text-[#013220]/70 font-bold mb-1.5">Full Name</label>
                              <p className="text-sm font-medium text-gray-900 bg-gray-50/50 px-4 py-3 rounded-xl border border-gray-100">
                                 {selectedEnquiry.firstName} {selectedEnquiry.lastName}
                              </p>
                           </div>
                           <div>
                              <label className="block text-[0.65rem] uppercase tracking-widest text-[#013220]/70 font-bold mb-1.5">Email Address</label>
                              <a href={`mailto:${selectedEnquiry.email}`} className="block text-sm font-medium text-[#C5A059] bg-gray-50/50 px-4 py-3 rounded-xl border border-gray-100 hover:underline">
                                 {selectedEnquiry.email}
                              </a>
                           </div>
                           <div>
                              <label className="block text-[0.65rem] uppercase tracking-widest text-[#013220]/70 font-bold mb-1.5">Contact Number</label>
                              <p className="text-sm font-medium text-gray-900 bg-gray-50/50 px-4 py-3 rounded-xl border border-gray-100">
                                 {selectedEnquiry.contactNumber}
                              </p>
                           </div>
                           <div>
                              <label className="block text-[0.65rem] uppercase tracking-widest text-[#013220]/70 font-bold mb-1.5">Submission Date</label>
                              <p className="text-sm font-medium text-gray-900 bg-gray-50/50 px-4 py-3 rounded-xl border border-gray-100">
                                 {new Date(selectedEnquiry.createdAt).toLocaleString()}
                              </p>
                           </div>
                        </div>
                     </div>

                     <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <h3 className="text-sm font-semibold text-gray-700 mb-6 tracking-wide uppercase border-b pb-4">Message Content</h3>
                        <div className="bg-gray-50/50 p-6 rounded-2xl border border-gray-100 min-h-[200px]">
                           <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                              {selectedEnquiry.message}
                           </p>
                        </div>
                     </div>
                  </div>

                  <div className="space-y-6">
                     <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                        <h3 className="text-sm font-semibold text-gray-700 mb-6 tracking-wide uppercase border-b pb-4">Event Specs</h3>
                        <div className="space-y-5">
                           <div className="flex justify-between items-center py-2 border-b border-gray-50">
                              <span className="text-xs text-[#013220]/70 font-bold uppercase tracking-wider">Service</span>
                              <span className="text-sm font-semibold text-[#013220]">{selectedEnquiry.servicesRequired}</span>
                           </div>
                           <div className="flex justify-between items-center py-2 border-b border-gray-50">
                              <span className="text-xs text-[#013220]/70 font-bold uppercase tracking-wider">Event Type</span>
                              <span className="text-sm font-semibold text-gray-700">{selectedEnquiry.eventType}</span>
                           </div>
                           <div className="flex justify-between items-center py-2 border-b border-gray-50">
                              <span className="text-xs text-[#013220]/70 font-bold uppercase tracking-wider">Date</span>
                              <span className="text-sm font-semibold text-gray-700">{selectedEnquiry.eventDate}</span>
                           </div>
                           <div className="flex justify-between items-center py-2 border-b border-gray-50">
                              <span className="text-xs text-[#013220]/70 font-bold uppercase tracking-wider">Guests</span>
                              <span className="text-sm font-semibold text-gray-700">{selectedEnquiry.guestCount}</span>
                           </div>
                           <div className="flex justify-between items-center py-2 border-b border-gray-50">
                              <span className="text-xs text-[#013220]/70 font-bold uppercase tracking-wider">Budget</span>
                              <span className="text-sm font-semibold text-gray-700">{selectedEnquiry.budgetRange}</span>
                           </div>
                           <div className="pt-2">
                              <span className="text-xs text-[#013220]/70 font-bold uppercase tracking-wider block mb-2">Venue</span>
                              <p className="text-sm font-medium text-gray-700 leading-snug">{selectedEnquiry.eventVenue}</p>
                           </div>
                           <div className="pt-2 mt-4 bg-[#C5A059]/5 p-4 rounded-xl">
                              <span className="text-[0.6rem] text-[#C5A059] uppercase tracking-widest block mb-1">Referral Source</span>
                              <p className="text-sm font-bold text-[#013220]">{selectedEnquiry.referralSource}</p>
                           </div>
                        </div>
                     </div>
                     
                     <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col gap-3">
                        <button 
                           onClick={() => setSelectedEnquiry(null)}
                           className="w-full py-3 bg-gray-100 text-gray-600 rounded-xl text-xs font-bold hover:bg-gray-200 transition-all uppercase tracking-widest"
                        >
                           Close Message
                        </button>
                        <button 
                            onClick={() => toggleSpam(selectedEnquiry)}
                            className={`w-full py-3 rounded-xl text-xs font-bold transition-all uppercase tracking-widest ${selectedEnquiry.status === 'spam' ? 'bg-green-50 text-green-600 hover:bg-green-100' : 'bg-orange-50 text-orange-600 hover:bg-orange-100'}`}
                         >
                            {selectedEnquiry.status === 'spam' ? 'Not Spam (Move to Inbox)' : 'Mark as Spam'}
                         </button>
                        <button 
                           onClick={() => setDeleteData({ id: selectedEnquiry._id, type: 'enquiry' })}
                           className="w-full py-3 bg-red-50 text-red-500 rounded-xl text-xs font-bold hover:bg-red-100 transition-all uppercase tracking-widest"
                        >
                           Delete Enquiry
                        </button>
                     </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── SETTINGS VIEW ───────────────────────── */}
          {view === 'settings' && (
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <h2 className="text-2xl font-['GiambattistaVsPetit',serif] text-[#013220] tracking-wide">Site Settings</h2>
                <p className="text-gray-500 text-sm mt-1">Configure global website elements.</p>
              </div>

              <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3 mb-8 pb-4 border-b">
                   <div className="w-10 h-10 bg-[#C5A059]/10 rounded-full flex items-center justify-center text-[#C5A059]">
                      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                         <path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
                      </svg>
                   </div>
                   <h3 className="text-lg font-bold text-[#013220]">Home Page Video</h3>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs text-gray-500 mb-2 tracking-wide uppercase font-bold">Option 1: Upload Video File</label>
                      <div className="relative group">
                        <input 
                          type="file" 
                          accept="video/mp4,video/webm,video/ogg" 
                          onChange={handleVideoFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="w-full py-10 border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-3 group-hover:border-[#C5A059] transition-all bg-gray-50/30">
                           <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-400 group-hover:text-[#C5A059] transition-colors">
                              <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                              </svg>
                           </div>
                           <p className="text-sm font-medium text-gray-500">
                             {videoFile ? videoFile.name : 'Click to select video file'}
                           </p>
                           <p className="text-[0.65rem] text-gray-400">Max size: 500MB. Supported formats: MP4, WebM, Ogg.</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <label className="block text-xs text-gray-500 mb-2 tracking-wide uppercase font-bold">Option 2: Video Link</label>
                      <div className="flex-1 flex flex-col justify-center">
                        <input 
                          value={videoUrl} 
                          onChange={e => {
                            setVideoUrl(e.target.value);
                            setVideoFile(null);
                            setVideoPreview('');
                          }}
                          placeholder="YouTube or Vimeo link..."
                          className="w-full px-5 py-4 rounded-2xl border border-gray-200 text-gray-800 text-sm outline-none focus:border-[#C5A059] focus:ring-4 focus:ring-[#C5A059]/5 transition-all" 
                        />
                        <p className="text-[0.65rem] text-gray-400 mt-2 italic px-1">
                          Paste a link if you don't want to upload a file.
                        </p>
                      </div>
                    </div>
                  </div>

                  {(videoPreview || videoUrl) && (
                    <div className="space-y-3">
                       <label className="block text-xs text-gray-500 tracking-wide uppercase font-bold">Preview</label>
                       <div className="relative aspect-video w-full max-w-2xl rounded-2xl overflow-hidden shadow-lg border border-gray-100 bg-black">
                          {videoFile || (videoUrl && videoUrl.includes('/api/settings/video/')) ? (
                            <video 
                              src={videoFile ? videoPreview : videoUrl.startsWith('http') ? videoUrl : resolveImageUrl(videoUrl)} 
                              controls 
                              className="w-full h-full"
                            />
                          ) : videoUrl ? (
                            <iframe
                              src={videoUrl.includes('youtube') ? `https://www.youtube.com/embed/${videoUrl.split('v=')[1]?.split('&')[0]}` : videoUrl.includes('vimeo') ? `https://player.vimeo.com/video/${videoUrl.split('/').pop()}` : videoUrl}
                              className="absolute inset-0 w-full h-full"
                              title="Preview"
                              frameBorder="0"
                              allowFullScreen
                            />
                          ) : null}
                       </div>
                    </div>
                  )}

                  <div className="pt-4 flex items-center gap-4">
                    <button 
                      onClick={handleSaveVideo} 
                      disabled={saving || (!videoFile && !videoUrl)}
                      className="px-10 py-4 rounded-2xl text-white text-sm font-bold uppercase tracking-widest shadow-lg transition-all hover:opacity-90 disabled:opacity-50 active:scale-95"
                      style={{ background: 'linear-gradient(135deg, #013220, #025c38)' }}
                    >
                      {saving ? 'Uploading...' : 'Save Video'}
                    </button>
                    {(videoUrl || videoPreview) && (
                      <button 
                        onClick={handleRemoveVideo}
                        disabled={saving}
                        className="px-6 py-4 rounded-2xl border border-red-200 text-red-500 text-sm font-bold uppercase tracking-widest hover:bg-red-50 transition-all disabled:opacity-50"
                      >
                        Remove Video
                      </button>
                    )}
                    {videoFile && (
                      <button onClick={() => { setVideoFile(null); setVideoPreview(''); fetchSettings(); }} className="text-gray-400 text-xs font-bold uppercase tracking-widest hover:text-red-500 transition-colors">
                        Reset
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
