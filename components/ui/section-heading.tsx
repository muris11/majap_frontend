import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  tag?: string;
  title: string;
  description?: string;
  center?: boolean;
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export function SectionHeading({ tag, title, description, center, className, as: Component = "h2" }: SectionHeadingProps) {
  return (
    <div className={cn(
      "mb-10 md:mb-14",
      center && "text-center max-w-3xl mx-auto",
      className
    )}>
      {tag && (
        <div className={cn(
          "flex items-center gap-3 text-primary justify-center",
          !center && "justify-start"
        )}>
          <span className="h-px w-10 bg-primary/45" />
          <span className="text-xs md:text-sm font-semibold tracking-[0.24em] uppercase">
            {tag}
          </span>
          <span className="h-px w-10 bg-primary/45" />
        </div>
      )}
      <Component className="mt-4 text-3xl md:text-5xl font-black text-gray-900 tracking-tight leading-[0.95]">
        {title}
      </Component>
      {description && (
        <p className={cn(
          "mt-5 text-base md:text-lg text-gray-600 leading-relaxed",
          center && "max-w-2xl mx-auto"
        )}>
          {description}
        </p>
      )}
    </div>
  );
}
