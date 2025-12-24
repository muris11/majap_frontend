 "use client";
 
 import { useEffect, useState } from "react";
 import { motion, useMotionValue, useSpring } from "framer-motion";
 import { cn } from "@/lib/utils";
 
 export function CustomCursor() {
   const [isVisible, setIsVisible] = useState(false);
   const [isHovering, setIsHovering] = useState(false);
   const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
 
   const mouseX = useMotionValue(0);
   const mouseY = useMotionValue(0);
 
   // Smooth spring animation for the cursor
   const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
   const cursorX = useSpring(mouseX, springConfig);
   const cursorY = useSpring(mouseY, springConfig);
 
   // Trailing circle with slightly more delay/lag for fluid effect
   const trailingSpringConfig = { damping: 30, stiffness: 200, mass: 0.8 };
   const trailingX = useSpring(mouseX, trailingSpringConfig);
   const trailingY = useSpring(mouseY, trailingSpringConfig);
 
   useEffect(() => {
     // Check if device supports touch
     const checkTouch = () => {
       setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
     };
 
     checkTouch();
     window.addEventListener("resize", checkTouch);
 
     return () => window.removeEventListener("resize", checkTouch);
   }, []);

  useEffect(() => {
    const checkLightbox = () => {
      const lightbox = document.querySelector('[class*="fixed inset-0 z-[9999]"]');
      setIsLightboxOpen(!!lightbox);
    };

    const observer = new MutationObserver(checkLightbox);
    observer.observe(document.body, { childList: true, subtree: true });
    checkLightbox();

    return () => observer.disconnect();
  }, []);
 
   useEffect(() => {
     if (isTouchDevice) return;
 
     const moveMouse = (e: MouseEvent) => {
       mouseX.set(e.clientX);
       mouseY.set(e.clientY);
       if (!isVisible) setIsVisible(true);
     };
 
     const handleMouseDown = () => setIsHovering(true);
     const handleMouseUp = () => setIsHovering(false);
 
     const handleMouseOver = (e: MouseEvent) => {
       const target = e.target as HTMLElement;
       // Check if hovering over clickable elements
       const isClickable = 
         target.tagName === "BUTTON" ||
         target.tagName === "A" ||
         target.closest("button") ||
         target.closest("a") ||
         target.classList.contains("cursor-hover") ||
         target.closest(".cursor-hover");
 
       setIsHovering(!!isClickable);
     };
 
     window.addEventListener("mousemove", moveMouse);
     window.addEventListener("mousedown", handleMouseDown);
     window.addEventListener("mouseup", handleMouseUp);
     window.addEventListener("mouseover", handleMouseOver);
 
     return () => {
       window.removeEventListener("mousemove", moveMouse);
       window.removeEventListener("mousedown", handleMouseDown);
       window.removeEventListener("mouseup", handleMouseUp);
       window.removeEventListener("mouseover", handleMouseOver);
     };
   }, [isTouchDevice, isVisible, mouseX, mouseY]);
 
   if (isTouchDevice) return null;
 
  if (isLightboxOpen) return null;

   return (
     <>
       {/* Main Cursor (Dot) */}
       <motion.div
         className={cn(
           "fixed top-0 left-0 w-3 h-3 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-difference",
           !isVisible && "opacity-0"
         )}
         style={{
           x: cursorX,
           y: cursorY,
           translateX: "-50%",
           translateY: "-50%",
         }}
       />
 
       {/* Trailing Ring */}
       <motion.div
         className={cn(
           "fixed top-0 left-0 border-2 border-primary rounded-full pointer-events-none z-[9998] transition-[width,height,opacity] duration-300 ease-out",
           !isVisible && "opacity-0",
           isHovering ? "w-12 h-12 opacity-50 bg-primary/10" : "w-8 h-8 opacity-30"
         )}
         style={{
           x: trailingX,
           y: trailingY,
           translateX: "-50%",
           translateY: "-50%",
         }}
       />
     </>
   );
 }
