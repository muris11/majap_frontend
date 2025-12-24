 import { Button } from "@/components/ui/button";
 import { Container } from "@/components/ui/container";
 import { Section } from "@/components/ui/section";
 import { FileQuestion, Home } from "lucide-react";
 import Link from "next/link";
 
 export default function NotFound() {
   return (
     <Section className="bg-white min-h-[60vh] flex items-center">
       <Container>
         <div className="text-center max-w-md mx-auto">
           <FileQuestion className="w-20 h-20 text-gray-300 mx-auto mb-6" />
           <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
           <h2 className="text-2xl font-bold text-gray-700 mb-4">
             Halaman Tidak Ditemukan
           </h2>
           <p className="text-gray-600 mb-8">
             Maaf, halaman yang Anda cari tidak dapat ditemukan atau telah dipindahkan.
           </p>
           <Link href="/">
             <Button className="inline-flex items-center gap-2">
               <Home size={16} />
               Kembali ke Beranda
             </Button>
           </Link>
         </div>
       </Container>
     </Section>
   );
 }
