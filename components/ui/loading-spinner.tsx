export function LoadingSpinner({ 
  size = "md",
  text = "Memuat..." 
}: { 
  size?: "sm" | "md" | "lg";
  text?: string | null;
}) {
  const sizeClasses = {
    sm: "h-2 w-24",
    md: "h-2.5 w-36",
    lg: "h-3 w-48",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div className={`${sizeClasses[size]} relative overflow-hidden rounded-full bg-primary/10`}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
      </div>
      {text && (
        <p className="text-sm font-medium text-primary/70">{text}</p>
      )}
    </div>
  );
}

export function FullPageLoader({ text = "Memuat..." }: { text?: string }) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
      <LoadingSpinner size="lg" text={text} />
    </div>
  );
}
