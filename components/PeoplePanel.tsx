'use client';

import { Profile } from '../types/Profile';

interface PeoplePanelProps {
  profiles: Profile[];
  selectedInterest?: string;
  onCollaborate: (profile: Profile) => void;
  onClearFilter?: () => void;
}

export default function PeoplePanel({ profiles, selectedInterest, onCollaborate, onClearFilter }: PeoplePanelProps) {
  const filteredProfiles = selectedInterest 
    ? profiles.filter(p => p.interests.some(i => i.toLowerCase().includes(selectedInterest.toLowerCase()) || selectedInterest.toLowerCase().includes(i.toLowerCase())))
    : profiles; // Show all profiles if no filter

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            {selectedInterest ? (
              <>
                🎯 People interested in &quot;{selectedInterest}&quot;
              </>
            ) : (
              <>
                👥 Community Members
              </>
            )}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {selectedInterest 
              ? `Found ${filteredProfiles.length} matching ${filteredProfiles.length === 1 ? 'person' : 'people'}`
              : `Showing all ${filteredProfiles.length} community ${filteredProfiles.length === 1 ? 'member' : 'members'}`
            }
          </p>
        </div>
        <div className="flex items-center gap-3">
          {selectedInterest && onClearFilter && (
            <button
              onClick={onClearFilter}
              className="btn-secondary text-sm px-4 py-2"
            >
              Show All
            </button>
          )}
          <span className="badge-secondary font-medium">
            {filteredProfiles.length} {filteredProfiles.length === 1 ? 'person' : 'people'}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 max-h-[600px] overflow-y-auto pr-2">
        {filteredProfiles.map((profile) => (
          <div
            key={profile.id}
            className="card group hover:shadow-xl transition-all duration-300 border-gray-200 hover:border-blue-300 h-fit"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {profile.name.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                    {profile.name}
                  </h4>
                  <p className="text-sm text-blue-600 font-medium truncate">{profile.role}</p>
                  {profile.city && (
                    <p className="text-xs text-gray-500 flex items-center mt-1">
                      📍 {profile.city}
                    </p>
                  )}
                </div>
              </div>
              {profile.availability && (
                <span className="badge-success text-xs flex-shrink-0 ml-2">
                  {profile.availability}
                </span>
              )}
            </div>

            {profile.bio && (
              <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                {profile.bio}
              </p>
            )}

            {/* Top skills preview */}
            {profile.skills.length > 0 && (
              <div className="mb-4">
                <h5 className="text-xs font-semibold text-gray-900 mb-2 flex items-center gap-1">
                  ⭐ Top Skills
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {profile.skills.slice(0, 4).map((skill) => (
                    <span
                      key={skill.name}
                      className="pill text-xs bg-blue-50 text-blue-700 border border-blue-200"
                    >
                      {skill.name} 
                      <span className="text-blue-600 ml-1 font-bold">
                        {skill.level === 1 ? 'B' : skill.level === 2 ? 'I' : 'A'}
                      </span>
                    </span>
                  ))}
                  {profile.skills.length > 4 && (
                    <span className="text-xs text-gray-500 font-medium px-2 py-1">
                      +{profile.skills.length - 4} more
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Interests preview */}
            <div className="mb-6">
              <h5 className="text-xs font-semibold text-gray-900 mb-2 flex items-center gap-1">
                💡 Interests
              </h5>
              <div className="flex flex-wrap gap-1.5">
                {profile.interests.slice(0, 4).map((interest) => (
                  <span
                    key={interest}
                    className={`chip text-xs ${
                      selectedInterest && (interest.toLowerCase().includes(selectedInterest.toLowerCase()) || selectedInterest.toLowerCase().includes(interest.toLowerCase()))
                        ? 'chip-selected'
                        : 'bg-green-50 text-green-700 border border-green-200'
                    }`}
                  >
                    {interest}
                  </span>
                ))}
                {profile.interests.length > 4 && (
                  <span className="text-xs text-gray-500 font-medium px-2 py-1">
                    +{profile.interests.length - 4} more
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => onCollaborate(profile)}
              className="btn-primary w-full inline-flex items-center justify-center gap-2 py-3"
            >
              🤝 Collaborate
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}