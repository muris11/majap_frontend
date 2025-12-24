"use client";

import { Container } from "@/components/ui/container";
import { FadeInStagger } from "@/components/ui/motion-wrapper";
import { cn, getImageUrl } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

type Breadcrumb = {
  label: string;
  href?: string;
};

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  className?: string;
  align?: "left" | "center";
  backgroundImage?: string | null;
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
  className,
  align = "center",
  backgroundImage
}: PageHeaderProps) {
  const bgUrl = backgroundImage ? getImageUrl(backgroundImage) : null;

  return (
    <div className={cn("relative bg-primary pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden", className)}>
      {bgUrl ? (
        <>
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105" style={{ backgroundImage: `url(${bgUrl})` }} />
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
          </div>
        </>
      ) : (
        <>
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
        </>
      )}

      <Container className={cn("relative z-10", align === "center" ? "text-center" : "text-left")}>
        <FadeInStagger className={cn("max-w-4xl", align === "center" && "mx-auto")}>
          {breadcrumbs?.length ? (
            <FadeInStagger.Item>
            <nav aria-label="Breadcrumb" className={cn("mb-6 text-sm", align === "center" && "flex justify-center")}>
              <ol className="flex flex-wrap items-center gap-y-1 text-white/80">
                {breadcrumbs.map((crumb, index) => (
                  <li key={`${crumb.label}-${index}`} className="flex items-center">
                    {index > 0 && <span className="mx-2 text-white/50">/</span>}
                    {crumb.href ? (
                      <Link href={crumb.href} className="hover:text-white transition-colors">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-white/90">{crumb.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
            </FadeInStagger.Item>
          ) : null}

          <FadeInStagger.Item>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight drop-shadow-lg">
            {title}
          </h1>
          </FadeInStagger.Item>
          {description && (
            <FadeInStagger.Item>
            <p className="text-lg md:text-xl text-white/90 font-medium leading-relaxed max-w-2xl mx-auto drop-shadow-md">
              {description}
            </p>
            </FadeInStagger.Item>
          )}
        </FadeInStagger>
      </Container>
    </div>
  );
}
