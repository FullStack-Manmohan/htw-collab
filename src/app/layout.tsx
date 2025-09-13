import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from 'next/font/google';
import HeaderKPIs from "../../components/HeaderKPIs";

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: "HTW Collab Match",
  description: "Connect, collaborate, and sprint at Honolulu Tech Week.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} min-h-screen bg-gray-50 flex flex-col`}>
        <header className="gradient-paradise shadow-lg">
          <div className="max-w-7xl mx-auto px-6 py-4">
            {/* Main header row */}
            <div className="flex items-center justify-between">
              {/* Logo/Brand */}
              <div className="flex items-center gap-3">
                <span className="text-3xl">🌺</span>
                <div>
                  <div className="text-xl font-bold text-white">HTW Collab Match</div>
                  <div className="text-sm text-white/80">Honolulu Tech Week</div>
                </div>
              </div>
              
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-2">
                <Link href="/" className="pill">
                  🏠 Home
                </Link>
                <Link href="/submit" className="pill">
                  👤 Profile
                </Link>
                <Link href="/graph" className="pill">
                  🌊 Graph
                </Link>
                <Link href="/events" className="pill">
                  🤝 Events
                </Link>
              </nav>

              {/* KPIs */}
              <div className="hidden lg:block">
                <HeaderKPIs />
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden mt-4 pt-4 border-t border-white/20">
              <div className="flex justify-center gap-4">
                <Link href="/" className="text-white/90 hover:text-white text-sm font-medium">
                  Home
                </Link>
                <Link href="/submit" className="text-white/90 hover:text-white text-sm font-medium">
                  Profile
                </Link>
                <Link href="/graph" className="text-white/90 hover:text-white text-sm font-medium">
                  Graph
                </Link>
                <Link href="/events" className="text-white/90 hover:text-white text-sm font-medium">
                  Events
                </Link>
              </div>
              
              {/* Mobile KPIs */}
              <div className="mt-3 flex justify-center">
                <HeaderKPIs />
              </div>
            </div>
          </div>
        </header>
        
        <main className="flex-1">
          {children}
        </main>

        <footer className="bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🌺</span>
                <div>
                  <div className="font-semibold">HTW Collab Match</div>
                  <div className="text-sm text-gray-400">
                    Connect, collaborate, create
                  </div>
                </div>
              </div>
              
              <div className="text-center md:text-right">
                <div className="text-sm text-gray-300">
                  Made with aloha in Honolulu 🌴
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Fostering innovation across the Pacific
                </div>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}