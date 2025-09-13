'use client';

import { useState, useEffect } from 'react';
import { Profile } from '../types/Profile';
import { EventDraft } from '../types/Event';
import { createEvent } from '../lib/store';

interface EventDraftModalProps {
  open: boolean;
  onClose: () => void;
  me?: Profile;
  partner?: Profile;
}

export default function EventDraftModal({ open, onClose, me, partner }: EventDraftModalProps) {
  const [mode, setMode] = useState<'Online' | 'In-person (Honolulu Tech Week)'>('In-person (Honolulu Tech Week)');
  const [title, setTitle] = useState('');
  const [when, setWhen] = useState('');
  const [where, setWhere] = useState('');
  const [description, setDescription] = useState('');
  const [checklist, setChecklist] = useState<string[]>([]);

  useEffect(() => {
    if (open && me && partner) {
      // Prefill form data
      setTitle(`${me.name} & ${partner.name} Collaboration`);
      setWhen('TBD - During Honolulu Tech Week');
      setWhere(mode === 'Online' ? 'Online (Zoom/Meet)' : 'In-person (HTW)');
      
      // Get shared interests for description
      const sharedInterests = me.interests.filter(interest => 
        partner.interests.includes(interest)
      );
      
      setDescription(
        `Collaboration between ${me.role} and ${partner.role}${
          sharedInterests.length > 0 
            ? ` focusing on shared interests: ${sharedInterests.join(', ')}`
            : ''
        }`
      );
      
      setChecklist([
        'Define project scope and goals',
        'Set up communication channels',
        'Plan first milestone and timeline'
      ]);
    }
  }, [open, me, partner, mode]);

  const handleCreate = () => {
    if (!me || !partner) return;

    const event: EventDraft = {
      id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      title,
      when: when || undefined,
      where: where || undefined,
      description,
      checklist: checklist.filter(item => item.trim()),
      members: [
        { id: me.id, name: me.name, role: me.role },
        { id: partner.id, name: partner.name, role: partner.role }
      ],
      createdAt: Date.now()
    };

    createEvent(event);
    onClose();
  };

  const updateChecklistItem = (index: number, value: string) => {
    const newChecklist = [...checklist];
    newChecklist[index] = value;
    setChecklist(newChecklist);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <span className="text-2xl mr-2">🚀</span>
              Create Event Draft
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Partner info */}
          {partner && (
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  {partner.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">{partner.name}</h3>
                  <p className="text-sm text-blue-600">{partner.role}</p>
                  {partner.city && (
                    <p className="text-xs text-gray-500">📍 {partner.city}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Mode selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Collaboration Mode
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => setMode('In-person (Honolulu Tech Week)')}
                className={`flex-1 p-3 rounded-lg text-sm font-medium transition-colors ${
                  mode === 'In-person (Honolulu Tech Week)'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🏝️ In-person (HTW)
              </button>
              <button
                onClick={() => setMode('Online')}
                className={`flex-1 p-3 rounded-lg text-sm font-medium transition-colors ${
                  mode === 'Online'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                💻 Online
              </button>
            </div>
          </div>

          {/* Title */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Give your collaboration a name..."
            />
          </div>

          {/* When */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              When
            </label>
            <input
              type="text"
              value={when}
              onChange={(e) => setWhen(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="When would you like to meet?"
            />
          </div>

          {/* Where */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Where
            </label>
            <input
              type="text"
              value={where}
              onChange={(e) => setWhere(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Where will you collaborate?"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Describe what you'd like to work on together..."
            />
          </div>

          {/* Checklist */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Action Items (3 items)
            </label>
            <div className="space-y-2">
              {checklist.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">#{index + 1}</span>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateChecklistItem(index, e.target.value)}
                    className="flex-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    placeholder={`Action item ${index + 1}...`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              disabled={!title.trim() || !description.trim()}
              className="flex-1 py-3 px-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🎉 Create Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}