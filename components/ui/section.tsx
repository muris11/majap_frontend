import { cn } from "@/lib/utils"
import * as React from "react"

const Section = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <section
    ref={ref}
    className={cn("section-padding", className)}
    {...props}
  />
))
Section.displayName = "Section"

export { Section }
