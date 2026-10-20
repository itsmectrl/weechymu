import React, { useEffect, useRef, useState } from 'react';

interface SoundWaveCanvasProps {
  className?: string;
  intensity?: number;
}

export const SoundWaveCanvas: React.FC<SoundWaveCanvasProps> = ({
  className = '',
  intensity = 1.0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [motionReduced, setMotionReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setMotionReduced(mediaQuery.matches);

    const handleMediaChange = (e: MediaQueryListEvent) => {
      setMotionReduced(e.matches);
    };
    mediaQuery.addEventListener('change', handleMediaChange);
    return () => mediaQuery.removeEventListener('change', handleMediaChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Pointer tracking with smooth easing
    const pointer = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      active: false,
      radius: 170,
      strength: 0.6,
    };

    let scrollProgress = 0;
    let isVisible = true;
    let time = 0;

    const updateSize = () => {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);
    };

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    resizeObserver.observe(container);
    updateSize();

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      pointer.targetX = e.clientX - rect.left;
      pointer.targetY = e.clientY - rect.top;
      pointer.active = true;
    };

    const handlePointerLeave = () => {
      pointer.active = false;
      pointer.targetX = -1000;
      pointer.targetY = -1000;
    };

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const docHeight = Math.max(
        document.body.scrollHeight - window.innerHeight,
        1
      );
      scrollProgress = Math.min(Math.max(scrollY / docHeight, 0), 1);
    };

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    container.addEventListener('mousemove', handlePointerMove, { passive: true });
    container.addEventListener('mouseleave', handlePointerLeave, { passive: true });

    // Restrained, fine audio lines in silver, graphite, and single crimson accent
    const waveLayers = [
      {
        baseYRatio: 0.52,
        amplitude: 38,
        frequency: 0.003,
        speed: 0.009,
        phase: 0.0,
        color: 'rgba(146, 146, 153, 0.45)', // Silver-gray #929299
        lineWidth: 1.2,
        harmonics: [
          { freqMult: 2.1, ampMult: 0.28, speedMult: 1.1 },
          { freqMult: 3.2, ampMult: 0.12, speedMult: 0.8 },
        ],
      },
      {
        baseYRatio: 0.50,
        amplitude: 44,
        frequency: 0.0024,
        speed: 0.007,
        phase: 1.4,
        color: 'rgba(102, 102, 110, 0.38)', // Muted graphite #66666E
        lineWidth: 1.0,
        harmonics: [
          { freqMult: 1.8, ampMult: 0.3, speedMult: 1.0 },
        ],
      },
      {
        baseYRatio: 0.49,
        amplitude: 30,
        frequency: 0.0036,
        speed: 0.011,
        phase: 2.8,
        color: 'rgba(185, 28, 53, 0.55)', // Single deliberate crimson accent #B91C35
        lineWidth: 1.3,
        harmonics: [
          { freqMult: 2.4, ampMult: 0.25, speedMult: 1.2 },
        ],
      },
      {
        baseYRatio: 0.53,
        amplitude: 24,
        frequency: 0.0042,
        speed: 0.006,
        phase: 4.1,
        color: 'rgba(47, 47, 53, 0.5)', // Subtle tone #2F2F35
        lineWidth: 0.9,
        harmonics: [
          { freqMult: 1.6, ampMult: 0.35, speedMult: 0.9 },
        ],
      },
    ];

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      if (pointer.active) {
        pointer.x += (pointer.targetX - pointer.x) * 0.1;
        pointer.y += (pointer.targetY - pointer.y) * 0.1;
      } else {
        pointer.x += (-1000 - pointer.x) * 0.06;
        pointer.y += (-1000 - pointer.y) * 0.06;
      }

      ctx.clearRect(0, 0, width, height);

      if (!motionReduced) {
        time += 0.5; // Unhurried, serene motion
      }

      const isMobile = width < 768;
      const step = isMobile ? 8 : 4;

      waveLayers.forEach((layer, layerIdx) => {
        ctx.beginPath();
        ctx.strokeStyle = layer.color;
        ctx.lineWidth = layer.lineWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        const scrollOffset = (scrollProgress * 50) * (layerIdx % 2 === 0 ? 1 : -1);
        const baseHeight = height * layer.baseYRatio + scrollOffset;

        const effectiveAmp =
          layer.amplitude *
          intensity *
          (isMobile ? 0.6 : 1.0) *
          (1 - scrollProgress * 0.25);

        let started = false;

        for (let x = 0; x <= width + step; x += step) {
          let yOffset = Math.sin(x * layer.frequency + time * layer.speed + layer.phase) * effectiveAmp;

          for (const harm of layer.harmonics) {
            yOffset +=
              Math.sin(
                x * (layer.frequency * harm.freqMult) +
                  time * (layer.speed * harm.speedMult) +
                  layer.phase
              ) *
              (effectiveAmp * harm.ampMult);
          }

          if (pointer.active) {
            const dx = x - pointer.x;
            const dy = baseHeight + yOffset - pointer.y;
            const distSq = dx * dx + dy * dy;
            const radiusSq = pointer.radius * pointer.radius;

            if (distSq < radiusSq * 2.2) {
              const gaussian = Math.exp(-distSq / (2 * (pointer.radius * 0.5) ** 2));
              const ripple = Math.sin(Math.sqrt(distSq) * 0.06 - time * 0.08) * 5;
              const pull = (pointer.y - (baseHeight + yOffset)) * 0.28;
              yOffset += (pull + ripple) * gaussian * pointer.strength;
            }
          }

          const y = baseHeight + yOffset;

          if (!started) {
            ctx.moveTo(x, y);
            started = true;
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, [intensity, motionReduced]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden pointer-events-auto select-none ${className}`}
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full"
      />
      {/* Subtle fade to solid #050506 background */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#050506]/70 via-transparent to-[#050506]" />
    </div>
  );
};
