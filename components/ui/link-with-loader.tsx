 "use client";
 
 import Link from "next/link";
 import { useRouter } from "next/navigation";
 import { useState, useTransition } from "react";
 import { cn } from "@/lib/utils";
 
 interface LinkWithLoaderProps {
   href: string;
   children: React.ReactNode;
   className?: string;
   onClick?: () => void;
 }
 
 export function LinkWithLoader({ href, children, className, onClick }: LinkWithLoaderProps) {
   const router = useRouter();
   const [isPending, startTransition] = useTransition();
   const [isClicked, setIsClicked] = useState(false);
 
   const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
     e.preventDefault();
     setIsClicked(true);
     onClick?.();
     
     startTransition(() => {
       router.push(href);
     });
   };
 
   const showLoader = isPending || isClicked;
 
   return (
     <>
       <Link 
         href={href} 
         className={cn(className, showLoader && "pointer-events-none")}
         onClick={handleClick}
       >
         {children}
       </Link>
       
       {/* Full screen loader overlay */}
       {showLoader && (
         <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/95 backdrop-blur-sm transition-opacity duration-300">
           <style>{`
             .loader-box {
               transform-origin: 50% 50%;
               fill: #0f4c45;
             }
             @keyframes loaderMove-1 {
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
             .loader-box:nth-child(1) { animation: loaderMove-1 4s infinite; }
             @keyframes loaderMove-2 {
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
             .loader-box:nth-child(2) { animation: loaderMove-2 4s infinite; }
             @keyframes loaderMove-3 {
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
             .loader-box:nth-child(3) { animation: loaderMove-3 4s infinite; }
             @keyframes loaderMove-4 {
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
             .loader-box:nth-child(4) { animation: loaderMove-4 4s infinite; }
             @keyframes loaderMove-5 {
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
             .loader-box:nth-child(5) { animation: loaderMove-5 4s infinite; }
             @keyframes loaderMove-6 {
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
             .loader-box:nth-child(6) { animation: loaderMove-6 4s infinite; }
             @keyframes loaderMove-7 {
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
             .loader-box:nth-child(7) { animation: loaderMove-7 4s infinite; }
             @keyframes loaderMove-8 {
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
             .loader-box:nth-child(8) { animation: loaderMove-8 4s infinite; }
             @keyframes loaderMove-9 {
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
             .loader-box:nth-child(9) { animation: loaderMove-9 4s infinite; }
           `}</style>
           <svg 
             width="80" 
             height="80" 
             viewBox="-13 -13 45 45" 
             xmlns="http://www.w3.org/2000/svg"
           >
             <g>
               <circle className="loader-box" cx="13" cy="1" r="5"/>
               <circle className="loader-box" cx="13" cy="1" r="5"/>
               <circle className="loader-box" cx="25" cy="25" r="5"/>
               <circle className="loader-box" cx="13" cy="13" r="5"/>
               <circle className="loader-box" cx="13" cy="13" r="5"/>
               <circle className="loader-box" cx="25" cy="13" r="5"/>
               <circle className="loader-box" cx="1" cy="25" r="5"/>
               <circle className="loader-box" cx="13" cy="25" r="5"/>
               <circle className="loader-box" cx="25" cy="25" r="5"/>
             </g>
           </svg>
         </div>
       )}
     </>
   );
 }
