'use client';

import { useState, useEffect } from 'react';
import { Profile } from '../../../types/Profile';
import { getProfiles, getProfileById, getAllInterests } from '../../../lib/store';
import InterestGraph from '../../../components/InterestGraph';
import PeoplePanel from '../../../components/PeoplePanel';
import EventDraftModal from '../../../components/EventDraftModal';

// Mock current user - in a real app this would come from auth
const MOCK_USER_ID = '1'; // Kai Nakamura from seed data

export default function GraphPage() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedInterest, setSelectedInterest] = useState<string>();
  const [collaborateWith, setCollaborateWith] = useState<Profile>();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<Profile>();

  useEffect(() => {
    // Load initial data
    setProfiles(getProfiles());
    setCurrentUser(getProfileById(MOCK_USER_ID));
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 flex items-center justify-center py-20">
        <div className="text-center card max-w-md mx-auto">
          <div className="text-5xl mb-6">🌺</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Welcome to HTW Collab!
          </h2>
          <p className="text-gray-600 mb-6">
            Create your profile first to start exploring collaboration opportunities.
          </p>
          <a
            href="/submit"
            className="btn-primary inline-flex items-center gap-2"
          >
            👤 Create Profile
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🌊</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Interest Graph & Collaboration Hub
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Explore the community through shared interests. Click on interests to filter people, 
            or click on people to start a collaboration.
          </p>
        </div>

        {/* Current User Info */}
        <div className="card mb-8 max-w-3xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {currentUser.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900">{currentUser.name}</h3>
              <p className="text-blue-600 font-medium">{currentUser.role}</p>
              {currentUser.city && (
                <p className="text-gray-500 text-sm flex items-center gap-1">
                  📍 {currentUser.city}
                </p>
              )}
            </div>
            <div className="badge-success">
              Your Profile
            </div>
          </div>
        </div>

        {/* Interest Filter Chips */}
        <div className="card mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-lg">🎯</span>
            <h2 className="text-lg font-semibold text-gray-900">Filter by Interest</h2>
            {selectedInterest && (
              <button
                onClick={() => setSelectedInterest(undefined)}
                className="btn-ghost text-sm"
              >
                Clear filter
              </button>
            )}
          </div>
          
          <div className="flex flex-wrap gap-2">
            {allInterests.slice(0, 12).map((interest) => (
              <button
                key={interest}
                onClick={() => handleInterestClick(interest)}
                className={`chip transition-all duration-200 ${
                  selectedInterest === interest ? 'chip-selected' : 'hover:bg-blue-50'
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
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Interest Graph */}
          <div>
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🔗</span>
                  <h2 className="text-lg font-semibold text-gray-900">Network Graph</h2>
                </div>
                <div className="text-xs text-gray-500">
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
              <h2 className="text-lg font-semibold text-gray-900">
                {selectedInterest ? `People interested in ${selectedInterest}` : "Community Members"}
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
        <div className="mt-12 card bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">
            How to Collaborate
          </h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-2xl mb-3 mx-auto">
                🎯
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Filter by Interest</h4>
              <p className="text-sm text-gray-600">
                Click interest chips or graph nodes to find people with shared passions
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center text-2xl mb-3 mx-auto">
                👤
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Connect with People</h4>
              <p className="text-sm text-gray-600">
                Click on people in the graph or hit &quot;Collaborate&quot; on profile cards
              </p>
            </div>
            <div>
              <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-2xl mb-3 mx-auto">
                🚀
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Create Events</h4>
              <p className="text-sm text-gray-600">
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