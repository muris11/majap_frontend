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
      
      {showLoader && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <div className="relative h-2.5 w-36 overflow-hidden rounded-full bg-primary/10">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
          </div>
        </div>
      )}
    </>
  );
 }
