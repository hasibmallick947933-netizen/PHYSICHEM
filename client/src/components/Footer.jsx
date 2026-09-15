import { Link } from 'react-router-dom';
import { Atom, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Teachers', path: '/teachers' },
  { name: 'Courses', path: '/courses' },
  { name: 'Contact', path: '/contact' },
];

const subjectLinks = [
  { name: 'Physics', path: '/courses' },
  { name: 'Chemistry', path: '/courses' },
  { name: 'Classes 9–12', path: '/courses' },
  { name: 'Methodology', path: '/methodology' },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#07111F] border-t border-white/5">
      {/* Glow accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-[#38BDF8]/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Atom className="w-7 h-7 text-[#38BDF8]" />
              <span className="font-heading text-xl font-bold">
                <span className="text-white">PHYSI</span>
                <span className="text-[#38BDF8]">CHEM</span>
              </span>
            </Link>
            <p className="text-[#A8B7C9] text-sm leading-relaxed mb-6">
              Understand the Concept.<br />Master the Science.
            </p>
            <p className="text-[#A8B7C9]/60 text-xs">
              Physics & Chemistry Coaching<br />for Classes 9–12
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path + link.name}>
                  <Link
                    to={link.path}
                    className="text-[#A8B7C9] text-sm hover:text-[#38BDF8] transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Subjects */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-5">
              Subjects
            </h4>
            <ul className="space-y-3">
              {subjectLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-[#A8B7C9] text-sm hover:text-[#38BDF8] transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-wider mb-5">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#38BDF8] mt-0.5 shrink-0" />
                <span className="text-[#A8B7C9] text-sm">[Coaching Centre Address]</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <span className="text-[#A8B7C9] text-sm">[Phone Number]</span>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-[#22D3EE] shrink-0" />
                <span className="text-[#A8B7C9] text-sm">[WhatsApp Number]</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#38BDF8] shrink-0" />
                <span className="text-[#A8B7C9] text-sm">[Email Address]</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#A8B7C9]/50 text-xs">
            © 2026 PHYSICHEM. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {['Twitter', 'Instagram', 'YouTube', 'LinkedIn'].map((social) => (
              <a
                key={social}
                href="#"
                className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#A8B7C9]/60 hover:text-[#38BDF8] hover:bg-[#38BDF8]/10 transition-all duration-300 text-xs font-medium"
                aria-label={social}
              >
                {social[0]}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
