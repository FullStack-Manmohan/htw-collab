'use client';

import { useState, useEffect } from 'react';
import { Profile } from '../../../types/Profile';
import { getProfiles, getProfileById } from '../../../lib/store';
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

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🌺</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Welcome to HTW Collab Match!
          </h2>
          <p className="text-gray-600 mb-6">
            Create your profile first to start exploring collaboration opportunities.
          </p>
          <a
            href="/submit"
            className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-colors"
          >
            Create Profile
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
          <div className="text-4xl mb-4">🌊</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Interest Graph & Collaboration Hub
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore the community through shared interests. Click on interests to filter people, 
            or click on people to start a collaboration.
          </p>
        </div>

        {/* Current User Info */}
        <div className="bg-white rounded-2xl shadow-lg p-4 mb-8 max-w-2xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {currentUser.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">{currentUser.name}</h3>
              <p className="text-blue-600">{currentUser.role}</p>
              {currentUser.city && (
                <p className="text-sm text-gray-500">📍 {currentUser.city}</p>
              )}
            </div>
            <div className="ml-auto">
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                Your Profile
              </span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Interest Graph */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">🎯</span>
              Interest Graph
              {selectedInterest && (
                <span className="ml-2 text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                  {selectedInterest}
                </span>
              )}
            </h2>
            <InterestGraph
              onInterestClick={handleInterestClick}
              onPersonClick={handlePersonClick}
              selectedInterest={selectedInterest}
            />
            
            {selectedInterest && (
              <div className="mt-4 text-center">
                <button
                  onClick={() => setSelectedInterest(undefined)}
                  className="text-sm text-gray-600 hover:text-gray-800 underline"
                >
                  Clear filter
                </button>
              </div>
            )}
          </div>

          {/* People Panel */}
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">👥</span>
              {selectedInterest ? `People interested in ${selectedInterest}` : 'Community Members'}
            </h2>
            <PeoplePanel
              profiles={profiles.filter(p => p.id !== currentUser.id)} // Exclude current user
              selectedInterest={selectedInterest}
              onCollaborate={handleCollaborate}
            />
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-white/50 backdrop-blur-sm rounded-2xl p-6 text-center">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            How to Collaborate
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div>
              <div className="text-2xl mb-2">🎯</div>
              <p><strong>Click interests</strong> in the graph to filter people by shared passions</p>
            </div>
            <div>
              <div className="text-2xl mb-2">👤</div>
              <p><strong>Click on people</strong> in the graph or hit "Collaborate" on profile cards</p>
            </div>
            <div>
              <div className="text-2xl mb-2">🚀</div>
              <p><strong>Create event drafts</strong> with automatic templates and action items</p>
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