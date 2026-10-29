"use client";

import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";

interface AnimatedHeadingProps {
  badge: string;
  mainText: string;
  accentText: string;
  subText?: string;
  className?: string;
}

export default function AnimatedHeading({
  badge,
  mainText,
  accentText,
  subText,
  className = "",
}: AnimatedHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTriggered(true);

          const badgeEl = el.querySelector(".anim-badge");
          const words = el.querySelectorAll(".anim-word");
          const accentEl = el.querySelector(".anim-accent");
          const lineEl = el.querySelector(".anim-line");
          const subEl = el.querySelector(".anim-sub");

          if (badgeEl) {
            animate(badgeEl, {
              opacity: [0, 1],
              translateY: [-6, 0],
              duration: 450,
              ease: "outCubic",
            });
          }

          if (words.length > 0) {
            animate(words, {
              opacity: [0, 1],
              translateY: [16, 0],
              delay: stagger(35, { start: 80 }),
              duration: 550,
              ease: "outCubic",
            });
          }

          if (accentEl) {
            animate(accentEl, {
              opacity: [0, 1],
              translateY: [14, 0],
              delay: 180,
              duration: 600,
              ease: "outCubic",
            });
          }

          if (lineEl) {
            animate(lineEl, {
              scaleX: [0, 1],
              delay: 300,
              duration: 600,
              ease: "outExpo",
            });
          }

          if (subEl) {
            animate(subEl, {
              opacity: [0, 1],
              translateY: [10, 0],
              delay: 220,
              duration: 550,
              ease: "outCubic",
            });
          }
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [triggered]);

  const words = mainText.split(" ");

  return (
    <div
      ref={containerRef}
      className={`flex flex-col md:flex-row md:items-end justify-between gap-3 pb-3 sm:pb-3.5 border-b border-stone-200/80 shrink-0 ${className}`}
    >
      <div>
        {/* Compact Badge */}
        <div className="anim-badge opacity-0 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-stone-100 text-[11px] text-stone-700 mb-1 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C42625] animate-pulse" />
          <span>{badge}</span>
        </div>

        {/* Compact Heading */}
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-stone-900 tracking-tight leading-snug">
          <span className="inline-flex flex-wrap gap-x-1.5">
            {words.map((word, i) => (
              <span key={i} className="anim-word opacity-0 inline-block">
                {word}
              </span>
            ))}
          </span>{" "}
          <span className="anim-accent opacity-0 text-[#C42625] relative inline-block">
            {accentText}
            <span
              className="anim-line absolute left-0 -bottom-0.5 w-full h-[2px] bg-[#C42625]/40 origin-left scale-x-0 rounded-full"
            />
          </span>
        </h2>
      </div>

      {subText && (
        <p className="anim-sub opacity-0 max-w-sm lg:max-w-md text-xs sm:text-sm text-stone-600 leading-relaxed font-normal line-clamp-2 md:text-right">
          {subText}
        </p>
      )}
    </div>
  );
}
