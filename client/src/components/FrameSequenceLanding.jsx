import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 287;
const FRAME_PATH = '/frames/ezgif-frame-';

function getFrameSrc(index) {
  const num = String(index).padStart(3, '0');
  return `${FRAME_PATH}${num}.png`;
}

export default function FrameSequenceLanding() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const imagesRef = useRef([]);
  const currentFrameRef = useRef(0);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  const renderFrame = useCallback((frameIndex) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Draw image covering the canvas (cover mode)
    const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
    const x = (canvas.width - img.width * scale) / 2;
    const y = (canvas.height - img.height * scale) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
  }, []);

  useEffect(() => {
    // Skip animation for reduced motion
    if (prefersReducedMotion.current) {
      setIsReady(true);
      return;
    }

    // Preload images
    let loadedCount = 0;
    const images = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);
      img.onload = () => {
        loadedCount++;
        setLoadProgress(Math.floor((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) {
          setIsReady(true);
          renderFrame(0);
        }
      };
      img.onerror = () => {
        loadedCount++;
        setLoadProgress(Math.floor((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) {
          setIsReady(true);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;

    return () => {
      images.forEach(img => { img.onload = null; img.onerror = null; });
    };
  }, [renderFrame]);

  useEffect(() => {
    if (!isReady || prefersReducedMotion.current) return;

    const ctx = gsap.context(() => {
      gsap.to(currentFrameRef, {
        current: TOTAL_FRAMES - 1,
        ease: 'none',
        snap: 'current',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom bottom',
          pin: canvasRef.current,
          scrub: 0.5,
          onUpdate: (self) => {
            const frameIndex = Math.floor(self.progress * (TOTAL_FRAMES - 1));
            renderFrame(frameIndex);
          },
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isReady, renderFrame]);

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current && imagesRef.current[currentFrameRef.current]) {
        renderFrame(currentFrameRef.current);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [renderFrame]);

  if (prefersReducedMotion.current) {
    return null;
  }

  return (
    <div ref={containerRef} className="relative" style={{ height: '500vh' }}>
      {/* Loading overlay */}
      {!isReady && (
        <div className="fixed inset-0 z-50 bg-[#07111F] flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 mb-8">
            <span className="font-heading text-3xl font-bold">
              <span className="text-white">PHYSI</span>
              <span className="text-[#38BDF8]">CHEM</span>
            </span>
          </div>
          <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#38BDF8] to-[#22D3EE] rounded-full transition-all duration-300"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
          <p className="mt-4 text-[#A8B7C9] text-sm font-body">
            Loading experience... {loadProgress}%
          </p>
        </div>
      )}

      {/* Canvas */}
      <canvas
        ref={canvasRef}
        className="w-screen h-screen"
        style={{ position: 'sticky', top: 0 }}
      />

      {/* Overlay branding that fades in at the end */}
      <div className="absolute bottom-0 left-0 right-0 h-screen flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <h1 className="font-heading text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-2xl">
            <span className="text-white">PHYSI</span>
            <span className="text-[#38BDF8]">CHEM</span>
          </h1>
          <p className="text-[#A8B7C9] text-lg md:text-xl font-body">
            Understand the Concept. Master the Science.
          </p>
        </div>
      </div>
    </div>
  );
}
