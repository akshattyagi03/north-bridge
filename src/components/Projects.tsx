"use client";

import { useState, useEffect, useRef } from "react";
import { animate } from "animejs";
import { ArrowRight, ShieldAlert, Cpu } from "lucide-react";
import AnimatedHeading from "./AnimatedHeading";

const FEATURED_PROJECTS = [
  {
    id: "finpulse",
    title: "FinPulse Real-Time Settlement Engine",
    client: "Global Financial Technologies",
    scope: "14-Week Engagement",
    problem:
      "Legacy transaction batching suffered from high latency spikes (1,400ms P99) and database lock contention during volatility peaks.",
    solution:
      "Event-driven Go and Kafka stream architecture with memory-mapped journal persistence and a Next.js 16 real-time operator cockpit.",
    results: [
      { label: "P99 Settlement Latency", before: "1,400 ms", after: "16 ms", highlight: true },
      { label: "Daily Peak Throughput", before: "120k tx/day", after: "2.4M tx/day", highlight: false },
      { label: "Cloud Cost / Month", before: "$42k/mo", after: "$14.5k/mo", highlight: true },
      { label: "Annual Uptime SLA", before: "99.2%", after: "99.995%", highlight: false },
    ],
    architecture: ["Go Microservices", "Kafka", "Next.js", "Redis", "PostgreSQL"],
  },
  {
    id: "biomesh",
    title: "BioMesh Remote Telemetry Gateway",
    client: "BioMesh Health Systems",
    scope: "10-Week Deployment",
    problem:
      "Medical IoT devices frequently disconnected in low-bandwidth rural clinical environments, causing critical telemetry packet loss.",
    solution:
      "Offline-first mobile and edge relay pipeline using local encrypted SQLite buffers, automated sync reconciliation, and WebSocket streaming.",
    results: [
      { label: "Packet Delivery Rate", before: "91.4%", after: "99.999%", highlight: true },
      { label: "Battery Drain / Hr", before: "14.2%", after: "3.8%", highlight: true },
      { label: "SQLite Query Speed", before: "84 ms", after: "4 ms", highlight: false },
      { label: "App Store User Rating", before: "3.2 ★", after: "4.9 ★", highlight: false },
    ],
    architecture: ["React Native", "C++ Modules", "SQLite WAL", "WebSockets"],
  },
  {
    id: "orbit-cdn",
    title: "Orbit Dynamic Edge Caching Matrix",
    client: "Orbit Media Group",
    scope: "8-Week Migration",
    problem:
      "Origin server load and sluggish response times during breaking news traffic spikes caused high egress bills and bounce rates.",
    solution:
      "Intelligent edge routing, stale-while-revalidate invalidation protocols, and automated video transcoding at the Cloudflare edge tier.",
    results: [
      { label: "Global Edge TTFB", before: "480 ms", after: "28 ms", highlight: true },
      { label: "Origin Server Load", before: "94% peak", after: "12% peak", highlight: true },
      { label: "Monthly Egress Bills", before: "$68k/mo", after: "$19.2k/mo", highlight: false },
      { label: "Cache Hit Ratio", before: "62%", after: "96.4%", highlight: false },
    ],
    architecture: ["Cloudflare Workers", "V8 Isolates", "Next.js ISR", "Rust Wasm"],
  },
];

export default function Projects() {
  const [activeProject, setActiveProject] = useState(0);
  const current = FEATURED_PROJECTS[activeProject];
  const sectionRef = useRef<HTMLDivElement>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated) {
          setAnimated(true);

          const pills = el.querySelector(".projects-pills-bar");
          const card = el.querySelector(".projects-main-card");
          const bottomBar = el.querySelector(".projects-bottom-bar");

          if (pills) {
            animate(pills, {
              opacity: [0, 1],
              translateY: [10, 0],
              duration: 450,
              ease: "outCubic",
            });
          }

          if (card) {
            animate(card, {
              opacity: [0, 1],
              translateY: [20, 0],
              duration: 550,
              ease: "outCubic",
            });
          }

          if (bottomBar) {
            animate(bottomBar, {
              opacity: [0, 1],
              translateY: [10, 0],
              delay: 250,
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

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="min-h-[calc(100dvh-64px)] lg:h-[calc(100dvh-64px)] lg:max-h-[calc(100dvh-64px)] flex flex-col justify-between py-2 sm:py-3 lg:py-4 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-16 overflow-hidden border-b border-stone-200/70"
    >
      {/* Animated Heading on Scroll */}
      <AnimatedHeading
        badge="Our Projects"
        mainText="Case Studies &"
        accentText="Architectural Outcomes."
        subText="A comprehensive look at complex technical challenges, strategic solutions, and the empirical performance results delivered to our partners."
      />

      {/* Project Selector Pills */}
      <div className="projects-pills-bar opacity-0 flex flex-wrap gap-1.5 pt-1 pb-1 shrink-0">
        {FEATURED_PROJECTS.map((prj, i) => (
          <button
            key={prj.id}
            onClick={() => setActiveProject(i)}
            className={`px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide transition-all cursor-pointer ${
              activeProject === i
                ? "bg-stone-900 text-white shadow-2xs"
                : "bg-white border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-50"
            }`}
          >
            {prj.title}
          </button>
        ))}
      </div>

      {/* Main Selected Project Card */}
      <div className="projects-main-card opacity-0 rounded-2xl border border-stone-200/90 bg-white p-3.5 sm:p-4 shadow-2xs my-auto">
        <div className="flex items-center justify-between pb-2.5 border-b border-stone-100 mb-2.5">
          <div>
            <span className="text-[10px] font-semibold text-[#8A8683] uppercase tracking-wider block">
              {current.client}
            </span>
            <h3 className="text-sm sm:text-base font-bold text-stone-900 mt-0.5">
              {current.title}
            </h3>
          </div>
          <span className="text-[11px] font-medium text-stone-500 bg-stone-100 px-2.5 py-0.5 rounded-full">
            {current.scope}
          </span>
        </div>

        {/* Problem vs Solution Split */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-3 border-b border-stone-100">
          <div className="p-3 rounded-xl bg-stone-50/70 border border-stone-200/80 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
              <ShieldAlert className="w-3.5 h-3.5 text-[#C42625]" />
              <span>The Challenge</span>
            </div>
            <p className="text-xs text-stone-600 leading-snug font-normal line-clamp-2">
              {current.problem}
            </p>
          </div>

          <div className="p-3 rounded-xl bg-stone-50/70 border border-stone-200/80 space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
              <Cpu className="w-3.5 h-3.5 text-[#C42625]" />
              <span>The Architecture</span>
            </div>
            <p className="text-xs text-stone-600 leading-snug font-normal line-clamp-2">
              {current.solution}
            </p>
          </div>
        </div>

        {/* Measurable Results */}
        <div className="pt-2.5">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-[#8A8683] mb-1.5">
            Empirical Benchmark Improvements:
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {current.results.map((res, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-lg border ${
                  res.highlight
                    ? "bg-stone-50/90 border-stone-300"
                    : "bg-white border-stone-200"
                }`}
              >
                <div className="text-[10px] font-medium text-stone-500 mb-0.5 truncate">
                  {res.label}
                </div>
                <div className="flex items-baseline justify-between">
                  <span className="text-[10px] text-stone-400 line-through">
                    {res.before}
                  </span>
                  <span
                    className={`text-sm sm:text-base font-bold ${
                      res.highlight ? "text-[#C42625]" : "text-stone-900"
                    }`}
                  >
                    {res.after}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Stack Bar & Action */}
      <div className="projects-bottom-bar opacity-0 rounded-xl border border-stone-200/90 bg-stone-50/70 p-2 sm:p-2.5 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-stone-500 gap-2 shrink-0">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-stone-400 font-medium text-[11px]">Stack:</span>
          {current.architecture.map((item) => (
            <span
              key={item}
              className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-stone-200 text-stone-700 font-medium"
            >
              {item}
            </span>
          ))}
        </div>

        <button
          onClick={scrollToContact}
          className="inline-flex items-center gap-1 font-semibold text-[#C42625] hover:text-[#a81f1e] transition-colors cursor-pointer self-start sm:self-auto text-xs"
        >
          <span>Discuss Similar Architecture</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
}
