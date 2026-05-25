"use client";

import { cn } from "@/lib/utils";
import { useScrollReveal } from "@/lib/hooks/useScrollReveal";
import * as React from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  variant?: "up" | "fade" | "scale";
}

export function Reveal({ children, className, delay = 0, variant = "up" }: RevealProps) {
  const { ref, isVisible } = useScrollReveal();
  const typeClass = variant === "fade" ? "reveal-fade" : variant === "scale" ? "reveal-scale" : "reveal";
  const delayClass = delay > 0 ? `reveal-delay-${Math.min(Math.round(delay / 0.1), 4)}` : "";

  return (
    <div
      ref={ref}
      className={cn(typeClass, delayClass, isVisible && "visible", className)}
    >
      {children}
    </div>
  );
}

export function RevealStagger({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("space-y-6", className)}>{children}</div>;
}

export function FadeIn(props: RevealProps) {
  return <Reveal variant="up" {...props} />;
}

export function ScaleIn(props: RevealProps) {
  return <Reveal variant="scale" {...props} />;
}

export function SlideIn({ children, className, delay = 0, direction = "left" }: RevealProps & { direction?: "left" | "right" }) {
  return <Reveal variant="up" delay={delay} className={className}>{children}</Reveal>;
}

export function FadeInStagger({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn(className)}>{children}</div>;
}

FadeInStagger.Item = function FadeInStaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  const { ref, isVisible } = useScrollReveal();
  return (
    <div ref={ref} className={cn("reveal", isVisible && "visible", className)}>
      {children}
    </div>
  );
};
