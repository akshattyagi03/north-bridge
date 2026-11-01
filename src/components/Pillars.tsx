"use client";

import { useEffect, useRef, useState } from "react";
import { animate, stagger } from "animejs";
import {
  Cpu,
  Zap,
  Cloud,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Layers,
  Sparkles,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import AnimatedHeading from "./AnimatedHeading";

export const PILLARS_DATA = [
  {
    num: "01",
    id: "strategy",
    name: "Strategic Synchronization",
    tag: "CPU & BUSINESS LOGIC",
    icon: Cpu,
    summary:
      "Aligning commercial objectives with computational architecture so every feature directly drives business value.",
    metric: "Zero Scope Drift",
    deliverable: "Project Charter & API Specs",
    accent: "from-[#851513] via-[#C52623] to-[#e63935]",
  },
  {
    num: "02",
    id: "speed",
    name: "High-Velocity Performance",
    tag: "SUB-20MS ENGINE",
    icon: Zap,
    summary:
      "Engineered for rapid data throughput, edge caching, and instantaneous response across global networks.",
    metric: "< 20ms Edge Response",
    deliverable: "Optimized Next.js & Caching",
    accent: "from-[#C52623] via-[#ff4a47] to-[#aa1f1c]",
  },
  {
    num: "03",
    id: "cloud",
    name: "Scalable Cloud Foundations",
    tag: "AWS & CONTAINERS",
    icon: Cloud,
    summary:
      "Automated CI/CD pipelines, container orchestration, and multi-region cloud uptime that scales effortlessly.",
    metric: "99.98% High Availability",
    deliverable: "Zero-Downtime Deployment",
    accent: "from-[#353E4F] via-[#484944] to-[#C52623]",
  },
  {
    num: "04",
    id: "sovereignty",
    name: "Client IP Sovereignty",
    tag: "100% OWNERSHIP & SLA",
    icon: ShieldCheck,
    summary:
      "Complete code ownership in your repositories, transparent development, and dedicated Paris studio support.",
    metric: "100% IP Ownership",
    deliverable: "Clean Git & Paris SLA",
    accent: "from-[#851513] via-[#C52623] to-[#484944]",
  },
];

export default function Pillars() {
  const { theme, mounted: themeMounted } = useTheme();
  const isDark = themeMounted ? theme === "dark" : true;

  const [activePillar, setActivePillar] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setAnimated(true);

          const bridgeDeck = el.querySelector(".pillars-bridge-deck");
          const columns = el.querySelectorAll(".pillar-column-item");

          if (bridgeDeck) {
            animate(bridgeDeck, {
              opacity: [0, 1],
              scaleX: [0.92, 1],
              duration: 750,
              ease: "outExpo",
            });
          }

          if (columns.length > 0) {
            animate(columns, {
              opacity: [0, 1],
              translateY: [40, 0],
              delay: stagger(90, { start: 200 }),
              duration: 700,
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

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="pillars"
      ref={sectionRef}
      className={`py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16 space-y-12 transition-colors duration-300 ${
        isDark ? "text-white" : "text-[#18191B]"
      }`}
    >
      {/* Animated Heading on Scroll */}
      <AnimatedHeading
        sectionNumber="04"
        badge="OUR PILLARS • STRUCTURAL FOUNDATIONS"
        mainText="Our Pillars."
        accentText="Supporting The North Bridge."
        subText="Architectural column formations demonstrating our core pillars and physically bearing the weight of the digital bridge above them."
      />

      {/* =========================================================================
          THE BRIDGE FORMATION (Overhead Span + Supporting Vertical Pillars)
         ========================================================================= */}
      <div className="relative pt-6">
        {/* =========================================================================
            1. THE OVERHEAD BRIDGE DECK ("The North Bridge")
           ========================================================================= */}
        <div
          className={`pillars-bridge-deck opacity-0 relative z-20 rounded-2xl border shadow-2xl p-4 sm:p-5 mb-3 transition-all duration-300 ${
            isDark
              ? "bg-gradient-to-r from-[#18191B] via-[#242528] to-[#18191B] border-white/15 text-white"
              : "bg-gradient-to-r from-[#18191B] via-[#33353A] to-[#18191B] border-stone-400/40 text-white"
          }`}
        >
          {/* Glowing Red Energy Conduit on top of the bridge */}
          <div className="absolute -top-1 left-4 right-4 h-1.5 rounded-full bg-gradient-to-r from-[#851513] via-[#C52623] to-[#ff4a47] shadow-[0_0_15px_rgba(197,38,35,0.9)]" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#C52623] text-white flex items-center justify-center font-bold shadow-md shadow-red-950/50">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] font-bold text-[#ff4a47] bg-white/10 px-2 py-0.5 rounded uppercase tracking-wider">
                    THE NORTH BRIDGE OVERHEAD DECK
                  </span>
                  <span className="text-[10px] font-mono text-stone-400 hidden md:inline">
                    STRUCTURAL LOAD BEARING
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                  Unified Digital Architecture & Client Outcomes
                </h3>
              </div>
            </div>

            {/* Bridge Telemetry Badges */}
            <div className="flex items-center gap-2 sm:gap-3 text-xs font-mono">
              <div className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-stone-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#C52623] animate-ping" />
                <span>4 Pillars Locked</span>
              </div>
              <div className="px-3 py-1 rounded-lg bg-[#C52623]/20 border border-[#C52623]/40 text-[#ff4a47] font-bold">
                Sub-20ms Deck Flow
              </div>
            </div>
          </div>

          {/* Suspension Truss Line below the bridge deck */}
          <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-stone-400">
            <span>PILLAR 01: STRATEGY</span>
            <span className="text-[#C52623]">———— TENSION CABLES ————</span>
            <span>PILLAR 02: VELOCITY</span>
            <span className="text-[#C52623]">———— TENSION CABLES ————</span>
            <span>PILLAR 03: CLOUD</span>
            <span className="text-[#C52623]">———— TENSION CABLES ————</span>
            <span>PILLAR 04: SOVEREIGNTY</span>
          </div>
        </div>

        {/* =========================================================================
            2. THE 4 VERTICAL SUPPORTING PILLARS
           ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 pt-2">
          {PILLARS_DATA.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isHovered = activePillar === idx;

            return (
              <div
                key={pillar.id}
                onMouseEnter={() => setActivePillar(idx)}
                onMouseLeave={() => setActivePillar(null)}
                className="pillar-column-item opacity-0 flex flex-col group relative cursor-pointer"
              >
                {/* =========================================================================
                    PILLAR CAPITAL (Top Bracket / Corbel connecting to Bridge)
                   ========================================================================= */}
                <div className="w-full flex flex-col items-center">
                  {/* Corbel Bracket */}
                  <div
                    className={`w-3/4 h-3.5 rounded-t-lg border-t-2 border-x transition-colors duration-300 ${
                      isHovered
                        ? "bg-[#C52623] border-[#ff4a47]"
                        : isDark
                        ? "bg-[#18191C] border-white/15"
                        : "bg-stone-200 border-[#484944]/25"
                    }`}
                  />
                  {/* Capital Abacus */}
                  <div
                    className={`w-5/6 h-2 rounded-t-sm transition-colors duration-300 ${
                      isHovered
                        ? "bg-[#aa1f1c]"
                        : isDark
                        ? "bg-white/10"
                        : "bg-stone-300"
                    }`}
                  />
                </div>

                {/* =========================================================================
                    PILLAR SHAFT (Vertical Column Body)
                   ========================================================================= */}
                <div
                  className={`relative w-full rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 shadow-xl overflow-hidden ${
                    isHovered
                      ? isDark
                        ? "bg-[#16171B] border-[#C52623] shadow-red-950/40 -translate-y-1.5"
                        : "bg-white border-[#C52623] shadow-2xl -translate-y-1.5"
                      : isDark
                      ? "bg-[#101114] border-white/10 text-white"
                      : "bg-white border-[#484944]/15 text-[#18191B]"
                  }`}
                >
                  {/* Central Vertical Architectural Fluting Glow Line */}
                  <div
                    className={`absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 transition-opacity duration-300 pointer-events-none ${
                      isHovered
                        ? "bg-gradient-to-b from-[#C52623] via-[#ff4a47] to-transparent opacity-80"
                        : "bg-white/5 opacity-30"
                    }`}
                  />

                  {/* Top Identifier & Icon */}
                  <div className="relative z-10 flex items-center justify-between pb-4 border-b border-white/10">
                    <div>
                      <span className="font-mono text-2xl font-black text-[#C52623] block leading-none">
                        {pillar.num}
                      </span>
                      <span className="text-[10px] font-mono text-stone-400 uppercase tracking-wider block mt-1">
                        PILLAR
                      </span>
                    </div>

                    <div
                      className={`w-11 h-11 rounded-xl border flex items-center justify-center transition-all duration-300 ${
                        isHovered
                          ? "bg-[#C52623] text-white border-red-400 shadow-lg scale-110"
                          : isDark
                          ? "bg-white/5 border-white/10 text-stone-300"
                          : "bg-stone-100 border-[#484944]/15 text-stone-700"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Column Body Content */}
                  <div className="relative z-10 space-y-3 py-4">
                    <span className="text-[10px] font-mono font-bold text-[#C52623] bg-[#C52623]/10 border border-[#C52623]/25 px-2.5 py-0.5 rounded-full inline-block">
                      {pillar.tag}
                    </span>

                    <h4
                      className={`text-base sm:text-lg font-black leading-tight group-hover:text-[#C52623] transition-colors ${
                        isDark ? "text-white" : "text-[#18191B]"
                      }`}
                    >
                      {pillar.name}
                    </h4>

                    <p
                      className={`text-xs leading-relaxed font-normal ${
                        isDark ? "text-stone-300" : "text-[#484944]"
                      }`}
                    >
                      {pillar.summary}
                    </p>
                  </div>

                  {/* Pillar Footing Deliverable */}
                  <div
                    className={`relative z-10 pt-4 border-t flex flex-col gap-1 text-[11px] font-mono ${
                      isDark ? "border-white/10" : "border-stone-100"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={isDark ? "text-stone-400" : "text-[#484944]"}>Metric:</span>
                      <span className="text-[#C52623] font-bold">{pillar.metric}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-stone-400 pt-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C52623] shrink-0" />
                      <span className="truncate">{pillar.deliverable}</span>
                    </div>
                  </div>
                </div>

                {/* =========================================================================
                    PILLAR BASE / PEDESTAL (Grounding into bedrock)
                   ========================================================================= */}
                <div className="w-full flex flex-col items-center">
                  {/* Plinth Step 1 */}
                  <div
                    className={`w-5/6 h-2 rounded-b-sm transition-colors duration-300 ${
                      isHovered
                        ? "bg-[#aa1f1c]"
                        : isDark
                        ? "bg-white/10"
                        : "bg-stone-300"
                    }`}
                  />
                  {/* Plinth Step 2 (Ground Footing) */}
                  <div
                    className={`w-11/12 h-3.5 rounded-b-lg border-b-2 border-x transition-colors duration-300 ${
                      isHovered
                        ? "bg-[#C52623] border-[#ff4a47]"
                        : isDark
                        ? "bg-[#18191C] border-white/15"
                        : "bg-stone-200 border-[#484944]/25"
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* =========================================================================
            FOUNDATION BEDROCK FOOTER STRIP
           ========================================================================= */}
        <div
          className={`mt-4 rounded-xl border p-3 sm:p-4 text-center text-xs font-mono flex flex-col sm:flex-row items-center justify-between gap-3 ${
            isDark
              ? "bg-[#0B0C0E] border-white/10 text-stone-400"
              : "bg-stone-100 border-[#484944]/15 text-[#484944]"
          }`}
        >
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C52623]" />
            <span>ARCHITECTURAL BEDROCK: 100% Client IP Ownership &amp; Sub-20ms Core Engine</span>
          </span>

          <button
            onClick={scrollToContact}
            className="inline-flex items-center gap-1.5 text-[#C52623] font-bold hover:underline cursor-pointer"
          >
            <span>Partner with NorthBridge Tech</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
