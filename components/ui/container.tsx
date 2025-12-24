import { cn } from "@/lib/utils"
import * as React from "react"

const Container = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mx-auto w-full max-w-[1400px] px-4 md:px-6 lg:px-8", className)}
    {...props}
  />
))
Container.displayName = "Container"

export { Container }
