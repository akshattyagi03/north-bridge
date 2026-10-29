"use client";

import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { X, ArrowRight, Mail, MapPin } from "lucide-react";

interface NavLink {
  id: string;
  name: string;
}

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
  activeSection: string;
  onSelectSection: (id: string) => void;
}

export default function MobileSidebar({
  isOpen,
  onClose,
  links,
  activeSection,
  onSelectSection,
}: MobileSidebarProps) {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (sidebarRef.current && backdropRef.current) {
        animate(backdropRef.current, {
          opacity: [0, 1],
          duration: 250,
          ease: "outQuad",
        });
        animate(sidebarRef.current, {
          translateX: ["100%", "0%"],
          duration: 380,
          ease: "outExpo",
        });

        const items = sidebarRef.current.querySelectorAll(".mobile-nav-item");
        animate(items, {
          translateX: [24, 0],
          opacity: [0, 1],
          delay: stagger(35, { start: 100 }),
          duration: 350,
          ease: "outQuad",
        });
      }
    } else {
      document.body.style.overflow = "";
      if (sidebarRef.current && backdropRef.current) {
        animate(backdropRef.current, {
          opacity: [1, 0],
          duration: 200,
          ease: "inQuad",
        });
        animate(sidebarRef.current, {
          translateX: ["0%", "100%"],
          duration: 240,
          ease: "inQuad",
        });
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={onClose}
        className="fixed inset-0 bg-stone-900/30 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />

      {/* Right-sliding Sidebar */}
      <div
        ref={sidebarRef}
        className="fixed top-0 right-0 bottom-0 w-[320px] max-w-[85vw] bg-white border-l border-stone-200 shadow-2xl flex flex-col justify-between p-6 z-50 overflow-y-auto"
      >
        <div>
          {/* Top Bar with Brand & Close */}
          <div className="flex items-center justify-between pb-5 border-b border-stone-100">
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#C42625]" />
              <span className="text-sm font-semibold tracking-tight text-stone-900">
                North Bridge Tech
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1 mt-5">
            {links.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    onSelectSection(link.id);
                    onClose();
                  }}
                  className={`mobile-nav-item group flex items-center justify-between py-3 px-3 rounded-xl transition-all text-left text-sm font-medium ${
                    isActive
                      ? "bg-stone-900 text-white font-semibold"
                      : "text-stone-700 hover:text-stone-900 hover:bg-stone-50"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#C42625]" />}
                    {link.name}
                  </span>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      isActive ? "text-[#C42625]" : "text-stone-300 group-hover:text-stone-900 group-hover:translate-x-1"
                    }`}
                  />
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Details & CTA */}
        <div className="pt-6 border-t border-stone-100 space-y-4">
          <div className="space-y-1.5 text-xs text-stone-500">
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#8A8683]" />
              <a
                href="mailto:contact@northbridgetech.group"
                className="hover:text-[#C42625] transition-colors truncate"
              >
                contact@northbridgetech.group
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#8A8683]" />
              <span>New York & Global Remote</span>
            </div>
          </div>

          <button
            onClick={() => {
              onSelectSection("contact");
              onClose();
            }}
            className="flex items-center justify-center gap-2 w-full py-3 px-5 rounded-full bg-[#C42625] hover:bg-[#a81f1e] text-white text-xs font-semibold tracking-wide transition-all shadow-sm"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
