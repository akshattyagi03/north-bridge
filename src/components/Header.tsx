"use client";

import { useState, useEffect } from "react";
import { Menu, ArrowRight } from "lucide-react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Scroll-spy: find which section is currently centered/visible in the viewport
      const sectionIds = ["hero", "about", "services", "portfolio", "reviews", "projects", "contact"];
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

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-xs font-semibold tracking-wide transition-all relative py-1.5 cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? "text-stone-950 font-bold"
                      : "text-stone-500 hover:text-stone-900"
                  }`}
                >
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C42625]" />
                  )}
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
