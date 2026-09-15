import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Atom } from 'lucide-react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Dummy login logic
    if (email && password) {
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-[#07111F] flex items-center justify-center p-4 font-body">
      <div className="bg-[#102438] border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-[#38BDF8]/20 p-4 rounded-2xl mb-4">
            <Atom className="w-10 h-10 text-[#38BDF8]" />
          </div>
          <h1 className="text-2xl font-bold font-heading text-white">PHYSICHEM Admin</h1>
          <p className="text-[#A8B7C9] text-sm mt-2">Sign in to manage your website</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#A8B7C9] mb-2">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0D1B2A] border border-white/10 focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] rounded-xl px-4 py-3 text-white placeholder-[#A8B7C9]/50 outline-none transition-all"
              placeholder="admin@physichem.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#A8B7C9] mb-2">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0D1B2A] border border-white/10 focus:border-[#38BDF8] focus:ring-1 focus:ring-[#38BDF8] rounded-xl px-4 py-3 text-white placeholder-[#A8B7C9]/50 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-xl px-4 py-3 bg-[#38BDF8] hover:bg-[#38BDF8]/90 text-white font-semibold transition-colors duration-300 mt-2"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
