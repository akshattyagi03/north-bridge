"use client";

import { useEffect, useRef } from "react";
import { animate, scrambleText } from "animejs";

interface ScrambleTextProps {
  text: string;
  className?: string;
  triggerOnHover?: boolean;
  chars?: string;
  duration?: number;
  delay?: number;
}

export default function ScrambleText({
  text,
  className = "",
  triggerOnHover = false,
  chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  duration = 900,
  delay = 0,
}: ScrambleTextProps) {
  const elRef = useRef<HTMLSpanElement>(null);

  const runAnimation = () => {
    if (!elRef.current) return;
    try {
      animate(elRef.current, {
        textContent: scrambleText({
          text,
          chars,
          duration,
        }),
        duration,
        delay,
        ease: "outQuad",
      });
    } catch {
      if (elRef.current) elRef.current.textContent = text;
    }
  };

  useEffect(() => {
    runAnimation();
  }, [text]);

  return (
    <span
      ref={elRef}
      className={className}
      onMouseEnter={triggerOnHover ? runAnimation : undefined}
    >
      {text}
    </span>
  );
}
