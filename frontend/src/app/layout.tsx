import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Compass, Beaker, Map as MapIcon, Library, Users, HelpCircle } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Academy Compass | აკადემიის კომპასი",
  description: "Interactive Scientific Career Navigator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ka" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}>
        {/* Background glows */}
        <div className="fixed top-[-150px] left-[-150px] w-[500px] h-[500px] bg-primary-purple/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="fixed bottom-[-150px] right-[-150px] w-[500px] h-[500px] bg-primary-blue/15 rounded-full blur-[120px] pointer-events-none" />

        <header className="sticky top-0 z-50 w-full border-b border-foreground/10 bg-background/90 backdrop-blur-lg">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tight text-accent-cyan">
              <Compass />
              <span>Academy Compass</span>
            </Link>
            <nav className="hidden md:flex gap-6 text-sm font-medium">
              <Link href="/science" className="flex items-center gap-2 text-foreground/80 hover:text-accent-cyan transition-colors"><Beaker size={16}/> მეცნიერება</Link>
              <Link href="/map" className="flex items-center gap-2 text-foreground/80 hover:text-accent-cyan transition-colors"><MapIcon size={16}/> რუკა</Link>
              <Link href="/resources" className="flex items-center gap-2 text-foreground/80 hover:text-accent-cyan transition-colors"><Library size={16}/> რესურსები</Link>
              <Link href="/community" className="flex items-center gap-2 text-foreground/80 hover:text-accent-cyan transition-colors"><Users size={16}/> ფორუმი</Link>
              <Link href="/help" className="flex items-center gap-2 text-foreground/80 hover:text-accent-cyan transition-colors"><HelpCircle size={16}/> დახმარება</Link>
            </nav>
            <div className="flex items-center gap-4">
              <button className="px-4 py-2 text-sm font-medium border border-accent-cyan text-accent-cyan rounded-full hover:bg-accent-cyan hover:text-primary-dark transition-all">
                შესვლა
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 relative z-10 w-full">
          {children}
        </main>

        <footer className="border-t border-foreground/10 py-8 relative z-10 bg-surface/50">
          <div className="container mx-auto px-4 text-center text-sm text-foreground/60">
            <p>&copy; {new Date().getFullYear()} Academy Compass. შექმნილია საქართველოში.</p>
            <div className="flex justify-center gap-4 mt-4">
              <Link href="/privacy" className="hover:text-accent-cyan transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-accent-cyan transition-colors">Terms of Use</Link>
              <Link href="/contact" className="hover:text-accent-cyan transition-colors">Contact</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
