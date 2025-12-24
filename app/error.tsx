 "use client";
 
 import { Button } from "@/components/ui/button";
 import { Container } from "@/components/ui/container";
 import { Section } from "@/components/ui/section";
 import { AlertTriangle, RefreshCw } from "lucide-react";
 import { useEffect } from "react";
 
 export default function Error({
   error,
   reset,
 }: {
   error: Error & { digest?: string };
   reset: () => void;
 }) {
   useEffect(() => {
     console.error("Application error:", error);
   }, [error]);
 
   return (
     <Section className="bg-white min-h-[60vh] flex items-center">
       <Container>
         <div className="text-center max-w-md mx-auto">
           <AlertTriangle className="w-16 h-16 text-amber-500 mx-auto mb-6" />
           <h2 className="text-2xl font-bold text-gray-900 mb-4">
             Terjadi Kesalahan
           </h2>
           <p className="text-gray-600 mb-8">
             Maaf, terjadi kesalahan saat memuat halaman ini. Silakan coba lagi.
           </p>
           <Button onClick={reset} className="inline-flex items-center gap-2">
             <RefreshCw size={16} />
             Coba Lagi
           </Button>
         </div>
       </Container>
     </Section>
   );
 }
