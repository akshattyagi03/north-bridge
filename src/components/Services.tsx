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
    tagline: "High-Conversion SaaS & Web Portals",
    bgImage: "/slides/slide-4.webp",
    badge: "ARCHITECTURE & SAAS",
    description:
      "Full-stack web apps, SaaS dashboards, and edge APIs built with Next.js 16 and TypeScript.",
    deliverables: ["Custom SaaS Architecture", "Sub-20ms Edge Latency"],
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "mobile-apps",
    num: "02",
    slideNum: "05",
    title: "Mobile App Development",
    icon: Smartphone,
    tagline: "Cross-Platform iOS & Android",
    bgImage: "/slides/slide-5.webp",
    badge: "ONE CODEBASE • MULTI-PLATFORM",
    description:
      "Cross-platform iOS and Android apps built with React Native, Expo, and offline SQLite.",
    deliverables: ["React Native & Expo", "Offline-First Synchronization"],
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
      "High-uptime AWS cloud environments, automated CI/CD pipelines, and container scaling.",
    deliverables: ["Zero-Downtime Releases", "High-Availability AWS 99.98%"],
    stack: ["AWS", "Docker", "CI/CD", "Prometheus"],
  },
  {
    id: "ui-ux",
    num: "04",
    slideNum: "07",
    title: "UI / UX Design",
    icon: Palette,
    tagline: "Design Systems & Interactive Prototypes",
    bgImage: "/slides/slide-7.webp",
    badge: "IDEA → WIREFRAME → PROTOTYPE",
    description:
      "Production Figma design systems, tokens, components, and clickable interactive prototypes.",
    deliverables: ["Figma Design Systems", "Interactive Clickable Prototypes"],
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
      "Seamless integrations with Stripe billing, external payment gateways, and webhooks.",
    deliverables: ["Stripe Billing Orchestration", "REST & GraphQL Gateways"],
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
      "Visual identity guidelines, high-conversion design assets, and executive pitch decks.",
    deliverables: ["Brand Identity Guidelines", "Campaign Asset Kits"],
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
      className={`py-10 sm:py-14 scroll-mt-16 relative overflow-hidden transition-colors duration-300 ${
        isDark
          ? "bg-[#090A0D] text-white border-y border-stone-800/80"
          : "bg-[#FAFAF9] text-[#18191B] border-y border-stone-200"
      }`}
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#C52623]/10 blur-[140px] pointer-events-none rounded-full" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#C52623]/8 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
        {/* Animated Heading on Scroll */}
        <AnimatedHeading
          mainText="Our Services."
          accentText="What We Build."
          subText="Web applications, mobile platforms, UI/UX systems, and enterprise cloud infrastructure."
        />

        {/* Carousel Controls Bar */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span className="w-2 h-2 rounded-full bg-[#C52623]" />
            <span className="font-medium">Drag or scroll to explore capabilities</span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => setIsPaused((prev) => !prev)}
              className={`p-1.5 sm:p-2 rounded-full border text-xs font-mono transition-all cursor-pointer shadow-[2px_2px_0px_#C52623] hover:shadow-[3px_3px_0px_#C52623] ${
                isDark
                  ? "bg-white/5 border-white/10 hover:bg-white/10 text-stone-300"
                  : "bg-white border-stone-300 hover:bg-stone-100 text-stone-700"
              }`}
              title={isPaused ? "Resume Auto Scroll" : "Pause Auto Scroll"}
              aria-label="Pause or Resume Auto Scroll"
            >
              {isPaused ? <Play className="w-3.5 h-3.5 text-[#C52623]" /> : <Pause className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={() => handleScrollManual("left")}
              className={`p-1.5 sm:p-2 rounded-full border text-xs font-mono transition-all cursor-pointer shadow-[2px_2px_0px_#C52623] hover:shadow-[3px_3px_0px_#C52623] ${
                isDark
                  ? "bg-white/5 border-white/10 hover:bg-white/10 text-stone-300"
                  : "bg-white border-stone-300 hover:bg-stone-100 text-stone-700"
              }`}
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => handleScrollManual("right")}
              className={`p-1.5 sm:p-2 rounded-full border text-xs font-mono transition-all cursor-pointer shadow-[2px_2px_0px_#C52623] hover:shadow-[3px_3px_0px_#C52623] ${
                isDark
                  ? "bg-white/5 border-white/10 hover:bg-white/10 text-stone-300"
                  : "bg-white border-stone-300 hover:bg-stone-100 text-stone-700"
              }`}
              aria-label="Next Slide"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          INFINITE AUTOMATIC 3D CAROUSEL CONTAINER (Compact & Red Solid Shadow)
         ========================================================================= */}
      <div
        ref={carouselRef}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="flex gap-4 sm:gap-4.5 overflow-x-hidden py-4 sm:py-5 px-4 sm:px-6 cursor-grab active:cursor-grabbing no-scrollbar select-none"
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
              className="relative shrink-0 w-[230px] sm:w-[250px] md:w-[265px] h-[325px] sm:h-[340px] rounded-2xl group cursor-pointer transition-transform duration-300 ease-out"
              style={{
                perspective: "1200px",
              }}
            >
              {/* 3D Tilt Container with Solid Red Shadow */}
              <div
                className="w-full h-full rounded-2xl border border-white/20 relative overflow-hidden transition-all duration-200 ease-out shadow-[4px_4px_0px_#C52623] group-hover:shadow-[6px_6px_0px_#C52623] flex flex-col justify-between p-3.5 sm:p-4"
                style={{
                  transform: `rotateX(${tilt.rotX}deg) rotateY(${tilt.rotY}deg) scale3d(${
                    tilt.rotX !== 0 || tilt.rotY !== 0 ? 1.02 : 1
                  }, ${tilt.rotX !== 0 || tilt.rotY !== 0 ? 1.02 : 1}, 1)`,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Background Picture with Parallax Depth */}
                <div
                  className="absolute inset-0 z-0 transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{
                    transform: `translateX(${-tilt.rotY * 1.5}px) translateY(${-tilt.rotX * 1.5}px)`,
                  }}
                >
                  <Image
                    src={srv.bgImage}
                    alt={srv.title}
                    fill
                    sizes="(max-width: 768px) 260px, 280px"
                    className="object-cover object-center"
                  />
                  {/* Cinematic Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/80 to-black/40" />
                </div>

                {/* Top Header Information (Floating in 3D) */}
                <div
                  className="relative z-10 flex items-center justify-between"
                  style={{ transform: "translateZ(20px)" }}
                >
                  <span className="font-mono text-[10px] font-bold text-white bg-[#C52623] px-2 py-0.5 rounded-full shadow-xs">
                    {srv.num}
                  </span>

                  <div className="w-7 h-7 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-xs group-hover:scale-105 group-hover:bg-[#C52623] transition-all duration-300">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Middle / Bottom Content (Floating in 3D) */}
                <div
                  className="relative z-10 space-y-2 pt-2"
                  style={{ transform: "translateZ(24px)" }}
                >
                  <h3 className="font-heading text-sm sm:text-base font-black text-white leading-tight group-hover:text-[#ff4a47] transition-colors">
                    {srv.title}
                  </h3>

                  <p className="text-[10px] sm:text-[11px] text-stone-300 leading-snug font-normal line-clamp-2">
                    {srv.description}
                  </p>

                  {/* Deliverables Checklist with Crimson Checkmarks */}
                  <div className="space-y-1 pt-0.5">
                    {srv.deliverables.map((del, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[9px] sm:text-[10px] text-stone-200">
                        <CheckCircle2 className="w-2.5 h-2.5 text-[#C52623] shrink-0" />
                        <span className="font-medium truncate">{del}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack mini tags */}
                  <div className="flex flex-wrap gap-1 pt-0.5">
                    {srv.stack.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="text-[8px] font-mono px-1.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md text-stone-300 border border-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="pt-2 border-t border-white/15 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedService(originalIdx)}
                      className="px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 text-white text-[10px] font-medium transition-all inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Overview</span>
                      <ExternalLink className="w-2.5 h-2.5 text-[#C52623]" />
                    </button>

                    <button
                      onClick={scrollToContact}
                      className="px-3 py-1 rounded-full bg-[#C52623] hover:bg-[#aa1f1c] text-white text-[10px] font-bold transition-all shadow-[2px_2px_0px_#851513] inline-flex items-center gap-1 cursor-pointer"
                    >
                      <span>Inquire</span>
                      <ArrowRight className="w-2.5 h-2.5" />
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
          <div className="relative w-full max-w-2xl rounded-2xl bg-[#14161B] border-2 border-[#C52623] p-5 sm:p-6 shadow-[8px_8px_0px_#C52623] space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <span className="text-[10px] font-mono font-bold text-white bg-[#C52623] px-2.5 py-0.5 rounded-full">
                  SPECIFICATION
                </span>
                <h4 className="font-heading text-base font-bold text-white">{previewItem.title}</h4>
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
