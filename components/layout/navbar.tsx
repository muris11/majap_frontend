"use client";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";


import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Beranda", href: "/" },
  { name: "Tentang", href: "/tentang" },
  { name: "Kegiatan", href: "/kegiatan" },
  { name: "Galeri", href: "/galeri" },
  { name: "FAQ", href: "/faq" },
  { name: "Kontak", href: "/kontak" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();

  const hasDarkHeader = pathname === "/" || (pathname.startsWith("/galeri/") && pathname !== "/galeri");

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-300",
        isOpen
          ? "bg-white py-[16px] shadow-lg shadow-black/5"
          : scrolled
          ? "bg-white/80 backdrop-blur-md border-b border-gray-200 py-[16px] shadow-lg shadow-black/5"
          : "bg-transparent py-5"
      )}
    >
      <div className="px-4 md:px-6 lg:px-8 max-w-full">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 min-w-0 shrink">
            <div className={cn(
              "relative shrink-0 transition-all duration-300",
              isOpen || scrolled ? "w-11 h-11" : "w-14 h-14"
            )}>
              <Image
                src="/logo.png"
                alt="MAJAP Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className={cn(
                "font-bold tracking-tight leading-tight transition-colors duration-300 truncate",
                isOpen || scrolled || !hasDarkHeader ? "text-base text-primary" : "text-lg text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
              )}>
                Mahasiswa Jabodetabek
              </span>
              <span className={cn(
                "text-[11px] font-medium uppercase tracking-wider transition-colors duration-300 truncate",
                isOpen || scrolled || !hasDarkHeader ? "text-gray-500" : "text-white/75 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]"
              )}>
                Politeknik Negeri Indramayu
              </span>
            </div>
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2.5 text-sm font-medium transition-colors duration-200",
                    active
                      ? (isOpen || scrolled || !hasDarkHeader ? "text-primary" : "text-white")
                      : (scrolled || !hasDarkHeader ? "text-gray-600 hover:text-primary" : "text-white/80 hover:text-white")
                  )}
                >
                  {item.name}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute -bottom-px left-2 right-2 h-0.5 bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 200, damping: 25 }}
                    />
                  )}
                </Link>
              );
            })}

          </div>

          {/* Mobile trigger */}
          <button
            className={cn(
              "lg:hidden relative z-50 p-1.5 rounded-lg transition-colors",
              isOpen ? "text-gray-800" : (scrolled || !hasDarkHeader ? "text-gray-800" : "text-white")
            )}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span className={cn(
                "block h-0.5 w-full rounded-full bg-current transition-all duration-200",
                isOpen && "translate-y-[7px] rotate-45"
              )} />
              <span className={cn(
                "block h-0.5 w-full rounded-full bg-current transition-all duration-200",
                isOpen && "opacity-0"
              )} />
              <span className={cn(
                "block h-0.5 w-full rounded-full bg-current transition-all duration-200",
                isOpen && "-translate-y-[7px] -rotate-45"
              )} />
            </div>
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden lg:hidden"
          >
            <div className="px-4 md:px-6 lg:px-8 pb-6 pt-2">
              <div className="flex flex-col">
                {navItems.map((item, i) => {
                  const active = isActive(pathname, item.href);
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25, delay: i * 0.04 }}
                    >
                      <Link
                        href={item.href}
                        className={cn(
                          "relative flex items-center gap-3 px-4 py-3.5 text-sm font-medium rounded-lg transition-colors",
                          active
                            ? "text-primary bg-primary/5"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        )}
                      >
                        {active && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-primary rounded-full" />
                        )}
                        {item.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
