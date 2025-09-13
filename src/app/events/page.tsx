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
            <div className="text-4xl mb-4">🤝</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Collaboration Events
            </h1>
            <p className="text-gray-600">
              Event drafts created through collaboration requests will appear here
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">🌺</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              No events yet!
            </h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Start collaborating with other community members to create your first event draft.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/graph"
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-colors"
              >
                🌊 Explore Graph
              </a>
              <a
                href="/submit"
                className="bg-white text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-50 transition-colors border border-gray-200"
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
          <div className="text-4xl mb-4">🤝</div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Collaboration Events
          </h1>
          <p className="text-gray-600">
            Track your collaboration event drafts and upcoming meetings
          </p>
          <div className="mt-4">
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              {events.length} {events.length === 1 ? 'event' : 'events'} created
            </span>
          </div>
        </div>

        {/* Events List */}
        <div className="space-y-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              {/* Event Header */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <div className="mb-4 md:mb-0">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {event.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 text-sm text-gray-600">
                    {event.when && (
                      <span className="flex items-center gap-1">
                        <span>📅</span>
                        {event.when}
                      </span>
                    )}
                    {event.where && (
                      <span className="flex items-center gap-1">
                        <span>📍</span>
                        {event.where}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">
                    Created {new Date(event.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Members */}
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-gray-700 mb-2">
                  Collaboration Partners
                </h4>
                <div className="flex flex-wrap gap-2">
                  {event.members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center gap-2 bg-blue-50 rounded-lg px-3 py-2"
                    >
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-800 text-sm">
                          {member.name}
                        </div>
                        <div className="text-xs text-blue-600">
                          {member.role}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description */}
              {event.description && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    Project Description
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {event.description}
                  </p>
                </div>
              )}

              {/* Checklist */}
              {event.checklist.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    Action Items
                  </h4>
                  <div className="space-y-2">
                    {event.checklist.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg"
                      >
                        <div className="w-5 h-5 border-2 border-gray-300 rounded mt-0.5 flex-shrink-0"></div>
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-100">
                <button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 px-4 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-colors text-sm font-medium">
                  📝 Edit Details
                </button>
                <button className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors text-sm font-medium">
                  ✅ Mark Complete
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                  📤 Share
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Ready to create more collaborations?
          </p>
          <a
            href="/graph"
            className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-colors"
          >
            🌊 Back to Interest Graph
          </a>
        </div>
      </div>
    </div>
  );
}