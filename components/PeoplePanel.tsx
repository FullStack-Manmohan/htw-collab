'use client';

import { Profile } from '../types/Profile';

interface PeoplePanelProps {
  profiles: Profile[];
  selectedInterest?: string;
  onCollaborate: (profile: Profile) => void;
}

export default function PeoplePanel({ profiles, selectedInterest, onCollaborate }: PeoplePanelProps) {
  const filteredProfiles = selectedInterest 
    ? profiles.filter(p => p.interests.some(i => i.toLowerCase() === selectedInterest.toLowerCase()))
    : profiles.slice(0, 12); // Show first 12 if no filter

  if (filteredProfiles.length === 0) {
    return (
      <div className="w-full h-96 bg-white rounded-2xl shadow-lg p-6 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <div className="text-4xl mb-2">🌺</div>
          <p>No profiles found {selectedInterest ? `for "${selectedInterest}"` : ''}</p>
          <p className="text-sm mt-1">Try selecting a different interest</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {selectedInterest ? (
            <>
              <span className="text-2xl mr-2">🎯</span>
              People interested in {selectedInterest}
            </>
          ) : (
            <>
              <span className="text-2xl mr-2">👥</span>
              Community Members
            </>
          )}
        </h3>
        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {filteredProfiles.length} people
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-80 overflow-y-auto">
        {filteredProfiles.map((profile) => (
          <div
            key={profile.id}
            className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 hover:shadow-md transition-shadow border border-blue-100"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h4 className="font-semibold text-gray-800">{profile.name}</h4>
                <p className="text-sm text-blue-600 font-medium">{profile.role}</p>
                {profile.city && (
                  <p className="text-xs text-gray-500 flex items-center mt-1">
                    <span className="mr-1">📍</span>
                    {profile.city}
                  </p>
                )}
              </div>
              {profile.availability && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                  {profile.availability}
                </span>
              )}
            </div>

            {profile.bio && (
              <p className="text-xs text-gray-600 mb-3 line-clamp-2">{profile.bio}</p>
            )}

            {/* Top skills preview */}
            {profile.skills.length > 0 && (
              <div className="mb-3">
                <div className="flex flex-wrap gap-1">
                  {profile.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill.name}
                      className="text-xs bg-white/70 text-gray-700 px-2 py-1 rounded-full"
                    >
                      {skill.name} 
                      <span className="text-blue-600 ml-1 font-semibold">
                        {skill.level === 1 ? 'B' : skill.level === 2 ? 'I' : 'A'}
                      </span>
                    </span>
                  ))}
                  {profile.skills.length > 3 && (
                    <span className="text-xs text-gray-500">
                      +{profile.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Interests preview */}
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {profile.interests.slice(0, 3).map((interest) => (
                  <span
                    key={interest}
                    className={`text-xs px-2 py-1 rounded-full ${
                      selectedInterest === interest
                        ? 'bg-blue-500 text-white'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {interest}
                  </span>
                ))}
                {profile.interests.length > 3 && (
                  <span className="text-xs text-gray-500">
                    +{profile.interests.length - 3} more
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => onCollaborate(profile)}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-medium py-2 px-4 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-colors"
            >
              🤝 Collaborate
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}