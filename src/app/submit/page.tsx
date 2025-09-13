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
      alert('Please fill in all required fields (name, role, at least one skill, and one interest)');
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

  const handleReset = () => {
    setFormData({
      name: '',
      role: '',
      city: 'Honolulu',
      bio: '',
      availability: 'Flexible'
    });
    setSkills([]);
    setInterests([]);
    setInterestInput('');
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 py-12">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🌺</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Create Your Profile
          </h1>
          <p className="text-gray-600 text-lg">
            Share your skills and interests to find amazing collaboration opportunities
          </p>
        </div>

        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span>👤</span> Basic Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="form-input"
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role *
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="form-select"
                    required
                  >
                    <option value="">Select your role</option>
                    {ROLES.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="form-input"
                    placeholder="Your city"
                  />
                  <p className="text-xs text-gray-500 mt-1">Default: Honolulu</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Availability
                  </label>
                  <select
                    value={formData.availability}
                    onChange={(e) => setFormData({ ...formData, availability: e.target.value as "Weeknights" | "Weekends" | "Flexible" })}
                    className="form-select"
                  >
                    <option value="Flexible">Flexible</option>
                    <option value="Weeknights">Weeknights</option>
                    <option value="Weekends">Weekends</option>
                  </select>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={3}
                  className="form-textarea"
                  placeholder="Tell us about yourself and what you're passionate about..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  Share your background, current projects, or what excites you about tech
                </p>
              </div>
            </div>

            {/* Skills Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span>⚡</span> Skills & Expertise *
              </h2>
              <SkillChips
                skills={skills}
                onChange={setSkills}
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-2">
                Add your technical skills and mark your level: B=Beginner, I=Intermediate, A=Advanced
              </p>
            </div>

            {/* Interests Section */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <span>🎯</span> Interests *
              </h2>
              
              {/* Interest chips */}
              <div className="flex flex-wrap gap-2 mb-4">
                {interests.map((interest) => (
                  <span
                    key={interest}
                    className="inline-flex items-center gap-1 badge-primary"
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
                  placeholder="Type and press Enter to add interests..."
                  className="form-input"
                />

                {/* Interest suggestions */}
                {showInterestSuggestions && interestInput && filteredInterestSuggestions.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
                    {filteredInterestSuggestions.slice(0, 8).map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => addInterest(suggestion)}
                        className="w-full text-left px-3 py-2 hover:bg-gray-100 focus:bg-gray-100 text-sm"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <p className="text-xs text-gray-500 mt-2">
                Popular: AI, Climate, Community, Web3, Design, Open Source
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="submit"
                className="btn-primary flex-1 text-lg py-3"
              >
                🚀 Save & Explore Graph
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="btn-secondary sm:w-auto px-6"
              >
                Reset
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