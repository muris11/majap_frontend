import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { ClientWrapper } from "@/components/layout/client-wrapper";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const fontSans = Plus_Jakarta_Sans({ 
  subsets: ["latin"], 
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Mahasiswa Jabodetabek Polindra",
  description: "Portal Resmi Mahasiswa Jabodetabek Politeknik Negeri Indramayu",
  icons: {
    icon: "/favicon.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth" suppressHydrationWarning>
      <body className={cn(fontSans.variable, "font-sans min-h-screen flex flex-col antialiased")}>
         <ClientWrapper>
           <Navbar />
           <main className="flex-grow">
             {children}
           </main>
           <Footer />
         </ClientWrapper>
      </body>
    </html>
  );
}
