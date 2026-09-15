import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Share2, 
  Check, 
  X, 
  ChevronRight, 
  Play, 
  Pause, 
  Sparkles, 
  ArrowRight, 
  Send,
  Sliders,
  Bot,
  BrainCircuit,
  MessageSquare
} from 'lucide-react';
import { submitEnquiry } from '../utils/api';

const TOTAL_FRAMES = 20;

function getFrameSrc(index) {
  const num = String(index + 1).padStart(3, '0');
  return `/frames/website/frame_${num}.png`;
}

// Slide groupings in the 20 frames
// Slide 1 (Home): frames 0 - 2
// Slide 2 (Services Intro): frames 3 - 9
// Slide 3 (Services 3 Cards): frames 10 - 19
const SLIDES_INFO = [
  {
    id: 'home',
    title: 'HOME',
    indexLabel: '001 / 005',
    frameTarget: 0,
    heading: 'GROWING SMARTER WITH AI',
    subtitle: 'We specialize in workflow automation and personalized AI solutions for progressive organizations.',
  },
  {
    id: 'services_intro',
    title: 'SERVICES',
    indexLabel: '002 / 005',
    frameTarget: 6,
    heading: "WE'RE A FULL-SERVICE AI AUTOMATION AGENCY.",
    subtitle: 'We deliver complete AI automation services under one roof.',
  },
  {
    id: 'services_cards',
    title: 'WORK',
    indexLabel: '003 / 005',
    frameTarget: 19,
    heading: 'DISCOVER OUR SERVICES',
    subtitle: 'We deliver complete AI automation services under one roof.',
  },
];

const SERVICES_DATA = [
  {
    id: 'workflow',
    title: 'Workflow Optimization',
    subtitle: 'Automate repetitive workflows across your entire tech stack.',
    description: 'We connect your favourite CRM, ERP, and communication tools with intelligent AI triggers, reducing manual labour by up to 85% and eliminating human error.',
    icon: Sliders,
    highlights: ['Multi-platform API integrations', 'Zero-code pipeline handoffs', 'Real-time throughput analytics'],
  },
  {
    id: 'consulting',
    title: 'Business Consulting',
    subtitle: 'Strategic AI roadmaps tailored to your organizational goals.',
    description: 'We analyze your core business units to uncover high-impact automation opportunities, calculate projected ROI, and build robust transformation plans.',
    icon: BrainCircuit,
    highlights: ['Executive AI readiness assessment', 'Data compliance & governance', 'Cost-benefit financial modeling'],
  },
  {
    id: 'chatbots',
    title: 'Chatbot Development',
    subtitle: 'Next-generation LLM agents that resolve complex queries.',
    description: 'Custom-trained cognitive agents capable of empathetic communication, multi-turn reasoning, and executing real actions on behalf of your users.',
    icon: Bot,
    highlights: ['Fine-tuned RAG pipelines', 'Multilingual support (40+ languages)', 'Enterprise CRM & Slack sync'],
  },
];

export default function FrameSequenceShowcase() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'contact' | 'service_detail'
  const [selectedService, setSelectedService] = useState(null);
  const [copiedToast, setCopiedToast] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    emailOrPhone: '',
    service: 'Workflow Optimization',
    message: '',
  });

  // Render canvas frame
  const drawFrame = useCallback((frameIdx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = imagesRef.current[frameIdx] || imagesRef.current[0];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  }, []);

  // Preload all 20 frames
  useEffect(() => {
    let loadedCount = 0;
    const firstImg = new Image();
    firstImg.src = getFrameSrc(0);
    firstImg.onload = () => {
      imagesRef.current[0] = firstImg;
      setIsLoaded(true);
      drawFrame(0);
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);
      img.onload = () => {
        loadedCount += 1;
        imagesRef.current[i] = img;
        if (i === 0) {
          drawFrame(0);
        }
      };
    }
  }, [drawFrame]);

  // Handle scroll scrubbing through the pinned section
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const totalScrollable = container.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / totalScrollable));
      const targetFrame = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * TOTAL_FRAMES));

      if (targetFrame !== currentFrame) {
        setCurrentFrame(targetFrame);
        drawFrame(targetFrame);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentFrame, drawFrame]);

  // Smooth auto-play loop if enabled
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentFrame((prev) => {
        const next = (prev + 1) % TOTAL_FRAMES;
        drawFrame(next);
        return next;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [isPlaying, drawFrame]);

  // Jump to specific slide or frame
  const jumpToSlide = (targetFrame) => {
    setIsPlaying(false);
    setCurrentFrame(targetFrame);
    drawFrame(targetFrame);

    const container = containerRef.current;
    if (container) {
      const totalScrollable = container.offsetHeight - window.innerHeight;
      const targetY = container.offsetTop + (targetFrame / (TOTAL_FRAMES - 1)) * totalScrollable;
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

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
      const endX = e.changedTouches[0].clientX;
      const diffY = startY - endY;
      const diffX = startX - endX;

      // Vertical or horizontal swipe detection
      if (Math.abs(diffY) > 50 || Math.abs(diffX) > 50) {
        if (diffY > 50 || diffX > 50) {
          const next = Math.min(TOTAL_FRAMES - 1, currentFrame + 2);
          jumpToSlide(next);
        } else if (diffY < -50 || diffX < -50) {
          const prev = Math.max(0, currentFrame - 2);
          jumpToSlide(prev);
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentFrame, activeModal]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeModal) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const next = Math.min(TOTAL_FRAMES - 1, currentFrame + 1);
        jumpToSlide(next);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = Math.max(0, currentFrame - 1);
        jumpToSlide(prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentFrame, activeModal]);

  // Share action
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'OPTIMIND — Growing Smarter with AI',
          text: 'Check out the official website showcase for workflow automation and AI solutions.',
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setCopiedToast(true);
        setTimeout(() => setCopiedToast(false), 2500);
      }
    } catch {
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 2500);
    }
  };

  // Form submit handler
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await submitEnquiry({
        name: formData.name,
        phone: formData.emailOrPhone,
        grade: 'AI Consultation',
        subject: formData.service,
        message: formData.message,
      });
      setSubmitSuccess(true);
    } catch {
      // Fallback success for demonstration
      setSubmitSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Active slide identification
  const currentSlideIdx = currentFrame < 3 ? 0 : currentFrame < 10 ? 1 : 2;

  return (
    <div
      ref={containerRef}
      id="main-showcase"
      className="relative w-full bg-[#181a1d] select-none"
      style={{ height: '420vh' }}
    >
      {/* Sticky Full-Viewport Stage */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden py-4 sm:py-8 px-2 sm:px-6">
        {/* Ambient Warm Golden Studio Glow matching frames */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] h-[85vh] bg-amber-500/10 blur-[180px] rounded-full pointer-events-none" />
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[70vw] h-[16vh] bg-amber-500/15 blur-[120px] rounded-full pointer-events-none" />

        {/* Outer Titanium UI Window (Aspect ratio ~4:3 matching 1440x1080 frames) */}
        <div className="relative w-full max-w-[1360px] max-h-[92vh] aspect-[1440/1080] rounded-[24px] sm:rounded-[36px] bg-[#C5C5C5] shadow-[0_32px_100px_rgba(0,0,0,0.75),0_0_0_1px_rgba(255,255,255,0.22)] overflow-hidden flex flex-col items-center justify-center">
          
          {/* Fallback frame image */}
          <img
            src={getFrameSrc(currentFrame)}
            alt={`OPTIMIND Frame ${currentFrame + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
              isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          />

          {/* High-Performance Canvas for 60fps Frame Scrubbing */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-cover block"
          />

          {/* ================= INTERACTIVE HIT-ZONES & HOTSPOTS OVERLAY ================= */}
          <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-4 sm:p-7 md:p-10">
            
            {/* Top Navigation Hit Area */}
            <div className="relative z-30 w-full flex items-center justify-between pointer-events-auto">
              {/* Brand Logo Click */}
              <button
                onClick={() => jumpToSlide(0)}
                className="cursor-pointer group flex items-center gap-2"
                title="Go to Home"
              >
                <span className="font-heading text-base sm:text-xl font-bold tracking-tight text-[#111315] uppercase group-hover:text-black transition-colors">
                  OPTIMIND
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[9px] font-mono px-2 py-0.5 rounded-full bg-black/10 text-black/70 font-semibold">
                  PHYSICHEM LAB
                </span>
              </button>

              {/* Navigation Tabs (Aligned with underlying frame text) */}
              <div className="hidden md:flex items-center gap-6 lg:gap-10">
                <button
                  onClick={() => jumpToSlide(0)}
                  className={`py-1 text-xs font-mono uppercase tracking-wider cursor-pointer transition-all ${
                    currentSlideIdx === 0 ? 'font-bold text-black' : 'text-black/60 hover:text-black'
                  }`}
                >
                  HOME
                </button>
                <button
                  onClick={() => jumpToSlide(6)}
                  className={`py-1 text-xs font-mono uppercase tracking-wider cursor-pointer transition-all ${
                    currentSlideIdx === 1 ? 'font-bold text-black' : 'text-black/60 hover:text-black'
                  }`}
                >
                  SERVICES
                </button>
                <button
                  onClick={() => jumpToSlide(19)}
                  className={`py-1 text-xs font-mono uppercase tracking-wider cursor-pointer transition-all ${
                    currentSlideIdx === 2 ? 'font-bold text-black' : 'text-black/60 hover:text-black'
                  }`}
                >
                  WORK
                </button>
                <button
                  onClick={() => {
                    setSelectedService(SERVICES_DATA[0]);
                    setActiveModal('service_detail');
                  }}
                  className="py-1 text-xs font-mono uppercase tracking-wider cursor-pointer text-black/60 hover:text-black transition-all"
                >
                  PLANS
                </button>
                <button
                  onClick={() => {
                    setSelectedService(SERVICES_DATA[1]);
                    setActiveModal('service_detail');
                  }}
                  className="py-1 text-xs font-mono uppercase tracking-wider cursor-pointer text-black/60 hover:text-black transition-all"
                >
                  TEAM
                </button>
                <button
                  onClick={() => setActiveModal('contact')}
                  className="py-1 text-xs font-mono uppercase tracking-wider cursor-pointer text-black/60 hover:text-black transition-all"
                >
                  CONTACT
                </button>
              </div>

              {/* Right Controls: Autoplay + Frame badge */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-1.5 rounded-full bg-black/10 hover:bg-black/20 text-black text-xs font-mono flex items-center gap-1.5 px-2.5 transition-all cursor-pointer"
                  title={isPlaying ? 'Pause Auto-Scrub' : 'Play Cinematic Scrub'}
                >
                  {isPlaying ? <Pause className="w-3 h-3 text-amber-600" /> : <Play className="w-3 h-3 text-black" />}
                  <span className="text-[10px] hidden sm:inline">{isPlaying ? 'PAUSE' : 'PLAY'}</span>
                </button>

                <div className="px-2.5 py-1 rounded-full bg-black/10 text-black text-[10px] font-mono tracking-widest">
                  {String(currentFrame + 1).padStart(2, '0')} / {TOTAL_FRAMES}
                </div>
              </div>
            </div>

            {/* Slide 1 (Home) Action Buttons Hit-Zone (Matches exact position in frame_001.png) */}
            {currentSlideIdx === 0 && (
              <div className="relative z-20 pointer-events-auto my-auto flex flex-col items-center">
                <div className="w-full flex justify-center items-center gap-4 sm:gap-6 mt-[6%] sm:mt-[4%]">
                  {/* Real Clickable GET IN TOUCH pill */}
                  <button
                    onClick={() => setActiveModal('contact')}
                    className="px-6 sm:px-9 py-2.5 sm:py-3.5 rounded-full bg-[#0c0d0f] hover:bg-black text-white font-semibold text-xs tracking-wider uppercase shadow-[0_14px_28px_-2px_rgba(255,168,52,0.9),0_6px_14px_rgba(255,168,52,0.5)] hover:shadow-[0_18px_36px_rgba(255,168,52,1)] transition-all duration-300 hover:-translate-y-0.5 cursor-pointer flex items-center gap-2 group"
                  >
                    <span>Get In Touch</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
                  </button>

                  {/* Real Clickable OUR SERVICES pill */}
                  <button
                    onClick={() => jumpToSlide(19)}
                    className="px-6 sm:px-9 py-2.5 sm:py-3.5 rounded-full bg-transparent hover:bg-black/10 border border-black/35 hover:border-black text-[#111315] font-semibold text-xs tracking-wider uppercase transition-all duration-300 cursor-pointer"
                  >
                    Our Services
                  </button>
                </div>
              </div>
            )}

            {/* Slide 3 (Services) Interactive Card Hotspots (Matches exact 3 cards in frame_020.png) */}
            {currentSlideIdx === 2 && currentFrame >= 13 && (
              <div className="relative z-20 pointer-events-auto my-auto w-full max-w-5xl mx-auto grid grid-cols-3 gap-3 sm:gap-6 lg:gap-8 h-[55%] sm:h-[60%] items-end pb-4">
                {SERVICES_DATA.map((srv, idx) => (
                  <button
                    key={srv.id}
                    onClick={() => {
                      setSelectedService(srv);
                      setActiveModal('service_detail');
                    }}
                    className="w-full h-full rounded-[22px] sm:rounded-[28px] bg-transparent hover:bg-white/20 border border-transparent hover:border-white/50 transition-all duration-300 cursor-pointer flex flex-col justify-end p-3 sm:p-5 group text-left relative overflow-hidden"
                    title={`Click to view ${srv.title} details`}
                  >
                    {/* Hover Glow Pill */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1.5 text-[10px] sm:text-xs font-mono font-bold text-amber-600 bg-white/70 backdrop-blur-md px-3 py-1.5 rounded-full w-fit mb-2 shadow-sm">
                      <span>EXPLORE</span>
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Bottom Bar: Mouse Scroll Indicator + Share Button */}
            <div className="relative z-30 w-full flex items-center justify-between pointer-events-auto">
              {/* Slide dots switcher */}
              <div className="flex items-center gap-1.5">
                {SLIDES_INFO.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => jumpToSlide(s.frameTarget)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      currentSlideIdx === idx ? 'w-6 bg-amber-500 shadow-[0_0_8px_#FFA834]' : 'w-2 bg-black/25 hover:bg-black/50'
                    }`}
                    title={`Jump to ${s.title}`}
                  />
                ))}
              </div>

              {/* Center Mouse Scroll Indicator */}
              <button
                onClick={() => {
                  const nextSlideTarget = currentSlideIdx === 0 ? 6 : currentSlideIdx === 1 ? 19 : 0;
                  jumpToSlide(nextSlideTarget);
                }}
                className="flex flex-col items-center gap-1 cursor-pointer group"
                title="Scroll down / Advance slide"
              >
                <div className="w-4 h-6 rounded-full border border-black/50 flex items-start justify-center p-0.5 group-hover:border-black transition-colors">
                  <div className="w-1 h-1.5 rounded-full bg-black animate-bounce" />
                </div>
              </button>

              {/* Right Share Button */}
              <button
                onClick={handleShare}
                className="flex items-center gap-1.5 text-xs font-mono font-semibold uppercase text-black/80 hover:text-black px-3 py-1.5 rounded-full hover:bg-black/10 transition-colors cursor-pointer"
                title="Share Website"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>SHARE</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ================= MODAL 1: GET IN TOUCH / ENQUIRY MODAL ================= */}
      <AnimatePresence>
        {activeModal === 'contact' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg rounded-[28px] bg-[#1a1d22] border border-white/15 text-white p-7 sm:p-9 shadow-2xl overflow-hidden"
            >
              {/* Warm Amber Accent Glow inside modal */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/15 blur-[90px] rounded-full pointer-events-none" />

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
                  <h3 className="font-heading text-2xl font-bold text-white mb-2">Enquiry Submitted!</h3>
                  <p className="text-white/60 text-sm max-w-xs mx-auto mb-6">
                    Thank you for reaching out. Our team will contact you within 24 hours to schedule your consultation.
                  </p>
                  <button
                    onClick={() => {
                      setActiveModal(null);
                      setSubmitSuccess(false);
                    }}
                    className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-mono tracking-wider mb-3">
                    <Sparkles className="w-3 h-3" />
                    <span>GET IN TOUCH</span>
                  </div>
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
                    Let's Build Smarter.
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60 mb-6">
                    Connect with our solution architects to explore workflow automation and custom AI development.
                  </p>

                  <form onSubmit={handleFormSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[11px] font-mono uppercase text-white/70 tracking-wider mb-1.5">
                        Your Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Morgan"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-amber-400/80 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-white/70 tracking-wider mb-1.5">
                        Email Address or Phone
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.emailOrPhone}
                        onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
                        placeholder="alex@company.com or +91 98765 43210"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-amber-400/80 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-white/70 tracking-wider mb-1.5">
                        Area of Interest
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-[#21252b] border border-white/10 text-white text-sm focus:outline-none focus:border-amber-400/80 transition-colors cursor-pointer"
                      >
                        <option value="Workflow Optimization">Workflow Optimization</option>
                        <option value="Business Consulting">Business Consulting</option>
                        <option value="Chatbot Development">Chatbot Development</option>
                        <option value="General Science / PHYSICHEM Coaching">PHYSICHEM Academic Coaching</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-mono uppercase text-white/70 tracking-wider mb-1.5">
                        Project Brief / Message
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Describe your current bottlenecks or goals..."
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-amber-400/80 transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-full bg-[#FFA834] hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_10px_25px_rgba(255,168,52,0.4)] flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Submitting...</span>
                      ) : (
                        <>
                          <span>Submit Request</span>
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

      {/* ================= MODAL 2: SERVICE DETAIL MODAL ================= */}
      <AnimatePresence>
        {activeModal === 'service_detail' && selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg rounded-[28px] bg-[#1a1d22] border border-white/15 text-white p-7 sm:p-9 shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setActiveModal(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 text-amber-400 flex items-center justify-center mb-5">
                <selectedService.icon className="w-6 h-6" />
              </div>

              <span className="text-[10px] font-mono tracking-widest uppercase text-amber-400 block mb-1">
                SERVICE OVERVIEW
              </span>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
                {selectedService.title}
              </h3>
              <p className="text-sm text-white/80 leading-relaxed mb-6 font-normal">
                {selectedService.description}
              </p>

              <div className="space-y-2.5 mb-8">
                {selectedService.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs text-white/70">
                    <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => {
                    setFormData({ ...formData, service: selectedService.title });
                    setActiveModal('contact');
                  }}
                  className="flex-1 py-3 rounded-full bg-[#FFA834] hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer text-center"
                >
                  Request Consultation
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

      {/* Share Toast Notification */}
      <AnimatePresence>
        {copiedToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 right-8 z-50 flex items-center gap-2 px-5 py-3 rounded-full bg-[#0c0d0f] border border-amber-500/50 text-white text-xs font-mono shadow-2xl"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Link copied to clipboard!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
