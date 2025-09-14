'use client';

import { useState, useEffect } from 'react';
import { Profile } from '../../../types/Profile';
import { getProfiles, getProfileById, getAllInterests } from '../../../lib/store';
import InterestGraph from '../../../components/InterestGraph';
import PeoplePanel from '../../../components/PeoplePanel';
import EventDraftModal from '../../../components/EventDraftModal';

export default function GraphPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedInterest, setSelectedInterest] = useState<string>();
  const [collaborateWith, setCollaborateWith] = useState<Profile>();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<Profile>();

  useEffect(() => {
    // Load initial data
    const allProfiles = getProfiles();
    setProfiles(allProfiles);
    
    // Use the first profile as the current user, or create a mock user
    const mockUser = allProfiles[0] || {
      id: 'mock-user',
      name: 'You',
      role: 'HTW Participant',
      city: 'Honolulu',
      bio: 'Exploring collaboration opportunities at Honolulu Tech Week',
      skills: [],
      interests: ['Software & Technology', 'Networking Skills', 'Innovation'],
      availability: 'Flexible' as const,
      links: {},
      createdAt: Date.now()
    };
    
    setCurrentUser(mockUser);
  }, []);

  const handleInterestClick = (interest: string) => {
    setSelectedInterest(interest);
  };

  const handlePersonClick = (person: Profile) => {
    if (person.id === currentUser?.id) return; // Don't allow collaborating with self
    setCollaborateWith(person);
    setModalOpen(true);
  };

  const handleCollaborate = (profile: Profile) => {
    if (profile.id === currentUser?.id) return; // Don't allow collaborating with self
    setCollaborateWith(profile);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setCollaborateWith(undefined);
    // Refresh profiles to update any new data
    setProfiles(getProfiles());
  };

  const allInterests = getAllInterests();

  if (!currentUser) {
    return (
      <div className="min-h-screen htw-section bg-gray-50 flex items-center justify-center">
        <div className="text-center htw-card max-w-md mx-auto p-8">
          <div className="text-5xl mb-6">🌺</div>
          <h2 className="card-title-feature mb-4">
            WELCOME TO HTW COLLAB!
          </h2>
          <p className="body-secondary mb-6">
            Create your profile first to start exploring collaboration opportunities.
          </p>
          <a
            href="/submit"
            className="btn-primary inline-flex items-center gap-2 btn-hover"
          >
            👤 CREATE PROFILE
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen htw-section bg-gray-50">
      <div className="container-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-5xl mb-6">🌊</div>
          <h1 className="section-headline mb-4">
            INTEREST GRAPH & COLLABORATION HUB
          </h1>
          <p className="body-primary max-w-3xl mx-auto">
            Explore the community through shared interests. Click on interests to filter people, 
            or click on people to start a collaboration.
          </p>
        </div>

        {/* Current User Info */}
        <div className="htw-card mb-8 max-w-3xl mx-auto p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-htw-primary rounded-full flex items-center justify-center text-white font-black text-xl">
              {currentUser.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h3 className="card-title-feature text-htw-deep-sea">{currentUser.name}</h3>
              <p className="text-htw-primary font-medium">{currentUser.role}</p>
              {currentUser.city && (
                <p className="caption flex items-center gap-1">
                  📍 {currentUser.city}
                </p>
              )}
            </div>
            <div className="badge-success">
              YOUR PROFILE
            </div>
          </div>
        </div>

        {/* Interest Filter Chips */}
        <div className="htw-card mb-8 p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-lg">🎯</span>
            <h2 className="card-title-compact">FILTER BY INTEREST</h2>
            {selectedInterest && (
              <button
                onClick={() => setSelectedInterest(undefined)}
                className="btn-secondary text-sm px-3 py-1"
              >
                CLEAR FILTER
              </button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {allInterests.slice(0, 12).map((interest) => (
              <button
                key={interest}
                onClick={() => handleInterestClick(interest)}
                className={`chip transition-all duration-200 ${
                  selectedInterest === interest ? 'chip-selected' : 'hover:bg-htw-primary/10'
                }`}
              >
                {interest}
              </button>
            ))}
            {allInterests.length > 12 && (
              <span className="chip text-gray-500">
                +{allInterests.length - 12} more
              </span>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="content-grid-2 gap-8">
          {/* Interest Graph */}
          <div>
            <div className="htw-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🔗</span>
                  <h2 className="card-title-compact">NETWORK GRAPH</h2>
                </div>
                <div className="fine-print">
                  Blue: Interests • Orange: People
                </div>
              </div>
              
              <InterestGraph
                onInterestClick={handleInterestClick}
                onPersonClick={handlePersonClick}
                selectedInterest={selectedInterest}
              />
            </div>
          </div>

          {/* People Panel */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">👥</span>
              <h2 className="card-title-compact">
                {selectedInterest ? `PEOPLE INTERESTED IN ${selectedInterest.toUpperCase()}` : "COMMUNITY MEMBERS"}
              </h2>
            </div>
            
            <PeoplePanel
              profiles={profiles.filter(p => p.id !== currentUser.id)} // Exclude current user
              selectedInterest={selectedInterest}
              onCollaborate={handleCollaborate}
            />
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-16 htw-card bg-gradient-to-r from-htw-primary/5 to-htw-tech-blue/5 border-htw-primary/20 p-8">
          <h3 className="section-headline text-center mb-8">
            HOW TO COLLABORATE
          </h3>
          <div className="content-grid-3 gap-8 text-center">
            <div>
              <div className="w-16 h-16 bg-gradient-htw-primary rounded-full flex items-center justify-center text-3xl mb-4 mx-auto">
                🎯
              </div>
              <h4 className="card-title-compact mb-3">FILTER BY INTEREST</h4>
              <p className="body-secondary">
                Click interest chips or graph nodes to find people with shared passions
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-gradient-htw-primary rounded-full flex items-center justify-center text-3xl mb-4 mx-auto">
                👤
              </div>
              <h4 className="card-title-compact mb-3">CONNECT WITH PEOPLE</h4>
              <p className="body-secondary">
                Click on people in the graph or hit &quot;Collaborate&quot; on profile cards
              </p>
            </div>
            <div>
              <div className="w-16 h-16 bg-gradient-htw-primary rounded-full flex items-center justify-center text-3xl mb-4 mx-auto">
                🚀
              </div>
              <h4 className="card-title-compact mb-3">CREATE EVENTS</h4>
              <p className="body-secondary">
                Generate event drafts with automatic templates and action items
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Event Draft Modal */}
      <EventDraftModal
        open={modalOpen}
        onClose={handleModalClose}
        me={currentUser}
        partner={collaborateWith}
      />
    </div>
  );
}