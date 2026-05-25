import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Breadcrumb = {
  label: string;
  href?: string;
};

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: Breadcrumb[];
  className?: string;
  backgroundImage?: string | null;
}

export function PageHeader({
  title,
  description,
  breadcrumbs,
  className,
  backgroundImage
}: PageHeaderProps) {
  if (backgroundImage) {
    return (
      <div className={cn("relative bg-gray-900 pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden", className)}>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${backgroundImage})` }} />
          <div className="absolute inset-0 bg-black/60" />
        </div>

        <Container className="relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-4">
            {breadcrumbs?.length ? (
              <nav aria-label="Breadcrumb" className="flex justify-center text-sm">
                <ol className="flex flex-wrap items-center gap-y-1 text-white/70">
                  {breadcrumbs.map((crumb, index) => (
                    <li key={`${crumb.label}-${index}`} className="flex items-center">
                      {index > 0 && <span className="mx-2 text-white/40">/</span>}
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
            ) : null}

            <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
              {title}
            </h1>

            {description && (
              <p className="text-base md:text-lg text-white/80 leading-relaxed max-w-xl mx-auto">
                {description}
              </p>
            )}
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className={cn("bg-white border-b border-gray-100 pt-24 pb-12 md:pt-28 md:pb-16", className)}>
      <Container className="text-center">
        <div className="max-w-2xl mx-auto space-y-3">
          {breadcrumbs?.length ? (
            <nav aria-label="Breadcrumb" className="flex justify-center text-sm">
              <ol className="flex flex-wrap items-center gap-y-1 text-gray-400">
                {breadcrumbs.map((crumb, index) => (
                  <li key={`${crumb.label}-${index}`} className="flex items-center">
                    {index > 0 && <span className="mx-2 text-gray-300">/</span>}
                    {crumb.href ? (
                      <Link href={crumb.href} className="hover:text-gray-600 transition-colors">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-gray-900 font-medium">{crumb.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          ) : null}

          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
            {title}
          </h1>

          {description && (
            <p className="text-sm md:text-base text-gray-500 leading-relaxed max-w-lg mx-auto">
              {description}
            </p>
          )}
        </div>
      </Container>
    </div>
  );
}
