import { useEffect, useRef } from 'react';

export default function ParticleNetwork3D({ currentSlide }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate 3D points
    const NUM_PARTICLES = 130;
    const particles = [];
    for (let i = 0; i < NUM_PARTICLES; i++) {
      // Spherical distribution
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(Math.random() * 2 - 1);
      const isCore = Math.random() < 0.35;
      const baseRadius = isCore ? 40 + Math.random() * 50 : 120 + Math.random() * 80;

      particles.push({
        theta,
        phi,
        baseRadius,
        currentRadius: baseRadius,
        isCore,
        size: isCore ? 2 + Math.random() * 2.5 : 1.2 + Math.random() * 1.5,
        color: isCore
          ? (Math.random() < 0.6 ? '#FFA834' : '#FF5A1F')
          : (Math.random() < 0.4 ? '#FFA834' : '#33373E'),
        pulseSpeed: 0.02 + Math.random() * 0.04,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    let rotX = 0.2;
    let rotY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = nx * 0.4;
      mouseY = ny * 0.4;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let time = 0;

    const render = () => {
      time += 0.012;
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const fov = 340;

      // Target expansion based on slide
      const isExpanded = currentSlide === 1; // Slide 2 expands into ring
      const targetRadiusMultiplier = isExpanded ? 1.5 : 1.0;

      // Smooth rotation
      rotY += 0.006 + (mouseX - rotY) * 0.05;
      rotX += (mouseY - rotX) * 0.05;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      // Draw faint concentric background orbital rings
      const ringScale = isExpanded ? 1.15 : 1.0;
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.lineWidth = 1;
      
      // Orbital 1
      ctx.beginPath();
      ctx.ellipse(0, 0, 180 * ringScale, 180 * ringScale, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Orbital 2
      ctx.beginPath();
      ctx.ellipse(0, 0, 240 * ringScale, 240 * ringScale, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Orbital 3 (tilted)
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.12)';
      ctx.beginPath();
      ctx.ellipse(0, 0, 210 * ringScale, 90 * ringScale, rotY * 0.3, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Project particles to 2D
      const projected = [];
      for (let i = 0; i < NUM_PARTICLES; i++) {
        const p = particles[i];
        
        // Morph radius
        p.currentRadius += ((p.baseRadius * targetRadiusMultiplier) - p.currentRadius) * 0.06;
        
        // Dynamic pulsating
        const pulse = Math.sin(time * 3 + p.pulseOffset) * 4;
        const r = p.currentRadius + (p.isCore ? pulse : 0);

        // Spherical coords to 3D Cartesian
        let x = r * Math.sin(p.phi) * Math.cos(p.theta);
        let y = r * Math.sin(p.phi) * Math.sin(p.theta);
        let z = r * Math.cos(p.phi);

        // If ring mode (slide 1), squash Y to form a disk / torus
        if (isExpanded) {
          y = y * 0.35 + Math.sin(p.theta * 3 + time) * 15;
        }

        // Rotate Y
        const x1 = x * cosY - z * sinY;
        const z1 = z * cosY + x * sinY;

        // Rotate X
        const y2 = y * cosX - z1 * sinX;
        const z2 = z1 * cosX + y * sinX;

        // Perspective projection
        const scale = fov / (fov + z2 + 200);
        const px = centerX + x1 * scale;
        const py = centerY + y2 * scale;
        const alpha = Math.max(0.1, Math.min(1, (z2 + 250) / 450));

        projected.push({
          px,
          py,
          scale,
          alpha,
          z: z2,
          isCore: p.isCore,
          size: p.size * scale,
          color: p.color,
        });
      }

      // Sort by depth (back to front)
      projected.sort((a, b) => a.z - b.z);

      // Draw constellation connecting lines between close points
      ctx.lineWidth = 0.75;
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];
          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const distSq = dx * dx + dy * dy;
          const maxDist = 58 * ((p1.scale + p2.scale) / 2);

          if (distSq < maxDist * maxDist) {
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / maxDist) * 0.35 * Math.min(p1.alpha, p2.alpha);
            
            if (p1.isCore || p2.isCore) {
              ctx.strokeStyle = `rgba(255, 168, 52, ${lineAlpha * 1.5})`;
            } else {
              ctx.strokeStyle = `rgba(30, 32, 38, ${lineAlpha * 0.8})`;
            }
            
            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.stroke();
          }
        }
      }

      // Draw glowing central energy nucleus
      const corePulse = 1 + Math.sin(time * 4) * 0.12;
      const coreRadius = (isExpanded ? 35 : 45) * corePulse;
      const coreGrad = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, coreRadius * 2
      );
      coreGrad.addColorStop(0, 'rgba(255, 230, 150, 0.85)');
      coreGrad.addColorStop(0.35, 'rgba(255, 160, 40, 0.45)');
      coreGrad.addColorStop(0.7, 'rgba(234, 88, 12, 0.15)');
      coreGrad.addColorStop(1, 'rgba(234, 88, 12, 0)');

      ctx.fillStyle = coreGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, coreRadius * 2, 0, Math.PI * 2);
      ctx.fill();

      // Draw particles with glowing points
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];

        if (p.isCore) {
          // Fiery particle with intense glow
          ctx.shadowColor = '#FFA834';
          ctx.shadowBlur = 10 * p.scale;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.px, p.py, p.size * 1.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0; // Reset
        } else {
          // Lattice node
          ctx.fillStyle = `rgba(30, 32, 38, ${p.alpha * 0.85})`;
          ctx.beginPath();
          ctx.arc(p.px, p.py, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [currentSlide]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full block pointer-events-none"
    />
  );
}
