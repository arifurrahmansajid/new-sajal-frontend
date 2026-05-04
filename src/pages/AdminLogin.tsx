import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { API } from '../config';


const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('adminInfo', JSON.stringify(data.admin));
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #010f08 0%, #013220 50%, #022a1a 100%)' }}>

      {/* Decorative gold orbs */}
      <div className="absolute top-[-80px] left-[-80px] w-[360px] h-[360px] rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #C5A059 0%, transparent 70%)' }} />
      <div className="absolute bottom-[-100px] right-[-80px] w-[400px] h-[400px] rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #C5A059 0%, transparent 70%)' }} />

      <div className="relative z-10 w-full max-w-[420px] mx-4">
        {/* Logo / Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 border border-[#C5A059]/40"
            style={{ background: 'rgba(197,160,89,0.08)' }}>
            <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="#C5A059" strokeWidth="1.5">
              <path d="M12 2C9.243 2 7 4.243 7 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z"/>
              <path d="M12 14c-5.33 0-8 2.686-8 4v1h16v-1c0-1.314-2.67-4-8-4z"/>
            </svg>
          </div>
          <h1 className="text-[2rem] font-['GiambattistaVsPetit',serif] tracking-[0.12em] text-[#C5A059]">
            ENVISION
          </h1>
          <p className="text-[#C5A059]/50 font-['Poppins',sans-serif] text-[0.72rem] tracking-[0.3em] uppercase mt-1">
            Admin Portal
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/10 p-8 backdrop-blur-xl"
          style={{ background: 'rgba(255,255,255,0.04)' }}>

          {error && (
            <div className="mb-5 px-4 py-3 rounded-lg border border-red-500/30 bg-red-500/10 text-red-400 font-['Poppins',sans-serif] text-[0.8rem]">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-[#C5A059]/70 font-['Poppins',sans-serif] text-[0.72rem] tracking-[0.18em] uppercase mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="admin@envision.com"
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20
                  font-['Poppins',sans-serif] text-[0.85rem] outline-none transition-all duration-200
                  focus:border-[#C5A059]/60 focus:bg-white/8"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-[#C5A059]/70 font-['Poppins',sans-serif] text-[0.72rem] tracking-[0.18em] uppercase mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-11 rounded-xl border border-white/10 bg-white/5 text-white placeholder-white/20
                    font-['Poppins',sans-serif] text-[0.85rem] outline-none transition-all duration-200
                    focus:border-[#C5A059]/60 focus:bg-white/8"
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-[#C5A059] transition-colors">
                  {showPass ? (
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl font-['GiambattistaVsPetit',serif] tracking-[0.2em] text-[0.9rem] uppercase
                transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
              style={{ background: 'linear-gradient(135deg, #C5A059, #a8853e)', color: '#011a11' }}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
