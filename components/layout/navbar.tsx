"use client";

import { Container } from "@/components/ui/container";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X, ArrowRight, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

const navItems = [
  { name: "Beranda", href: "/" },
  { name: "Tentang", href: "/tentang" },
  { name: "Kegiatan", href: "/kegiatan" },
  { name: "Galeri", href: "/galeri" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Lock body scroll when menu is open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out",
        scrolled 
          ? "bg-white/90 backdrop-blur-xl border-b border-gray-200/50 py-3 shadow-sm" 
          : "bg-transparent py-5 lg:py-6"
      )}
    >
      <Container>
        <nav className="flex items-center justify-between">
          {/* Branding */}
          <Link href="/" className="group flex items-center gap-3 relative z-[60]">
            <div className={cn(
              "relative transition-all duration-500 ease-out",
              scrolled ? "w-10 h-10 lg:w-11 lg:h-11 rotate-0" : "w-10 h-10 lg:w-14 lg:h-14 -rotate-3"
            )}>
              <Image
                src="/logo.png"
                alt="MAJAP Logo"
                fill
                className="object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-110"
                priority
              />
            </div>
            <div className={cn(
              "flex flex-col transition-all duration-300",
              scrolled ? "gap-0" : "gap-0.5"
            )}>
              <span className={cn(
                "font-bold tracking-tight transition-colors duration-300",
                scrolled || isOpen ? "text-sm lg:text-base text-primary leading-tight" : "text-base lg:text-lg text-white leading-tight",
              )}>
                Mahasiswa Jabodetabek
              </span>
              <span className={cn(
                "font-medium tracking-wide transition-colors duration-300",
                scrolled || isOpen ? "text-[10px] text-gray-600 hidden lg:block uppercase tracking-wider" : "text-[10px] lg:text-xs text-white/90 block uppercase tracking-wider"
              )}>
                Politeknik Negeri Indramayu
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Floating Pill */}
          <div className="hidden lg:block absolute left-1/2 -translate-x-1/2">
            <div className={cn(
              "flex items-center p-1.5 rounded-full transition-all duration-500 border",
              scrolled 
                ? "bg-gray-100/80 backdrop-blur-md border-gray-200/50 shadow-inner" 
                : "bg-white/10 backdrop-blur-md border-white/10 shadow-lg ring-1 ring-white/20"
            )}>
              {navItems.map((item) => {
                const isActive = item.href === "/" 
                  ? pathname === "/" 
                  : pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="relative px-5 py-2.5 rounded-full transition-all duration-300 group"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-pill"
                        className={cn(
                          "absolute inset-0 rounded-full shadow-sm",
                          scrolled ? "bg-primary/10" : "bg-white/20"
                        )}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className={cn(
                      "relative z-10 text-sm font-medium transition-colors duration-300",
                      isActive 
                        ? (scrolled ? "text-primary font-bold" : "text-white font-bold drop-shadow-sm")
                        : (scrolled ? "text-gray-600 hover:text-primary" : "text-white/80 hover:text-white")
                    )}>
                      {item.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right Action Button - Minimalist Icon */}
          <div className="hidden lg:block">
            <Link 
              href="/kontak"
              className={cn(
                "flex items-center justify-center w-11 h-11 rounded-full transition-all duration-500 group relative overflow-hidden",
                pathname === "/kontak"
                  ? scrolled
                    ? "bg-primary text-white shadow-md" // Active + Scrolled
                    : "bg-primary text-white shadow-md border border-white/20" // Active + Top
                  : scrolled 
                  ? "bg-gray-50 text-gray-600 hover:bg-primary hover:text-white shadow-sm hover:shadow-lg hover:-translate-y-0.5" 
                  : "bg-white/10 text-white hover:bg-white hover:text-primary backdrop-blur-md border border-white/10 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              )}
              aria-label="Hubungi Kami"
            >
              <Mail size={20} className="relative z-10 transition-transform duration-300 group-hover:scale-110" />
              <span className="sr-only">Hubungi Kami</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={cn(
              "lg:hidden p-1 transition-colors duration-300 relative z-[110] focus:outline-none",
              scrolled || isOpen 
                ? "text-gray-800" 
                : "text-white"
            )}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-5">
              <motion.span 
                initial={false}
                animate={isOpen ? { rotate: 45, top: "50%", y: "-50%" } : { rotate: 0, top: "0%", y: "0%" }}
                className="absolute left-0 w-6 h-0.5 rounded-full bg-current origin-center transition-all duration-300 ease-out"
                style={{ top: 0 }}
              />
              <motion.span 
                initial={false}
                animate={isOpen ? { opacity: 0, scale: 0.5 } : { opacity: 1, scale: 1 }}
                className="absolute top-1/2 left-0 w-6 h-0.5 -translate-y-1/2 rounded-full bg-current transition-all duration-300 ease-out"
              />
              <motion.span 
                initial={false}
                animate={isOpen ? { rotate: -45, bottom: "50%", y: "50%" } : { rotate: 0, bottom: "0%", y: "0%" }}
                className="absolute left-0 w-6 h-0.5 rounded-full bg-current origin-center transition-all duration-300 ease-out"
                style={{ bottom: 0 }}
              />
            </div>
          </button>
        </nav>
      </Container>

      {/* Mobile Full Screen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[105] bg-white flex flex-col justify-center items-center lg:hidden"
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, height: '100vh', width: '100vw' }}
          >
            {/* Background Decoration */}
            <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-gray-50/80" />
            <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[40%] bg-primary/5 rounded-full blur-[80px]" />
            <div className="absolute bottom-[-10%] left-[-20%] w-[60%] h-[40%] bg-primary/5 rounded-full blur-[80px]" />

            <div className="flex flex-col items-center w-full h-full relative z-10 pt-32 px-6">
              {/* Menu Links */}
              <div className="flex flex-col items-center gap-6 w-full mb-10">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + (i * 0.1), duration: 0.4 }}
                  className="w-full"
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "block w-full text-center text-3xl font-semibold tracking-tight py-3 transition-all duration-300",
                      (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href))
                        ? "text-primary"
                        : "text-gray-800 hover:text-primary hover:scale-105"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <Link 
                  href="/kontak"
                  className="group flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-primary text-white font-medium text-lg shadow-lg hover:bg-primary-dark hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  <span>Kontak</span>
                  <div className="bg-white/20 rounded-full p-1 transition-transform group-hover:rotate-12">
                    <Mail size={16} />
                  </div>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
