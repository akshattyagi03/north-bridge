"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, ArrowRight } from "lucide-react";
import { animate } from "animejs";
import MobileSidebar from "./MobileSidebar";

export interface NavLinkItem {
  id: string;
  name: string;
}

export const NAV_LINKS: NavLinkItem[] = [
  { id: "hero", name: "Home" },
  { id: "about", name: "About Us" },
  { id: "services", name: "Services" },
  { id: "portfolio", name: "Our Portfolio" },
  { id: "reviews", name: "Our Reviews" },
  { id: "projects", name: "Our Projects" },
  { id: "contact", name: "Contact Us" },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const isInitialRef = useRef(true);

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
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Measurement pass once mounted and after fonts/DOM paint
    const timer = setTimeout(() => {
      updateIndicator();
      requestAnimationFrame(() => {
        isInitialRef.current = false;
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

      // Scroll-spy: find which section is currently centered/visible in the viewport
      const sectionIds = [
        "hero",
        "about",
        "services",
        "portfolio",
        "reviews",
        "projects",
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
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? "h-16 bg-white/95 backdrop-blur-md border-b border-stone-200/90 shadow-xs"
            : "h-16 bg-white/80 backdrop-blur-sm border-b border-stone-200/60"
        } px-4 sm:px-6 lg:px-8`}
      >
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
          {/* Brand Logo */}
          <button
            onClick={() => scrollToSection("hero")}
            className="group flex items-center gap-3 select-none text-left cursor-pointer"
            aria-label="North Bridge Tech"
          >
            <div className="w-8 h-8 rounded-lg bg-stone-900 flex items-center justify-center text-white font-semibold text-xs tracking-tight shadow-xs relative overflow-hidden transition-transform group-hover:scale-105">
              <span>NB</span>
              <span className="absolute bottom-0 right-0 w-2 h-2 bg-[#C42625]" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-stone-900 group-hover:text-[#C42625] transition-colors leading-none">
                North Bridge Tech
              </span>
              <span className="text-[11px] text-[#8A8683] tracking-normal font-normal mt-0.5 leading-none">
                Digital Product Studio
              </span>
            </div>
          </button>

          {/* Desktop Navigation with Fluid Sliding Indicator Pill */}
          <nav
            ref={navRef}
            onMouseLeave={() => setHoveredId(null)}
            className="relative hidden lg:flex items-center p-1 rounded-full bg-stone-100/75 border border-stone-200/70 backdrop-blur-xs shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)]"
          >
            {/* Sliding Pill Indicator */}
            {mounted && (
              <div
                aria-hidden="true"
                className="absolute rounded-full bg-white shadow-xs border border-stone-200/90 pointer-events-none will-change-transform"
                style={{
                  transform: `translate3d(${indicator.left}px, ${indicator.top}px, 0)`,
                  width: `${indicator.width}px`,
                  height: `${indicator.height}px`,
                  opacity: indicator.opacity,
                  transition: isInitialRef.current
                    ? "none"
                    : "transform 280ms cubic-bezier(0.16, 1, 0.3, 1), width 280ms cubic-bezier(0.16, 1, 0.3, 1), opacity 180ms ease",
                }}
              >
                {/* Micro Crimson Accent Line */}
                <span
                  className={`absolute bottom-[3px] left-1/2 -translate-x-1/2 h-[2px] rounded-full bg-[#C42625] transition-all duration-300 ${
                    hoveredId && hoveredId !== activeSection
                      ? "w-2.5 opacity-60"
                      : "w-4 opacity-100 shadow-[0_0_6px_rgba(196,38,37,0.35)]"
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
                      ? "text-stone-950 font-bold"
                      : "text-stone-500 hover:text-stone-900"
                  }`}
                >
                  <span>{link.name}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action / Mobile Hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollToSection("contact")}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C42625] hover:bg-[#a81f1e] text-white text-xs font-semibold tracking-wide transition-all shadow-xs hover:shadow-md hover:shadow-[#C42625]/20 group cursor-pointer"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-lg text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
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
