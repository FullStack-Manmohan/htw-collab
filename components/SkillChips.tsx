'use client';

import { useState } from 'react';
import { Skill } from '../types/Profile';

interface SkillChipsProps {
  skills: Skill[];
  onChange: (skills: Skill[]) => void;
  className?: string;
}

const COMMON_SKILLS = [
  'React', 'TypeScript', 'Node.js', 'Python', 'Figma', 'AWS', 'Go', 'SQL',
  'Machine Learning', 'User Research', 'Product Strategy', 'Digital Marketing',
  'Kubernetes', 'Design Systems', 'Analytics', 'Cybersecurity'
];

const LEVEL_LABELS = {
  1: 'B', // Beginner
  2: 'I', // Intermediate  
  3: 'A'  // Advanced
};

export default function SkillChips({ skills, onChange, className = '' }: SkillChipsProps) {
  const [newSkill, setNewSkill] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const addSkill = (skillName: string, level: 1 | 2 | 3 = 2) => {
    if (!skillName.trim()) return;
    
    const existingSkill = skills.find(s => s.name.toLowerCase() === skillName.toLowerCase());
    if (existingSkill) return;

    const newSkillObj: Skill = { name: skillName.trim(), level };
    onChange([...skills, newSkillObj]);
    setNewSkill('');
    setShowSuggestions(false);
  };

  const removeSkill = (skillName: string) => {
    onChange(skills.filter(s => s.name !== skillName));
  };

  const updateSkillLevel = (skillName: string, level: 1 | 2 | 3) => {
    onChange(skills.map(s => 
      s.name === skillName ? { ...s, level } : s
    ));
  };

  const filteredSuggestions = COMMON_SKILLS.filter(skill => 
    skill.toLowerCase().includes(newSkill.toLowerCase()) &&
    !skills.some(s => s.name.toLowerCase() === skill.toLowerCase())
  );

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2 mb-4">
        {skills.map((skill) => (
          <div
            key={skill.name}
            className="flex items-center gap-1 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
          >
            <span>{skill.name}</span>
            <select
              value={skill.level}
              onChange={(e) => updateSkillLevel(skill.name, Number(e.target.value) as 1 | 2 | 3)}
              className="bg-transparent border-none text-xs font-bold ml-1"
            >
              <option value={1}>{LEVEL_LABELS[1]}</option>
              <option value={2}>{LEVEL_LABELS[2]}</option>
              <option value={3}>{LEVEL_LABELS[3]}</option>
            </select>
            <button
              onClick={() => removeSkill(skill.name)}
              className="ml-1 text-blue-600 hover:text-blue-800 font-bold"
            >
              ×
            </button>
          </div>
        ))}
      </div>

      <div className="relative">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => {
            setNewSkill(e.target.value);
            setShowSuggestions(true);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addSkill(newSkill);
            }
            if (e.key === 'Escape') {
              setShowSuggestions(false);
            }
          }}
          placeholder="Add a skill..."
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        {showSuggestions && newSkill && filteredSuggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto">
            {filteredSuggestions.slice(0, 5).map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => addSkill(suggestion)}
                className="w-full text-left px-3 py-2 hover:bg-gray-100 focus:bg-gray-100"
              >
                {suggestion}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="mt-2 text-xs text-gray-500">
        Type skill name and press Enter. Levels: B=Beginner, I=Intermediate, A=Advanced
      </div>
    </div>
  );
}