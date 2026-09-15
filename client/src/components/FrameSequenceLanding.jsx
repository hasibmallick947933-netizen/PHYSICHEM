import { useEffect, useRef, useState, useCallback } from 'react';
import { Sparkles, ArrowDown, ArrowRight } from 'lucide-react';

const TOTAL_FRAMES = 96;
const FRAME_PATH = '/frames/frame-';

function getFrameSrc(index) {
  const num = String(index).padStart(3, '0');
  return `${FRAME_PATH}${num}.webp`;
}

export default function FrameSequenceLanding() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const [isFirstFrameLoaded, setIsFirstFrameLoaded] = useState(false);

  const renderFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = imagesRef.current[frameIndex] || imagesRef.current[0];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

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

    // Preload remaining frames
    for (let i = 1; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);
      imagesRef.current[i] = img;
    }
  }, [renderFrame]);

  // Gentle auto-playback of the sculpture animation
  useEffect(() => {
    let animId;
    let forward = true;
    let lastTime = performance.now();

    const animate = (time) => {
      // Advance 1 frame every ~40ms (25fps)
      if (time - lastTime > 40) {
        lastTime = time;
        if (forward) {
          if (currentFrameRef.current < TOTAL_FRAMES - 1) {
            currentFrameRef.current += 1;
          } else {
            forward = false;
          }
        } else {
          if (currentFrameRef.current > 0) {
            currentFrameRef.current -= 1;
          } else {
            forward = true;
          }
        }
        renderFrame(currentFrameRef.current);
      }
      animId = requestAnimationFrame(animate);
    };

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [renderFrame]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      renderFrame(currentFrameRef.current);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [renderFrame]);

  const scrollToWebsite = () => {
    const target = document.getElementById('main-showcase');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen bg-[#07111F] overflow-hidden select-none"
    >
      {/* Fallback poster image behind canvas */}
      <img
        src="/frames/poster.webp"
        alt="PHYSICHEM Concept"
        className={`absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-700 ${
          isFirstFrameLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Canvas for smooth animation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block pointer-events-none"
      />

      {/* Dark gradient vignettes at top and bottom to ensure text readability without obscuring the sculpture face */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/85 pointer-events-none" />

      {/* Content Overlay: ABSOLUTE positioned so it scrolls UP naturally and NEVER overlaps with the website! */}
      <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-10 lg:p-14 pointer-events-none">
        {/* Top Header */}
        <div className="flex items-center justify-between pointer-events-auto">
          <div className="flex items-center gap-3">
            <span className="font-heading text-xl font-bold tracking-tight text-white">
              PHYSI<span className="text-[#38BDF8]">CHEM</span>
            </span>
            <span className="hidden sm:inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-mono tracking-widest text-[#38BDF8] border border-white/10">
              CLASSES 9–12 · SCIENCE
            </span>
          </div>

          <button
            onClick={scrollToWebsite}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-xl border border-white/20 text-white text-xs font-semibold tracking-wide transition-all duration-300 hover:border-[#38BDF8]/60 hover:shadow-lg hover:shadow-[#38BDF8]/25 cursor-pointer group"
          >
            <span>Enter Website</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#38BDF8] transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>

        {/* Bottom Bar: Clean brand headline + Scroll indicator placed safely at the very bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pointer-events-auto">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-xs text-[#38BDF8] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#22D3EE]" />
              <span>CONCEPT-FIRST PHYSICS & CHEMISTRY</span>
            </div>
            <h1 className="font-heading text-2xl sm:text-4xl font-bold text-white tracking-tight">
              Understand the Concept. <span className="text-[#38BDF8]">Master the Science.</span>
            </h1>
          </div>

          {/* Mouse Scroll / Enter Button */}
          <button
            onClick={scrollToWebsite}
            className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/20 text-white text-xs font-mono uppercase tracking-wider transition-all duration-300 cursor-pointer group"
          >
            <div className="w-4 h-6 rounded-full border border-white/50 flex items-start justify-center p-0.5">
              <div className="w-1 h-1.5 rounded-full bg-[#38BDF8] animate-bounce" />
            </div>
            <span>Scroll to Explore</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#38BDF8] transition-transform duration-300 group-hover:translate-y-0.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
