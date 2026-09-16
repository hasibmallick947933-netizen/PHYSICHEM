import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Share2, 
  ArrowRight, 
  Check, 
  Send, 
  Phone, 
  Sparkles, 
  BookOpen, 
  Award, 
  Users, 
  ChevronRight, 
  X,
  Atom,
  Flame,
  BrainCircuit,
  MessageSquare
} from 'lucide-react';
import ParticleNetwork3D from './ParticleNetwork3D';
import { submitEnquiry } from '../utils/api';

// Persistent HUD sections configuration
const SECTIONS = [
  {
    id: 'hero',
    nav: 'HOME',
    counter: '001 / 005',
    headlinePrefix: 'Master Physics & Chemistry',
    headlineMain: 'from Class 9 to 12',
    subheadline: 'Building strong conceptual foundations and target-driven results for board exams, JEE, and NEET.',
    footerNote: 'Empowering forward-thinking students with conceptual clarity and individualized faculty mentorship.',
  },
  {
    id: 'mission',
    nav: 'COURSES',
    counter: '002 / 005',
    headlinePrefix: 'WE ARE A RESULT-ORIENTED',
    headlineMain: 'SCIENCE ACADEMY.',
    subheadline: 'Focused on conceptual clarity, interactive learning, and continuous assessment.',
    footerNote: 'Two core subjects • Zero rote memorization • Comprehensive problem-solving pedagogy.',
  },
  {
    id: 'programs',
    nav: 'FACULTY',
    counter: '003 / 005',
    headlinePrefix: 'DISCOVER',
    headlineMain: 'OUR PROGRAMS',
    subheadline: 'Structured curriculum engineered for school boards, foundation clarity, and competitive excellence.',
    footerNote: 'Focused programs for Classes 9, 10, 11 and 12 with personalized batch pacing.',
  },
  {
    id: 'results',
    nav: 'RESULTS',
    counter: '004 / 005',
    headlinePrefix: 'LEARN FROM',
    headlineMain: 'SUBJECT EXPERTS',
    subheadline: 'Two dedicated mentors for Physics and Chemistry with 10+ years of proven rank-producing pedagogy.',
    footerNote: 'Direct teacher contact • Small batch sizes • 1-on-1 weekly doubt resolution.',
  },
  {
    id: 'contact',
    nav: 'CONTACT',
    counter: '005 / 005',
    headlinePrefix: 'START YOUR',
    headlineMain: 'SCIENCE JOURNEY',
    subheadline: 'Admissions open for Classes 9–12. Book a free diagnostic counseling session today.',
    footerNote: 'Admissions counseling and batch diagnostics available every week.',
  },
];

const PROGRAMS_DATA = [
  {
    id: 'foundation',
    classTag: 'CLASSES 9 & 10',
    title: 'Foundation Program',
    iconSrc: '/icons-3d/card1_crop.png',
    fallbackSym: '/icons-3d/sym1_crop.png',
    headline: 'Core Conceptual Foundation',
    description: 'Focus on building core concepts in physics mechanics, light, chemical reactions, and periodic classification early.',
    highlights: [
      'CBSE & ICSE Board alignment with strong numerical grounding',
      'Early preparation for Junior Science Olympiad & NTSE',
      'Intuitive experimental demonstrations & physical models'
    ],
    schedule: '4 hours/week • Weekend & Weekday batches available'
  },
  {
    id: 'senior_secondary',
    classTag: 'CLASSES 11 & 12',
    title: 'Senior Secondary Mastery',
    iconSrc: '/icons-3d/card2_crop.png',
    fallbackSym: '/icons-3d/sym2_crop.png',
    headline: 'Boards + JEE & NEET Rigor',
    description: 'Comprehensive coverage of Board syllabus + competitive exam preparation for JEE & NEET with advanced derivations.',
    highlights: [
      'Mastery in Electrodynamics, Optics, Thermodynamics & Organic Reactions',
      'Exhaustive problem sheets from past 15-year competitive papers',
      'NCERT line-by-line decoding and board mock series'
    ],
    schedule: '6 hours/week • Dedicated Physics & Chemistry sessions'
  },
  {
    id: 'test_series',
    classTag: 'ALL CLASSES 9–12',
    title: 'Test Series & Mentorship',
    iconSrc: '/icons-3d/card3_crop.png',
    fallbackSym: '/icons-3d/sym3_crop.png',
    headline: 'Continuous Assessment',
    description: 'Dedicated regular testing, personalized faculty mentorship, and one-on-one doubt clearing to ensure zero gaps.',
    highlights: [
      'Weekly chapter-wise proctored tests with detailed rank analytics',
      'Individual doubt resolution directly with primary faculty',
      'Time management and examination temperament training'
    ],
    schedule: 'Weekly Sunday Mocks + On-demand doubt hours'
  }
];

export default function PhysichemShowcase() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeModal, setActiveModal] = useState(null); // 'enroll' | 'program_detail'
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [copiedToast, setCopiedToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    grade: 'Class 11',
    target: 'Boards + JEE Main',
    message: '',
  });

  const containerRef = useRef(null);
  const isScrollingRef = useRef(false);

  // Wheel navigation with smooth transition debounce
  useEffect(() => {
    const handleWheel = (e) => {
      const container = containerRef.current;
      if (!container || activeModal) return;

      const rect = container.getBoundingClientRect();
      const inView = rect.top <= 120 && rect.bottom >= window.innerHeight - 120;
      if (!inView) return;

      if (isScrollingRef.current) return;

      if (e.deltaY > 38) {
        if (currentSlide < SECTIONS.length - 1) {
          e.preventDefault();
          isScrollingRef.current = true;
          setCurrentSlide((prev) => prev + 1);
          setTimeout(() => { isScrollingRef.current = false; }, 650);
        }
      } else if (e.deltaY < -38) {
        if (currentSlide > 0) {
          e.preventDefault();
          isScrollingRef.current = true;
          setCurrentSlide((prev) => prev - 1);
          setTimeout(() => { isScrollingRef.current = false; }, 650);
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
  }, [currentSlide, activeModal]);

  // Touch navigation for mobile
  useEffect(() => {
    let startY = 0;
    let startX = 0;

    const handleTouchStart = (e) => {
      if (e.touches.length > 0) {
        startY = e.touches[0].clientY;
        startX = e.touches[0].clientX;
      }
    };

    const handleTouchEnd = (e) => {
      if (activeModal || !e.changedTouches.length) return;
      const endY = e.changedTouches[0].clientY;
      const diffY = startY - endY;

      if (Math.abs(diffY) > 45) {
        if (diffY > 45 && currentSlide < SECTIONS.length - 1) {
          setCurrentSlide((prev) => prev + 1);
        } else if (diffY < -45 && currentSlide > 0) {
          setCurrentSlide((prev) => prev - 1);
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSlide, activeModal]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeModal) return;
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === 'ArrowRight') {
        if (currentSlide < SECTIONS.length - 1) {
          setCurrentSlide((prev) => prev + 1);
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp' || e.key === 'ArrowLeft') {
        if (currentSlide > 0) {
          setCurrentSlide((prev) => prev - 1);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, activeModal]);

  // Share action
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'PHYSICHEM — Concept-First Physics & Chemistry',
          text: 'Premier coaching institute for Classes 9–12. Concept-first Physics & Chemistry for Boards, JEE, and NEET.',
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopiedToast(true);
        setTimeout(() => setCopiedToast(false), 2400);
      }
    } catch {
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2400);
    }
  };

  // Form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitEnquiry({
        name: formData.name,
        phone: formData.phone,
        grade: formData.grade,
        subject: `Target: ${formData.target}`,
        message: formData.message,
      });
      setSubmitSuccess(true);
    } catch {
      setSubmitSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const section = SECTIONS[currentSlide];

  return (
    <div
      ref={containerRef}
      id="main-showcase"
      className="relative min-h-screen py-6 sm:py-10 px-2 sm:px-6 lg:px-10 flex items-center justify-center bg-[#1B1D21] select-none"
    >
      {/* Outer Studio Ambient Energy Halo (Neon Amber & Quantum Cyan Glow) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[92vw] h-[82vh] bg-amber-500/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[45vw] h-[45vh] bg-[#38BDF8]/10 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[70vw] h-[18vh] bg-amber-500/15 blur-[120px] rounded-full pointer-events-none" />

      {/* Titanium HUD Website Enclosure (#C5C5C5 matte gray, 32-36px radius, specular border) */}
      <div className="relative w-full max-w-[1360px] min-h-[760px] lg:h-[840px] rounded-[26px] sm:rounded-[36px] bg-[#C5C5C5] text-[#111315] shadow-[0_32px_100px_rgba(0,0,0,0.75),0_0_0_1px_rgba(255,255,255,0.25)] overflow-hidden flex flex-col justify-between p-6 sm:p-9 lg:p-11 transition-all duration-500">
        
        {/* ================= PERSISTENT TOP HUD NAVBAR ================= */}
        <div className="relative z-30 w-full">
          <div className="flex items-center justify-between pb-3.5">
            {/* Logo */}
            <button
              onClick={() => setCurrentSlide(0)}
              className="flex items-center gap-2 cursor-pointer group text-left"
            >
              <span className="font-heading text-lg sm:text-2xl font-bold tracking-tight text-[#111315] uppercase">
                PHYSI<span className="text-[#0E1116] underline decoration-[#FFA834] decoration-2 underline-offset-4">CHEM</span>
              </span>
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-black/10 text-[9px] font-mono font-bold tracking-widest text-black/80 uppercase">
                CLASSES 9–12
              </span>
            </button>

            {/* Navigation Tabs with Illuminated Neon Lamp Lightbar */}
            <div className="hidden md:flex items-center gap-8 lg:gap-14">
              {SECTIONS.map((sec, idx) => {
                const isActive = currentSlide === idx;
                return (
                  <button
                    key={sec.id}
                    onClick={() => setCurrentSlide(idx)}
                    className="relative py-1.5 text-xs font-mono tracking-wider uppercase transition-colors cursor-pointer text-[#111315]"
                  >
                    <span className={isActive ? 'font-bold opacity-100' : 'font-normal opacity-60 hover:opacity-95'}>
                      {sec.nav}
                    </span>

                    {/* Illuminated Neon Lamp Bar sitting on the divider line */}
                    {isActive && (
                      <motion.div
                        layoutId="physichemLamp"
                        transition={{ type: 'spring', stiffness: 440, damping: 34 }}
                        className="absolute -bottom-[17px] left-1/2 -translate-x-1/2 w-16 flex flex-col items-center pointer-events-none z-40"
                      >
                        {/* Glowing amber bar with intense glow physics */}
                        <div className="h-[2.5px] w-12 bg-[#FFA834] rounded-full shadow-[0_0_16px_3px_#FFA834,0_2px_8px_rgba(255,168,52,0.8)]" />
                        {/* Downward diffused light halo */}
                        <div className="w-16 h-8 bg-gradient-to-b from-[#FFA834]/35 to-transparent blur-sm -mt-0.5 rounded-b-full" />
                      </motion.div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Right Status Badge */}
            <div className="flex items-center gap-3 text-xs font-mono text-black">
              <span className="hidden lg:inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-wider text-black/80 bg-white/40 px-3 py-1 rounded-full border border-white/60">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                ADMISSIONS OPEN
              </span>
              <div className="flex items-center gap-1 opacity-70">
                <span className="w-1.5 h-1.5 rounded-full bg-black" />
                <span className="w-1.5 h-1.5 rounded-full bg-black" />
              </div>
            </div>
          </div>

          {/* Thin 1px separator line across full width */}
          <div className="w-full h-[1px] bg-black/15 relative" />

          {/* Section Counter: 001 / 005 */}
          <div className="pt-3">
            <span className="text-[11px] font-mono tracking-widest text-black/70 font-semibold">
              {section.counter}
            </span>
          </div>
        </div>

        {/* ================= CENTRAL 3D DYNAMIC ATOMIC SPHERE & PARTICLES ================= */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div className="w-[700px] h-[700px] lg:w-[900px] lg:h-[900px] transition-all duration-700">
            <ParticleNetwork3D currentSlide={currentSlide} />
          </div>
        </div>

        {/* ================= DYNAMIC SLIDE CONTENT ================= */}
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
              {/* ---------------- SECTION 1: HERO (001 / 005) ---------------- */}
              {currentSlide === 0 && (
                <div className="w-full pt-1 pb-3">
                  <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start mb-6">
                    {/* Left Headline */}
                    <div>
                      <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#111315] leading-[1.04]">
                        {section.headlinePrefix} <br />
                        <span className="text-black">{section.headlineMain}</span>
                      </h1>
                    </div>

                    {/* Right Subheadline + CTAs */}
                    <div className="pt-2">
                      <p className="text-[#3D4148] text-sm sm:text-base font-normal leading-relaxed max-w-md mb-8">
                        {section.subheadline}
                      </p>

                      <div className="flex items-center gap-4">
                        {/* Primary Pill Button: ENROLL NOW with Glowing Amber Underglow */}
                        <button
                          onClick={() => setActiveModal('enroll')}
                          className="px-8 py-3.5 rounded-full bg-[#0E1013] hover:bg-black text-white font-semibold text-xs tracking-wider uppercase shadow-[0_14px_28px_-2px_rgba(255,168,52,0.9),0_6px_14px_rgba(255,168,52,0.5)] hover:shadow-[0_18px_36px_rgba(255,168,52,1)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer flex items-center gap-2 group"
                        >
                          <span>Enroll Now</span>
                          <ArrowRight className="w-3.5 h-3.5 text-[#FFA834] group-hover:translate-x-1 transition-transform" />
                        </button>

                        {/* Secondary Outline Pill Button: EXPLORE COURSES */}
                        <button
                          onClick={() => setCurrentSlide(2)}
                          className="px-8 py-3.5 rounded-full border border-black/35 hover:border-black text-[#111315] font-semibold text-xs tracking-wider uppercase transition-all duration-300 hover:bg-black/5 cursor-pointer"
                        >
                          Explore Courses
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------- SECTION 2: MISSION STATEMENT (002 / 005) ---------------- */}
              {currentSlide === 1 && (
                <div className="max-w-3xl pt-1 pb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/10 text-black text-[10px] font-mono tracking-wider mb-4">
                    <Sparkles className="w-3 h-3 text-[#FFA834]" />
                    <span>OUR ACADEMIC MISSION</span>
                  </div>

                  <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#111315] leading-[1.08] mb-6">
                    {section.headlinePrefix} <br />
                    <span>{section.headlineMain}</span>
                  </h2>

                  <p className="text-[#3D4148] text-sm sm:text-base font-normal leading-relaxed max-w-xl mb-8">
                    {section.subheadline}
                  </p>

                  {/* 3 Core Educational Pillars */}
                  <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mb-8">
                    <div className="p-5 rounded-2xl bg-white/55 backdrop-blur-md border border-white/70 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                      <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-700 flex items-center justify-center mb-3">
                        <Atom className="w-4 h-4" />
                      </div>
                      <div className="font-heading font-bold text-sm text-[#111315] mb-1">Concept-First</div>
                      <p className="text-xs text-[#4A4E57] leading-relaxed">
                        Physical laws and chemical reactions taught from first principles with zero rote memorization.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-white/55 backdrop-blur-md border border-white/70 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                      <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-800 flex items-center justify-center mb-3">
                        <BrainCircuit className="w-4 h-4" />
                      </div>
                      <div className="font-heading font-bold text-sm text-[#111315] mb-1">Dual-Track Rigor</div>
                      <p className="text-xs text-[#4A4E57] leading-relaxed">
                        Seamlessly bridges CBSE/ICSE board mastery with competitive JEE & NEET numerical problem-solving.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-white/55 backdrop-blur-md border border-white/70 shadow-[0_8px_24px_rgba(0,0,0,0.06)]">
                      <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-800 flex items-center justify-center mb-3">
                        <Award className="w-4 h-4" />
                      </div>
                      <div className="font-heading font-bold text-sm text-[#111315] mb-1">Diagnostic Testing</div>
                      <p className="text-xs text-[#4A4E57] leading-relaxed">
                        Weekly proctored evaluations, error log reviews, and personalized one-on-one doubt clearing sessions.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentSlide(2)}
                    className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-[#0E1013] text-white font-semibold text-xs tracking-wider uppercase shadow-[0_12px_28px_-4px_rgba(255,168,52,0.85)] hover:shadow-[0_16px_36px_rgba(255,168,52,1)] transition-all cursor-pointer"
                  >
                    <span>View Class Programs</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#FFA834]" />
                  </button>
                </div>
              )}

              {/* ---------------- SECTION 3: CLASS OFFERINGS / PROGRAMS (003 / 005) ---------------- */}
              {currentSlide === 2 && (
                <div className="w-full">
                  <div className="flex flex-col md:flex-row md:items-end justify-between mb-7 gap-3">
                    <div>
                      <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#111315]">
                        {section.headlinePrefix} {section.headlineMain}
                      </h2>
                    </div>
                    <p className="text-xs sm:text-sm text-[#4A4E57] max-w-md font-normal">
                      {section.subheadline}
                    </p>
                  </div>

                  {/* 3 Staggered Embossed Cards with 3D Symbols */}
                  <div className="grid md:grid-cols-3 gap-5 lg:gap-7 max-w-6xl">
                    {PROGRAMS_DATA.map((prog, idx) => (
                      <motion.div
                        key={prog.id}
                        initial={{ opacity: 0, y: 28 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.12 }}
                        onClick={() => {
                          setSelectedProgram(prog);
                          setActiveModal('program_detail');
                        }}
                        className="relative p-6 sm:p-7 rounded-[26px] bg-[#C5C5C5] border border-black/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.18),inset_0_1px_2px_rgba(255,255,255,0.85)] flex flex-col justify-between min-h-[370px] group hover:-translate-y-1.5 transition-all duration-300 cursor-pointer overflow-hidden"
                      >
                        <div>
                          {/* 3D Illuminated Geometric Symbol from reference frames */}
                          <div className="w-24 h-24 mb-5 relative">
                            <img
                              src={prog.iconSrc}
                              alt={prog.title}
                              className="w-full h-full object-contain filter drop-shadow-[0_8px_18px_rgba(255,168,52,0.45)] transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>

                          <span className="text-[10px] font-mono tracking-widest uppercase text-black/60 font-semibold mb-1 block">
                            {prog.classTag}
                          </span>
                          <h3 className="font-heading text-xl font-bold text-[#111315] mb-2 group-hover:text-black transition-colors">
                            {prog.title}
                          </h3>

                          <p className="text-xs sm:text-sm text-[#4A4E57] leading-relaxed mb-6 font-normal line-clamp-3">
                            {prog.description}
                          </p>
                        </div>

                        <div className="pt-4 border-t border-black/10 flex items-center justify-between text-xs font-semibold text-[#111315]">
                          <span>Detailed Syllabus</span>
                          <span className="text-[#0E1013] flex items-center gap-1 group-hover:underline">
                            Explore <ArrowRight className="w-3.5 h-3.5 text-[#FFA834] group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* ---------------- SECTION 4: FACULTY & RESULTS (004 / 005) ---------------- */}
              {currentSlide === 3 && (
                <div className="w-full max-w-5xl">
                  <div className="mb-7">
                    <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#111315] mb-2">
                      {section.headlinePrefix} {section.headlineMain}
                    </h2>
                    <p className="text-sm text-[#4A4E57]">{section.subheadline}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-7">
                    {/* Physics Faculty */}
                    <div className="p-7 rounded-[26px] bg-[#C5C5C5] border border-black/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.18),inset_0_1px_2px_rgba(255,255,255,0.85)] flex flex-col justify-between">
                      <div>
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono font-semibold bg-black/10 text-black tracking-wider uppercase mb-3 inline-block">
                          PHYSICS SPECIALIST · CLASSES 9–12
                        </span>
                        <h3 className="font-heading text-2xl font-bold text-[#111315] mb-2">Senior Physics Faculty</h3>
                        <p className="text-xs sm:text-sm text-[#4A4E57] leading-relaxed mb-5">
                          Specializes in Mechanics, Electrodynamics, and Optics. Connects abstract physical equations to tangible real-world intuition, guiding students through complex multi-step numerical derivations.
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-black/10 text-xs font-mono">
                        <span className="text-black/70">10+ Years Mentorship</span>
                        <span className="text-black font-semibold">Boards • JEE • NEET</span>
                      </div>
                    </div>

                    {/* Chemistry Faculty */}
                    <div className="p-7 rounded-[26px] bg-[#C5C5C5] border border-black/10 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.18),inset_0_1px_2px_rgba(255,255,255,0.85)] flex flex-col justify-between">
                      <div>
                        <span className="px-3 py-1 rounded-full text-[10px] font-mono font-semibold bg-black/10 text-black tracking-wider uppercase mb-3 inline-block">
                          CHEMISTRY SPECIALIST · CLASSES 9–12
                        </span>
                        <h3 className="font-heading text-2xl font-bold text-[#111315] mb-2">Senior Chemistry Faculty</h3>
                        <p className="text-xs sm:text-sm text-[#4A4E57] leading-relaxed mb-5">
                          Specializes in Organic Reaction Mechanisms, Chemical Thermodynamics, and Periodic Properties. Eliminates rote memorization by teaching the underlying electronic stability principles.
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-black/10 text-xs font-mono">
                        <span className="text-black/70">10+ Years Mentorship</span>
                        <span className="text-black font-semibold">Boards • JEE • NEET</span>
                      </div>
                    </div>
                  </div>

                  {/* Proven Metrics Bar */}
                  <div className="grid grid-cols-3 gap-4 p-5 rounded-2xl bg-white/40 border border-white/60">
                    <div className="text-center">
                      <div className="font-heading text-2xl sm:text-3xl font-bold text-[#111315]">98.4%</div>
                      <div className="text-[10px] font-mono uppercase text-[#4A4E57]">Board Pass Rate</div>
                    </div>
                    <div className="text-center border-x border-black/10">
                      <div className="font-heading text-2xl sm:text-3xl font-bold text-[#111315]">1:15</div>
                      <div className="text-[10px] font-mono uppercase text-[#4A4E57]">Student-Teacher Ratio</div>
                    </div>
                    <div className="text-center">
                      <div className="font-heading text-2xl sm:text-3xl font-bold text-[#111315]">100%</div>
                      <div className="text-[10px] font-mono uppercase text-[#4A4E57]">Individual Doubt Support</div>
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------- SECTION 5: ADMISSIONS & CONTACT (005 / 005) ---------------- */}
              {currentSlide === 4 && (
                <div className="w-full max-w-4xl">
                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div>
                      <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-[#111315] mb-3">
                        {section.headlinePrefix} <br />
                        <span>{section.headlineMain}</span>
                      </h2>
                      <p className="text-sm text-[#4A4E57] leading-relaxed mb-6">
                        {section.subheadline}
                      </p>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3 text-xs font-medium text-[#111315]">
                          <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center text-amber-700">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          <span>Free diagnostic counseling session with lead faculty</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs font-medium text-[#111315]">
                          <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center text-amber-700">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          <span>Complete syllabus coverage for Classes 9, 10, 11 & 12</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs font-medium text-[#111315]">
                          <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center text-amber-700">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          <span>Rigorous test series with weekly parent progress updates</span>
                        </div>
                      </div>
                    </div>

                    {/* Quick Admission Form Card */}
                    <div className="p-6 sm:p-8 rounded-[26px] bg-white/70 backdrop-blur-xl border border-white/80 shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
                      {submitSuccess ? (
                        <div className="text-center py-6">
                          <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                            <Check className="w-6 h-6" />
                          </div>
                          <h4 className="font-heading font-bold text-lg text-[#111315] mb-1">Enquiry Received!</h4>
                          <p className="text-xs text-[#4A4E57] mb-4">Our faculty will connect with you within 24 hours.</p>
                          <button
                            onClick={() => setSubmitSuccess(false)}
                            className="px-5 py-2 rounded-full bg-black text-white text-xs font-semibold uppercase tracking-wider"
                          >
                            Submit Another
                          </button>
                        </div>
                      ) : (
                        <form onSubmit={handleFormSubmit} className="space-y-3.5">
                          <h4 className="font-heading font-bold text-base text-[#111315] mb-1">Quick Admission Enquiry</h4>
                          <div>
                            <label className="block text-[11px] font-mono text-[#4A4E57] uppercase mb-1">Student Name</label>
                            <input
                              type="text"
                              required
                              placeholder="Enter student name"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              className="w-full px-3.5 py-2 rounded-xl bg-black/5 border border-black/10 text-xs text-[#111315] focus:outline-none focus:border-black/40"
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
                                className="w-full px-3.5 py-2 rounded-xl bg-black/5 border border-black/10 text-xs text-[#111315] focus:outline-none focus:border-black/40"
                              />
                            </div>
                            <div>
                              <label className="block text-[11px] font-mono text-[#4A4E57] uppercase mb-1">Current Class</label>
                              <select
                                value={formData.grade}
                                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                                className="w-full px-3.5 py-2 rounded-xl bg-black/5 border border-black/10 text-xs text-[#111315] focus:outline-none focus:border-black/40 cursor-pointer"
                              >
                                <option>Class 9</option>
                                <option>Class 10</option>
                                <option>Class 11</option>
                                <option>Class 12</option>
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="block text-[11px] font-mono text-[#4A4E57] uppercase mb-1">Academic Target</label>
                            <select
                              value={formData.target}
                              onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                              className="w-full px-3.5 py-2 rounded-xl bg-black/5 border border-black/10 text-xs text-[#111315] focus:outline-none focus:border-black/40 cursor-pointer"
                            >
                              <option>Boards + JEE Main</option>
                              <option>Boards + NEET Medical</option>
                              <option>Pure Board Excellence (CBSE/ICSE)</option>
                              <option>Foundation Olympiads</option>
                            </select>
                          </div>

                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3 rounded-full bg-[#0E1013] text-white font-semibold text-xs tracking-wider uppercase shadow-[0_12px_24px_-2px_rgba(255,168,52,0.85),0_6px_12px_rgba(255,168,52,0.5)] hover:shadow-[0_16px_34px_rgba(255,168,52,1)] transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                          >
                            <span>{isSubmitting ? 'Submitting...' : 'Submit Admission Enquiry'}</span>
                            <Send className="w-3.5 h-3.5 text-[#FFA834]" />
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

        {/* ================= PERSISTENT BOTTOM HUD BAR ================= */}
        <div className="relative z-30 w-full pt-4 border-t border-black/15 flex items-center justify-between text-xs font-mono text-black/75">
          {/* Left Footnote */}
          <div className="max-w-xs sm:max-w-md truncate text-[11px]">
            {section.footerNote}
          </div>

          {/* Center Scroll Indicator (Clickable to advance) */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % SECTIONS.length)}
            className="flex items-center gap-2 cursor-pointer group"
            title="Next Section"
          >
            <div className="w-5 h-8 border-2 border-black/35 group-hover:border-black rounded-full flex justify-center pt-1 transition-colors">
              <div className="w-1 h-2 bg-black rounded-full animate-bounce" />
            </div>
            <span className="hidden sm:inline-block text-[10px] uppercase tracking-wider font-semibold">
              Scroll or Click
            </span>
          </button>

          {/* Right Action: Share Website Button */}
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 hover:text-black transition-colors cursor-pointer px-3 py-1.5 rounded-full hover:bg-black/5"
            title="Share PHYSICHEM"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="uppercase tracking-wider text-[11px] font-semibold">Share</span>
          </button>
        </div>
      </div>

      {/* ================= ENROLLMENT MODAL ================= */}
      <AnimatePresence>
        {activeModal === 'enroll' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg rounded-[30px] bg-[#16181C] border border-white/15 text-white p-7 sm:p-9 shadow-2xl overflow-hidden"
            >
              {/* Amber Accent Glow */}
              <div className="absolute top-0 right-0 w-60 h-60 bg-amber-500/15 blur-[90px] rounded-full pointer-events-none" />

              <button
                onClick={() => {
                  setActiveModal(null);
                  setSubmitSuccess(false);
                }}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {submitSuccess ? (
                <div className="text-center py-10">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                    <Check className="w-7 h-7" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-white mb-2">Enrollment Request Received!</h3>
                  <p className="text-white/60 text-sm max-w-xs mx-auto mb-6">
                    Our academic coordinators will contact you within 24 hours to schedule your diagnostic counseling session.
                  </p>
                  <button
                    onClick={() => {
                      setActiveModal(null);
                      setSubmitSuccess(false);
                    }}
                    className="px-7 py-2.5 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-[#FFA834] text-[10px] font-mono tracking-wider mb-3">
                    <Sparkles className="w-3 h-3" />
                    <span>ADMISSIONS 2026–2027</span>
                  </div>
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
                    Join PHYSICHEM Academy
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60 mb-6">
                    Enroll for Classes 9–12 Physics & Chemistry with concept-first mentoring.
                  </p>

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-white/70 tracking-wider mb-1.5">
                        Student Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Aryan Sharma"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#FFA834] transition-colors"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-mono uppercase text-white/70 tracking-wider mb-1.5">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-[#FFA834] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-mono uppercase text-white/70 tracking-wider mb-1.5">
                          Enrolling Class
                        </label>
                        <select
                          value={formData.grade}
                          onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl bg-[#212429] border border-white/10 text-white text-sm focus:outline-none focus:border-[#FFA834] transition-colors cursor-pointer"
                        >
                          <option>Class 9</option>
                          <option>Class 10</option>
                          <option>Class 11</option>
                          <option>Class 12</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-white/70 tracking-wider mb-1.5">
                        Focus Objective
                      </label>
                      <select
                        value={formData.target}
                        onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#212429] border border-white/10 text-white text-sm focus:outline-none focus:border-[#FFA834] transition-colors cursor-pointer"
                      >
                        <option>Boards + JEE Main</option>
                        <option>Boards + NEET Medical</option>
                        <option>Pure Board Excellence (CBSE/ICSE)</option>
                        <option>Foundation Olympiads</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-full bg-[#FFA834] hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_10px_25px_rgba(255,168,52,0.4)] flex items-center justify-center gap-2 cursor-pointer mt-2"
                    >
                      {isSubmitting ? (
                        <span>Submitting...</span>
                      ) : (
                        <>
                          <span>Submit Enrollment Request</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= PROGRAM DETAIL MODAL ================= */}
      <AnimatePresence>
        {activeModal === 'program_detail' && selectedProgram && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg rounded-[30px] bg-[#16181C] border border-white/15 text-white p-7 sm:p-9 shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-20 h-20 mb-4 relative">
                <img
                  src={selectedProgram.iconSrc}
                  alt={selectedProgram.title}
                  className="w-full h-full object-contain filter drop-shadow-[0_8px_18px_rgba(255,168,52,0.5)]"
                />
              </div>

              <span className="text-[10px] font-mono tracking-widest uppercase text-[#FFA834] font-semibold block mb-1">
                {selectedProgram.classTag} · PROGRAM SYLLABUS
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
                {selectedProgram.title}
              </h3>
              <p className="text-sm text-white/80 leading-relaxed mb-6 font-normal">
                {selectedProgram.description}
              </p>

              <div className="space-y-2.5 mb-7">
                {selectedProgram.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-white/80">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white/70 font-mono mb-7">
                📅 {selectedProgram.schedule}
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    setFormData({ ...formData, grade: selectedProgram.classTag.includes('9') ? 'Class 9' : 'Class 11' });
                    setActiveModal('enroll');
                  }}
                  className="flex-1 py-3 rounded-full bg-[#FFA834] hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer text-center"
                >
                  Enroll in this Program
                </button>
                <button
                  onClick={() => setActiveModal(null)}
                  className="px-6 py-3 rounded-full border border-white/20 hover:border-white/40 text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Toast */}
      <AnimatePresence>
        {copiedToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-5 py-3 rounded-full bg-[#0c0d0f] border border-[#FFA834]/60 text-white text-xs font-mono shadow-2xl"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Link copied to clipboard!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
