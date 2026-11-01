"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { animate } from "animejs";
import {
  Globe,
  Smartphone,
  Cloud,
  CreditCard,
  Palette,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  X,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import AnimatedHeading from "./AnimatedHeading";

export const SERVICES = [
  {
    id: "web-dev",
    num: "01",
    slideNum: "04",
    title: "Web Development",
    icon: Globe,
    tagline: "High-Conversion SaaS & Enterprise Portals",
    bgImage: "/slides/slide-4.webp",
    badge: "ARCHITECTURE & SAAS",
    description:
      "Full-stack web applications, SaaS dashboards, and enterprise platforms built with Next.js 16, React 19, and TypeScript. Engineered for sub-20ms edge latency.",
    deliverables: ["Custom SaaS Architecture", "Sub-20ms Edge Engine", "Microservices & APIs"],
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "mobile-apps",
    num: "02",
    slideNum: "05",
    title: "Mobile App Development",
    icon: Smartphone,
    tagline: "Cross-Platform iOS & Android Systems",
    bgImage: "/slides/slide-5.webp",
    badge: "ONE CODEBASE • MULTI-PLATFORM",
    description:
      "Native-feeling iOS and Android mobile applications engineered with React Native and Expo. Offline-first synchronization, push telemetry, and high responsiveness.",
    deliverables: ["Cross-Platform Mobile", "Offline-First SQLite WAL", "Real-Time Push Telemetry"],
    stack: ["React Native", "Expo", "SQLite", "Push Notifications"],
  },
  {
    id: "cloud-devops",
    num: "03",
    slideNum: "06",
    title: "Deployment & Cloud",
    icon: Cloud,
    tagline: "High-Uptime AWS & DevOps Pipelines",
    bgImage: "/slides/slide-6.webp",
    badge: "DEPLOY • MONITOR • MAINTAIN",
    description:
      "High-uptime AWS cloud environments, automated CI/CD release pipelines, Docker container orchestration, and continuous 24/7 health monitoring.",
    deliverables: ["Zero-Downtime Releases", "High-Availability AWS", "Automated CI/CD Pipelines"],
    stack: ["AWS", "Docker", "CI/CD", "Prometheus"],
  },
  {
    id: "ui-ux",
    num: "04",
    slideNum: "07",
    title: "UI / UX Design",
    icon: Palette,
    tagline: "Design Systems, Tokens & Prototypes",
    bgImage: "/slides/slide-7.webp",
    badge: "IDEA → WIREFRAME → PROTOTYPE",
    description:
      "We transform complex workflows into clean user flows, production Figma token systems, interactive prototypes, and frictionless developer handoff specifications.",
    deliverables: ["Figma Design Systems", "Design Token Libraries", "Interactive Clickable Prototypes"],
    stack: ["Figma", "Design Tokens", "Wireframing", "Handoff"],
  },
  {
    id: "integrations",
    num: "05",
    slideNum: "08",
    title: "API & System Integrations",
    icon: CreditCard,
    tagline: "Payment Gateways & Enterprise Sync",
    bgImage: "/slides/slide-8.webp",
    badge: "CONNECT • SYNC • AUTOMATE",
    description:
      "Seamless integrations with Stripe billing, external payment gateways, CRM databases, webhooks, and custom microservices to keep systems synchronized.",
    deliverables: ["Stripe Billing Orchestration", "REST & GraphQL Gateways", "Workflow Automations"],
    stack: ["Stripe", "GraphQL", "Webhooks", "Redis"],
  },
  {
    id: "marketing",
    num: "06",
    slideNum: "09",
    title: "Digital Brand & Marketing",
    icon: Sparkles,
    tagline: "Visual Identity & High-Conversion Assets",
    bgImage: "/slides/slide-9.webp",
    badge: "BRAND • CREATE • PROMOTE",
    description:
      "Multi-channel visual identity guidelines, corporate presentation decks, and high-conversion ad campaign assets tailored for modern technology brands.",
    deliverables: ["Brand Identity Guidelines", "Social Media Creatives", "Ad Campaign Asset Kits"],
    stack: ["Brand Identity", "Vector Graphics", "Ad Creatives", "Decks"],
  },
];

// Double the items for seamless infinite marquee loop
const CAROUSEL_ITEMS = [...SERVICES, ...SERVICES];

export default function Services() {
  const { theme, mounted: themeMounted } = useTheme();
  const isDark = themeMounted ? theme === "dark" : true;

  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollPosRef = useRef(0);
  const animFrameRef = useRef<number | null>(null);

  // 3D Card Hover Tilt state map
  const [tiltMap, setTiltMap] = useState<Record<number, { rotX: number; rotY: number }>>({});

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>, idx: number) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotY = ((x / rect.width) * 2 - 1) * 12; // -12deg to +12deg
    const rotX = -(((y / rect.height) * 2 - 1) * 12); // -12deg to +12deg

    setTiltMap((prev) => ({ ...prev, [idx]: { rotX, rotY } }));
  };

  const handleCardMouseLeave = (idx: number) => {
    setTiltMap((prev) => ({ ...prev, [idx]: { rotX: 0, rotY: 0 } }));
  };

  // Automatic infinite marquee loop
  const step = useCallback(() => {
    const el = carouselRef.current;
    if (el && !isPaused) {
      scrollPosRef.current += 1.15; // Smooth automatic scrolling speed
      const maxScroll = el.scrollWidth / 2;

      if (scrollPosRef.current >= maxScroll) {
        scrollPosRef.current = 0;
      }
      el.scrollLeft = scrollPosRef.current;
    }
    animFrameRef.current = requestAnimationFrame(step);
  }, [isPaused]);

  useEffect(() => {
    animFrameRef.current = requestAnimationFrame(step);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [step]);

  const handleScrollManual = (direction: "left" | "right") => {
    const el = carouselRef.current;
    if (!el) return;
    const delta = direction === "left" ? -360 : 360;
    el.scrollBy({ left: delta, behavior: "smooth" });
    scrollPosRef.current = el.scrollLeft + delta;
  };

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const previewItem = selectedService !== null ? SERVICES[selectedService] : null;

  return (
    <section
      id="services"
      ref={sectionRef}
      className={`py-16 sm:py-24 scroll-mt-16 relative overflow-hidden transition-colors duration-300 ${
        isDark
          ? "bg-[#090A0D] text-white border-y border-stone-800/80"
          : "bg-[#FAFAF9] text-[#18191B] border-y border-stone-200"
      }`}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C52623]/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#C52623]/8 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
        {/* Animated Heading on Scroll */}
        <AnimatedHeading
          sectionNumber="03"
          badge="OUR CAPABILITIES • INFINITE CAROUSEL"
          mainText="Our Services."
          accentText="Interactive 3D Disciplines."
          subText="Cards moving in an automatic infinite loop with 3D hover responsiveness. Hover any card to pause and inspect."
        />

        {/* Carousel Controls Bar */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2 text-xs font-mono text-stone-500">
            <span className="w-2 h-2 rounded-full bg-[#C52623] animate-pulse" />
            <span className="font-bold text-[#C52623]">AUTOMATIC INFINITE MARQUEE</span>
            <span className="hidden sm:inline">• Hover to pause • Drag or tilt in 3D</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPaused((prev) => !prev)}
              className={`p-2 rounded-full border text-xs font-mono transition-all cursor-pointer ${
                isDark
                  ? "bg-white/5 border-white/10 hover:bg-white/10 text-stone-300"
                  : "bg-white border-stone-200 hover:bg-stone-100 text-stone-700"
              }`}
              title={isPaused ? "Resume Auto Scroll" : "Pause Auto Scroll"}
              aria-label="Pause or Resume Auto Scroll"
            >
              {isPaused ? <Play className="w-4 h-4 text-[#C52623]" /> : <Pause className="w-4 h-4" />}
            </button>

            <button
              onClick={() => handleScrollManual("left")}
              className={`p-2 rounded-full border text-xs font-mono transition-all cursor-pointer ${
                isDark
                  ? "bg-white/5 border-white/10 hover:bg-white/10 text-stone-300"
                  : "bg-white border-stone-200 hover:bg-stone-100 text-stone-700"
              }`}
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={() => handleScrollManual("right")}
              className={`p-2 rounded-full border text-xs font-mono transition-all cursor-pointer ${
                isDark
                  ? "bg-white/5 border-white/10 hover:bg-white/10 text-stone-300"
                  : "bg-white border-stone-200 hover:bg-stone-100 text-stone-700"
              }`}
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          INFINITE AUTOMATIC 3D CAROUSEL CONTAINER
         ========================================================================= */}
      <div
        ref={carouselRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="flex gap-6 overflow-x-hidden py-8 px-4 sm:px-8 cursor-grab active:cursor-grabbing no-scrollbar select-none"
        style={{ scrollBehavior: "auto" }}
      >
        {CAROUSEL_ITEMS.map((srv, idx) => {
          const Icon = srv.icon;
          const tilt = tiltMap[idx] || { rotX: 0, rotY: 0 };
          const originalIdx = idx % SERVICES.length;

          return (
            <div
              key={`${srv.id}-${idx}`}
              onMouseMove={(e) => handleCardMouseMove(e, idx)}
              onMouseLeave={() => handleCardMouseLeave(idx)}
              className="relative shrink-0 w-[300px] sm:w-[340px] md:w-[380px] h-[480px] rounded-3xl overflow-hidden group cursor-pointer transition-transform duration-300 ease-out"
              style={{
                perspective: "1200px",
              }}
            >
              {/* 3D Tilt Container */}
              <div
                className="w-full h-full rounded-3xl border border-white/15 relative overflow-hidden transition-all duration-200 ease-out shadow-2xl flex flex-col justify-between p-6 sm:p-7"
                style={{
                  transform: `rotateX(${tilt.rotX}deg) rotateY(${tilt.rotY}deg) scale3d(${
                    tilt.rotX !== 0 || tilt.rotY !== 0 ? 1.03 : 1
                  }, ${tilt.rotX !== 0 || tilt.rotY !== 0 ? 1.03 : 1}, 1)`,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Background Picture with Parallax Depth */}
                <div
                  className="absolute inset-0 z-0 transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{
                    transform: `translateX(${-tilt.rotY * 1.5}px) translateY(${-tilt.rotX * 1.5}px)`,
                  }}
                >
                  <Image
                    src={srv.bgImage}
                    alt={srv.title}
                    fill
                    sizes="(max-width: 768px) 320px, 400px"
                    className="object-cover object-center"
                  />
                  {/* Cinematic Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/75 to-black/35" />
                </div>

                {/* Top Header Information (Floating in 3D) */}
                <div
                  className="relative z-10 flex items-center justify-between"
                  style={{ transform: "translateZ(30px)" }}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-white bg-[#C52623] px-2.5 py-1 rounded-full shadow-md">
                      {srv.num}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-stone-300 uppercase tracking-wider bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                      {srv.badge}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:bg-[#C52623] transition-all duration-300">
                    <Icon className="w-5 h-5 drop-shadow-md" />
                  </div>
                </div>

                {/* Middle / Bottom Content (Floating in 3D) */}
                <div
                  className="relative z-10 space-y-3 pt-8"
                  style={{ transform: "translateZ(35px)" }}
                >
                  <h3 className="text-xl sm:text-2xl font-black text-white leading-tight group-hover:text-[#ff4a47] transition-colors">
                    {srv.title}
                  </h3>

                  <p className="text-xs text-stone-300 leading-relaxed font-normal">
                    {srv.description}
                  </p>

                  {/* Deliverables Checklist with Crimson Checkmarks */}
                  <div className="space-y-1.5 pt-1">
                    {srv.deliverables.map((del, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-stone-200">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C52623] shrink-0" />
                        <span className="font-medium truncate">{del}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack mini tags */}
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {srv.stack.map((t) => (
                      <span
                        key={t}
                        className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-md text-stone-300 border border-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-white/15 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedService(originalIdx)}
                      className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-[11px] font-mono font-semibold transition-all inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Slide {srv.slideNum}</span>
                      <ExternalLink className="w-3 h-3 text-[#C52623]" />
                    </button>

                    <button
                      onClick={scrollToContact}
                      className="px-4 py-1.5 rounded-full bg-[#C52623] hover:bg-[#aa1f1c] text-white text-xs font-bold transition-all shadow-md inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Inquire</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Slide Specification Lightbox Modal */}
      {previewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-3xl bg-[#14161B] border border-white/15 p-6 sm:p-8 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <span className="text-[10px] font-mono font-bold text-white bg-[#C52623] px-2.5 py-0.5 rounded-full">
                  SLIDE {previewItem.slideNum} SPECIFICATION
                </span>
                <h4 className="text-base font-bold text-white">{previewItem.title}</h4>
              </div>
              <button
                onClick={() => setSelectedService(null)}
                className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative aspect-16/9 w-full rounded-2xl overflow-hidden border border-white/10 bg-black">
              <Image
                src={previewItem.bgImage}
                alt={previewItem.title}
                fill
                sizes="(max-width: 768px) 100vw, 650px"
                className="object-cover object-center"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-stone-400 font-mono text-[11px]">Stack:</span>
                {previewItem.stack.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-stone-300 font-mono"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <button
                onClick={() => {
                  setSelectedService(null);
                  scrollToContact();
                }}
                className="px-5 py-2 rounded-full bg-[#C52623] hover:bg-[#aa1f1c] text-white text-xs font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <span>Initiate {previewItem.title} Brief</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
