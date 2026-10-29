"use client";

import { useState, useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import AnimatedHeading from "./AnimatedHeading";

const REVIEWS = [
  {
    id: "rev-1",
    author: "Elena Rostova",
    role: "CTO",
    company: "NexusPay Global",
    quote:
      "North Bridge engineered our core payment orchestration platform from the ground up. Over 1.2M transactions went through our engine on peak holiday sales with zero outages and sub-18ms latency. Their systems engineering depth is unmatched.",
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
      "Their balance of uncompromising software architecture and sleek design is rare. The cross-platform mobile app they delivered won two healthcare design awards and slashed our real-time telemetry latency by 64%.",
    stars: 5,
    outcome: "64% Latency Drop & 2 Product Awards",
    industry: "Digital Health",
  },
  {
    id: "rev-3",
    author: "Dr. Sarah Chen",
    role: "VP of Engineering",
    company: "Krypton Fleet Systems",
    quote:
      "North Bridge doesn't just deliver features; they design systems that scale effortlessly. Their Kubernetes clustering and Redis pipeline handled 15,000+ real-time fleet telemetry streams without breaking a sweat.",
    stars: 5,
    outcome: "22% Cloud Cost Reduction",
    industry: "Supply Chain & Logistics",
  },
  {
    id: "rev-4",
    author: "David Vance",
    role: "Founder & CEO",
    company: "Veloce Commerce",
    quote:
      "Migrating our legacy e-commerce to North Bridge's headless Next.js architecture boosted our Google Lighthouse score from 54 to 99. Our checkout conversion rate jumped 48% within 30 days of launch.",
    stars: 5,
    outcome: "+48% Checkout Conversion Surge",
    industry: "E-Commerce",
  },
];

export default function Reviews() {
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
          const snapshotCards = el.querySelectorAll(".reviews-snapshot-card");

          if (featuredCard) {
            animate(featuredCard, {
              opacity: [0, 1],
              translateY: [20, 0],
              scale: [0.98, 1],
              duration: 550,
              ease: "outCubic",
            });
          }

          if (snapshotCards.length > 0) {
            animate(snapshotCards, {
              opacity: [0, 1],
              translateY: [15, 0],
              delay: stagger(45, { start: 200 }),
              duration: 500,
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
      className="min-h-[calc(100dvh-64px)] lg:h-[calc(100dvh-64px)] lg:max-h-[calc(100dvh-64px)] flex flex-col justify-between py-2 sm:py-3 lg:py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16 overflow-hidden border-b border-stone-200/70"
    >
      {/* Animated Heading on Scroll */}
      <AnimatedHeading
        badge="Our Reviews"
        mainText="Verified Partnership"
        accentText="Client Testimonials."
        subText="Unvarnished feedback from engineering executives and product leaders who rely on North Bridge Tech architectures in mission-critical environments."
      />

      {/* Featured Review Main Card */}
      <div className="reviews-featured-card opacity-0 rounded-2xl border border-stone-200/90 bg-stone-50/70 p-4 sm:p-5 shadow-2xs my-auto">
        <div className="flex items-center justify-between pb-2.5 border-b border-stone-200/80">
          <div className="flex items-center gap-2">
            <div className="flex items-center text-[#C42625]">
              {[...Array(REVIEWS[currentIndex].stars)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="text-xs font-bold text-stone-900">5.0 / 5.0 Rating</span>
          </div>

          <div className="text-[11px] text-stone-500 font-medium hidden sm:block">
            Industry: <span className="font-semibold text-stone-800">{REVIEWS[currentIndex].industry}</span>
          </div>

          {/* Navigation arrows */}
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] text-stone-400 font-medium">
              {currentIndex + 1} of {REVIEWS.length}
            </span>
            <button
              onClick={prev}
              className="p-1 rounded-full border border-stone-200 bg-white hover:bg-stone-100 text-stone-700 transition-colors shadow-2xs cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={next}
              className="p-1 rounded-full border border-stone-200 bg-white hover:bg-stone-100 text-stone-700 transition-colors shadow-2xs cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="py-3 sm:py-3.5">
          <Quote className="w-6 h-6 text-[#C42625]/25 mb-1.5" />
          <blockquote className="text-sm sm:text-base lg:text-lg font-medium text-stone-900 leading-relaxed line-clamp-3">
            "{REVIEWS[currentIndex].quote}"
          </blockquote>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-3 border-t border-stone-200 gap-2">
          <div>
            <div className="text-xs sm:text-sm font-bold text-stone-900">
              {REVIEWS[currentIndex].author}
            </div>
            <div className="text-[11px] text-stone-500 font-medium">
              {REVIEWS[currentIndex].role} —{" "}
              <span className="text-stone-800 font-semibold">
                {REVIEWS[currentIndex].company}
              </span>
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-stone-200 text-xs font-semibold text-stone-800 shadow-2xs self-start sm:self-auto">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#C42625]" />
            <span>{REVIEWS[currentIndex].outcome}</span>
          </div>
        </div>
      </div>

      {/* 4 Cards Grid Snapshot */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-2.5 shrink-0">
        {REVIEWS.map((rev, idx) => (
          <div
            key={rev.id}
            onClick={() => setCurrentIndex(idx)}
            className={`reviews-snapshot-card opacity-0 cursor-pointer p-2.5 sm:p-3 rounded-xl border transition-all ${
              currentIndex === idx
                ? "bg-white border-stone-900 shadow-2xs"
                : "bg-stone-50/50 border-stone-200/90 hover:bg-white"
            }`}
          >
            <div className="flex items-center justify-between text-[11px] text-stone-400 mb-0.5 font-medium">
              <span className="truncate">{rev.company}</span>
              <span className="text-[#C42625] font-semibold text-[10px]">5.0 ★</span>
            </div>
            <div className="text-xs font-bold text-stone-900 truncate">
              {rev.author}
            </div>
            <div className="text-[11px] text-[#C42625] font-medium truncate pt-1 border-t border-stone-100 mt-1">
              {rev.outcome}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
