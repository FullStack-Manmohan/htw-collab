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
      <div className="card p-8 text-center">
        <div className="text-6xl mb-4">🌺</div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">No profiles found</h3>
        <p className="text-gray-600 mb-1">
          {selectedInterest ? `No one interested in "${selectedInterest}" yet` : 'No community members to show'}
        </p>
        <p className="text-sm text-gray-500">Try selecting a different interest</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          {selectedInterest ? (
            <>
              🎯 People interested in {selectedInterest}
            </>
          ) : (
            <>
              👥 Community Members
            </>
          )}
        </h3>
        <span className="badge-secondary">
          {filteredProfiles.length} people
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-h-96 overflow-y-auto pr-2">
        {filteredProfiles.map((profile) => (
          <div
            key={profile.id}
            className="card group hover:shadow-xl transition-all duration-300 border-gray-200 hover:border-blue-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                  {profile.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {profile.name}
                  </h4>
                  <p className="text-sm text-blue-600 font-medium">{profile.role}</p>
                  {profile.city && (
                    <p className="text-xs text-gray-500 flex items-center mt-1">
                      📍 {profile.city}
                    </p>
                  )}
                </div>
              </div>
              {profile.availability && (
                <span className="badge-success text-xs">
                  {profile.availability}
                </span>
              )}
            </div>

            {profile.bio && (
              <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                {profile.bio}
              </p>
            )}

            {/* Top skills preview */}
            {profile.skills.length > 0 && (
              <div className="mb-4">
                <h5 className="text-xs font-semibold text-gray-900 mb-2">Top Skills</h5>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill.name}
                      className="pill text-xs"
                    >
                      {skill.name} 
                      <span className="text-blue-600 ml-1 font-bold">
                        {skill.level === 1 ? 'B' : skill.level === 2 ? 'I' : 'A'}
                      </span>
                    </span>
                  ))}
                  {profile.skills.length > 3 && (
                    <span className="text-xs text-gray-500 font-medium">
                      +{profile.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Interests preview */}
            <div className="mb-6">
              <h5 className="text-xs font-semibold text-gray-900 mb-2">Interests</h5>
              <div className="flex flex-wrap gap-2">
                {profile.interests.slice(0, 3).map((interest) => (
                  <span
                    key={interest}
                    className={`chip text-xs ${
                      selectedInterest === interest
                        ? 'chip-selected'
                        : ''
                    }`}
                  >
                    {interest}
                  </span>
                ))}
                {profile.interests.length > 3 && (
                  <span className="text-xs text-gray-500 font-medium">
                    +{profile.interests.length - 3} more
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => onCollaborate(profile)}
              className="btn-primary w-full inline-flex items-center justify-center gap-2"
            >
              🤝 Collaborate
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}