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
    // Check prefers-reduced-motion
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
      radius: 180,
      strength: 0.85,
    };

    let scrollProgress = 0;
    let isVisible = true;
    let time = 0;

    // Resize handling
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

    // Mouse / Pointer listeners
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

    // Scroll listener
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const docHeight = Math.max(
        document.body.scrollHeight - window.innerHeight,
        1
      );
      scrollProgress = Math.min(Math.max(scrollY / docHeight, 0), 1);
    };

    // Visibility listener to pause when backgrounded
    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);
    container.addEventListener('mousemove', handlePointerMove, { passive: true });
    container.addEventListener('mouseleave', handlePointerLeave, { passive: true });

    // Wave definition layers
    // Dominant colors: silver-white, graphite, charcoal, with subtle crimson accent
    const waveLayers = [
      {
        baseYRatio: 0.52,
        amplitude: 44,
        frequency: 0.0035,
        speed: 0.016,
        phase: 0.0,
        color: 'rgba(216, 217, 222, 0.42)', // Silver-white primary
        lineWidth: 1.5,
        harmonics: [
          { freqMult: 2.1, ampMult: 0.35, speedMult: 1.2 },
          { freqMult: 3.4, ampMult: 0.15, speedMult: 0.8 },
        ],
      },
      {
        baseYRatio: 0.50,
        amplitude: 56,
        frequency: 0.0028,
        speed: 0.013,
        phase: 1.4,
        color: 'rgba(138, 141, 150, 0.35)', // Graphite secondary
        lineWidth: 1.2,
        harmonics: [
          { freqMult: 1.8, ampMult: 0.4, speedMult: 1.1 },
          { freqMult: 4.2, ampMult: 0.12, speedMult: 0.7 },
        ],
      },
      {
        baseYRatio: 0.48,
        amplitude: 38,
        frequency: 0.0042,
        speed: 0.019,
        phase: 2.8,
        color: 'rgba(196, 30, 58, 0.55)', // Signature Restrained Crimson Accent
        lineWidth: 1.8,
        harmonics: [
          { freqMult: 2.5, ampMult: 0.3, speedMult: 1.4 },
          { freqMult: 5.1, ampMult: 0.08, speedMult: 1.0 },
        ],
      },
      {
        baseYRatio: 0.54,
        amplitude: 30,
        frequency: 0.005,
        speed: 0.011,
        phase: 3.9,
        color: 'rgba(54, 56, 65, 0.45)', // Charcoal border-strong
        lineWidth: 1.0,
        harmonics: [
          { freqMult: 1.5, ampMult: 0.5, speedMult: 0.9 },
        ],
      },
      {
        baseYRatio: 0.46,
        amplitude: 24,
        frequency: 0.0062,
        speed: 0.022,
        phase: 4.7,
        color: 'rgba(244, 244, 245, 0.22)', // Whisper soft white
        lineWidth: 0.9,
        harmonics: [
          { freqMult: 3.1, ampMult: 0.25, speedMult: 1.3 },
        ],
      },
    ];

    // Main animation loop
    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      // Smooth pointer position lerp (elastic follow)
      if (pointer.active) {
        pointer.x += (pointer.targetX - pointer.x) * 0.12;
        pointer.y += (pointer.targetY - pointer.y) * 0.12;
      } else {
        pointer.x += (-1000 - pointer.x) * 0.08;
        pointer.y += (-1000 - pointer.y) * 0.08;
      }

      ctx.clearRect(0, 0, width, height);

      // Increment clock if motion is enabled
      if (!motionReduced) {
        time += 0.85;
      }

      const isMobile = width < 768;
      const step = isMobile ? 8 : 4; // Step resolution in px

      // Draw each wave
      waveLayers.forEach((layer, layerIdx) => {
        ctx.beginPath();
        ctx.strokeStyle = layer.color;
        ctx.lineWidth = layer.lineWidth;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';

        // Dynamic base height influenced by scroll
        const scrollOffset = (scrollProgress * 60) * (layerIdx % 2 === 0 ? 1 : -1);
        const baseHeight = height * layer.baseYRatio + scrollOffset;

        // Wave amplitude adjusted for mobile and scroll
        const effectiveAmp =
          layer.amplitude *
          intensity *
          (isMobile ? 0.65 : 1.0) *
          (1 - scrollProgress * 0.3);

        let started = false;

        for (let x = 0; x <= width + step; x += step) {
          // Base mathematical wave oscillation
          let yOffset = Math.sin(x * layer.frequency + time * layer.speed + layer.phase) * effectiveAmp;

          // Add harmonic frequencies
          for (const harm of layer.harmonics) {
            yOffset +=
              Math.sin(
                x * (layer.frequency * harm.freqMult) +
                  time * (layer.speed * harm.speedMult) +
                  layer.phase
              ) *
              (effectiveAmp * harm.ampMult);
          }

          // Interactive pointer deformation (Gaussian falloff)
          if (pointer.active) {
            const dx = x - pointer.x;
            const dy = baseHeight + yOffset - pointer.y;
            const distSq = dx * dx + dy * dy;
            const radiusSq = pointer.radius * pointer.radius;

            if (distSq < radiusSq * 2.5) {
              const gaussian = Math.exp(-distSq / (2 * (pointer.radius * 0.55) ** 2));
              // Elastic ripple displacement
              const ripple = Math.sin(Math.sqrt(distSq) * 0.08 - time * 0.15) * 8;
              const pull = (pointer.y - (baseHeight + yOffset)) * 0.35;
              const displacement = (pull + ripple) * gaussian * pointer.strength;
              yOffset += displacement * (1 + (layerIdx % 3) * 0.15);
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
      {/* Subtle organic vignette */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#08090B]/60 via-transparent to-[#08090B]" />
    </div>
  );
};
