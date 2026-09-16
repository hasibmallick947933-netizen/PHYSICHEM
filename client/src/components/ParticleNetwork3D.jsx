import { useEffect, useRef } from 'react';

/**
 * Enhanced 3D Atomic Energy & Particle Field
 * Renders a dynamic, perspective-projected atomic structure with concentric
 * orbital rings, orbiting electron wave packets, and an incandescent core.
 * Responds to section transitions with camera zooms and volumetric expansion.
 */
export default function ParticleNetwork3D({ currentSlide = 0 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
    };
    resize();
    window.addEventListener('resize', resize);

    // Particle pool: 220 particles with dual nature (core nucleus & outer quantum cloud)
    const NUM_PARTICLES = 240;
    const particles = [];
    for (let i = 0; i < NUM_PARTICLES; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(Math.random() * 2 - 1);
      const isCore = Math.random() < 0.42;
      const baseRadius = isCore ? 45 + Math.random() * 65 : 160 + Math.random() * 140;

      particles.push({
        theta,
        phi,
        baseRadius,
        currentRadius: baseRadius,
        isCore,
        size: isCore ? 2.5 + Math.random() * 3.5 : 1.5 + Math.random() * 2.2,
        color: isCore
          ? (Math.random() < 0.7 ? '#FFA834' : '#FF6B00')
          : (Math.random() < 0.4 ? '#38BDF8' : '#1A202C'),
        speed: (Math.random() - 0.5) * 0.015,
        orbitTilt: (Math.random() - 0.5) * 0.4,
      });
    }

    // 4 Quantum orbital paths with traveling wave packets
    const orbits = [
      { radius: 190, tiltX: 0.85, tiltY: 0.35, speed: 0.024, packetAngle: 0, color: '#FFA834' },
      { radius: 260, tiltX: -0.65, tiltY: 0.75, speed: -0.018, packetAngle: Math.PI / 3, color: '#38BDF8' },
      { radius: 330, tiltX: 0.35, tiltY: -0.85, speed: 0.015, packetAngle: (2 * Math.PI) / 3, color: '#FFA834' },
      { radius: 400, tiltX: -0.25, tiltY: 0.45, speed: -0.012, packetAngle: Math.PI, color: '#22D3EE' },
    ];

    let rotX = 0.2;
    let rotY = 0;
    let targetRotX = 0.2;
    let targetRotY = 0;

    // Mouse interaction for interactive parallax
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY = nx * 0.65;
      targetRotX = 0.2 + ny * 0.45;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let time = 0;
    let zoomLevel = 1.0;
    let opacityLevel = 1.0;

    const render = () => {
      time += 0.016;
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Section-based camera target interpolation
      let targetZoom = 1.0;
      let targetOpacity = 1.0;

      if (currentSlide === 0) {
        targetZoom = 1.0;
        targetOpacity = 1.0;
      } else if (currentSlide === 1) {
        // Section 2: Camera zooms in 1.6x, turbulent energy field
        targetZoom = 1.55;
        targetOpacity = 1.0;
      } else if (currentSlide === 2) {
        // Section 3: Recedes to perimeter background for clean card contrast
        targetZoom = 0.9;
        targetOpacity = 0.22;
      } else {
        targetZoom = 0.85;
        targetOpacity = 0.15;
      }

      zoomLevel += (targetZoom - zoomLevel) * 0.05;
      opacityLevel += (targetOpacity - opacityLevel) * 0.05;

      ctx.save();
      ctx.globalAlpha = opacityLevel;

      const centerX = width / 2;
      const centerY = height / 2;
      const fov = 480 * dpr;

      // Smooth inertia rotation
      rotY += (targetRotY + time * 0.22 - rotY) * 0.045;
      rotX += (targetRotX - rotX) * 0.045;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      // 1. Draw central volumetric energy radial bloom
      const corePulse = Math.sin(time * 3) * 0.12 + 1.0;
      const bloomRadius = (currentSlide === 1 ? 140 : 90) * zoomLevel * dpr * corePulse;
      const bloomGrad = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, bloomRadius);
      bloomGrad.addColorStop(0, 'rgba(255, 168, 52, 0.42)');
      bloomGrad.addColorStop(0.35, 'rgba(255, 107, 0, 0.18)');
      bloomGrad.addColorStop(0.7, 'rgba(56, 189, 248, 0.08)');
      bloomGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = bloomGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, bloomRadius, 0, Math.PI * 2);
      ctx.fill();

      // 2. Draw 3D Orbital Rings with electron packets
      orbits.forEach((orbit, idx) => {
        orbit.packetAngle += orbit.speed;
        const orbitR = orbit.radius * zoomLevel * (width / (1100 * dpr));

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(orbit.tiltX + rotX * 0.3);

        // Orbital line
        ctx.beginPath();
        ctx.ellipse(0, 0, orbitR, orbitR * 0.48, orbit.tiltY + rotY * 0.2, 0, Math.PI * 2);
        ctx.strokeStyle = idx % 2 === 0 ? 'rgba(0, 0, 0, 0.09)' : 'rgba(255, 168, 52, 0.22)';
        ctx.lineWidth = 1.2 * dpr;
        ctx.stroke();

        // Traveling Electron Wave Packet
        const px = Math.cos(orbit.packetAngle) * orbitR;
        const py = Math.sin(orbit.packetAngle) * (orbitR * 0.48);

        // Packet glow
        const packetGrad = ctx.createRadialGradient(px, py, 0, px, py, 14 * dpr);
        packetGrad.addColorStop(0, orbit.color);
        packetGrad.addColorStop(0.5, 'rgba(255, 168, 52, 0.3)');
        packetGrad.addColorStop(1, 'rgba(255, 168, 52, 0)');
        ctx.fillStyle = packetGrad;
        ctx.beginPath();
        ctx.arc(px, py, 14 * dpr, 0, Math.PI * 2);
        ctx.fill();

        // Solid electron node
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(px, py, 2.5 * dpr, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      });

      // 3. Project and render 3D Particles
      const projected = [];
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.theta += p.speed;

        const effectiveRadius = p.baseRadius * zoomLevel * (width / (1050 * dpr));
        const x3d = effectiveRadius * Math.sin(p.phi) * Math.cos(p.theta);
        const y3d = effectiveRadius * Math.sin(p.phi) * Math.sin(p.theta);
        const z3d = effectiveRadius * Math.cos(p.phi);

        // Rotate Y
        const x1 = x3d * cosY - z3d * sinY;
        const z1 = z3d * cosY + x3d * sinY;

        // Rotate X
        const y2 = y3d * cosX - z1 * sinX;
        const z2 = z1 * cosX + y3d * sinX;

        const scale = fov / (fov + z2);
        if (scale > 0) {
          projected.push({
            x: centerX + x1 * scale,
            y: centerY + y2 * scale,
            z: z2,
            scale,
            size: p.size * scale * dpr,
            color: p.color,
            isCore: p.isCore,
          });
        }
      }

      // Sort by depth for correct 3D occlusion
      projected.sort((a, b) => a.z - b.z);

      // Render connecting lattice lines between nearby particles
      ctx.lineWidth = 0.7 * dpr;
      for (let i = 0; i < projected.length; i += 2) {
        for (let j = i + 1; j < Math.min(i + 7, projected.length); j++) {
          const dx = projected[i].x - projected[j].x;
          const dy = projected[i].y - projected[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 55 * dpr * zoomLevel;

          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * (projected[i].isCore ? 0.28 : 0.12);
            ctx.strokeStyle = projected[i].isCore
              ? `rgba(255, 168, 52, ${alpha})`
              : `rgba(20, 24, 32, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(projected[i].x, projected[i].y);
            ctx.lineTo(projected[j].x, projected[j].y);
            ctx.stroke();
          }
        }
      }

      // Render particle points
      for (let i = 0; i < projected.length; i++) {
        const pt = projected[i];
        ctx.fillStyle = pt.color;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
        ctx.fill();

        // Extra core glow highlight
        if (pt.isCore && pt.scale > 0.9) {
          ctx.fillStyle = 'rgba(255, 230, 180, 0.4)';
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pt.size * 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
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
