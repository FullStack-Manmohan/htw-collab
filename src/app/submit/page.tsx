'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Profile, Skill } from '../../../types/Profile';
import { addProfile } from '../../../lib/store';
import SkillChips from '../../../components/SkillChips';

const COMMON_INTERESTS = [
  'AI', 'Climate', 'Ocean Conservation', 'Community', 'Health', 'Education', 
  'Fintech', 'Web3', 'Design', 'Accessibility', 'Infrastructure', 'Performance',
  'Open Source', 'Social Impact', 'Tourism', 'Local Business', 'Security',
  'Privacy', 'Art', 'Culture', 'Quality', 'Process', 'Tools', 'Strategy',
  'Operations', 'Documentation', 'Developer Experience', 'Architecture',
  'Scalability', 'Resilience', 'Events', 'Networking', 'Research',
  'Sales', 'Customer Success', 'B2B SaaS', 'Reliability', 'Monitoring',
  'Automation', 'Innovation', 'Startups', 'Ecosystem', 'Sustainability',
  'Environment', 'Clean Energy'
];

const ROLES = [
  'Engineer', 'Full-stack Engineer', 'Frontend Engineer', 'Backend Engineer',
  'Product Designer', 'UX Designer', 'Visual Designer', 'AI Engineer',
  'Data Scientist', 'DevOps Engineer', 'Mobile Engineer', 'Growth PM',
  'Product Manager', 'Growth Marketer', 'Blockchain Engineer', 'Security Engineer',
  'QA Engineer', 'Business Analyst', 'Technical Writer', 'Systems Architect',
  'Community Manager', 'Research Scientist', 'Sales Engineer', 'Site Reliability Engineer',
  'Innovation Lead', 'Sustainability Engineer'
];

export default function SubmitPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    city: 'Honolulu',
    bio: '',
    availability: 'Flexible' as 'Weeknights' | 'Weekends' | 'Flexible'
  });
  const [skills, setSkills] = useState<Skill[]>([]);
  const [interests, setInterests] = useState<string[]>([]);
  const [interestInput, setInterestInput] = useState('');
  const [showInterestSuggestions, setShowInterestSuggestions] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.role.trim() || skills.length === 0 || interests.length === 0) {
      alert('Please fill in all required fields');
      return;
    }

    const profile: Profile = {
      id: `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      name: formData.name.trim(),
      role: formData.role.trim(),
      city: formData.city.trim() || undefined,
      bio: formData.bio.trim() || undefined,
      skills,
      interests,
      availability: formData.availability,
      createdAt: Date.now()
    };

    addProfile(profile);
    router.push('/graph');
  };

  const addInterest = (interest: string) => {
    if (!interest.trim()) return;
    
    const trimmedInterest = interest.trim();
    if (!interests.includes(trimmedInterest)) {
      setInterests([...interests, trimmedInterest]);
    }
    setInterestInput('');
    setShowInterestSuggestions(false);
  };

  const removeInterest = (interest: string) => {
    setInterests(interests.filter(i => i !== interest));
  };

  const filteredInterestSuggestions = COMMON_INTERESTS.filter(interest =>
    interest.toLowerCase().includes(interestInput.toLowerCase()) &&
    !interests.includes(interest)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 py-8">
      <div className="max-w-2xl mx-auto px-6">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="text-4xl mb-4">🌺</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Create Your Collab Profile
            </h1>
            <p className="text-gray-600">
              Share your skills and interests to find amazing collaboration opportunities
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your full name"
                required
              />
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Role *
              </label>
              <select
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Select your role</option>
                {ROLES.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>

            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Your city"
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              <textarea
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                rows={3}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tell us about yourself and what you're passionate about..."
              />
            </div>

            {/* Availability */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Availability
              </label>
              <select
                value={formData.availability}
                onChange={(e) => setFormData({ ...formData, availability: e.target.value as any })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Flexible">Flexible</option>
                <option value="Weeknights">Weeknights</option>
                <option value="Weekends">Weekends</option>
              </select>
            </div>

            {/* Skills */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Skills & Expertise *
              </label>
              <SkillChips
                skills={skills}
                onChange={setSkills}
                className="w-full"
              />
            </div>

            {/* Interests */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Interests *
              </label>
              
              {/* Interest chips */}
              <div className="flex flex-wrap gap-2 mb-4">
                {interests.map((interest) => (
                  <span
                    key={interest}
                    className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {interest}
                    <button
                      type="button"
                      onClick={() => removeInterest(interest)}
                      className="ml-1 text-blue-600 hover:text-blue-800 font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              {/* Interest input */}
              <div className="relative">
                <input
                  type="text"
                  value={interestInput}
                  onChange={(e) => {
                    setInterestInput(e.target.value);
                    setShowInterestSuggestions(true);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addInterest(interestInput);
                    }
                    if (e.key === 'Escape') {
                      setShowInterestSuggestions(false);
                    }
                  }}
                  placeholder="Add interests (comma-separated or one by one)..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                {/* Interest suggestions */}
                {showInterestSuggestions && interestInput && filteredInterestSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                    {filteredInterestSuggestions.slice(0, 8).map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => addInterest(suggestion)}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 focus:bg-gray-100"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-2 text-xs text-gray-500">
                Type and press Enter to add interests. Popular: AI, Climate, Community, Web3, Design
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-colors text-lg"
              >
                🚀 Create Profile & Explore Graph
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Your profile will be visible to other HTW participants for collaboration
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}