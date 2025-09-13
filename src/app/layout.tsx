import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { Inter, IBM_Plex_Sans_Condensed } from 'next/font/google';
import HeaderKPIs from "../../components/HeaderKPIs";

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

const ibmPlexCondensed = IBM_Plex_Sans_Condensed({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-ibm-condensed'
});

export const metadata: Metadata = {
  title: "HTW Collab Match + Interest Graph",
  description: "Connect, collaborate, and sprint at Honolulu Tech Week. Build your professional network and discover collaboration opportunities.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexCondensed.variable}`}>
      <body className={`${inter.className} min-h-screen bg-gray-50 flex flex-col antialiased`}>
        <header className="gradient-htw-dark shadow-lg">
          <div className="container-full">
            {/* Main header row */}
            <div className="flex items-center justify-between py-4">
              {/* Logo/Brand */}
              <div className="flex items-center gap-3">
                <span className="text-3xl">🌺</span>
                <div>
                  <div className="text-xl font-black text-white font-ibm-condensed">HTW COLLAB MATCH</div>
                  <div className="text-sm text-white/80">Honolulu Tech Week</div>
                </div>
              </div>
              
              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-2">
                <Link href="/" className="pill focus-visible">
                  🏠 Home
                </Link>
                <Link href="/submit" className="pill focus-visible">
                  👤 Profile
                </Link>
                <Link href="/graph" className="pill focus-visible">
                  🌊 Graph
                </Link>
                <Link href="/events" className="pill focus-visible">
                  🤝 Events
                </Link>
              </nav>

              {/* KPIs */}
              <div className="hidden lg:block">
                <HeaderKPIs />
              </div>
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden pb-4 border-t border-white/20 pt-4">
              <div className="flex justify-center gap-4">
                <Link href="/" className="text-white/90 hover:text-white text-sm font-medium transition-colors duration-200">
                  Home
                </Link>
                <Link href="/submit" className="text-white/90 hover:text-white text-sm font-medium transition-colors duration-200">
                  Profile
                </Link>
                <Link href="/graph" className="text-white/90 hover:text-white text-sm font-medium transition-colors duration-200">
                  Graph
                </Link>
                <Link href="/events" className="text-white/90 hover:text-white text-sm font-medium transition-colors duration-200">
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

        <footer className="bg-htw-deep-sea text-white">
          <div className="container-full py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🌺</span>
                <div>
                  <div className="font-black font-ibm-condensed text-lg">HTW COLLAB MATCH</div>
                  <div className="text-sm text-white/80">
                    Connect, collaborate, create
                  </div>
                </div>
              </div>
              
              <div className="text-center md:text-right">
                <div className="text-sm text-white/90">
                  Made with aloha in Honolulu 🌴
                </div>
                <div className="text-xs text-white/70 mt-1">
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