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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10"></div>
        <div className="relative max-w-4xl mx-auto px-6 py-16 text-center">
          <div className="mb-6">
            <span className="text-6xl">🌺</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
            Find your perfect collaborator at
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Honolulu Tech Week
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create a quick profile, explore the interest graph, send a collaborate request,
            and spin up a mini event draft—in minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              href="/submit" 
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-4 px-8 rounded-2xl hover:from-blue-600 hover:to-cyan-600 transition-colors text-lg shadow-lg"
            >
              🚀 Create your collab profile
            </Link>
            <Link 
              href="/graph" 
              className="bg-white text-gray-700 font-semibold py-4 px-8 rounded-2xl hover:bg-gray-50 transition-colors text-lg shadow-lg border border-gray-200"
            >
              🌊 Open interest graph
            </Link>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-blue-100">
              <div className="text-3xl mb-4">👤</div>
              <div className="font-bold text-lg text-gray-800 mb-2">1) Submit Profile</div>
              <div className="text-gray-600">
                Name, role, city, skills (with levels), interests. Takes 2 minutes to complete.
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-cyan-100">
              <div className="text-3xl mb-4">🎯</div>
              <div className="font-bold text-lg text-gray-800 mb-2">2) Explore Graph</div>
              <div className="text-gray-600">
                Interactive visual graph. Click an interest to see people in that category.
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-teal-100">
              <div className="text-3xl mb-4">🤝</div>
              <div className="font-bold text-lg text-gray-800 mb-2">3) Collaborate → Event</div>
              <div className="text-gray-600">
                Send request, accept, auto-create a mini event draft with action items.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white/50 backdrop-blur-sm py-12">
        <div className="max-w-2xl mx-auto text-center px-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Join Hawaii's Growing Tech Community
          </h2>
          <p className="text-gray-600 mb-8">
            Connect with engineers, designers, PMs, and founders across the Pacific
          </p>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="text-3xl font-bold text-blue-600">25+</div>
              <div className="text-gray-600">Active Members</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-600">15+</div>
              <div className="text-gray-600">Interest Areas</div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Ready to start collaborating?
          </h2>
          <p className="text-gray-600 mb-8">
            Create your profile and discover amazing collaboration opportunities in paradise 🏝️
          </p>
          <Link 
            href="/submit" 
            className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-4 px-8 rounded-2xl hover:from-blue-600 hover:to-cyan-600 transition-colors text-lg shadow-lg"
          >
            Get Started Now →
          </Link>
        </div>
      </div>
    </div>
  );
}