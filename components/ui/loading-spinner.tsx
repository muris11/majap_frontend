export function LoadingSpinner({ 
  size = "md",
  text = "Memuat..." 
}: { 
  size?: "sm" | "md" | "lg";
  text?: string | null;
}) {
  const sizeClasses = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-3",
    lg: "w-14 h-14 border-4",
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      <div
        className={`${sizeClasses[size]} rounded-full border-gray-200 border-t-primary animate-spin`}
        style={{ borderTopColor: "#606C38" }}
      />
      {text && (
        <p className="text-sm font-medium text-gray-500">{text}</p>
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
