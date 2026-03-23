import React from 'react';
import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Georgian } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import { GlobalProvider } from "@/components/GlobalProvider";
import { AuthProvider } from "@/components/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoGeorgian = Noto_Sans_Georgian({
  variable: "--font-noto-georgian",
  subsets: ["georgian"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Academy Compass | სასწავლო და სამეცნიერო პლატფორმა",
  description: "Interactive Scientific Career Navigator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ka" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} ${notoGeorgian.variable} antialiased min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors`}>
        <GlobalProvider>
          <AuthProvider>
            <Navigation />

            <main className="flex-1 relative z-10 w-full">
              {children}
            </main>

            <footer className="border-t border-slate-200 dark:border-slate-800 py-4 relative z-10 bg-white dark:bg-slate-950 mt-auto transition-colors">
              <div className="container mx-auto px-4 text-center text-sm text-slate-500 dark:text-slate-400">
                <p>&copy; {new Date().getFullYear()} Academy Compass. შექმნილია საქართველოში.</p>
                <div className="flex justify-center gap-6 mt-3">
                  <Link href="/privacy" className="hover:text-primary-blue dark:hover:text-blue-400 transition-colors">Privacy Policy</Link>
                  <Link href="/terms" className="hover:text-primary-blue dark:hover:text-blue-400 transition-colors">Terms of Use</Link>
                  <Link href="/contact" className="hover:text-primary-blue dark:hover:text-blue-400 transition-colors">Contact</Link>
                </div>
              </div>
            </footer>
          </AuthProvider>
        </GlobalProvider>
      </body>
    </html>
  );
}

