"use client";

import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";
import { useTheme } from "../context/ThemeContext";

interface AnimatedHeadingProps {
  sectionNumber?: string;
  badge?: string;
  mainText: string;
  accentText: string;
  subText?: string;
  className?: string;
  dark?: boolean;
}

export default function AnimatedHeading({
  sectionNumber,
  badge,
  mainText,
  accentText,
  subText,
  className = "",
  dark,
}: AnimatedHeadingProps) {
  const { theme } = useTheme();
  const isDark = dark !== undefined ? dark : theme === "dark";
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
      className={`flex flex-col md:flex-row md:items-end justify-between gap-3 pb-3 sm:pb-3.5 border-b shrink-0 transition-colors duration-300 ${
        isDark ? "border-stone-800" : "border-stone-200/80"
      } ${className}`}
    >
      <div>
        {/* Compact Heading in Helvetica */}
        <h2
          className={`font-heading text-xl sm:text-2xl lg:text-3xl font-black tracking-tight leading-snug transition-colors duration-300 ${
            isDark ? "text-white" : "text-stone-900"
          }`}
        >
          {words.map((word, i) => (
            <span key={i} className="inline-block overflow-hidden mr-1.5">
              <span className="anim-word opacity-0 inline-block">{word}</span>
            </span>
          ))}
          <span className="inline-block overflow-hidden">
            <span className="anim-accent opacity-0 text-[#C52623] relative inline-block">
              {accentText}
              <span
                className={`anim-line absolute left-0 -bottom-0.5 w-full h-[2px] rounded-full origin-left scale-x-0 ${
                  isDark ? "bg-[#C52623]/60" : "bg-[#C52623]/30"
                }`}
              />
            </span>
          </span>
        </h2>
      </div>

      {subText && (
        <div className="anim-sub opacity-0 max-w-sm">
          <p
            className={`text-xs leading-relaxed font-normal transition-colors duration-300 ${
              isDark ? "text-stone-400" : "text-stone-500"
            }`}
          >
            {subText}
          </p>
        </div>
      )}
    </div>
  );
}
