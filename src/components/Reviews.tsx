"use client";

import { useState, useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import AnimatedHeading from "./AnimatedHeading";

const REVIEWS = [
  {
    id: "rev-1",
    author: "Elena Rostova",
    role: "Chief Technology Officer",
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
              translateY: [30, 0],
              scale: [0.97, 1],
              duration: 700,
              ease: "outCubic",
            });
          }

          if (snapshotCards.length > 0) {
            animate(snapshotCards, {
              opacity: [0, 1],
              translateY: [24, 0],
              delay: stagger(60, { start: 300 }),
              duration: 600,
              ease: "outCubic",
            });
          }
        }
      },
      { threshold: 0.15 }
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
      className="min-h-[calc(100dvh-64px)] flex flex-col justify-between py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16 border-b border-stone-200/70"
    >
      {/* Animated Heading on Scroll */}
      <AnimatedHeading
        badge="Our Reviews"
        mainText="Trusted by Technical Leaders"
        accentText="& Visionary Founders."
        subText="Direct assessments from executives who have partnered with North Bridge Tech to architect, build, and scale their most critical software assets."
      />

      {/* Featured Testimonial Card */}
      <div className="reviews-featured-card opacity-0 rounded-3xl border border-stone-200/90 bg-stone-50/70 p-6 sm:p-10 my-auto shadow-xs">
        <div className="flex items-center justify-between pb-4 border-b border-stone-200">
          <div className="text-xs text-stone-500 font-medium">
            Industry Focus: <span className="font-semibold text-stone-800">{REVIEWS[currentIndex].industry}</span>
          </div>

          {/* Navigation arrows */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-stone-400 font-medium">
              {currentIndex + 1} of {REVIEWS.length}
            </span>
            <button
              onClick={prev}
              className="p-1.5 rounded-full border border-stone-200 bg-white hover:bg-stone-100 text-stone-700 transition-colors shadow-2xs cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="p-1.5 rounded-full border border-stone-200 bg-white hover:bg-stone-100 text-stone-700 transition-colors shadow-2xs cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="py-6 sm:py-8">
          <Quote className="w-8 h-8 text-[#C42625]/25 mb-4" />
          <blockquote className="text-lg sm:text-2xl font-medium text-stone-900 leading-relaxed">
            "{REVIEWS[currentIndex].quote}"
          </blockquote>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-5 border-t border-stone-200 gap-3">
          <div>
            <div className="text-base font-bold text-stone-900">
              {REVIEWS[currentIndex].author}
            </div>
            <div className="text-xs text-stone-500 font-medium">
              {REVIEWS[currentIndex].role} —{" "}
              <span className="text-stone-800 font-semibold">
                {REVIEWS[currentIndex].company}
              </span>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-stone-200 text-xs font-semibold text-stone-800 shadow-2xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#C42625]" />
            <span>{REVIEWS[currentIndex].outcome}</span>
          </div>
        </div>
      </div>

      {/* 4 Cards Grid Snapshot */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-auto">
        {REVIEWS.map((rev, idx) => (
          <div
            key={rev.id}
            onClick={() => setCurrentIndex(idx)}
            className={`reviews-snapshot-card opacity-0 cursor-pointer p-4 rounded-xl border transition-all ${
              currentIndex === idx
                ? "bg-white border-stone-900 shadow-xs"
                : "bg-stone-50/50 border-stone-200 hover:bg-white"
            }`}
          >
            <div className="flex items-center justify-between text-xs text-stone-400 mb-1 font-medium">
              <span className="truncate">{rev.company}</span>
              <span className="text-[#C42625] font-semibold">5.0 ★</span>
            </div>
            <div className="text-xs font-bold text-stone-900 truncate">
              {rev.author}
            </div>
            <div className="text-xs text-stone-500 truncate mb-1.5">
              {rev.role}
            </div>
            <div className="text-xs text-[#C42625] font-semibold truncate pt-1.5 border-t border-stone-100">
              {rev.outcome}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
