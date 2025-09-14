'use client';

import { useEffect, useState } from 'react';
import { Profile } from '../types/Profile';
import { getProfiles } from '../lib/store';

interface SimpleGraphProps {
  onInterestClick: (interest: string) => void;
  onPersonClick: (person: Profile) => void;
  selectedInterest?: string;
}

// Simplified version for testing
export default function SimpleInterestGraph({ onInterestClick, onPersonClick, selectedInterest }: SimpleGraphProps) {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [allInterests, setAllInterests] = useState<string[]>([]);

  useEffect(() => {
    try {
      const profileData = getProfiles();
      setProfiles(profileData);
      
      // Extract all unique interests from profiles
      const interests = new Set<string>();
      profileData.forEach(profile => {
        profile.interests.forEach(interest => interests.add(interest));
      });
      setAllInterests(Array.from(interests).sort());
      
      console.log('📊 Loaded profiles:', profileData.length);
      console.log('🏷️ Unique interests:', interests.size);
    } catch (error) {
      console.error('❌ Error loading graph data:', error);
    }
  }, []);

  const filteredProfiles = selectedInterest 
    ? profiles.filter(p => p.interests.some(interest => 
        interest.toLowerCase().includes(selectedInterest.toLowerCase()) ||
        selectedInterest.toLowerCase().includes(interest.toLowerCase())
      ))
    : profiles;

  return (
    <div className="w-full h-96 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 overflow-auto border border-blue-100">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          🌊 Simple Interest Explorer
          <span className="text-sm font-normal text-gray-600">
            ({profiles.length} people, {allInterests.length} interests)
          </span>
        </h3>
        
        {/* Interest Tags */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-800 mb-2">🏷️ All Interests</h4>
          <div className="flex flex-wrap gap-2">
            {allInterests.slice(0, 15).map((interest) => (
              <button
                key={interest}
                onClick={() => onInterestClick(interest)}
                className={`chip transition-all duration-200 ${
                  selectedInterest === interest
                    ? 'chip-selected'
                    : 'hover:bg-blue-50 hover:border-blue-300'
                }`}
              >
                {interest}
              </button>
            ))}
            {allInterests.length > 15 && (
              <span className="chip text-gray-500">
                +{allInterests.length - 15} more
              </span>
            )}
          </div>
        </div>
      </div>
      
      {/* People */}
      <div>
        <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
          👥 {selectedInterest ? `People interested in ${selectedInterest}` : 'All People'}
          <span className="text-sm font-normal text-gray-600">
            ({filteredProfiles.length})
          </span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredProfiles.map((profile) => (
            <button
              key={profile.id}
              onClick={() => onPersonClick(profile)}
              className="text-left p-4 bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                  {profile.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {profile.name}
                  </div>
                  <div className="text-sm text-gray-600">{profile.role}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {profile.interests.slice(0, 3).join(', ')}
                    {profile.interests.length > 3 && ` +${profile.interests.length - 3} more`}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}