"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
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
      "Legacy transaction batching suffered from high latency spikes (1,400ms P99) and database lock contention.",
    solution:
      "Event-driven Go and Kafka stream architecture with memory-mapped journal persistence and real-time cockpit.",
    results: [
      { label: "P99 Latency", before: "1,400 ms", after: "16 ms", highlight: true },
      { label: "Peak Throughput", before: "120k tx/day", after: "2.4M tx/day", highlight: false },
      { label: "Cloud Cost", before: "$42k/mo", after: "$14.5k/mo", highlight: true },
      { label: "Annual SLA", before: "99.2%", after: "99.995%", highlight: false },
    ],
    architecture: ["Go Microservices", "Kafka", "Next.js", "Redis"],
  },
  {
    id: "biomesh",
    title: "BioMesh Remote Telemetry Gateway",
    client: "BioMesh Health Systems",
    scope: "10-Week Deployment",
    problem:
      "Medical IoT devices frequently disconnected in rural clinical environments, causing critical telemetry loss.",
    solution:
      "Offline-first mobile and edge relay pipeline using local encrypted SQLite buffers and automated sync.",
    results: [
      { label: "Delivery Rate", before: "91.4%", after: "99.999%", highlight: true },
      { label: "Battery Drain / Hr", before: "14.2%", after: "3.8%", highlight: true },
      { label: "Query Speed", before: "84 ms", after: "4 ms", highlight: false },
      { label: "App Rating", before: "3.2 ★", after: "4.9 ★", highlight: false },
    ],
    architecture: ["React Native", "SQLite WAL", "WebSockets"],
  },
  {
    id: "orbit-cdn",
    title: "Orbit Dynamic Edge Caching Matrix",
    client: "Orbit Media Group",
    scope: "8-Week Migration",
    problem:
      "Origin server load during breaking news spikes caused heavy egress bills and slow mobile load times.",
    solution:
      "Intelligent edge routing, stale-while-revalidate invalidation, and edge media transcoding via Cloudflare.",
    results: [
      { label: "Edge TTFB", before: "480 ms", after: "28 ms", highlight: true },
      { label: "Origin Load", before: "94% peak", after: "12% peak", highlight: true },
      { label: "Egress Bills", before: "$68k/mo", after: "$19.2k/mo", highlight: false },
      { label: "Cache Hit Ratio", before: "62%", after: "96.4%", highlight: false },
    ],
    architecture: ["Cloudflare Workers", "Next.js ISR", "Rust Wasm"],
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

          const card = el.querySelector(".projects-dark-card");

          if (card) {
            animate(card, {
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

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="bg-[#0E0C0C] text-white py-14 sm:py-18 lg:py-20 border-y border-stone-800 scroll-mt-16 relative overflow-hidden"
    >
      {/* Subtle brand ambient glow */}
      <div className="absolute top-1/2 left-1/3 w-96 h-96 bg-[#C52623]/6 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
        {/* Animated Heading on Scroll (Dark Mode) */}
        <AnimatedHeading
          dark={true}
          sectionNumber="06"
          badge="Case Studies"
          mainText="Proven Architecture &"
          accentText="Technical Outcomes."
          subText="Real challenges, bespoke solutions, and empirical business results."
        />

        {/* Project Selector Pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          {FEATURED_PROJECTS.map((prj, i) => (
            <button
              key={prj.id}
              onClick={() => setActiveProject(i)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                activeProject === i
                  ? "bg-[#C52623] text-white shadow-sm"
                  : "bg-[#181616] border border-stone-800 text-stone-300 hover:text-white hover:bg-stone-800"
              }`}
            >
              {prj.title}
            </button>
          ))}
        </div>

        {/* Main Selected Project Card */}
        <div className="projects-dark-card opacity-0 rounded-2xl border border-stone-800 bg-[#141212] p-6 sm:p-8 shadow-xl space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-stone-800 gap-3">
            <div className="flex items-center gap-3">
              <Image
                src="/nbt-logo.png"
                alt="NorthBridge Tech"
                width={64}
                height={34}
                className="h-5 w-auto object-contain brightness-110"
              />
              <div>
                <span className="text-[10px] font-mono font-semibold text-stone-500 uppercase tracking-wider block">
                  {current.client}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                  {current.title}
                </h3>
              </div>
            </div>
            <span className="text-xs font-semibold text-stone-400 bg-stone-900 border border-stone-800 px-3 py-1 rounded-full self-start sm:self-auto font-mono">
              {current.scope}
            </span>
          </div>

          {/* Problem vs Solution Split (Trimmed & Punchy) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-black/40 border border-stone-800/80 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wide">
                <ShieldAlert className="w-4 h-4 text-[#C52623]" />
                <span>The Challenge</span>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed font-normal">
                {current.problem}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-stone-800/80 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wide">
                <Cpu className="w-4 h-4 text-[#C52623]" />
                <span>NorthBridge Architecture</span>
              </div>
              <p className="text-xs text-stone-400 leading-relaxed font-normal">
                {current.solution}
              </p>
            </div>
          </div>

          {/* System Architecture Pipeline Flow Bar */}
          <div className="p-3 rounded-xl bg-black/60 border border-stone-800 text-[10px] font-mono">
            <div className="flex items-center justify-between pb-1.5 text-stone-500 border-b border-stone-800">
              <span>SYSTEM ARCHITECTURE PIPELINE</span>
              <span className="text-[#C52623] font-bold">SUB-20MS SLA</span>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-2 text-center">
              <div className="p-1.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-300">
                <span className="block text-white font-bold">01 • Ingress</span>
                <span>Payload Validation</span>
              </div>
              <div className="p-1.5 rounded-lg bg-[#C52623]/20 border border-[#C52623]/40 text-red-200">
                <span className="block text-white font-bold">02 • Core Engine</span>
                <span>Parallel Async Processing</span>
              </div>
              <div className="p-1.5 rounded-lg bg-stone-900 border border-stone-800 text-stone-300">
                <span className="block text-white font-bold">03 • Edge Cache</span>
                <span>Instant Propagation</span>
              </div>
            </div>
          </div>

          {/* Measurable Results */}
          <div className="pt-2">
            <div className="text-[11px] font-mono font-semibold uppercase tracking-wider text-stone-500 mb-3">
              Empirical Improvements:
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {current.results.map((res, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl border border-stone-800/90 bg-[#1A1818]"
                >
                  <div className="text-[10px] font-medium text-stone-400 mb-1 truncate">
                    {res.label}
                  </div>
                  <div className="flex items-baseline justify-between gap-1">
                    <span className="text-xs text-stone-500 line-through">
                      {res.before}
                    </span>
                    <span
                      className={`text-base sm:text-lg font-bold ${
                        res.highlight ? "text-[#C52623]" : "text-white"
                      }`}
                    >
                      {res.after}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Stack Bar & Action */}
          <div className="pt-4 border-t border-stone-800/90 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-stone-400 gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-stone-500 font-medium text-xs mr-1">Stack:</span>
              {current.architecture.map((item) => (
                <span
                  key={item}
                  className="text-[10px] px-2.5 py-0.5 rounded-full bg-stone-900 border border-stone-800 text-stone-300 font-medium"
                >
                  {item}
                </span>
              ))}
            </div>

            <button
              onClick={scrollToContact}
              className="inline-flex items-center gap-1.5 font-bold text-[#C52623] hover:text-white transition-colors cursor-pointer self-start sm:self-auto text-xs"
            >
              <span>Discuss Similar Architecture</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Aerodynamic Section Bridge: Section 06 -> Section 07 */}
        <div className="relative rounded-2xl bg-gradient-to-r from-[#18191B] via-[#484944] to-[#18191B] text-white p-4 sm:p-5 border border-stone-800 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 overflow-hidden">
          <div className="absolute top-0 left-0 w-2 h-full bg-[#C52623]" />
          
          <div className="flex items-center gap-3 pl-2">
            <span className="font-mono text-[10px] font-bold text-[#C52623] bg-red-950/60 border border-red-900/40 px-2 py-0.5 rounded">
              SECTION 06 → 07
            </span>
            <div>
              <span className="text-xs font-bold text-white block">
                Have a project or architectural challenge in mind?
              </span>
              <span className="text-[11px] text-stone-300">
                Direct inquiry channel with Dhrumit Nagarbandhara and our Paris engineering studio.
              </span>
            </div>
          </div>

          <button
            onClick={scrollToContact}
            className="px-4 py-2 rounded-full bg-[#C52623] hover:bg-[#aa1f1c] text-white text-xs font-bold transition-all shadow-sm shrink-0 inline-flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
          >
            <span>Start a Project Brief (Section 07)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
}
