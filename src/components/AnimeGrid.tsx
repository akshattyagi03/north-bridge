"use client";

import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";

interface AnimeGridProps {
  cols?: number;
  rows?: number;
  className?: string;
}

export default function AnimeGrid({
  cols = 20,
  rows = 10,
  className = "",
}: AnimeGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const totalDots = cols * rows;
  const isAnimatingRef = useRef(false);
  const [activeCoord, setActiveCoord] = useState<string>("GRID // 00:00");

  const triggerRipple = (index: number) => {
    if (!containerRef.current) return;
    const col = index % cols;
    const row = Math.floor(index / cols);
    setActiveCoord(`NODE [${col.toString().padStart(2, "0")}, ${row.toString().padStart(2, "0")}] // FREQ: 2.4GHz`);

    const dots = containerRef.current.querySelectorAll(".anime-grid-dot");
    if (!dots.length) return;

    animate(dots, {
      scale: [
        { to: 0.3, duration: 180, ease: "outQuad" },
        { to: 1.8, duration: 320, ease: "outElastic(1.2, 0.6)" },
        { to: 1, duration: 400, ease: "inOutQuad" },
      ],
      backgroundColor: [
        { to: "#8A8683", duration: 180 },
        { to: "#C52623", duration: 320 },
        { to: "#D3D1CE", duration: 400 },
      ],
      opacity: [
        { to: 0.2, duration: 180 },
        { to: 1, duration: 320 },
        { to: 0.35, duration: 400 },
      ],
      delay: stagger(22, {
        grid: [cols, rows],
        from: index,
      }),
    });
  };

  useEffect(() => {
    // Initial entrance wave from center
    const centerIndex = Math.floor(totalDots / 2);
    const timer = setTimeout(() => {
      triggerRipple(centerIndex);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative p-4 rounded-xl border border-[#E2E0DE] bg-white/70 backdrop-blur-sm shadow-sm overflow-hidden ${className}`}>
      {/* Top telemetry bar */}
      <div className="flex items-center justify-between pb-3 border-b border-[#ECEAE8] text-[11px] font-mono text-[#8A8683]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#C52623] animate-pulse" />
          <span className="text-[#141312] font-semibold">ANIME.JS V4 RIPPLE MATRIX</span>
        </div>
        <div className="text-[10px] text-[#C52623] tracking-wider uppercase">
          {activeCoord}
        </div>
      </div>

      {/* Interactive Dot Grid */}
      <div
        ref={containerRef}
        className="grid gap-2 py-4 justify-center items-center select-none"
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: totalDots }).map((_, i) => (
          <div
            key={i}
            className="group flex items-center justify-center p-1 cursor-crosshair"
            onMouseEnter={() => triggerRipple(i)}
            onClick={() => triggerRipple(i)}
          >
            <div
              className="anime-grid-dot w-2 h-2 rounded-full transition-transform"
              style={{
                backgroundColor: "#D3D1CE",
                opacity: 0.35,
              }}
            />
          </div>
        ))}
      </div>

      {/* Bottom status line */}
      <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-[#8A8683] border-t border-[#ECEAE8]">
        <span>HOVER / CLICK TO EMIT HARMONIC WAVE</span>
        <span className="text-[#8A8683]">STAGGER: 22MS // RADIAL DISTORTION</span>
      </div>
    </div>
  );
}
