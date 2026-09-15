import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronRight, Atom, Beaker, Check, Sparkles } from 'lucide-react';
import { subjects, classes, teachers } from '../data/siteData';

gsap.registerPlugin(ScrollTrigger);

const SLIDES = [
  {
    index: '001 / 005',
    tag: 'CONCEPT-FIRST SCIENCE EDUCATION',
    title: 'UNDERSTAND THE CONCEPT.',
    titleHighlight: 'MASTER THE SCIENCE.',
    desc: 'Build strong scientific foundations with concept-focused Physics and Chemistry coaching designed for Classes 9–12.',
    primaryBtn: { text: 'Enquire Now', link: '/contact' },
    secondaryBtn: { text: 'Explore Courses', link: '/courses' },
    extra: 'Concept clarity • Problem solving • Academic confidence',
  },
  {
    index: '002 / 005',
    tag: 'PHYSICS & CHEMISTRY',
    title: 'TWO SUBJECTS.',
    titleHighlight: 'ONE STRONG FOUNDATION.',
    desc: 'We believe that when students understand the "why" behind every law and reaction, mastering science becomes natural and intuitive.',
    primaryBtn: { text: 'Meet Teachers', link: '/teachers' },
    secondaryBtn: { text: 'Our Methodology', link: '/methodology' },
    subjectsList: true,
  },
  {
    index: '003 / 005',
    tag: 'ACADEMIC PATHWAYS',
    title: 'DISCOVER',
    titleHighlight: 'OUR COURSES',
    desc: 'Targeted coaching programs structured for school curricula, board examinations, and higher secondary fundamentals.',
    primaryBtn: { text: 'View All Batches', link: '/courses' },
    secondaryBtn: { text: 'Admission Details', link: '/contact' },
    cardsGrid: true,
  },
  {
    index: '004 / 005',
    tag: 'FACULTY EXCELLENCE',
    title: 'LEARN FROM',
    titleHighlight: 'SUBJECT EXPERTS',
    desc: 'Two teachers. Two subjects. One undivided commitment to conceptual clarity, rigorous problem-solving, and personal guidance.',
    primaryBtn: { text: 'View Profiles', link: '/teachers' },
    secondaryBtn: { text: 'Book Counseling', link: '/contact' },
    teachersGrid: true,
  },
  {
    index: '005 / 005',
    tag: 'NEXT STEP',
    title: 'BEGIN YOUR',
    titleHighlight: 'SCIENCE JOURNEY',
    desc: 'Give your science education the foundation it deserves. Join PHYSICHEM for structured learning and true conceptual mastery.',
    primaryBtn: { text: 'Send Enquiry', link: '/contact' },
    secondaryBtn: { text: 'Call Teachers', link: '/contact' },
    finalCta: true,
  },
];

export default function XwInteractiveShowcase() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Pause video so it is controlled by scroll
    video.pause();

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: '.xw-pinned-viewport',
        scrub: 0.4,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
          const totalSlides = SLIDES.length;
          const currentSlide = Math.min(
            totalSlides - 1,
            Math.floor(self.progress * totalSlides)
          );
          setActiveSlide(currentSlide);

          // Sync video time with scroll progress
          if (video.duration) {
            video.currentTime = self.progress * video.duration;
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const slide = SLIDES[activeSlide];

  return (
    <div id="main-showcase" ref={containerRef} className="relative bg-[#07111F]" style={{ height: '500vh' }}>
      {/* Pinned Viewport following XW video layout */}
      <div className="xw-pinned-viewport sticky top-0 w-screen h-screen overflow-hidden flex flex-col justify-between bg-[#07111F]">
        {/* Background Video (Centerpiece from XW-P0oNGs3ubVaQK-optimized.mp4) */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-60">
          <video
            ref={videoRef}
            src="/videos/xw-showcase.mp4"
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover sm:object-contain scale-105 filter drop-shadow-[0_0_80px_rgba(56,189,248,0.2)]"
          >
            {/* Fallback to high-speed Cloudinary stream */}
            <source
              src="https://res.cloudinary.com/o3n9jw0w/video/upload/v1789465959/physichem/wjncmgmter7jhvs0hhjh.mp4"
              type="video/mp4"
            />
          </video>
          {/* Subtle vignette & glow overlay */}
          <div className="absolute inset-0 bg-radial from-transparent via-[#07111F]/40 to-[#07111F]" />
        </div>

        {/* Top Minimal Navigation Bar from XW Video */}
        <div className="relative z-20 max-w-7xl w-full mx-auto px-6 sm:px-10 pt-6 sm:pt-8 flex items-center justify-between border-b border-white/5 pb-4">
          <Link to="/" className="flex items-center gap-2 group">
            <Atom className="w-6 h-6 text-[#38BDF8] group-hover:rotate-180 transition-transform duration-500" />
            <span className="font-heading text-lg font-bold tracking-tight text-white">
              PHYSI<span className="text-[#38BDF8]">CHEM</span>
            </span>
          </Link>

          {/* Centered tabs with glowing active indicator */}
          <div className="hidden md:flex items-center gap-6 text-xs font-mono uppercase tracking-wider">
            {['HOME', 'PHILOSOPHY', 'COURSES', 'TEACHERS', 'ENQUIRE'].map((tab, idx) => (
              <button
                key={tab}
                onClick={() => {
                  const targetScroll = containerRef.current.offsetTop + (idx / SLIDES.length) * containerRef.current.offsetHeight;
                  window.scrollTo({ top: targetScroll + 10, behavior: 'smooth' });
                }}
                className={`relative py-1 transition-colors ${
                  activeSlide === idx ? 'text-white' : 'text-[#A8B7C9]/60 hover:text-white'
                }`}
              >
                {tab}
                {activeSlide === idx && (
                  <motion.div
                    layoutId="activeTabGlow"
                    className="absolute -bottom-4.5 left-0 right-0 h-0.5 bg-gradient-to-r from-[#38BDF8] to-[#22D3EE] shadow-[0_0_12px_#38BDF8]"
                  />
                )}
              </button>
            ))}
          </div>

          <Link
            to="/contact"
            className="px-4 py-1.5 rounded-full text-xs font-semibold bg-[#38BDF8]/10 hover:bg-[#38BDF8]/20 border border-[#38BDF8]/30 text-[#38BDF8] transition-all hover:shadow-[0_0_15px_rgba(56,189,248,0.3)]"
          >
            Enquire Now
          </Link>
        </div>

        {/* Main Center Content Area */}
        <div className="relative z-10 max-w-7xl w-full mx-auto px-6 sm:px-10 my-auto flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="w-full"
            >
              {/* Slide Counter like 001 / 005 in XW video */}
              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono text-xs text-[#38BDF8] tracking-widest bg-white/5 border border-white/10 px-2.5 py-1 rounded-md backdrop-blur-md">
                  {slide.index}
                </span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#A8B7C9]/60">
                  {slide.tag}
                </span>
              </div>

              {/* SLIDE 0 & 1: Hero & Philosophy */}
              {activeSlide < 2 && (
                <div className="max-w-xl">
                  <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-4">
                    {slide.title} <br />
                    <span className="text-gradient-blue">{slide.titleHighlight}</span>
                  </h2>
                  <p className="text-[#A8B7C9] text-base sm:text-lg leading-relaxed mb-8">
                    {slide.desc}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    <Link
                      to={slide.primaryBtn.link}
                      className="px-7 py-3 rounded-full bg-[#38BDF8] text-[#07111F] font-semibold text-sm transition-all duration-300 hover:bg-[#38BDF8]/90 hover:shadow-[0_0_25px_rgba(56,189,248,0.5)] hover:-translate-y-0.5"
                    >
                      {slide.primaryBtn.text}
                    </Link>
                    <Link
                      to={slide.secondaryBtn.link}
                      className="px-7 py-3 rounded-full border border-white/20 hover:border-[#38BDF8]/50 text-white font-medium text-sm backdrop-blur-md hover:bg-white/5 transition-all duration-300"
                    >
                      {slide.secondaryBtn.text}
                    </Link>
                  </div>

                  {slide.extra && (
                    <div className="text-xs font-mono text-[#A8B7C9]/60">
                      {slide.extra}
                    </div>
                  )}

                  {slide.subjectsList && (
                    <div className="flex gap-3">
                      <div className="px-4 py-2 rounded-xl bg-white/5 border border-[#38BDF8]/20 text-xs text-[#38BDF8] flex items-center gap-2">
                        <Atom className="w-4 h-4" />
                        <span>Physics: Classes 9–12</span>
                      </div>
                      <div className="px-4 py-2 rounded-xl bg-white/5 border border-[#22D3EE]/20 text-xs text-[#22D3EE] flex items-center gap-2">
                        <Beaker className="w-4 h-4" />
                        <span>Chemistry: Classes 9–12</span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* SLIDE 2: Courses with 3D Embossed Glowing Cards (Matching Slide 3 of XW video) */}
              {activeSlide === 2 && (
                <div>
                  <div className="max-w-xl mb-6">
                    <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-white mb-2">
                      {slide.title} <span className="text-gradient-blue">{slide.titleHighlight}</span>
                    </h2>
                    <p className="text-[#A8B7C9] text-sm sm:text-base">{slide.desc}</p>
                  </div>

                  {/* 3 Embossed glowing cards like in the video */}
                  <div className="grid sm:grid-cols-3 gap-5 max-w-4xl">
                    <div className="p-6 rounded-2xl bg-[#0D1B2A]/90 backdrop-blur-xl border border-white/10 hover:border-[#38BDF8]/40 transition-all duration-300 group hover:-translate-y-1 shadow-lg shadow-black/40">
                      <div className="w-14 h-14 rounded-xl bg-white/5 border border-[#38BDF8]/30 flex items-center justify-center mb-4 text-[#38BDF8] group-hover:shadow-[0_0_20px_rgba(56,189,248,0.3)]">
                        <Atom className="w-7 h-7" />
                      </div>
                      <h4 className="font-heading font-bold text-white text-lg mb-1">Class 9 & 10</h4>
                      <p className="text-xs text-[#38BDF8] font-mono mb-3">Foundation & Boards</p>
                      <p className="text-xs text-[#A8B7C9] leading-relaxed mb-4">
                        Strong basic concepts in Physics and Chemistry with numerical clarity.
                      </p>
                      <Link to="/courses" className="text-xs font-semibold text-[#38BDF8] flex items-center gap-1 group-hover:gap-2 transition-all">
                        Learn More <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#0D1B2A]/90 backdrop-blur-xl border border-[#38BDF8]/30 hover:border-[#38BDF8]/60 transition-all duration-300 group hover:-translate-y-1 shadow-[0_0_30px_rgba(56,189,248,0.15)]">
                      <div className="w-14 h-14 rounded-xl bg-[#38BDF8]/10 border border-[#38BDF8]/40 flex items-center justify-center mb-4 text-[#38BDF8] group-hover:shadow-[0_0_20px_rgba(56,189,248,0.5)]">
                        <Sparkles className="w-7 h-7" />
                      </div>
                      <h4 className="font-heading font-bold text-white text-lg mb-1">Class 11</h4>
                      <p className="text-xs text-[#38BDF8] font-mono mb-3">Higher Secondary Base</p>
                      <p className="text-xs text-[#A8B7C9] leading-relaxed mb-4">
                        Mechanics, Thermodynamics, Chemical Bonding, and Organic reactions.
                      </p>
                      <Link to="/courses" className="text-xs font-semibold text-[#38BDF8] flex items-center gap-1 group-hover:gap-2 transition-all">
                        Learn More <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#0D1B2A]/90 backdrop-blur-xl border border-white/10 hover:border-[#22D3EE]/40 transition-all duration-300 group hover:-translate-y-1 shadow-lg shadow-black/40">
                      <div className="w-14 h-14 rounded-xl bg-white/5 border border-[#22D3EE]/30 flex items-center justify-center mb-4 text-[#22D3EE] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                        <Beaker className="w-7 h-7" />
                      </div>
                      <h4 className="font-heading font-bold text-white text-lg mb-1">Class 12</h4>
                      <p className="text-xs text-[#22D3EE] font-mono mb-3">Board & Exam Mastery</p>
                      <p className="text-xs text-[#A8B7C9] leading-relaxed mb-4">
                        Electromagnetism, Optics, Coordination chemistry & full revision.
                      </p>
                      <Link to="/courses" className="text-xs font-semibold text-[#22D3EE] flex items-center gap-1 group-hover:gap-2 transition-all">
                        Learn More <ChevronRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 3: Dedicated Teachers */}
              {activeSlide === 3 && (
                <div>
                  <div className="max-w-xl mb-6">
                    <h2 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-white mb-2">
                      {slide.title} <span className="text-gradient-blue">{slide.titleHighlight}</span>
                    </h2>
                    <p className="text-[#A8B7C9] text-sm sm:text-base">{slide.desc}</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6 max-w-3xl">
                    {teachers.map((t) => (
                      <div
                        key={t.id}
                        className="p-6 rounded-2xl bg-[#0D1B2A]/90 backdrop-blur-xl border border-white/10 hover:border-[#38BDF8]/40 transition-all duration-300 flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-[#38BDF8]/10 border border-[#38BDF8]/30 flex items-center justify-center font-heading font-bold text-[#38BDF8]">
                              {t.subject[0]}
                            </div>
                            <div>
                              <h4 className="font-heading font-bold text-white text-base">{t.name}</h4>
                              <p className="text-xs text-[#38BDF8] font-mono">{t.subject} Specialist · Classes {t.classes}</p>
                            </div>
                          </div>
                          <p className="text-xs text-[#A8B7C9] leading-relaxed mb-4">{t.bio}</p>
                        </div>

                        <Link
                          to="/teachers"
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#38BDF8] hover:text-white transition-colors"
                        >
                          View Teacher Profile <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SLIDE 4: Final Call to Action */}
              {activeSlide === 4 && (
                <div className="max-w-xl">
                  <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight mb-4">
                    {slide.title} <br />
                    <span className="text-gradient-blue">{slide.titleHighlight}</span>
                  </h2>
                  <p className="text-[#A8B7C9] text-base sm:text-lg leading-relaxed mb-8">
                    {slide.desc}
                  </p>

                  <div className="flex flex-wrap items-center gap-4">
                    <Link
                      to="/contact"
                      className="px-8 py-3.5 rounded-full bg-[#38BDF8] text-[#07111F] font-bold text-sm transition-all duration-300 hover:bg-[#38BDF8]/90 hover:shadow-[0_0_30px_rgba(56,189,248,0.6)] hover:-translate-y-0.5 flex items-center gap-2"
                    >
                      <span>Enroll / Enquire Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      to="/about"
                      className="px-7 py-3.5 rounded-full border border-white/20 hover:border-white/50 text-white font-medium text-sm backdrop-blur-md hover:bg-white/5 transition-all duration-300"
                    >
                      About PHYSICHEM
                    </Link>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Bar with Mouse Indicator + Progress */}
        <div className="relative z-20 max-w-7xl w-full mx-auto px-6 sm:px-10 pb-6 sm:pb-8 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] font-mono text-[#A8B7C9]/60">
            <span>SCROLL CONTROL</span>
            <span>·</span>
            <span>SLIDE {activeSlide + 1} OF {SLIDES.length}</span>
          </div>

          {/* Mouse Icon matching XW video */}
          <div className="hidden sm:flex flex-col items-center gap-1.5 text-xs text-[#A8B7C9]/80 font-mono">
            <div className="w-5 h-8 rounded-full border-2 border-white/30 flex items-start justify-center p-1">
              <div className="w-1 h-2 rounded-full bg-[#38BDF8] animate-bounce" />
            </div>
            <span className="text-[10px] tracking-wider uppercase">Scroll</span>
          </div>

          <div className="w-32 sm:w-48 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#38BDF8] to-[#22D3EE] transition-all duration-150"
              style={{ width: `${Math.max(10, scrollProgress * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
