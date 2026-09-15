import { useEffect, useRef } from 'react';

export default function ParticleNetwork3D({ currentSlide }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let width = (canvas.width = canvas.offsetWidth * 2);
    let height = (canvas.height = canvas.offsetHeight * 2);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * 2;
      height = canvas.height = canvas.offsetHeight * 2;
    };
    window.addEventListener('resize', handleResize);

    // 160 particles in 3D
    const NUM_PARTICLES = 160;
    const particles = [];
    for (let i = 0; i < NUM_PARTICLES; i++) {
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(Math.random() * 2 - 1);
      const isCore = Math.random() < 0.38;
      const baseRadius = isCore ? 60 + Math.random() * 70 : 180 + Math.random() * 110;

      particles.push({
        theta,
        phi,
        baseRadius,
        currentRadius: baseRadius,
        isCore,
        size: isCore ? 3.0 + Math.random() * 3.5 : 1.8 + Math.random() * 2.0,
        color: isCore
          ? (Math.random() < 0.65 ? '#FFA834' : '#FF5722')
          : (Math.random() < 0.35 ? '#FFA834' : '#1A1C20'),
        pulseSpeed: 0.02 + Math.random() * 0.03,
        pulseOffset: Math.random() * Math.PI * 2,
      });
    }

    let rotX = 0.25;
    let rotY = 0;
    let targetRotX = 0.25;
    let targetRotY = 0;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetRotY = nx * 0.7;
      targetRotX = 0.25 + ny * 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height / 2;
      const fov = 500;

      // Expand into ring if slide 1 (Services)
      const isExpanded = currentSlide === 1;
      const targetRadiusMultiplier = isExpanded ? 1.45 : 1.0;

      // Smooth inertia rotation
      rotY += (targetRotY + time * 0.25 - rotY) * 0.04;
      rotX += (targetRotX - rotX) * 0.04;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      // Draw faint concentric orbital rings
      const ringScale = (isExpanded ? 1.2 : 1.0) * (width / 900);
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.lineWidth = 1.5;

      // Ring 1
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.06)';
      ctx.beginPath();
      ctx.ellipse(0, 0, 260 * ringScale, 260 * ringScale, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Ring 2
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.09)';
      ctx.beginPath();
      ctx.ellipse(0, 0, 340 * ringScale, 340 * ringScale, 0, 0, Math.PI * 2);
      ctx.stroke();

      // Ring 3 (tilted golden orbit)
      ctx.strokeStyle = 'rgba(255, 168, 52, 0.18)';
      ctx.beginPath();
      ctx.ellipse(0, 0, 310 * ringScale, 140 * ringScale, rotY * 0.4, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Project 3D particles
      const projected = [];
      const scaleMultiplier = width / 900;

      for (let i = 0; i < NUM_PARTICLES; i++) {
        const p = particles[i];
        p.currentRadius += ((p.baseRadius * targetRadiusMultiplier * scaleMultiplier) - p.currentRadius) * 0.08;

        const pulse = Math.sin(time * 3 + p.pulseOffset) * 6;
        const r = p.currentRadius + (p.isCore ? pulse : 0);

        let x = r * Math.sin(p.phi) * Math.cos(p.theta);
        let y = r * Math.sin(p.phi) * Math.sin(p.theta);
        let z = r * Math.cos(p.phi);

        if (isExpanded) {
          y = y * 0.3 + Math.sin(p.theta * 4 + time * 2) * 25;
        }

        // 3D rotation
        const x1 = x * cosY - z * sinY;
        const z1 = z * cosY + x * sinY;

        const y2 = y * cosX - z1 * sinX;
        const z2 = z1 * cosX + y * sinX;

        // Projection
        const pScale = fov / (fov + z2 + 300);
        const px = centerX + x1 * pScale;
        const py = centerY + y2 * pScale;
        const alpha = Math.max(0.1, Math.min(1, (z2 + 350) / 600));

        projected.push({
          px,
          py,
          scale: pScale,
          alpha,
          z: z2,
          isCore: p.isCore,
          size: p.size * pScale * 1.5,
          color: p.color,
        });
      }

      // Sort depth
      projected.sort((a, b) => a.z - b.z);

      // Draw volumetric dark core cloud behind points
      const cloudRadius = (isExpanded ? 80 : 130) * scaleMultiplier;
      const cloudGrad = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, cloudRadius * 1.8
      );
      cloudGrad.addColorStop(0, 'rgba(25, 27, 33, 0.45)');
      cloudGrad.addColorStop(0.5, 'rgba(35, 38, 45, 0.2)');
      cloudGrad.addColorStop(1, 'rgba(35, 38, 45, 0)');
      ctx.fillStyle = cloudGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, cloudRadius * 1.8, 0, Math.PI * 2);
      ctx.fill();

      // Connecting constellation lines
      ctx.lineWidth = 1;
      const maxConnect = 80 * scaleMultiplier;
      for (let i = 0; i < projected.length; i++) {
        const p1 = projected[i];
        for (let j = i + 1; j < projected.length; j++) {
          const p2 = projected[j];
          const dx = p1.px - p2.px;
          const dy = p1.py - p2.py;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxConnect * maxConnect) {
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / maxConnect) * 0.45 * Math.min(p1.alpha, p2.alpha);

            if (p1.isCore || p2.isCore) {
              ctx.strokeStyle = `rgba(255, 168, 52, ${lineAlpha * 1.6})`;
            } else {
              ctx.strokeStyle = `rgba(30, 32, 38, ${lineAlpha * 0.9})`;
            }

            ctx.beginPath();
            ctx.moveTo(p1.px, p1.py);
            ctx.lineTo(p2.px, p2.py);
            ctx.stroke();
          }
        }
      }

      // Volumetric fiery ember nucleus
      const corePulse = 1 + Math.sin(time * 4) * 0.15;
      const fireRadius = (isExpanded ? 50 : 85) * corePulse * scaleMultiplier;
      const fireGrad = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, fireRadius * 1.6
      );
      fireGrad.addColorStop(0, 'rgba(255, 240, 180, 0.95)');
      fireGrad.addColorStop(0.25, 'rgba(255, 168, 52, 0.8)');
      fireGrad.addColorStop(0.55, 'rgba(249, 115, 22, 0.35)');
      fireGrad.addColorStop(0.85, 'rgba(234, 88, 12, 0.1)');
      fireGrad.addColorStop(1, 'rgba(234, 88, 12, 0)');

      ctx.fillStyle = fireGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, fireRadius * 1.6, 0, Math.PI * 2);
      ctx.fill();

      // Render 3D points
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];

        if (p.isCore) {
          ctx.shadowColor = '#FFA834';
          ctx.shadowBlur = 14 * p.scale;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.px, p.py, p.size * 1.3, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        } else {
          ctx.fillStyle = `rgba(22, 24, 28, ${p.alpha * 0.9})`;
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
