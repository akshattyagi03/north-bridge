"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { Menu, ArrowRight, Sun, Moon } from "lucide-react";
import { animate } from "animejs";
import { useTheme } from "../context/ThemeContext";
import MobileSidebar from "./MobileSidebar";

export interface NavLinkItem {
  id: string;
  name: string;
}

export const NAV_LINKS: NavLinkItem[] = [
  { id: "hero", name: "Home" },
  { id: "about", name: "Who We Are" },
  { id: "services", name: "Our Services" },
  { id: "pillars", name: "Our Pillars" },
  { id: "process", name: "How We Solve" },
  { id: "orbit", name: "Your Direction" },
  { id: "contact", name: "Contact" },
];

export default function Header() {
  const { theme, toggleTheme, mounted: themeMounted } = useTheme();
  const isDark = themeMounted ? theme === "dark" : false;

  const [activeSection, setActiveSection] = useState<string>("hero");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const [indicator, setIndicator] = useState<{
    left: number;
    top: number;
    width: number;
    height: number;
    opacity: number;
  }>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    opacity: 0,
  });

  const updateIndicator = useCallback(() => {
    const currentId = hoveredId || activeSection;
    const nav = navRef.current;
    const target = itemRefs.current[currentId];
    if (!nav || !target) {
      return;
    }

    const navRect = nav.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    setIndicator({
      left: targetRect.left - navRect.left,
      top: targetRect.top - navRect.top,
      width: targetRect.width,
      height: targetRect.height,
      opacity: 1,
    });
  }, [hoveredId, activeSection]);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const timer = setTimeout(() => {
      updateIndicator();
      requestAnimationFrame(() => {
        setHasAnimated(true);
      });
    }, 60);

    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(updateIndicator);
    }

    window.addEventListener("resize", updateIndicator);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateIndicator);
    };
  }, [mounted, updateIndicator]);

  useEffect(() => {
    if (mounted) {
      updateIndicator();
    }
  }, [hoveredId, activeSection, mounted, updateIndicator]);

  // Nav entrance animation
  useEffect(() => {
    if (navRef.current) {
      animate(navRef.current, {
        opacity: [0, 1],
        translateY: [-6, 0],
        duration: 500,
        ease: "outExpo",
      });
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Scroll-spy: check if scrolled to near bottom
      const isAtBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60;
      if (isAtBottom) {
        setActiveSection("contact");
        return;
      }

      const sectionIds = [
        "hero",
        "about",
        "services",
        "pillars",
        "process",
        "orbit",
        "contact",
      ];
      const scrollPosition = window.scrollY + 200;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* =========================================================================
          FLOATING ROUNDED GLASSMORPHIC NAVBAR (Layered Above Hero)
         ========================================================================= */}
      <header className="fixed top-2.5 sm:top-4 inset-x-0 z-40 w-full px-3.5 sm:px-6 lg:px-8 max-w-7xl mx-auto pointer-events-none transition-all duration-300">
        <div
          className={`pointer-events-auto w-full h-14 sm:h-16 rounded-2xl sm:rounded-full px-3.5 sm:px-6 flex items-center justify-between transition-all duration-300 backdrop-blur-2xl border ${
            isDark
              ? scrolled
                ? "bg-[#090A0D]/80 border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1)] text-white"
                : "bg-[#090A0D]/70 border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_1px_rgba(255,255,255,0.06)] text-white"
              : scrolled
              ? "bg-[#F7F7F5]/85 border-stone-300/80 shadow-[0_12px_40px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.95)] text-[#18191B]"
              : "bg-[#F7F7F5]/75 border-stone-200/90 shadow-[0_8px_30px_rgba(0,0,0,0.05),inset_0_1px_1px_rgba(255,255,255,0.9)] text-[#18191B]"
          }`}
        >
          {/* Brand Logo Only */}
          <button
            onClick={() => scrollToSection("hero")}
            className="group flex items-center select-none text-left cursor-pointer"
            aria-label="NorthBridge Tech"
          >
            <div className="relative h-7 sm:h-8 flex items-center">
              <Image
                src="/nbt-logo.png"
                alt="NorthBridge Tech Logo"
                width={80}
                height={44}
                className={`h-7 sm:h-8 w-auto object-contain transition-transform group-hover:scale-105 ${
                  isDark ? "brightness-110" : ""
                }`}
                priority
              />
            </div>
          </button>

          {/* Desktop Navigation with Fluid Sliding Indicator Pill */}
          <nav
            ref={navRef}
            onMouseLeave={() => setHoveredId(null)}
            className={`relative hidden lg:flex items-center p-1 rounded-full border backdrop-blur-md transition-colors duration-300 ${
              isDark
                ? "bg-white/5 border-white/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.05)]"
                : "bg-stone-100/80 border-stone-200/80 shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)]"
            }`}
          >
            {/* Sliding Pill Indicator */}
            {mounted && (
              <div
                aria-hidden="true"
                className={`absolute rounded-full pointer-events-none will-change-transform transition-all ${
                  isDark
                    ? "bg-white/10 shadow-xs border border-white/15"
                    : "bg-white shadow-xs border border-stone-200/90"
                }`}
                style={{
                  transform: `translate3d(${indicator.left}px, ${indicator.top}px, 0)`,
                  width: `${indicator.width}px`,
                  height: `${indicator.height}px`,
                  opacity: indicator.opacity,
                  transition: !hasAnimated
                    ? "none"
                    : "transform 280ms cubic-bezier(0.16, 1, 0.3, 1), width 280ms cubic-bezier(0.16, 1, 0.3, 1), opacity 180ms ease",
                }}
              >
                {/* Micro Crimson Accent Line */}
                <span
                  className={`absolute bottom-[3px] left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-[#C52623] transition-all duration-300 ${
                    hoveredId && hoveredId !== activeSection
                      ? "w-2.5 opacity-60"
                      : "w-4 opacity-100 shadow-[0_0_8px_rgba(197,38,35,0.8)]"
                  }`}
                />
              </div>
            )}

            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              const isHovered = hoveredId === link.id;
              return (
                <button
                  key={link.id}
                  ref={(el) => {
                    itemRefs.current[link.id] = el;
                  }}
                  onClick={() => scrollToSection(link.id)}
                  onMouseEnter={() => setHoveredId(link.id)}
                  className={`relative z-10 px-3.5 py-1.5 text-xs font-semibold tracking-wide transition-colors duration-200 cursor-pointer rounded-full select-none whitespace-nowrap ${
                    isActive || isHovered
                      ? isDark
                        ? "text-white font-bold"
                        : "text-[#18191B] font-bold"
                      : isDark
                      ? "text-stone-400 hover:text-stone-200"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  <span>{link.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action & Quick Theme Toggle Icon / Mobile Hamburger */}
          <div className="flex items-center gap-2.5">
            {/* Quick Sun/Moon Toggle Icon Button in Navbar */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full border transition-all cursor-pointer ${
                isDark
                  ? "bg-white/5 border-white/10 text-stone-300 hover:text-white hover:bg-white/10"
                  : "bg-stone-100 border-stone-200 text-stone-700 hover:text-stone-900 hover:bg-stone-200/70"
              }`}
              title={`Switch to ${isDark ? "Light" : "Dark"} mode`}
              aria-label="Toggle Theme Mode"
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#484944]" />}
            </button>

            {/* Start a Project Button */}
            <button
              onClick={() => scrollToSection("contact")}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C52623] hover:bg-[#aa1f1c] text-white text-xs font-semibold tracking-wide transition-all shadow-md hover:shadow-lg hover:shadow-[#C52623]/30 group cursor-pointer"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className={`lg:hidden p-2 rounded-lg transition-colors cursor-pointer ${
                isDark
                  ? "text-stone-300 hover:text-white hover:bg-white/10"
                  : "text-stone-700 hover:text-stone-900 hover:bg-stone-100"
              }`}
              aria-label="Open mobile navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer from Right */}
      <MobileSidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        links={NAV_LINKS}
        activeSection={activeSection}
        onSelectSection={scrollToSection}
      />
    </>
  );
}
