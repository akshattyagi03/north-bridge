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
              translateY: [-10, 0],
              duration: 500,
              ease: "outCubic",
            });
          }

          if (words.length > 0) {
            animate(words, {
              opacity: [0, 1],
              translateY: [24, 0],
              delay: stagger(45, { start: 100 }),
              duration: 650,
              ease: "outCubic",
            });
          }

          if (accentEl) {
            animate(accentEl, {
              opacity: [0, 1],
              translateY: [20, 0],
              delay: 250,
              duration: 750,
              ease: "outCubic",
            });
          }

          if (lineEl) {
            animate(lineEl, {
              scaleX: [0, 1],
              delay: 380,
              duration: 700,
              ease: "outExpo",
            });
          }

          if (subEl) {
            animate(subEl, {
              opacity: [0, 1],
              translateY: [15, 0],
              delay: 300,
              duration: 650,
              ease: "outCubic",
            });
          }
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [triggered]);

  const words = mainText.split(" ");

  return (
    <div ref={containerRef} className={`flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-stone-200 ${className}`}>
      <div>
        {/* Badge */}
        <div className="anim-badge opacity-0 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-100 text-xs text-stone-700 mb-2.5 font-medium">
          <span className="w-2 h-2 rounded-full bg-[#C42625] animate-pulse" />
          <span>{badge}</span>
        </div>

        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight leading-[1.15]">
          <span className="inline-flex flex-wrap gap-x-2">
            {words.map((word, i) => (
              <span key={i} className="anim-word opacity-0 inline-block">
                {word}
              </span>
            ))}
          </span>{" "}
          <br className="hidden sm:inline" />
          <span className="anim-accent opacity-0 text-[#C42625] relative inline-block">
            {accentText}
            <span
              className="anim-line absolute left-0 -bottom-1 w-full h-[2.5px] bg-[#C42625]/40 origin-left scale-x-0 rounded-full"
            />
          </span>
        </h2>
      </div>

      {subText && (
        <p className="anim-sub opacity-0 max-w-md text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
          {subText}
        </p>
      )}
    </div>
  );
}
