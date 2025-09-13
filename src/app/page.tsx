/*
Demo Script:
1. Create a profile quickly (Engineer, Honolulu, interests: AI, Climate; a few skills).
2. Open Graph → click AI → see people.
3. Hit Collaborate on a Designer → modal → Create Draft.
4. Show Events: N increment and /events list.
*/

import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-cyan-500/5"></div>
        <div className="relative max-w-4xl mx-auto px-6 py-20 text-center">
          <div className="mb-8">
            <span className="text-6xl wave-animation inline-block">🌺</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Find your perfect
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              collaborator
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Create a profile, explore the interest graph, send collaborate requests, 
            and spin up event drafts—all in minutes during Honolulu Tech Week.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/submit" className="btn-primary text-lg px-8 py-4">
              🚀 Create Your Profile
            </Link>
            <Link href="/graph" className="btn-secondary text-lg px-8 py-4">
              🌊 Explore Graph
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How HTW Collab Works
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Three simple steps to discover amazing collaboration opportunities
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-hover text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-3xl mb-6 mx-auto">
                👤
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                1. Submit Profile
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Share your name, role, skills with levels (B/I/A), interests, and availability. 
                Takes just 2 minutes to complete.
              </p>
            </div>
            
            <div className="card-hover text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl flex items-center justify-center text-3xl mb-6 mx-auto">
                🎯
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                2. Explore Graph
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Interactive network visualization connects people through shared interests. 
                Click to filter and discover potential collaborators.
              </p>
            </div>
            
            <div className="card-hover text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-green-500 rounded-2xl flex items-center justify-center text-3xl mb-6 mx-auto">
                🤝
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                3. Collaborate & Create
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Send collaboration requests and auto-generate event drafts with 
                pre-filled templates and action items.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why HTW Compass Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why HTW Collab Works
          </h2>
          <p className="text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
            Built specifically for the unique energy and time constraints of Honolulu Tech Week
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Speed</h3>
              <p className="text-gray-600 text-sm">
                Go from stranger to collaborator in under 5 minutes with smart templates
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Creativity</h3>
              <p className="text-gray-600 text-sm">
                Visual interest graph reveals unexpected collaboration opportunities
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Impact</h3>
              <p className="text-gray-600 text-sm">
                Focus on building instead of networking with structured event drafts
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Join Hawaii&apos;s Growing Tech Community
          </h2>
          <p className="text-gray-600 text-lg mb-12">
            Connect with engineers, designers, PMs, and founders across the Pacific
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                25+
              </div>
              <div className="text-gray-600 text-sm">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent mb-2">
                15+
              </div>
              <div className="text-gray-600 text-sm">Interest Areas</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent mb-2">
                10+
              </div>
              <div className="text-gray-600 text-sm">Cities</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-2">
                24/7
              </div>
              <div className="text-gray-600 text-sm">Collaboration</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-500 to-cyan-500">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to start collaborating?
          </h2>
          <p className="text-white/90 text-xl mb-8 max-w-2xl mx-auto">
            Create your profile and discover amazing collaboration opportunities in paradise 🏝️
          </p>
          <Link 
            href="/submit" 
            className="inline-flex items-center gap-2 bg-white text-blue-600 font-semibold py-4 px-8 rounded-xl hover:bg-gray-50 transition-colors text-lg shadow-lg"
          >
            Get Started Now →
          </Link>
        </div>
      </section>
    </div>
  );
}