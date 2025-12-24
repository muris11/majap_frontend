"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";

export function Preloader() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const prevPathname = useRef(pathname);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      const timer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => setIsLoading(false), 300);
      }, 500);
      return () => clearTimeout(timer);
    }

    if (prevPathname.current !== pathname) {
      prevPathname.current = pathname;
      setIsLoading(true);
      setFadeOut(false);
      const timer = setTimeout(() => {
        setFadeOut(true);
        setTimeout(() => setIsLoading(false), 300);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  if (!isLoading) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-opacity duration-300 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <style>{`
        .box5631 {
          transform-origin: 50% 50%;
          fill: #0f4c45;
        }
        @keyframes moveBox5631-1 {
          9.09% { transform: translate(-12px, 0); }
          18.18% { transform: translate(0px, 0); }
          27.27% { transform: translate(0px, 0); }
          36.36% { transform: translate(12px, 0); }
          45.45% { transform: translate(12px, 12px); }
          54.55% { transform: translate(12px, 12px); }
          63.64% { transform: translate(12px, 12px); }
          72.73% { transform: translate(12px, 0px); }
          81.82% { transform: translate(0px, 0px); }
          90.91% { transform: translate(-12px, 0px); }
          100% { transform: translate(0px, 0px); }
        }
        .box5631:nth-child(1) { animation: moveBox5631-1 4s infinite; }
        @keyframes moveBox5631-2 {
          9.09% { transform: translate(0, 0); }
          18.18% { transform: translate(12px, 0); }
          27.27% { transform: translate(0px, 0); }
          36.36% { transform: translate(12px, 0); }
          45.45% { transform: translate(12px, 12px); }
          54.55% { transform: translate(12px, 12px); }
          63.64% { transform: translate(12px, 12px); }
          72.73% { transform: translate(12px, 12px); }
          81.82% { transform: translate(0px, 12px); }
          90.91% { transform: translate(0px, 12px); }
          100% { transform: translate(0px, 0px); }
        }
        .box5631:nth-child(2) { animation: moveBox5631-2 4s infinite; }
        @keyframes moveBox5631-3 {
          9.09% { transform: translate(-12px, 0); }
          18.18% { transform: translate(-12px, 0); }
          27.27% { transform: translate(0px, 0); }
          36.36% { transform: translate(-12px, 0); }
          45.45% { transform: translate(-12px, 0); }
          54.55% { transform: translate(-12px, 0); }
          63.64% { transform: translate(-12px, 0); }
          72.73% { transform: translate(-12px, 0); }
          81.82% { transform: translate(-12px, -12px); }
          90.91% { transform: translate(0px, -12px); }
          100% { transform: translate(0px, 0px); }
        }
        .box5631:nth-child(3) { animation: moveBox5631-3 4s infinite; }
        @keyframes moveBox5631-4 {
          9.09% { transform: translate(-12px, 0); }
          18.18% { transform: translate(-12px, 0); }
          27.27% { transform: translate(-12px, -12px); }
          36.36% { transform: translate(0px, -12px); }
          45.45% { transform: translate(0px, 0px); }
          54.55% { transform: translate(0px, -12px); }
          63.64% { transform: translate(0px, -12px); }
          72.73% { transform: translate(0px, -12px); }
          81.82% { transform: translate(-12px, -12px); }
          90.91% { transform: translate(-12px, 0px); }
          100% { transform: translate(0px, 0px); }
        }
        .box5631:nth-child(4) { animation: moveBox5631-4 4s infinite; }
        @keyframes moveBox5631-5 {
          9.09% { transform: translate(0, 0); }
          18.18% { transform: translate(0, 0); }
          27.27% { transform: translate(0, 0); }
          36.36% { transform: translate(12px, 0); }
          45.45% { transform: translate(12px, 0); }
          54.55% { transform: translate(12px, 0); }
          63.64% { transform: translate(12px, 0); }
          72.73% { transform: translate(12px, 0); }
          81.82% { transform: translate(12px, -12px); }
          90.91% { transform: translate(0px, -12px); }
          100% { transform: translate(0px, 0px); }
        }
        .box5631:nth-child(5) { animation: moveBox5631-5 4s infinite; }
        @keyframes moveBox5631-6 {
          9.09% { transform: translate(0, 0); }
          18.18% { transform: translate(-12px, 0); }
          27.27% { transform: translate(-12px, 0); }
          36.36% { transform: translate(0px, 0); }
          45.45% { transform: translate(0px, 0); }
          54.55% { transform: translate(0px, 0); }
          63.64% { transform: translate(0px, 0); }
          72.73% { transform: translate(0px, 12px); }
          81.82% { transform: translate(-12px, 12px); }
          90.91% { transform: translate(-12px, 0px); }
          100% { transform: translate(0px, 0px); }
        }
        .box5631:nth-child(6) { animation: moveBox5631-6 4s infinite; }
        @keyframes moveBox5631-7 {
          9.09% { transform: translate(12px, 0); }
          18.18% { transform: translate(12px, 0); }
          27.27% { transform: translate(12px, 0); }
          36.36% { transform: translate(0px, 0); }
          45.45% { transform: translate(0px, -12px); }
          54.55% { transform: translate(12px, -12px); }
          63.64% { transform: translate(0px, -12px); }
          72.73% { transform: translate(0px, -12px); }
          81.82% { transform: translate(0px, 0px); }
          90.91% { transform: translate(12px, 0px); }
          100% { transform: translate(0px, 0px); }
        }
        .box5631:nth-child(7) { animation: moveBox5631-7 4s infinite; }
        @keyframes moveBox5631-8 {
          9.09% { transform: translate(0, 0); }
          18.18% { transform: translate(-12px, 0); }
          27.27% { transform: translate(-12px, -12px); }
          36.36% { transform: translate(0px, -12px); }
          45.45% { transform: translate(0px, -12px); }
          54.55% { transform: translate(0px, -12px); }
          63.64% { transform: translate(0px, -12px); }
          72.73% { transform: translate(0px, -12px); }
          81.82% { transform: translate(12px, -12px); }
          90.91% { transform: translate(12px, 0px); }
          100% { transform: translate(0px, 0px); }
        }
        .box5631:nth-child(8) { animation: moveBox5631-8 4s infinite; }
        @keyframes moveBox5631-9 {
          9.09% { transform: translate(-12px, 0); }
          18.18% { transform: translate(-12px, 0); }
          27.27% { transform: translate(0px, 0); }
          36.36% { transform: translate(-12px, 0); }
          45.45% { transform: translate(0px, 0); }
          54.55% { transform: translate(0px, 0); }
          63.64% { transform: translate(-12px, 0); }
          72.73% { transform: translate(-12px, 0); }
          81.82% { transform: translate(-24px, 0); }
          90.91% { transform: translate(-12px, 0); }
          100% { transform: translate(0px, 0); }
        }
        .box5631:nth-child(9) { animation: moveBox5631-9 4s infinite; }
      `}</style>
      <svg 
        width="80" 
        height="80" 
        viewBox="-13 -13 45 45" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <circle className="box5631" cx="13" cy="1" r="5"/>
          <circle className="box5631" cx="13" cy="1" r="5"/>
          <circle className="box5631" cx="25" cy="25" r="5"/>
          <circle className="box5631" cx="13" cy="13" r="5"/>
          <circle className="box5631" cx="13" cy="13" r="5"/>
          <circle className="box5631" cx="25" cy="13" r="5"/>
          <circle className="box5631" cx="1" cy="25" r="5"/>
          <circle className="box5631" cx="13" cy="25" r="5"/>
          <circle className="box5631" cx="25" cy="25" r="5"/>
        </g>
      </svg>
    </div>
  );
}
