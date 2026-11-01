"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import GeometricLogoCanvas from "./GeometricLogoCanvas";

export default function SplashScreen() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const [landing, setLanding] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const [progress, setProgress] = useState(0);

  const pageLoadedRef = useRef(false);
  const assembleDoneRef = useRef(false);
  const landingStartedRef = useRef(false);

  const initiateLanding = useCallback(() => {
    if (landingStartedRef.current) return;
    landingStartedRef.current = true;

    // Start landing motion down towards Hero
    setLanding(true);
    setProgress(100);

    // After brief landing anticipation, fade out the dark veil and trigger Hero entrance
    setTimeout(() => {
      setFadingOut(true);
      if (typeof window !== "undefined") {
        (window as unknown as { __nbt_splash_faded?: boolean }).__nbt_splash_faded = true;
        window.dispatchEvent(new CustomEvent("nbt-splash-fade"));
      }

      // Fully cleanup after transition completes
      setTimeout(() => {
        setVisible(false);
        if (typeof window !== "undefined") {
          (window as unknown as { __nbt_splash_done?: boolean }).__nbt_splash_done = true;
          window.dispatchEvent(new CustomEvent("nbt-splash-done"));
        }
        document.body.style.overflow = "";
      }, 700);
    }, 280);
  }, []);

  const handleAssembleComplete = useCallback(() => {
    assembleDoneRef.current = true;
    if (pageLoadedRef.current) {
      initiateLanding();
    }
  }, [initiateLanding]);

  const handleAssembleProgress = useCallback(
    (ratio: number) => {
      // ratio is 0.0 -> 1.0 across the 2 assemble cycles
      const targetPct = Math.min(100, Math.round(ratio * 100));
      setProgress((prev) => Math.max(prev, targetPct));
    },
    []
  );

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";

    // Track page asset load
    const markPageLoaded = () => {
      pageLoadedRef.current = true;
      if (assembleDoneRef.current) {
        initiateLanding();
      }
    };

    if (typeof document !== "undefined" && document.readyState === "complete") {
      pageLoadedRef.current = true;
    }

    if (typeof window !== "undefined") {
      window.addEventListener("load", markPageLoaded);
      if (document.fonts) {
        document.fonts.ready.then(markPageLoaded);
      }
    }

    // Safety fallback: if anything stalls after 6 seconds, guarantee landing
    const safetyTimer = setTimeout(() => {
      pageLoadedRef.current = true;
      initiateLanding();
    }, 6000);

    return () => {
      clearTimeout(safetyTimer);
      if (typeof window !== "undefined") {
        window.removeEventListener("load", markPageLoaded);
      }
      document.body.style.overflow = "";
    };
  }, [initiateLanding]);

  if (!visible) return null;

  return (
    <div
      aria-label="Loading Website..."
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#090A0D] text-white select-none transition-all duration-700 ease-out ${
        fadingOut
          ? "opacity-0 pointer-events-none"
          : "opacity-100"
      }`}
    >
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] bg-[#C52623]/12 rounded-full blur-[120px]" />
      </div>

      {/* Center 3D Model Stage - Reduced Size with Landing Motion */}
      <div
        className={`relative z-10 flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${
          landing
            ? "translate-y-12 sm:translate-y-16 scale-90 opacity-40 blur-[0.5px]"
            : "translate-y-0 scale-100 opacity-100"
        }`}
      >
        {/* Compact, jewel-sized 3D Model container */}
        <div className="relative w-[160px] h-[160px] sm:w-[190px] sm:h-[190px] flex items-center justify-center">
          {mounted && (
            <GeometricLogoCanvas
              mode="assemble"
              maxAssembleCycles={2}
              loopAssemble={false}
              scale={0.76}
              transparentBg={true}
              cameraPreset="isometric"
              className="w-full h-full"
              onAssembleProgress={handleAssembleProgress}
              onAssembleComplete={handleAssembleComplete}
            />
          )}
        </div>

        {/* Minimalist Proportional Loading Bar */}
        <div
          className={`w-36 sm:w-44 mt-3 transition-opacity duration-300 ${
            landing ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-[#851513] via-[#C52623] to-[#ff4a47] rounded-full shadow-[0_0_10px_rgba(197,38,35,0.9)] transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
