import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 96;
const FRAME_PATH = '/frames/frame-';

function getFrameSrc(index) {
  const num = String(index).padStart(3, '0');
  return `${FRAME_PATH}${num}.webp`;
}

export default function FrameSequenceLanding({ onComplete }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isFirstFrameLoaded, setIsFirstFrameLoaded] = useState(false);

  const renderFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = imagesRef.current[frameIndex] || imagesRef.current[0];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Draw image covering the canvas (cover mode)
    const scale = Math.max(canvas.width / img.naturalWidth, canvas.height / img.naturalHeight);
    const x = (canvas.width - img.naturalWidth * scale) / 2;
    const y = (canvas.height - img.naturalHeight * scale) / 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
  }, []);

  // Preload first frame immediately for instant first paint
  useEffect(() => {
    const firstImg = new Image();
    firstImg.src = getFrameSrc(0);
    firstImg.onload = () => {
      imagesRef.current[0] = firstImg;
      setIsFirstFrameLoaded(true);
      renderFrame(0);
    };

    // Preload remaining frames in background
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);
      imagesRef.current[i] = img;
    }
  }, [renderFrame]);

  // Setup GSAP scroll scrubbing
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: canvasRef.current,
        scrub: 0.3,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
          const frameIndex = Math.min(
            TOTAL_FRAMES - 1,
            Math.floor(self.progress * TOTAL_FRAMES)
          );
          currentFrameRef.current = frameIndex;
          renderFrame(frameIndex);

          if (self.progress >= 0.98 && onComplete) {
            onComplete();
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [renderFrame, onComplete]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      renderFrame(currentFrameRef.current);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [renderFrame]);

  const scrollToMain = () => {
    const target = document.getElementById('main-showcase');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight * 2.5, behavior: 'smooth' });
    }
  };

  // The overlay opacity drops to 0 as soon as user scrolls past 30% of the prologue
  const overlayOpacity = Math.max(0, 1 - scrollProgress * 3.5);
  // Entire prologue container unmounts from view once scroll passes it
  const isPastPrologue = scrollProgress >= 0.99;

  return (
    <section ref={containerRef} className="relative bg-[#07111F]" style={{ height: '240vh' }}>
      {/* Fallback poster image behind canvas to prevent any black flicker */}
      <img
        src="/frames/poster.webp"
        alt="PHYSICHEM Concept Intro"
        className={`absolute inset-0 w-full h-screen object-cover pointer-events-none transition-opacity duration-700 ${
          isFirstFrameLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Canvas for smooth scroll frame playback */}
      <canvas
        ref={canvasRef}
        className="w-screen h-screen block pointer-events-none"
        style={{ position: 'sticky', top: 0, zIndex: 10 }}
      />

      {/* Cinematic Overlay: ONLY visible during the first 30% of prologue, then fades away completely */}
      {!isPastPrologue && (
        <div
          className="fixed inset-0 z-20 pointer-events-none flex flex-col justify-between p-6 sm:p-10 lg:p-14 transition-opacity duration-200"
          style={{ opacity: overlayOpacity }}
        >
          {/* Top Header bar inside prologue */}
          <div className="flex items-center justify-between pointer-events-auto">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[11px] font-mono tracking-widest text-[#38BDF8] border border-white/10 flex items-center gap-1.5 shadow-lg shadow-black/40">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-ping" />
                000 / 005 · PROLOGUE
              </span>
              <span className="hidden sm:inline-block text-xs font-mono text-[#A8B7C9]/60 tracking-wider">
                QUANTUM FOUNDATION
              </span>
            </div>

            <button
              onClick={scrollToMain}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-xl border border-white/20 text-white text-xs font-medium tracking-wide transition-all duration-300 hover:border-[#38BDF8]/60 hover:shadow-lg hover:shadow-[#38BDF8]/25 pointer-events-auto group cursor-pointer"
            >
              <span>Skip to Website</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#38BDF8] transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          {/* Subtitle / Brand bar placed below face so it never obscures the sculpture eyes */}
          <div className="text-center max-w-xl mx-auto mt-auto mb-16 transition-all duration-500">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-xl border border-white/10 text-xs text-[#38BDF8] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
              <span>PHYSICS & CHEMISTRY COACHING · CLASSES 9–12</span>
            </div>

            <h1 className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] mb-2">
              PHYSI<span className="text-gradient-blue">CHEM</span>
            </h1>

            <p className="text-[#A8B7C9] text-sm sm:text-base font-body max-w-md mx-auto font-normal leading-relaxed drop-shadow-md">
              Understand the Concept. Master the Science.
            </p>
          </div>

          {/* Bottom Bar: Mouse Scroll Indicator */}
          <div className="flex flex-col items-center gap-3">
            <button
              onClick={scrollToMain}
              className="pointer-events-auto flex flex-col items-center gap-2 text-[#A8B7C9] hover:text-white transition-colors cursor-pointer group"
            >
              <div className="w-5 h-9 rounded-full border-2 border-white/40 group-hover:border-[#38BDF8] flex items-start justify-center p-1 transition-colors bg-black/30 backdrop-blur-sm">
                <div className="w-1 h-2 rounded-full bg-[#38BDF8] animate-bounce" />
              </div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#A8B7C9]/80 group-hover:text-white transition-colors">
                Scroll To Enter
              </span>
            </button>

            {/* Scroll progress line */}
            <div className="w-40 sm:w-56 h-0.5 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#38BDF8] to-[#22D3EE] transition-all duration-100 ease-out"
                style={{ width: `${Math.max(5, scrollProgress * 100)}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
