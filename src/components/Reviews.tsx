"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { animate } from "animejs";
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";
import AnimatedHeading from "./AnimatedHeading";
import { useTheme } from "../context/ThemeContext";

const REVIEWS = [
  {
    id: "rev-1",
    author: "Elena Rostova",
    role: "CTO",
    company: "NexusPay Global",
    quote:
      "NorthBridge Tech engineered our payment orchestration platform from conversation to launch. Over 1.2M transactions went through our engine on peak holiday sales with zero outages and sub-18ms latency.",
    stars: 5,
    outcome: "100% Uptime Under 4x Peak Load",
    industry: "Fintech & Payments",
  },
  {
    id: "rev-2",
    author: "Marcus Sterling",
    role: "Head of Product",
    company: "Aura Health Ecosystem",
    quote:
      "From initial discovery to Figma prototyping and mobile delivery, NorthBridge Tech brought clarity and speed. The mobile app slashed our real-time telemetry latency by 64%.",
    stars: 5,
    outcome: "64% Latency Drop & Rapid Delivery",
    industry: "Digital Health & Mobile",
  },
  {
    id: "rev-3",
    author: "Dr. Sarah Chen",
    role: "VP of Engineering",
    company: "Krypton Fleet Systems",
    quote:
      "NorthBridge Tech designs systems that scale effortlessly. Their cloud setup and maintenance pipelines handled 15,000+ real-time telemetry streams without breaking a sweat.",
    stars: 5,
    outcome: "99.98% High Availability Achieved",
    industry: "Cloud & Systems",
  },
  {
    id: "rev-4",
    author: "David Vance",
    role: "Founder & CEO",
    company: "Veloce Commerce",
    quote:
      "Migrating our online store to NorthBridge Tech's custom architecture boosted our Lighthouse score to 100. Having one technology partner manage web, cloud, and branding gave us exponential growth.",
    stars: 5,
    outcome: "+48% Checkout Conversion Surge",
    industry: "E-Commerce & Marketing",
  },
];

export default function Reviews() {
  const { theme, mounted: themeMounted } = useTheme();
  const isDark = themeMounted ? theme === "dark" : false;

  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setAnimated(true);

          const featuredCard = el.querySelector(".reviews-featured-card");

          if (featuredCard) {
            animate(featuredCard, {
              opacity: [0, 1],
              translateY: [20, 0],
              duration: 550,
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

  const next = () => setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);

  return (
    <section
      id="reviews"
      ref={sectionRef}
      className={`py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16 border-b transition-colors duration-300 ${
        isDark ? "border-stone-800/80 text-white" : "border-stone-200 text-[#18191B]"
      }`}
    >
      {/* Animated Heading on Scroll */}
      <AnimatedHeading
        sectionNumber="06"
        badge="CLIENT FEEDBACK • 5.0 VERIFIED"
        mainText="Verified Partnership"
        accentText="Client Testimonials."
        subText="Direct feedback from founders and engineering leaders who rely on NorthBridge Tech."
      />

      {/* Verified Score & Metric Trust Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 pb-4">
        <div
          className={`p-4 sm:p-5 rounded-2xl border shadow-sm transition-all duration-300 ${
            isDark ? "bg-[#121316] border-white/10 hover:border-white/20" : "bg-white border-[#484944]/15 hover:border-stone-400"
          }`}
        >
          <div className="flex items-center gap-1 text-[#C52623] mb-1.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current drop-shadow-xs" />
            ))}
          </div>
          <span
            className={`text-2xl sm:text-3xl font-black block leading-none ${
              isDark ? "text-white" : "text-[#18191B]"
            }`}
          >
            4.9 / 5.0
          </span>
          <span
            className={`text-xs font-medium block mt-1.5 ${
              isDark ? "text-stone-400" : "text-[#484944]"
            }`}
          >
            Average Client Rating
          </span>
        </div>

        <div
          className={`p-4 sm:p-5 rounded-2xl border shadow-sm transition-all duration-300 ${
            isDark ? "bg-[#121316] border-white/10 hover:border-white/20" : "bg-white border-[#484944]/15 hover:border-stone-400"
          }`}
        >
          <span className="text-2xl sm:text-3xl font-black text-[#C52623] block leading-none">100%</span>
          <span
            className={`text-xs font-bold block mt-1.5 ${
              isDark ? "text-white" : "text-[#18191B]"
            }`}
          >
            On-Time Delivery
          </span>
          <span
            className={`text-xs font-medium block mt-0.5 ${
              isDark ? "text-stone-400" : "text-[#484944]"
            }`}
          >
            SLA Guaranteed
          </span>
        </div>

        <div
          className={`p-4 sm:p-5 rounded-2xl border shadow-sm transition-all duration-300 ${
            isDark ? "bg-[#121316] border-white/10 hover:border-white/20" : "bg-white border-[#484944]/15 hover:border-stone-400"
          }`}
        >
          <span
            className={`text-2xl sm:text-3xl font-black block leading-none ${
              isDark ? "text-white" : "text-[#18191B]"
            }`}
          >
            45+
          </span>
          <span
            className={`text-xs font-bold block mt-1.5 ${
              isDark ? "text-white" : "text-[#18191B]"
            }`}
          >
            Products Launched
          </span>
          <span
            className={`text-xs font-medium block mt-0.5 ${
              isDark ? "text-stone-400" : "text-[#484944]"
            }`}
          >
            Web, Mobile & Cloud
          </span>
        </div>

        <div
          className={`p-4 sm:p-5 rounded-2xl border shadow-sm transition-all duration-300 ${
            isDark ? "bg-[#121316] border-white/10 hover:border-white/20" : "bg-white border-[#484944]/15 hover:border-stone-400"
          }`}
        >
          <span className="text-2xl sm:text-3xl font-black text-[#C52623] block leading-none">0</span>
          <span
            className={`text-xs font-bold block mt-1.5 ${
              isDark ? "text-white" : "text-[#18191B]"
            }`}
          >
            Security Incidents
          </span>
          <span
            className={`text-xs font-medium block mt-0.5 ${
              isDark ? "text-stone-400" : "text-[#484944]"
            }`}
          >
            Production Architecture
          </span>
        </div>
      </div>

      <div className="pt-4 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Featured Review Main Card (Left: 7 cols) */}
        <div
          className={`reviews-featured-card opacity-0 lg:col-span-7 rounded-3xl border p-6 sm:p-8 shadow-xl space-y-5 flex flex-col justify-between transition-colors duration-300 ${
            isDark ? "bg-[#101114] border-white/10" : "bg-white border-[#484944]/15"
          }`}
        >
          <div className="space-y-4">
            <div
              className={`flex items-center justify-between pb-3 border-b ${
                isDark ? "border-white/10" : "border-stone-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <Image
                  src="/nbt-logo.png"
                  alt="NorthBridge Tech"
                  width={64}
                  height={34}
                  className={`h-5 w-auto object-contain ${isDark ? "brightness-110" : ""}`}
                />
                <div className="flex items-center text-[#C52623]">
                  {[...Array(REVIEWS[currentIndex].stars)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span
                  className={`text-xs font-bold hidden sm:inline ${
                    isDark ? "text-white" : "text-[#18191B]"
                  }`}
                >
                  5.0 / 5.0 VERIFIED
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-xs font-mono ${isDark ? "text-stone-400" : "text-[#484944]"}`}>
                  {currentIndex + 1} / {REVIEWS.length}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={prev}
                    className={`p-1.5 rounded-full border transition-all cursor-pointer ${
                      isDark
                        ? "bg-white/5 border-white/10 hover:bg-white/10 text-white"
                        : "bg-stone-50 border-stone-200 hover:bg-stone-100 text-stone-700"
                    }`}
                    aria-label="Previous Review"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={next}
                    className={`p-1.5 rounded-full border transition-all cursor-pointer ${
                      isDark
                        ? "bg-white/5 border-white/10 hover:bg-white/10 text-white"
                        : "bg-stone-50 border-stone-200 hover:bg-stone-100 text-stone-700"
                    }`}
                    aria-label="Next Review"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <Quote className="w-8 h-8 text-[#C52623]/30" />

            <p
              className={`text-base sm:text-lg leading-relaxed font-medium italic ${
                isDark ? "text-stone-100" : "text-[#18191B]"
              }`}
            >
              &ldquo;{REVIEWS[currentIndex].quote}&rdquo;
            </p>
          </div>

          <div
            className={`pt-4 border-t flex flex-wrap items-center justify-between gap-3 ${
              isDark ? "border-white/10" : "border-stone-100"
            }`}
          >
            <div>
              <span
                className={`text-sm font-bold block ${
                  isDark ? "text-white" : "text-[#18191B]"
                }`}
              >
                {REVIEWS[currentIndex].author}
              </span>
              <span
                className={`text-xs block ${
                  isDark ? "text-stone-400" : "text-[#484944]"
                }`}
              >
                {REVIEWS[currentIndex].role} • {REVIEWS[currentIndex].company}
              </span>
            </div>

            <span className="text-[10px] font-mono font-bold text-[#C52623] bg-[#C52623]/10 border border-[#C52623]/25 px-2.5 py-1 rounded-full">
              {REVIEWS[currentIndex].outcome}
            </span>
          </div>
        </div>

        {/* Right: Client Review Selector Miniatures (5 cols) */}
        <div className="lg:col-span-5 space-y-3 flex flex-col justify-between">
          {REVIEWS.map((rev, i) => (
            <button
              key={rev.id}
              onClick={() => setCurrentIndex(i)}
              className={`p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer w-full flex items-center justify-between ${
                currentIndex === i
                  ? "bg-[#18191B] text-white border-[#C52623] shadow-md shadow-red-950/30 scale-[1.01]"
                  : isDark
                  ? "bg-[#121316] text-stone-300 border-white/10 hover:border-white/20 hover:bg-white/5"
                  : "bg-white text-[#18191B] border-[#484944]/15 hover:border-stone-400 hover:bg-stone-50"
              }`}
            >
              <div>
                <span className="text-xs font-bold block">{rev.author}</span>
                <span className={`text-[11px] block mt-0.5 ${currentIndex === i ? "text-stone-400" : isDark ? "text-stone-400" : "text-[#484944]"}`}>
                  {rev.role} • {rev.company}
                </span>
              </div>

              <div className="flex items-center gap-1 text-[#C52623]">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="font-mono text-xs font-bold">{rev.stars}.0</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
