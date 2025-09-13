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
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="card w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border-0">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                🚀 Create Event Draft
              </h2>
              <p className="text-gray-600 mt-2">
                Turn your collaboration idea into reality
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors text-xl"
              aria-label="Close modal"
            >
              ×
            </button>
          </div>

          {/* Partner info */}
          {partner && (
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 mb-8 border border-blue-100">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  {partner.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900">{partner.name}</h3>
                  <p className="text-blue-600 font-medium">{partner.role}</p>
                  {partner.city && (
                    <p className="text-gray-500 text-sm flex items-center gap-1 mt-1">
                      📍 {partner.city}
                    </p>
                  )}
                </div>
                <div className="badge-success">
                  Collaboration Partner
                </div>
              </div>
            </div>
          )}

          {/* Mode selection */}
          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-900 mb-3">
              Collaboration Mode
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setMode('In-person (Honolulu Tech Week)')}
                className={`p-4 rounded-xl text-sm font-medium transition-all duration-200 border-2 ${
                  mode === 'In-person (Honolulu Tech Week)'
                    ? 'bg-blue-500 text-white border-blue-500 shadow-lg'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <div className="text-2xl mb-2">🏝️</div>
                <div className="font-semibold">In-person</div>
                <div className="text-xs opacity-80">Honolulu Tech Week</div>
              </button>
              <button
                onClick={() => setMode('Online')}
                className={`p-4 rounded-xl text-sm font-medium transition-all duration-200 border-2 ${
                  mode === 'Online'
                    ? 'bg-blue-500 text-white border-blue-500 shadow-lg'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <div className="text-2xl mb-2">💻</div>
                <div className="font-semibold">Online</div>
                <div className="text-xs opacity-80">Virtual Meeting</div>
              </button>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                Event Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input-field"
                placeholder="Give your collaboration a compelling name..."
              />
            </div>

            {/* When & Where */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">
                  When
                </label>
                <input
                  type="text"
                  value={when}
                  onChange={(e) => setWhen(e.target.value)}
                  className="input-field"
                  placeholder="When would you like to meet?"
                />
              </div>
              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-3">
                  Where
                </label>
                <input
                  type="text"
                  value={where}
                  onChange={(e) => setWhere(e.target.value)}
                  className="input-field"
                  placeholder="Where will you collaborate?"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="input-field resize-none"
                placeholder="Describe what you'd like to work on together. Be specific about goals and outcomes..."
              />
            </div>

            {/* Checklist */}
            <div>
              <label className="block text-lg font-semibold text-gray-900 mb-3">
                Action Items (3 items)
              </label>
              <div className="space-y-3">
                {checklist.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                      {index + 1}
                    </div>
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => updateChecklistItem(index, e.target.value)}
                      className="input-field flex-1"
                      placeholder={`Action item ${index + 1}...`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="btn-ghost flex-1 inline-flex items-center justify-center gap-2"
            >
              Cancel
            </button>
            <button
              onClick={handleCreate}
              disabled={!title.trim() || !description.trim()}
              className="btn-primary flex-1 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🎉 Create Event Draft
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}