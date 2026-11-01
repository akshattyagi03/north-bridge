"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { animate, stagger } from "animejs";
import { X, ArrowRight, Mail, MapPin, Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

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
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

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
        className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm transition-opacity"
        aria-hidden="true"
      />

      {/* Right-sliding Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 bottom-0 w-[320px] max-w-[85vw] shadow-2xl flex flex-col justify-between p-6 z-50 overflow-y-auto transition-colors duration-300 ${
          isDark
            ? "bg-[#0B0C0E] border-l border-white/10 text-white"
            : "bg-white border-l border-stone-200 text-stone-900"
        }`}
      >
        <div>
          {/* Top Bar with Brand & Close */}
          <div
            className={`flex items-center justify-between pb-5 border-b ${
              isDark ? "border-white/10" : "border-stone-100"
            }`}
          >
            <div className="flex items-center gap-2">
              <Image
                src="/nbt-logo.png"
                alt="NorthBridge Tech"
                width={80}
                height={44}
                className={`h-8 w-auto object-contain ${isDark ? "brightness-110" : ""}`}
              />
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                isDark
                  ? "text-stone-400 hover:text-white hover:bg-white/10"
                  : "text-stone-400 hover:text-stone-900 hover:bg-stone-100"
              }`}
              aria-label="Close navigation menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Theme Toggler inside Mobile Drawer */}
          <div
            className={`mt-4 p-2.5 rounded-xl border flex items-center justify-between text-xs transition-colors ${
              isDark
                ? "bg-[#141518] border-white/10 text-stone-300"
                : "bg-stone-50 border-stone-200 text-stone-700"
            }`}
          >
            <span className="font-mono text-[11px] font-semibold flex items-center gap-1.5">
              <span>Theme:</span>
              <span className="text-[#C52623]">{isDark ? "Dark Carbon" : "Light Studio"}</span>
            </span>
            <button
              onClick={toggleTheme}
              className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                isDark
                  ? "bg-white/10 text-white hover:bg-white/20 border border-white/15"
                  : "bg-white text-stone-900 hover:bg-stone-100 border border-stone-300 shadow-2xs"
              }`}
            >
              {isDark ? (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>Light</span>
                </>
              ) : (
                <>
                  <Moon className="w-3.5 h-3.5 text-stone-800" />
                  <span>Dark</span>
                </>
              )}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1 mt-4">
            {links.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => {
                    onSelectSection(link.id);
                    onClose();
                  }}
                  className={`mobile-nav-item group flex items-center justify-between py-3 px-3 rounded-xl transition-all text-left text-sm font-medium cursor-pointer ${
                    isActive
                      ? isDark
                        ? "bg-white/15 text-white font-bold border border-white/10"
                        : "bg-stone-900 text-white font-semibold"
                      : isDark
                      ? "text-stone-300 hover:text-white hover:bg-white/5"
                      : "text-stone-700 hover:text-stone-900 hover:bg-stone-50"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#C52623]" />}
                    {link.name}
                  </span>
                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      isActive
                        ? "text-[#C52623]"
                        : isDark
                        ? "text-stone-600 group-hover:text-white group-hover:translate-x-1"
                        : "text-stone-300 group-hover:text-stone-900 group-hover:translate-x-1"
                    }`}
                  />
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Details & CTA */}
        <div
          className={`pt-5 border-t space-y-4 ${
            isDark ? "border-white/10" : "border-stone-100"
          }`}
        >
          <div
            className={`space-y-1.5 text-xs ${
              isDark ? "text-stone-400" : "text-stone-500"
            }`}
          >
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#C52623]" />
              <a
                href="mailto:dhrumit@northbridgetech.group"
                className={`hover:text-[#C52623] transition-colors truncate font-medium ${
                  isDark ? "text-stone-300" : "text-stone-800"
                }`}
              >
                dhrumit@northbridgetech.group
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#C52623]" />
              <span>Paris, France • Global Reach</span>
            </div>
          </div>

          <button
            onClick={() => {
              onSelectSection("contact");
              onClose();
            }}
            className="flex items-center justify-center gap-2 w-full py-3 px-5 rounded-full bg-[#C52623] hover:bg-[#aa1f1c] text-white text-xs font-semibold tracking-wide transition-all shadow-sm cursor-pointer"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
