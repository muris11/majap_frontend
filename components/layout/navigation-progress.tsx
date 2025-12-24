"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function NavigationProgress() {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      setIsNavigating(true);
      prevPathname.current = pathname;
      
      const timer = setTimeout(() => {
        setIsNavigating(false);
      }, 400);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return (
    <AnimatePresence>
      {isNavigating && (
        <motion.div
          className="fixed top-0 left-0 right-0 z-[9998] h-1"
          style={{ backgroundColor: "#606C38" }}
          initial={{ scaleX: 0, transformOrigin: "left" }}
          animate={{ scaleX: 1, transformOrigin: "left" }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      )}
    </AnimatePresence>
  );
}
