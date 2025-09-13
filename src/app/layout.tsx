import "./globals.css";
import type { Metadata } from "next";
import HeaderKPIs from "../../components/HeaderKPIs";

export const metadata: Metadata = {
  title: "HTW Collab Match",
  description: "Connect, collaborate, and sprint at Honolulu Tech Week.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        <header className="bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 shadow-lg">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🌺</span>
              <div>
                <div className="text-xl font-bold text-white">HTW Collab Match</div>
                <div className="text-sm text-white/80">Honolulu Tech Week</div>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center gap-6">
              <a 
                href="/" 
                className="text-white/90 hover:text-white transition-colors font-medium"
              >
                Home
              </a>
              <a 
                href="/submit" 
                className="text-white/90 hover:text-white transition-colors font-medium"
              >
                Create Profile
              </a>
              <a 
                href="/graph" 
                className="text-white/90 hover:text-white transition-colors font-medium"
              >
                Graph
              </a>
              <a 
                href="/events" 
                className="text-white/90 hover:text-white transition-colors font-medium"
              >
                Events
              </a>
            </nav>

            <HeaderKPIs />
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden border-t border-white/20">
            <div className="max-w-6xl mx-auto px-6 py-3 flex justify-center gap-6">
              <a 
                href="/" 
                className="text-white/90 hover:text-white transition-colors text-sm font-medium"
              >
                Home
              </a>
              <a 
                href="/submit" 
                className="text-white/90 hover:text-white transition-colors text-sm font-medium"
              >
                Profile
              </a>
              <a 
                href="/graph" 
                className="text-white/90 hover:text-white transition-colors text-sm font-medium"
              >
                Graph
              </a>
              <a 
                href="/events" 
                className="text-white/90 hover:text-white transition-colors text-sm font-medium"
              >
                Events
              </a>
            </div>
          </div>
        </header>
        
        <main className="flex-1">
          {children}
        </main>

        <footer className="bg-gray-800 text-white">
          <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center gap-3 mb-4 md:mb-0">
                <span className="text-2xl">🌺</span>
                <div>
                  <div className="font-bold">HTW Collab Match</div>
                  <div className="text-sm text-gray-400">
                    Built for Honolulu Tech Week
                  </div>
                </div>
              </div>
              
              <div className="text-center md:text-right">
                <div className="text-sm text-gray-400">
                  Connect, collaborate, and build amazing things together
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  🏝️ Made with aloha in paradise
                </div>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}