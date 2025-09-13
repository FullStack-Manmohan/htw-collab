'use client';

import { useState, useEffect } from 'react';
import { EventDraft } from '../../../types/Event';
import { getEvents } from '../../../lib/store';

export default function EventsPage() {
  const [events, setEvents] = useState<EventDraft[]>([]);

  useEffect(() => {
    setEvents(getEvents());
    
    // Set up interval to refresh events
    const interval = setInterval(() => {
      setEvents(getEvents());
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  if (events.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 py-8">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">🗓️</div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Collaboration Events
            </h1>
            <p className="text-gray-600 text-lg">
              Event drafts created through collaboration requests will appear here
            </p>
          </div>

          <div className="card text-center py-16">
            <div className="text-6xl mb-6">🌺</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              No events yet!
            </h2>
            <p className="text-gray-600 mb-8 max-w-lg mx-auto text-lg">
              Start collaborating with other community members to create your first event draft.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/graph"
                className="btn-primary inline-flex items-center gap-2"
              >
                🌊 Explore Graph
              </a>
              <a
                href="/submit"
                className="btn-secondary inline-flex items-center gap-2"
              >
                👤 Create Profile
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🗓️</div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Collaboration Events
          </h1>
          <p className="text-gray-600 text-lg">
            Track your collaboration event drafts and upcoming meetings
          </p>
          <div className="mt-6">
            <span className="badge-success text-base px-4 py-2">
              {events.length} {events.length === 1 ? 'event' : 'events'} created
            </span>
          </div>
        </div>

        {/* Events List */}
        <div className="space-y-8">
          {events.map((event) => (
            <div
              key={event.id}
              className="card group hover:shadow-xl transition-all duration-300"
            >
              {/* Event Header */}
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {event.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    {event.when && (
                      <span className="flex items-center gap-2 pill">
                        📅 {event.when}
                      </span>
                    )}
                    {event.where && (
                      <span className="flex items-center gap-2 pill">
                        📍 {event.where}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="badge-secondary">
                    Created {new Date(event.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Members */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  🤝 Collaboration Partners ({event.members.length})
                </h4>
                <div className="flex flex-wrap gap-3">
                  {event.members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center gap-3 bg-blue-50 rounded-xl px-4 py-3 border border-blue-100 hover:bg-blue-100 transition-colors"
                    >
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {member.name}
                        </div>
                        <div className="text-sm text-blue-600 font-medium">
                          {member.role}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              {event.description && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    📝 Project Description
                  </h4>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="text-gray-700 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              )}

              {/* Checklist */}
              {event.checklist.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    ✅ Action Items ({event.checklist.length})
                  </h4>
                  <div className="space-y-3">
                    {event.checklist.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group/item"
                      >
                        <div className="w-5 h-5 border-2 border-gray-400 rounded mt-1 flex-shrink-0 group-hover/item:border-green-500 transition-colors"></div>
                        <span className="text-gray-700 leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
                <button className="btn-primary flex-1 inline-flex items-center justify-center gap-2">
                  📝 Edit Details
                </button>
                <button className="btn-success flex-1 inline-flex items-center justify-center gap-2">
                  ✅ Mark Complete
                </button>
                <button className="btn-ghost px-6 inline-flex items-center justify-center gap-2">
                  📤 Share
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="mt-16 card bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200 text-center">
          <div className="text-4xl mb-4">🚀</div>
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Ready to create more collaborations?
          </h3>
          <p className="text-gray-600 mb-6 text-lg max-w-2xl mx-auto">
            The community is growing every day. Jump back into the interest graph to discover new collaboration opportunities!
          </p>
          <a
            href="/graph"
            className="btn-primary inline-flex items-center gap-2"
          >
            🌊 Back to Interest Graph
          </a>
        </div>
      </div>
    </div>
  );
}