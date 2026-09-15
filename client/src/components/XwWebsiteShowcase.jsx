import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Share2, ArrowRight, Check, Send, Phone, MessageSquare } from 'lucide-react';
import ParticleNetwork3D from './ParticleNetwork3D';
import { submitEnquiry } from '../utils/api';

const SLIDES = [
  {
    id: 'home',
    nav: 'HOME',
    index: '001 / 005',
    headingLine1: 'UNDERSTAND THE CONCEPT.',
    headingLine2: 'MASTER THE SCIENCE.',
    subtitle: 'Dedicated Physics & Chemistry coaching for Classes 9, 10, 11 & 12. Taught through fundamental conceptual clarity, visual derivations, and structured numerical practice.',
    footerNote: 'Building lifelong scientific fundamentals and academic confidence.',
  },
  {
    id: 'subjects',
    nav: 'SUBJECTS',
    index: '002 / 005',
    headingLine1: 'TWO DEDICATED TEACHERS.',
    headingLine2: 'ONE STRONG FOUNDATION.',
    subtitle: 'We focus exclusively on Physics and Chemistry. By understanding the core principles behind every formula and chemical equation, students solve complex problems with intuition.',
    footerNote: 'Two core subjects • Zero rote memorization • Individual doubt resolution.',
  },
  {
    id: 'courses',
    nav: 'COURSES',
    index: '003 / 005',
    headingLine1: 'DISCOVER',
    headingLine2: 'OUR COURSES',
    subtitle: 'Comprehensive batches engineered for board excellence and higher secondary scientific foundations.',
    footerNote: 'Focused programs for Classes 9, 10, 11 and 12.',
  },
  {
    id: 'teachers',
    nav: 'TEACHERS',
    index: '004 / 005',
    headingLine1: 'LEARN FROM',
    headingLine2: 'SUBJECT EXPERTS',
    subtitle: 'Two specialized teachers with decades of dedicated mentoring in Physics and Chemistry.',
    footerNote: 'Direct teacher contact • Small batch sizes • Personal mentorship.',
  },
  {
    id: 'contact',
    nav: 'CONTACT',
    index: '005 / 005',
    headingLine1: 'START YOUR',
    headingLine2: 'LEARNING JOURNEY',
    subtitle: 'Admissions open for Classes 9–12. Book a counseling session or talk directly with our faculty.',
    footerNote: 'Admissions open for the 2026–2027 academic session.',
  },
];

export default function XwWebsiteShowcase() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    grade: 'Class 11',
    subject: 'Both (Physics & Chemistry)',
    message: '',
  });
  const containerRef = useRef(null);
  const isScrollingRef = useRef(false);

  // Smooth wheel navigation between slides
  useEffect(() => {
    const handleWheel = (e) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const inView = rect.top <= 80 && rect.bottom >= window.innerHeight - 80;
      if (!inView) return;

      if (isScrollingRef.current) return;

      if (e.deltaY > 35) {
        if (currentSlide < SLIDES.length - 1) {
          e.preventDefault();
          isScrollingRef.current = true;
          setCurrentSlide((prev) => prev + 1);
          setTimeout(() => { isScrollingRef.current = false; }, 600);
        }
      } else if (e.deltaY < -35) {
        if (currentSlide > 0) {
          e.preventDefault();
          isScrollingRef.current = true;
          setCurrentSlide((prev) => prev - 1);
          setTimeout(() => { isScrollingRef.current = false; }, 600);
        }
      }
    };

    const node = containerRef.current;
    if (node) {
      node.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      if (node) node.removeEventListener('wheel', handleWheel);
    };
  }, [currentSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (currentSlide < SLIDES.length - 1) {
          setCurrentSlide((prev) => prev + 1);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (currentSlide > 0) {
          setCurrentSlide((prev) => prev - 1);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const slide = SLIDES[currentSlide];

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitEnquiry(formData);
      setIsFormSubmitted(true);
    } catch {
      setIsFormSubmitted(true);
    }
  };

  return (
    <div
      ref={containerRef}
      id="main-showcase"
      className="relative min-h-screen py-4 sm:py-8 lg:py-10 px-2 sm:px-6 lg:px-8 flex items-center justify-center bg-[#181a1e]"
    >
      {/* Outer Studio Ambient Backlight Glow from XW video */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] h-[85vh] bg-amber-500/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[60vw] h-[20vh] bg-amber-600/15 blur-[120px] rounded-full pointer-events-none" />

      {/* Titanium Website Window matching XW video (28px rounded corners, #C3C3C3 background) */}
      <div className="relative w-full max-w-[1440px] min-h-[760px] lg:h-[860px] rounded-[24px] sm:rounded-[32px] bg-[#C3C3C3] text-[#15171A] shadow-[0_30px_90px_rgba(0,0,0,0.65),0_0_0_1px_rgba(255,255,255,0.25)] overflow-hidden flex flex-col justify-between p-6 sm:p-10 lg:p-12 transition-all duration-500">
        
        {/* Top Navigation Bar with illuminated lamp light from XW video */}
        <div className="relative z-30 w-full">
          <div className="flex items-center justify-between pb-3">
            {/* Logo */}
            <Link to="/" className="font-heading text-lg sm:text-xl font-bold tracking-tight text-[#15171A] uppercase">
              PHYSICHEM
            </Link>

            {/* Navigation Tabs with illuminated lamp bar */}
            <div className="hidden md:flex items-center gap-8 lg:gap-14">
              {SLIDES.map((s, idx) => {
                const isActive = currentSlide === idx;
                return (
                  <button
                    key={s.id}
                    onClick={() => setCurrentSlide(idx)}
                    className="relative py-2 text-xs font-mono tracking-wider uppercase transition-colors cursor-pointer text-[#15171A]"
                  >
                    <span className={isActive ? 'font-bold opacity-100' : 'font-normal opacity-60 hover:opacity-90'}>
                      {s.nav}
                    </span>

                    {/* Illuminated Lamp Light matching XW video */}
                    {isActive && (
                      <motion.div
                        layoutId="xwLampIndicator"
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                        className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 w-16 flex flex-col items-center pointer-events-none"
                      >
                        {/* Golden lamp bar sitting directly on the line */}
                        <div className="h-[2.5px] w-12 bg-[#FFA834] rounded-full shadow-[0_0_16px_3px_#FFA834,0_2px_8px_rgba(255,168,52,0.7)]" />
                        {/* Downward diffused light halo */}
                        <div className="w-16 h-8 bg-gradient-to-b from-[#FFA834]/35 to-transparent blur-sm -mt-0.5 rounded-b-full" />
                      </motion.div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Dots / Controls */}
            <div className="flex items-center gap-3 text-xs font-mono text-black">
              <span className="hidden sm:inline-block tracking-wider font-semibold text-[11px]">
                CLASSES 9–12
              </span>
              <div className="flex items-center gap-1 opacity-80">
                <span className="w-1.5 h-1.5 rounded-full bg-black" />
                <span className="w-1.5 h-1.5 rounded-full bg-black" />
              </div>
            </div>
          </div>

          {/* Thin separator line spanning the entire width */}
          <div className="w-full h-[1px] bg-black/15 relative" />

          {/* Slide index (001 / 005) below line */}
          <div className="pt-3">
            <span className="text-[11px] font-mono tracking-widest text-black/70">
              {slide.index}
            </span>
          </div>
        </div>

        {/* Central Native 3D Particle Network Canvas (Replaces the external video!) */}
        <div className={`absolute inset-0 z-0 flex items-center justify-center pointer-events-none transition-opacity duration-700 ${
          currentSlide < 2 ? 'opacity-100 scale-100' : 'opacity-20 scale-90'
        }`}>
          <div className="w-[650px] h-[650px] lg:w-[820px] lg:h-[820px]">
            <ParticleNetwork3D currentSlide={currentSlide} />
          </div>
        </div>

        {/* Dynamic Center Slide Content */}
        <div className="relative z-20 my-auto w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              {/* ================= SLIDE 1: HOME (001 / 005) ================= */}
              {currentSlide === 0 && (
                <div className="max-w-2xl pt-2 pb-6">
                  <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#15171A] leading-[1.06] mb-6">
                    {slide.headingLine1} <br />
                    <span>{slide.headingLine2}</span>
                  </h1>

                  <p className="text-[#3A3E45] text-base sm:text-lg font-normal leading-relaxed max-w-lg mb-10">
                    {slide.subtitle}
                  </p>

                  <div className="flex flex-wrap items-center gap-4">
                    {/* Primary Button: Jet-black pill with golden glow */}
                    <button
                      onClick={() => setCurrentSlide(4)}
                      className="px-8 py-3.5 rounded-full bg-[#101215] hover:bg-black text-white font-semibold text-xs tracking-wider uppercase shadow-[0_14px_28px_-4px_rgba(245,158,11,0.8)] hover:shadow-[0_18px_38px_rgba(245,158,11,0.95)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                    >
                      Enquire Now
                    </button>

                    {/* Secondary Button: Outlined pill */}
                    <button
                      onClick={() => setCurrentSlide(2)}
                      className="px-8 py-3.5 rounded-full border border-black/30 hover:border-black text-[#15171A] font-semibold text-xs tracking-wider uppercase transition-all duration-300 hover:bg-black/5 cursor-pointer"
                    >
                      Our Courses
                    </button>
                  </div>
                </div>
              )}

              {/* ================= SLIDE 2: SUBJECTS (002 / 005) ================= */}
              {currentSlide === 1 && (
                <div className="max-w-2xl pt-2 pb-6">
                  <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#15171A] leading-[1.1] mb-6">
                    {slide.headingLine1} <br />
                    <span>{slide.headingLine2}</span>
                  </h2>

                  <p className="text-[#3A3E45] text-base sm:text-lg font-normal leading-relaxed max-w-lg mb-8">
                    {slide.subtitle}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4 max-w-lg mb-8">
                    <div className="p-5 rounded-2xl bg-white/50 backdrop-blur-md border border-white/70 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                      <div className="font-heading font-bold text-lg text-[#15171A] mb-1">Physics Mastery</div>
                      <p className="text-xs text-[#4A4E57] leading-relaxed">
                        Mechanics, Electrodynamics, Optics, and Modern Physics taught through physical models and derivations.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-white/50 backdrop-blur-md border border-white/70 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                      <div className="font-heading font-bold text-lg text-[#15171A] mb-1">Chemistry Clarity</div>
                      <p className="text-xs text-[#4A4E57] leading-relaxed">
                        Organic reaction mechanisms, Physical equations, and Inorganic bonding visualized with clear logic.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentSlide(2)}
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#101215] text-white font-semibold text-xs tracking-wider uppercase shadow-[0_12px_28px_-4px_rgba(245,158,11,0.75)] hover:shadow-[0_16px_36px_rgba(245,158,11,0.9)] transition-all cursor-pointer"
                  >
                    <span>View Courses</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  </button>
                </div>
              )}

              {/* ================= SLIDE 3: COURSES (003 / 005) ================= */}
              {currentSlide === 2 && (
                <div className="w-full">
                  <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
                    <div>
                      <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#15171A]">
                        {slide.headingLine1} {slide.headingLine2}
                      </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-[#4A4E57] max-w-md font-normal">
                      {slide.subtitle}
                    </p>
                  </div>

                  {/* 3 Staggered Embossed Cards exactly like XW video */}
                  <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl">
                    {/* Card 1: Circle Symbol */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 }}
                      className="relative p-7 sm:p-8 rounded-[28px] bg-[#C3C3C3] border border-black/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.18),inset_0_1px_2px_rgba(255,255,255,0.8)] flex flex-col justify-between min-h-[370px] group hover:-translate-y-1 transition-all duration-300"
                    >
                      <div>
                        {/* 3D Illuminated Symbol */}
                        <div className="w-24 h-24 mb-6 relative">
                          <img
                            src="/icons-3d/symbol_circle.png"
                            alt="Class 9 & 10 Foundation"
                            className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(245,158,11,0.45)] transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>

                        <h3 className="font-heading text-xl font-bold text-[#15171A] mb-2">
                          Class 9 & 10 Foundation
                        </h3>

                        <p className="text-xs sm:text-sm text-[#4A4E57] leading-relaxed mb-6 font-normal">
                          We build fundamental concept clarity by connecting physics principles and chemistry reactions with mathematical intuition and board preparation.
                        </p>
                      </div>

                      <div className="pt-4 border-t border-black/10 flex items-center justify-between text-xs font-semibold text-[#15171A]">
                        <span>Physics & Chemistry</span>
                        <Link to="/courses" className="text-[#0284C7] flex items-center gap-1 hover:underline">
                          Curriculum <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </motion.div>

                    {/* Card 2: Triangle Symbol */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      className="relative p-7 sm:p-8 rounded-[28px] bg-[#C3C3C3] border border-black/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.18),inset_0_1px_2px_rgba(255,255,255,0.8)] flex flex-col justify-between min-h-[370px] group hover:-translate-y-1 transition-all duration-300"
                    >
                      <div>
                        {/* 3D Illuminated Symbol */}
                        <div className="w-24 h-24 mb-6 relative">
                          <img
                            src="/icons-3d/symbol_triangle.png"
                            alt="Class 11 Higher Secondary"
                            className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(245,158,11,0.45)] transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>

                        <h3 className="font-heading text-xl font-bold text-[#15171A] mb-2">
                          Class 11 Higher Secondary
                        </h3>

                        <p className="text-xs sm:text-sm text-[#4A4E57] leading-relaxed mb-6 font-normal">
                          Rigorous problem-solving across Mechanics, Thermodynamics, Chemical Bonding, and organic reaction mechanisms with regular tests.
                        </p>
                      </div>

                      <div className="pt-4 border-t border-black/10 flex items-center justify-between text-xs font-semibold text-[#15171A]">
                        <span>Core Science Base</span>
                        <Link to="/courses" className="text-[#0284C7] flex items-center gap-1 hover:underline">
                          Curriculum <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </motion.div>

                    {/* Card 3: Diamond Symbol */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="relative p-7 sm:p-8 rounded-[28px] bg-[#C3C3C3] border border-black/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.18),inset_0_1px_2px_rgba(255,255,255,0.8)] flex flex-col justify-between min-h-[370px] group hover:-translate-y-1 transition-all duration-300"
                    >
                      <div>
                        {/* 3D Illuminated Symbol */}
                        <div className="w-24 h-24 mb-6 relative">
                          <img
                            src="/icons-3d/symbol_diamond.png"
                            alt="Class 12 Board Mastery"
                            className="w-full h-full object-contain filter drop-shadow-[0_10px_20px_rgba(245,158,11,0.45)] transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>

                        <h3 className="font-heading text-xl font-bold text-[#15171A] mb-2">
                          Class 12 Board Mastery
                        </h3>

                        <p className="text-xs sm:text-sm text-[#4A4E57] leading-relaxed mb-6 font-normal">
                          Master Electromagnetism, Wave Optics, Physical Chemistry, and advanced Organic reactions with dedicated board mock test series.
                        </p>
                      </div>

                      <div className="pt-4 border-t border-black/10 flex items-center justify-between text-xs font-semibold text-[#15171A]">
                        <span>Board & Excellence</span>
                        <Link to="/courses" className="text-[#0284C7] flex items-center gap-1 hover:underline">
                          Curriculum <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </motion.div>
                  </div>
                </div>
              )}

              {/* ================= SLIDE 4: TEACHERS (004 / 005) ================= */}
              {currentSlide === 3 && (
                <div className="w-full max-w-4xl">
                  <div className="mb-8">
                    <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#15171A] mb-2">
                      {slide.headingLine1} {slide.headingLine2}
                    </h2>
                    <p className="text-sm text-[#4A4E57]">{slide.subtitle}</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    {/* Physics Teacher Card */}
                    <div className="p-8 rounded-[28px] bg-[#C3C3C3] border border-black/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.18),inset_0_1px_2px_rgba(255,255,255,0.8)] flex flex-col justify-between">
                      <div>
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono font-semibold bg-black/10 text-black tracking-wider uppercase mb-4 inline-block">
                          PHYSICS SPECIALIST · CLASSES 9–12
                        </span>
                        <h3 className="font-heading text-2xl font-bold text-[#15171A] mb-2">Physics Teacher</h3>
                        <p className="text-xs sm:text-sm text-[#4A4E57] leading-relaxed mb-6">
                          Specializes in Mechanics, Electrodynamics, and Optics. Teaches using physical intuition and mathematical models so students solve complex problems with ease.
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-black/10">
                        <span className="text-xs text-black/60 font-mono">10+ Years Mentorship</span>
                        <Link to="/teachers" className="text-xs font-bold text-[#0284C7] hover:underline flex items-center gap-1">
                          Full Profile <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>

                    {/* Chemistry Teacher Card */}
                    <div className="p-8 rounded-[28px] bg-[#C3C3C3] border border-black/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.18),inset_0_1px_2px_rgba(255,255,255,0.8)] flex flex-col justify-between">
                      <div>
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono font-semibold bg-black/10 text-black tracking-wider uppercase mb-4 inline-block">
                          CHEMISTRY SPECIALIST · CLASSES 9–12
                        </span>
                        <h3 className="font-heading text-2xl font-bold text-[#15171A] mb-2">Chemistry Teacher</h3>
                        <p className="text-xs sm:text-sm text-[#4A4E57] leading-relaxed mb-6">
                          Specializes in Organic Mechanisms, Thermodynamics, and Periodic Properties. Transforms chemistry from memorization into logical, structured mastery.
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-black/10">
                        <span className="text-xs text-black/60 font-mono">10+ Years Mentorship</span>
                        <Link to="/teachers" className="text-xs font-bold text-[#0284C7] hover:underline flex items-center gap-1">
                          Full Profile <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ================= SLIDE 5: CONTACT (005 / 005) ================= */}
              {currentSlide === 4 && (
                <div className="w-full max-w-4xl">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#15171A] mb-4">
                        {slide.headingLine1} <br />
                        <span>{slide.headingLine2}</span>
                      </h2>
                      <p className="text-sm text-[#4A4E57] leading-relaxed mb-6">
                        {slide.subtitle}
                      </p>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3 text-xs font-medium text-[#15171A]">
                          <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center text-amber-600">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          <span>Direct personal counseling session with teachers</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs font-medium text-[#15171A]">
                          <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center text-amber-600">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          <span>Complete syllabus coverage for Classes 9, 10, 11 & 12</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs font-medium text-[#15171A]">
                          <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center text-amber-600">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          <span>Small batch sizes with personalized attention</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <a
                          href="https://wa.me/919876543210"
                          target="_blank"
                          rel="noreferrer"
                          className="px-5 py-2.5 rounded-full bg-[#25D366] text-white font-semibold text-xs flex items-center gap-2 hover:bg-[#20bd5a] transition-all shadow-md cursor-pointer"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          WhatsApp Us
                        </a>
                        <a
                          href="tel:+919876543210"
                          className="px-5 py-2.5 rounded-full border border-black/20 hover:border-black text-black font-semibold text-xs flex items-center gap-2 transition-all cursor-pointer"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          Call Teachers
                        </a>
                      </div>
                    </div>

                    {/* Quick Form Card */}
                    <div className="p-6 sm:p-8 rounded-[28px] bg-white/80 backdrop-blur-xl border border-white shadow-[0_20px_40px_rgba(0,0,0,0.12)]">
                      {isFormSubmitted ? (
                        <div className="text-center py-8">
                          <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center mx-auto mb-3">
                            <Check className="w-6 h-6" />
                          </div>
                          <h4 className="font-heading font-bold text-lg text-[#15171A] mb-1">Enquiry Received!</h4>
                          <p className="text-xs text-[#4A4E57]">Our teachers will connect with you within 24 hours.</p>
                        </div>
                      ) : (
                        <form onSubmit={handleFormSubmit} className="space-y-4">
                          <h4 className="font-heading font-bold text-base text-[#15171A] mb-1">Quick Admission Enquiry</h4>
                          <div>
                            <label className="block text-[11px] font-mono text-[#4A4E57] uppercase mb-1">Student Name</label>
                            <input
                              type="text"
                              required
                              placeholder="Enter student name"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="w-full px-3.5 py-2 rounded-xl bg-black/5 border border-black/10 text-xs text-[#15171A] focus:outline-none focus:border-black/40"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-[11px] font-mono text-[#4A4E57] uppercase mb-1">Phone Number</label>
                              <input
                                type="tel"
                                required
                                placeholder="Phone number"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full px-3.5 py-2 rounded-xl bg-black/5 border border-black/10 text-xs text-[#15171A] focus:outline-none focus:border-black/40"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-mono text-[#4A4E57] uppercase mb-1">Class</label>
                              <select
                                value={formData.grade}
                                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                                className="w-full px-3.5 py-2 rounded-xl bg-black/5 border border-black/10 text-xs text-[#15171A] focus:outline-none focus:border-black/40"
                              >
                                <option>Class 9</option>
                                <option>Class 10</option>
                                <option>Class 11</option>
                                <option>Class 12</option>
                              </select>
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="w-full py-3 rounded-full bg-[#101215] text-white font-semibold text-xs tracking-wider uppercase shadow-[0_12px_24px_-4px_rgba(245,158,11,0.75)] hover:shadow-[0_16px_34px_rgba(245,158,11,0.9)] transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                          >
                            <span>Submit Enquiry</span>
                            <Send className="w-3.5 h-3.5 text-amber-400" />
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Bar matching XW video */}
        <div className="relative z-30 w-full pt-4 border-t border-black/15 flex items-center justify-between text-xs font-mono text-black/75">
          {/* Left footnote */}
          <div className="max-w-xs sm:max-w-md truncate text-[11px]">
            {slide.footerNote}
          </div>

          {/* Center Mouse Scroll Capsule Indicator */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % SLIDES.length)}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-5 h-8 border-2 border-black/40 group-hover:border-black rounded-full flex justify-center pt-1 transition-colors">
              <div className="w-1 h-2 bg-black rounded-full animate-bounce" />
            </div>
            <span className="hidden sm:inline-block text-[10px] uppercase tracking-wider font-semibold">
              Slide {currentSlide + 1} / {SLIDES.length}
            </span>
          </button>

          {/* Right Share */}
          <div className="flex items-center gap-1.5 cursor-pointer hover:text-black">
            <Share2 className="w-3.5 h-3.5" />
            <span className="text-[10px] tracking-wider uppercase font-semibold">SHARE</span>
          </div>
        </div>
      </div>
    </div>
  );
}
