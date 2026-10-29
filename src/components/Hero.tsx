"use client";

import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";
import { ArrowRight, CheckCircle2, Sparkles, Shield, Zap, Layers, ArrowUpRight } from "lucide-react";
import LogoScene from "./LogoScene";

const METRICS = [
  { value: "45+", label: "Products Launched", sub: "Enterprise web, SaaS, & mobile" },
  { value: "99.98%", label: "System Availability", sub: "Production uptime standard" },
  { value: "< 30ms", label: "Edge Response", sub: "Global distributed performance" },
  { value: "100%", label: "Delivery Precision", sub: "On-schedule milestone completion" },
];

const INDUSTRIES = [
  "Fintech & Payments",
  "Digital Health",
  "Global Logistics",
  "Enterprise SaaS",
  "Machine Intelligence",
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = heroRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setAnimated(true);

          // Kinetic word reveal for headline
          const words = el.querySelectorAll(".hero-word");
          const accentWord = el.querySelector(".hero-accent");
          const accentLine = el.querySelector(".hero-accent-line");
          const badge = el.querySelector(".hero-badge");
          const copy = el.querySelector(".hero-copy");
          const actions = el.querySelector(".hero-actions");
          const checklist = el.querySelectorAll(".hero-check-item");
          const visual = el.querySelector(".hero-visual");
          const floatingCards = el.querySelectorAll(".hero-floating-card");
          const metrics = el.querySelectorAll(".hero-metric-item");
          const industryBand = el.querySelector(".hero-industry-band");

          if (badge) {
            animate(badge, {
              opacity: [0, 1],
              translateY: [-12, 0],
              duration: 500,
              ease: "outCubic",
            });
          }

          if (words.length > 0) {
            animate(words, {
              opacity: [0, 1],
              translateY: [28, 0],
              delay: stagger(50, { start: 100 }),
              duration: 700,
              ease: "outCubic",
            });
          }

          if (accentWord) {
            animate(accentWord, {
              opacity: [0, 1],
              translateY: [24, 0],
              delay: 200,
              duration: 750,
              ease: "outCubic",
            });
          }

          if (accentLine) {
            animate(accentLine, {
              scaleX: [0, 1],
              delay: 450,
              duration: 700,
              ease: "outExpo",
            });
          }

          if (copy) {
            animate(copy, {
              opacity: [0, 1],
              translateY: [20, 0],
              delay: 250,
              duration: 650,
              ease: "outCubic",
            });
          }

          if (actions) {
            animate(actions, {
              opacity: [0, 1],
              translateY: [16, 0],
              delay: 350,
              duration: 600,
              ease: "outCubic",
            });
          }

          if (checklist.length > 0) {
            animate(checklist, {
              opacity: [0, 1],
              translateX: [-10, 0],
              delay: stagger(60, { start: 400 }),
              duration: 550,
              ease: "outCubic",
            });
          }

          if (visual) {
            animate(visual, {
              opacity: [0, 1],
              scale: [0.94, 1],
              delay: 200,
              duration: 800,
              ease: "outCubic",
            });
          }

          if (floatingCards.length > 0) {
            animate(floatingCards, {
              opacity: [0, 1],
              translateY: [20, 0],
              delay: stagger(90, { start: 400 }),
              duration: 700,
              ease: "outCubic",
            });
          }

          if (industryBand) {
            animate(industryBand, {
              opacity: [0, 1],
              delay: 450,
              duration: 600,
              ease: "outCubic",
            });
          }

          if (metrics.length > 0) {
            animate(metrics, {
              opacity: [0, 1],
              translateY: [20, 0],
              delay: stagger(70, { start: 500 }),
              duration: 650,
              ease: "outCubic",
            });
          }
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animated]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="min-h-[calc(100dvh-64px)] flex flex-col justify-between py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16"
    >
      {/* Top Main Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center my-auto">
        {/* Left Column (Editorial Copy) */}
        <div className="lg:col-span-7 space-y-5 sm:space-y-6">
          {/* Studio Badge & Live Status */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="hero-badge opacity-0 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-100 border border-stone-200 text-xs text-stone-700">
              <span className="w-2 h-2 rounded-full bg-[#C42625] animate-pulse" />
              <span className="font-semibold text-stone-900">
                Digital Product & Architecture Studio
              </span>
            </div>

            <div className="hero-badge opacity-0 hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-50 border border-stone-200 text-[11px] text-stone-500 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>Available for Select Q4 / Q1 Engagements</span>
            </div>
          </div>

          {/* Kinetic Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-stone-900 leading-[1.08]">
            <span className="inline-block overflow-hidden">
              <span className="hero-word opacity-0 inline-block">Ideas,</span>
            </span>{" "}
            <span className="hero-accent opacity-0 text-[#C42625] relative inline-block">
              connected.
              <span className="hero-accent-line absolute left-0 -bottom-1 w-full h-[3.5px] bg-[#C42625]/40 origin-left scale-x-0 rounded-full" />
            </span>
            <br />
            <span className="inline-block overflow-hidden">
              <span className="hero-word opacity-0 inline-block">Possibilities,</span>
            </span>{" "}
            <span className="inline-block overflow-hidden">
              <span className="hero-word opacity-0 inline-block text-stone-400">built.</span>
            </span>
          </h1>

          {/* Description */}
          <p className="hero-copy opacity-0 text-base sm:text-lg text-stone-600 max-w-xl leading-relaxed font-normal">
            We partner with ambitious enterprises and high-growth technology ventures
            to engineer high-throughput web platforms, cross-platform mobile apps,
            resilient cloud architectures, and bespoke design systems.
          </p>

          {/* Actions */}
          <div className="hero-actions opacity-0 flex flex-wrap items-center gap-4 pt-1">
            <button
              onClick={() => scrollTo("portfolio")}
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#C42625] hover:bg-[#a81f1e] text-white text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-sm hover:shadow-lg hover:shadow-[#C42625]/25 group cursor-pointer"
            >
              <span>Explore Selected Work</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => scrollTo("contact")}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white hover:bg-stone-50 text-stone-800 border border-stone-300 hover:border-stone-400 text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-xs cursor-pointer"
            >
              <span>Schedule a Consultation</span>
            </button>
          </div>

          {/* Credibility highlights */}
          <div className="pt-2 flex flex-wrap items-center gap-5 sm:gap-6 text-xs text-stone-500 font-medium">
            <span className="hero-check-item opacity-0 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#C42625]" />
              Full-Stack Architecture
            </span>
            <span className="hero-check-item opacity-0 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#C42625]" />
              Cloud-Native Scale
            </span>
            <span className="hero-check-item opacity-0 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#C42625]" />
              Award-Winning UI/UX
            </span>
          </div>

          {/* Target Domains Bar */}
          <div className="hero-industry-band opacity-0 pt-3 border-t border-stone-200/80 flex flex-wrap items-center gap-2 text-xs text-stone-500">
            <span className="font-semibold text-stone-700">Specialized Focus:</span>
            {INDUSTRIES.map((ind, i) => (
              <span
                key={i}
                className="px-2.5 py-1 rounded-full bg-stone-100 text-stone-600 font-medium text-[11px]"
              >
                {ind}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column (Sculptural 3D Centerpiece with Floating Badges) */}
        <div className="hero-visual opacity-0 lg:col-span-5 relative">
          <div className="relative rounded-3xl border border-stone-200/90 bg-gradient-to-b from-stone-50/60 via-white to-stone-50/40 p-5 shadow-xs overflow-hidden">
            {/* Top Bar of Sculpture Card */}
            <div className="w-full flex items-center justify-between pb-3 border-b border-stone-100 text-xs text-stone-400 font-medium">
              <span className="flex items-center gap-1.5 text-stone-700 font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#C42625]" />
                Architectural Symbol
              </span>
              <span className="text-stone-400 text-[11px]">North Bridge Tech Studio</span>
            </div>

            {/* 3D Scene */}
            <div className="relative my-2">
              <LogoScene />

              {/* Floating Architectural Badge Top-Right */}
              <div className="hero-floating-card opacity-0 absolute top-4 right-2 hidden sm:flex items-center gap-2 p-2.5 rounded-xl bg-white/90 backdrop-blur-md border border-stone-200 shadow-sm pointer-events-none">
                <div className="w-7 h-7 rounded-lg bg-red-50 text-[#C42625] flex items-center justify-center font-bold text-xs">
                  <Zap className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-stone-900 block leading-tight">Next.js 16 & React 19</span>
                  <span className="text-[10px] text-stone-500 leading-tight">Edge-First Architecture</span>
                </div>
              </div>

              {/* Floating Architectural Badge Bottom-Left */}
              <div className="hero-floating-card opacity-0 absolute bottom-6 left-2 hidden sm:flex items-center gap-2 p-2.5 rounded-xl bg-white/90 backdrop-blur-md border border-stone-200 shadow-sm pointer-events-none">
                <div className="w-7 h-7 rounded-lg bg-stone-100 text-stone-800 flex items-center justify-center font-bold text-xs">
                  <Shield className="w-3.5 h-3.5 text-[#C42625]" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-stone-900 block leading-tight">Sub-20ms Latency</span>
                  <span className="text-[10px] text-stone-500 leading-tight">99.98% High Availability</span>
                </div>
              </div>
            </div>

            {/* Bottom Caption */}
            <div className="w-full pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
              <span>Interactive three-dimensional form</span>
              <span className="text-stone-600 font-medium text-[11px]">Tilt with pointer</span>
            </div>
          </div>
        </div>
      </div>

      {/* Elevated Bottom Metrics Ribbon */}
      <div className="mt-8 sm:mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 p-5 sm:p-7 rounded-2xl bg-stone-50/80 border border-stone-200/90 shadow-2xs">
        {METRICS.map((metric, i) => (
          <div
            key={i}
            className="hero-metric-item opacity-0 flex flex-col space-y-1 p-2 rounded-xl hover:bg-white transition-colors"
          >
            <div className="flex items-baseline gap-1">
              <span className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                {metric.value}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#C42625] mb-1" />
            </div>
            <span className="text-xs sm:text-sm font-semibold text-stone-800">
              {metric.label}
            </span>
            <span className="text-xs text-stone-500">
              {metric.sub}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
