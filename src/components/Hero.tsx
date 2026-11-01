"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { animate } from "animejs";
import { ArrowRight, Sparkles } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import SurpriseLogoExperience from "./SurpriseLogoExperience";

export default function Hero() {
  const { theme, mounted: themeMounted } = useTheme();
  const isDark = themeMounted ? theme === "dark" : true;

  const [showSurprise, setShowSurprise] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const animatedRef = useRef(false);
  const [entranceDone, setEntranceDone] = useState(false);

  const runEntranceAnimation = useCallback(() => {
    if (animatedRef.current) return;
    const el = heroRef.current;
    if (!el) return;

    animatedRef.current = true;

    const leftWing = el.querySelector(".hero-wing-left");
    const rightWing = el.querySelector(".hero-wing-right");
    const logoCenter = el.querySelector(".hero-logo-center");
    const logoAura = el.querySelector(".hero-logo-aura");
    const sloganPart1 = el.querySelector(".hero-slogan-part-1");
    const sloganPart2 = el.querySelector(".hero-slogan-part-2");
    const ctaWrap = el.querySelector(".hero-cta-wrap");

    // 1. Left Wing slides in from the left
    if (leftWing) {
      animate(leftWing, {
        opacity: [0, 1],
        translateX: [-70, 0],
        scale: [0.92, 1],
        duration: 900,
        ease: "outCubic",
      });
    }

    // 2. Right Wing slides in from the right
    if (rightWing) {
      animate(rightWing, {
        opacity: [0, 1],
        translateX: [70, 0],
        scale: [0.92, 1],
        duration: 900,
        ease: "outCubic",
      });
    }

    // 3. Central Logo pops in with 3D spring scale & position
    if (logoCenter) {
      animate(logoCenter, {
        opacity: [0, 1],
        scale: [0.82, 1],
        translateY: [-28, 0],
        duration: 850,
        ease: "outBack(1.4)",
        complete: () => {
          setEntranceDone(true);
        },
      });
    }

    // 4. Logo Radiant Aura blooms
    if (logoAura) {
      animate(logoAura, {
        opacity: [0, 1],
        scale: [0.6, 1],
        duration: 1000,
        ease: "outCubic",
      });
    }

    // 5. Slogan Part 1 ("One North.") slides up smoothly
    if (sloganPart1) {
      animate(sloganPart1, {
        opacity: [0, 1],
        translateY: [22, 0],
        delay: 220,
        duration: 700,
        ease: "outCubic",
      });
    }

    // 6. Slogan Part 2 ("Infinite Digital Directions") slides up smoothly
    if (sloganPart2) {
      animate(sloganPart2, {
        opacity: [0, 1],
        translateY: [22, 0],
        delay: 360,
        duration: 700,
        ease: "outCubic",
      });
    }

    // 7. Glowing CTAs pop in with spring bounce
    if (ctaWrap) {
      animate(ctaWrap, {
        opacity: [0, 1],
        translateY: [18, 0],
        scale: [0.92, 1],
        delay: 500,
        duration: 650,
        ease: "outBack(1.3)",
      });
    }

    // 8. Direct Access quick navigation pills
    const directAccess = el.querySelector(".hero-direct-access");
    if (directAccess) {
      animate(directAccess, {
        opacity: [0, 1],
        translateY: [15, 0],
        delay: 620,
        duration: 600,
        ease: "outCubic",
      });
    }
  }, []);

  useEffect(() => {
    const handleSplashFade = () => {
      // Delay slightly so the fade-out of the splash screen reveals the motion in progress
      setTimeout(runEntranceAnimation, 120);
    };

    if (typeof window !== "undefined") {
      // Check if splash screen already faded
      if (
        (window as unknown as { __nbt_splash_faded?: boolean }).__nbt_splash_faded ||
        (window as unknown as { __nbt_splash_done?: boolean }).__nbt_splash_done
      ) {
        runEntranceAnimation();
      } else {
        window.addEventListener("nbt-splash-fade", handleSplashFade, { once: true });
        window.addEventListener("nbt-splash-done", runEntranceAnimation, { once: true });
      }

      // Fallback timer: ensure entrance animation ALWAYS fires even if splash is skipped or cached
      const fallbackTimer = setTimeout(() => {
        runEntranceAnimation();
      }, 1600);

      return () => {
        window.removeEventListener("nbt-splash-fade", handleSplashFade);
        window.removeEventListener("nbt-splash-done", runEntranceAnimation);
        clearTimeout(fallbackTimer);
      };
    }
  }, [runEntranceAnimation]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className={`relative pt-8 sm:pt-12 lg:pt-14 pb-8 sm:pb-10 lg:pb-12 px-4 sm:px-6 lg:px-8 overflow-hidden transition-colors duration-300 ${
        isDark ? "bg-[#090A0D] text-white" : "bg-[#FAFAF9] text-[#18191B]"
      }`}
    >
      {/* =========================================================================
          LEFT & RIGHT VIVID CRIMSON GEOMETRIC WINGS (Screenshots 4 & 5)
         ========================================================================= */}
      {/* Left Wing Shapes */}
      <div className="hero-wing-left opacity-0 absolute top-12 -left-16 sm:-left-12 w-64 sm:w-80 lg:w-96 h-[550px] pointer-events-none z-0">
        <div className="absolute inset-0 bg-[#C52623]/25 blur-3xl rounded-full" />
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#851513] via-[#C52623] to-transparent opacity-90"
          style={{
            clipPath: "polygon(0 0, 100% 35%, 100% 65%, 0 100%, 0 65%, 55% 50%, 0 35%)",
          }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#C52623] via-[#ff4a47] to-transparent opacity-75"
          style={{
            clipPath: "polygon(20% 15%, 85% 42%, 85% 58%, 20% 85%, 28% 70%, 70% 50%, 28% 30%)",
          }}
        />
      </div>

      {/* Right Wing Shapes */}
      <div className="hero-wing-right opacity-0 absolute top-12 -right-16 sm:-right-12 w-64 sm:w-80 lg:w-96 h-[550px] pointer-events-none z-0">
        <div className="absolute inset-0 bg-[#C52623]/25 blur-3xl rounded-full" />
        <div
          className="absolute inset-0 bg-gradient-to-bl from-[#851513] via-[#C52623] to-transparent opacity-90"
          style={{
            clipPath: "polygon(100% 0, 0 35%, 0 65%, 100% 100%, 100% 65%, 45% 50%, 100% 35%)",
          }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-l from-[#C52623] via-[#ff4a47] to-transparent opacity-75"
          style={{
            clipPath: "polygon(80% 15%, 15% 42%, 15% 58%, 80% 85%, 72% 70%, 30% 50%, 72% 30%)",
          }}
        />
      </div>

      {/* Subtle Texture */}
      <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_30%,currentColor_95%] opacity-5 pointer-events-none z-0" />

      {/* Main Content (Centered) */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* =========================================================================
            CENTERED PROMINENT 3D LOGO CENTERPIECE (Refined, Well-Proportioned Dimensions)
           ========================================================================= */}
        <div className="hero-logo-center opacity-0 mb-3 sm:mb-4 flex items-center justify-center">
          <div
            className={`relative group cursor-pointer transition-transform duration-500 hover:scale-[1.03] ${
              entranceDone ? "animate-hero-float" : ""
            }`}
          >
            {/* Multi-layered 3D Ambient Radiant Aura */}
            <div className="hero-logo-aura opacity-0 absolute -inset-5 sm:-inset-8 bg-radial-[circle,rgba(197,38,35,0.45)_0%,rgba(197,38,35,0.12)_45%,transparent_75%] rounded-full blur-xl pointer-events-none" />
            <div className="absolute -inset-2 bg-gradient-to-b from-[#C52623]/25 via-transparent to-transparent rounded-2xl blur-sm pointer-events-none opacity-80" />

            {/* Flagship Brand Logo with Refined Dimensions & Optical Clarity */}
            <Image
              src="/nbt-logo.png"
              alt="NorthBridge Tech"
              width={340}
              height={190}
              sizes="(max-width: 640px) 180px, (max-width: 1024px) 230px, 260px"
              className={`w-44 sm:w-52 md:w-60 lg:w-[260px] h-auto object-contain transition-all duration-300 ${
                isDark
                  ? "brightness-[1.18] contrast-[1.08] drop-shadow-[0_10px_28px_rgba(197,38,35,0.55)] drop-shadow-[0_3px_10px_rgba(0,0,0,0.85)]"
                  : "drop-shadow-[0_10px_22px_rgba(197,38,35,0.22)] drop-shadow-[0_3px_8px_rgba(0,0,0,0.06)]"
              }`}
              priority
            />
          </div>
        </div>

        {/* =========================================================================
            SLOGAN (Shortened, Sleek & Executive Proportions)
           ========================================================================= */}
        <h1
          className={`hero-slogan text-base sm:text-lg md:text-xl lg:text-2xl font-black tracking-tight leading-snug max-w-xl mx-auto mt-2 sm:mt-3 mb-4 sm:mb-5 transition-colors duration-300 ${
            isDark ? "text-white" : "text-[#18191B]"
          }`}
        >
          <span className="hero-slogan-part-1 opacity-0 inline-block">
            One North.&nbsp;
          </span>
          <span className="hero-slogan-part-2 opacity-0 text-[#C52623] inline-block drop-shadow-[0_0_15px_rgba(197,38,35,0.4)]">
            Infinite Digital Directions
          </span>
        </h1>

        {/* =========================================================================
            GLOWING CTA BUTTONS WITH SOLID RED SHADOW
           ========================================================================= */}
        <div className="hero-cta-wrap opacity-0 relative mb-4 sm:mb-5 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <div className="relative group">
            <button
              onClick={() => scrollTo("contact")}
              className="relative px-6 py-2.5 sm:py-3 rounded-full bg-[#18191B] border-2 border-[#C52623] text-white text-xs sm:text-sm font-bold tracking-wide transition-all inline-flex items-center gap-2 shadow-[4px_4px_0px_#C52623] hover:shadow-[6px_6px_0px_#C52623] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
            >
              <span>Book a Free Demo</span>
              <ArrowRight className="w-4 h-4 text-[#C52623] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* SURPRISE ME 3D LOGO ANIMATION BUTTON */}
          <button
            onClick={() => setShowSurprise(true)}
            className={`group px-5 py-2.5 sm:py-3 rounded-full border-2 transition-all duration-300 inline-flex items-center gap-2 text-xs sm:text-sm font-bold tracking-wide shadow-[4px_4px_0px_#C52623] hover:shadow-[6px_6px_0px_#C52623] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 cursor-pointer backdrop-blur-md ${
              isDark
                ? "border-[#C52623] bg-[#141518] text-white hover:bg-[#C52623]"
                : "border-[#C52623] bg-white text-[#C52623] hover:bg-[#C52623] hover:text-white"
            }`}
            title="Experience the Anime.js 3D Logo Animation"
            aria-label="Surprise Me - 3D Logo Animation"
          >
            <Sparkles className="w-4 h-4 text-[#C52623] group-hover:text-white group-hover:rotate-12 transition-transform duration-300" />
            <span>Surprise Me</span>
            <span
              className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded transition-colors ${
                isDark
                  ? "bg-white/10 group-hover:bg-black/30 text-stone-200 group-hover:text-white"
                  : "bg-red-100 group-hover:bg-black/20 text-[#C52623] group-hover:text-white"
              }`}
            >
              3D
            </span>
          </button>
        </div>

        {/* =========================================================================
            DIRECT ACCESS QUICK NAVIGATION BUTTONS
           ========================================================================= */}
        <div className="hero-direct-access opacity-0 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 max-w-3xl mx-auto pt-1 pb-3">
          <span className="text-[10px] font-mono font-bold text-stone-500 uppercase tracking-wider mr-1 hidden sm:inline">
            Direct Access:
          </span>
          {[
            { label: "Who We Are", target: "about" },
            { label: "Our Services", target: "services" },
            { label: "The Pillars", target: "pillars" },
            { label: "How We Solve", target: "process" },
            { label: "Your Direction", target: "orbit" },
            { label: "Contact Us", target: "contact" },
          ].map((item) => (
            <button
              key={item.target}
              onClick={() => scrollTo(item.target)}
              className={`px-3 py-1 rounded-full border text-[11px] font-mono transition-all duration-200 cursor-pointer ${
                isDark
                  ? "bg-white/5 border-white/15 text-stone-300 hover:text-white hover:border-[#C52623] hover:bg-[#C52623]/20 hover:shadow-[3px_3px_0px_#C52623] hover:-translate-x-0.5 hover:-translate-y-0.5"
                  : "bg-white border-stone-300 text-stone-700 hover:text-stone-900 hover:border-[#C52623] hover:bg-red-50 hover:shadow-[3px_3px_0px_#C52623] hover:-translate-x-0.5 hover:-translate-y-0.5"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        {/* 3D Anime.js Three.js Adapter Logo Animation Modal Experience */}
        <SurpriseLogoExperience
          isOpen={showSurprise}
          onClose={() => setShowSurprise(false)}
        />
      </div>
    </section>
  );
}
