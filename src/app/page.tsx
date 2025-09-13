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
      <section className="relative overflow-hidden htw-section-dark">
        <div className="absolute inset-0 bg-gradient-to-r from-htw-primary/10 to-white/5"></div>
        <div className="relative container-wide py-20 text-center">
          <div className="mb-8">
            <span className="text-6xl wave-animation inline-block">🌺</span>
          </div>
          
          <h1 className="hero-headline text-white mb-6 leading-tight">
            FIND YOUR PERFECT
            <br />
            <span className="text-htw-primary">
              COLLABORATOR
            </span>
          </h1>
          
          <p className="body-primary text-white/90 mb-8 max-w-3xl mx-auto">
            Create a profile, explore the interest graph, send collaborate requests, 
            and spin up event drafts—all in minutes during Honolulu Tech Week.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/submit" className="btn-primary text-lg px-8 py-4 btn-hover">
              🚀 CREATE YOUR PROFILE
            </Link>
            <Link href="/graph" className="btn-secondary text-lg px-8 py-4 btn-hover">
              🌊 EXPLORE GRAPH
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="htw-section">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="section-headline mb-4">
              HOW HTW COLLAB WORKS
            </h2>
            <p className="body-primary max-w-3xl mx-auto">
              Three simple steps to discover amazing collaboration opportunities
            </p>
          </div>

          <div className="content-grid-3">
            <div className="htw-card text-center p-8">
              <div className="w-20 h-20 bg-gradient-htw-primary rounded-2xl flex items-center justify-center text-4xl mb-6 mx-auto">
                👤
              </div>
              <h3 className="card-title-feature mb-4">
                1. SUBMIT PROFILE
              </h3>
              <p className="body-secondary">
                Share your name, role, skills with levels (B/I/A), interests, and availability. 
                Takes just 2 minutes to complete.
              </p>
            </div>
            
            <div className="htw-card text-center p-8">
              <div className="w-20 h-20 bg-gradient-htw-primary rounded-2xl flex items-center justify-center text-4xl mb-6 mx-auto">
                🎯
              </div>
              <h3 className="card-title-feature mb-4">
                2. EXPLORE GRAPH
              </h3>
              <p className="body-secondary">
                Interactive network visualization connects people through shared interests. 
                Click to filter and discover potential collaborators.
              </p>
            </div>
            
            <div className="htw-card text-center p-8">
              <div className="w-20 h-20 bg-gradient-htw-primary rounded-2xl flex items-center justify-center text-4xl mb-6 mx-auto">
                🤝
              </div>
              <h3 className="card-title-feature mb-4">
                3. COLLABORATE & CREATE
              </h3>
              <p className="body-secondary">
                Send collaboration requests and auto-generate event drafts with 
                pre-filled templates and action items.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why HTW Collab Works */}
      <section className="htw-section bg-gray-50">
        <div className="container-narrow text-center">
          <h2 className="section-headline mb-4">
            WHY HTW COLLAB WORKS
          </h2>
          <p className="body-primary mb-16 max-w-2xl mx-auto">
            Built specifically for the unique energy and time constraints of Honolulu Tech Week
          </p>

          <div className="content-grid-3">
            <div className="text-center">
              <div className="text-5xl mb-6">⚡</div>
              <h3 className="card-title-compact mb-3">SPEED</h3>
              <p className="body-secondary">
                Go from stranger to collaborator in under 5 minutes with smart templates
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-5xl mb-6">💡</div>
              <h3 className="card-title-compact mb-3">CREATIVITY</h3>
              <p className="body-secondary">
                Visual interest graph reveals unexpected collaboration opportunities
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-5xl mb-6">🎯</div>
              <h3 className="card-title-compact mb-3">IMPACT</h3>
              <p className="body-secondary">
                Focus on building instead of networking with structured event drafts
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Community Stats */}
      <section className="htw-section">
        <div className="container-narrow text-center">
          <h2 className="section-headline mb-4">
            JOIN HAWAII&apos;S GROWING TECH COMMUNITY
          </h2>
          <p className="body-primary mb-16">
            Connect with engineers, designers, PMs, and founders across the Pacific
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-black text-htw-primary mb-3 font-ibm-condensed">
                25+
              </div>
              <div className="caption">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-htw-primary mb-3 font-ibm-condensed">
                15+
              </div>
              <div className="caption">Interest Areas</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-htw-primary mb-3 font-ibm-condensed">
                10+
              </div>
              <div className="caption">Cities</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-black text-htw-primary mb-3 font-ibm-condensed">
                24/7
              </div>
              <div className="caption">Collaboration</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="htw-section-dark">
        <div className="container-narrow text-center">
          <h2 className="section-headline-dark mb-4">
            READY TO START COLLABORATING?
          </h2>
          <p className="body-primary text-white/90 mb-8 max-w-2xl mx-auto">
            Create your profile and discover amazing collaboration opportunities in paradise 🏝️
          </p>
          <Link 
            href="/submit" 
            className="btn-primary text-lg px-8 py-4 btn-hover"
          >
            GET STARTED NOW →
          </Link>
        </div>
      </section>
    </div>
  );
}