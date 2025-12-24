"use client";

import { Preloader } from "./preloader";
import { CustomCursor } from "@/components/ui/custom-cursor";

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Preloader />
      <CustomCursor />
      {children}
    </>
  );
}
