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
      <div className="min-h-screen htw-section bg-gray-50">
        <div className="container-narrow">
          <div className="text-center mb-12">
            <div className="text-5xl mb-6">🗓️</div>
            <h1 className="section-headline mb-4">
              COLLABORATION EVENTS
            </h1>
            <p className="body-primary">
              Event drafts created through collaboration requests will appear here
            </p>
          </div>

          <div className="htw-card text-center py-16 px-8">
            <div className="text-6xl mb-6">🌺</div>
            <h2 className="card-title-feature mb-4">
              NO EVENTS YET!
            </h2>
            <p className="body-secondary mb-8 max-w-lg mx-auto">
              Start collaborating with other community members to create your first event draft.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/graph"
                className="btn-primary inline-flex items-center gap-2 btn-hover"
              >
                🌊 EXPLORE GRAPH
              </a>
              <a
                href="/submit"
                className="btn-secondary inline-flex items-center gap-2"
              >
                👤 CREATE PROFILE
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen htw-section bg-gray-50">
      <div className="container-narrow">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-5xl mb-6">🗓️</div>
          <h1 className="section-headline mb-4">
            COLLABORATION EVENTS
          </h1>
          <p className="body-primary">
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
              className="htw-card group card-hover p-8"
            >
              {/* Event Header */}
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
                <div className="flex-1">
                  <h3 className="card-title-feature mb-3 group-hover:text-htw-primary transition-colors">
                    {event.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm">
                    {event.when && (
                      <span className="flex items-center gap-2 pill bg-htw-primary/20 text-htw-deep-sea">
                        📅 {event.when}
                      </span>
                    )}
                    {event.where && (
                      <span className="flex items-center gap-2 pill bg-htw-primary/20 text-htw-deep-sea">
                        📍 {event.where}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="badge-gray">
                    Created {new Date(event.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Members */}
              <div className="mb-6">
                <h4 className="card-title-compact mb-4 flex items-center gap-2">
                  🤝 COLLABORATION PARTNERS ({event.members.length})
                </h4>
                <div className="flex flex-wrap gap-3">
                  {event.members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center gap-3 bg-htw-primary/10 rounded-xl px-4 py-3 border border-htw-primary/20 hover:bg-htw-primary/20 transition-colors"
                    >
                      <div className="w-10 h-10 bg-gradient-htw-primary rounded-full flex items-center justify-center text-white font-bold">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-htw-deep-sea">
                          {member.name}
                        </div>
                        <div className="caption text-htw-primary font-medium">
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
                  <h4 className="card-title-compact mb-4 flex items-center gap-2">
                    📝 PROJECT DESCRIPTION
                  </h4>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <p className="body-secondary">
                      {event.description}
                    </p>
                  </div>
                </div>
              )}

              {/* Checklist */}
              {event.checklist.length > 0 && (
                <div className="mb-6">
                  <h4 className="card-title-compact mb-4 flex items-center gap-2">
                    ✅ ACTION ITEMS ({event.checklist.length})
                  </h4>
                  <div className="space-y-3">
                    {event.checklist.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group/item"
                      >
                        <div className="w-5 h-5 border-2 border-gray-400 rounded mt-1 flex-shrink-0 group-hover/item:border-green-500 transition-colors"></div>
                        <span className="body-secondary">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
                <button className="btn-primary flex-1 inline-flex items-center justify-center gap-2 btn-hover">
                  📝 EDIT DETAILS
                </button>
                <button className="btn-secondary flex-1 inline-flex items-center justify-center gap-2">
                  ✅ MARK COMPLETE
                </button>
                <button className="px-6 inline-flex items-center justify-center gap-2 text-gray-600 hover:text-htw-primary transition-colors">
                  📤 SHARE
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="mt-16 htw-card bg-gradient-to-r from-htw-primary/5 to-htw-tech-blue/5 border-htw-primary/20 text-center p-8">
          <div className="text-4xl mb-4">🚀</div>
          <h3 className="card-title-feature mb-4">
            READY TO CREATE MORE COLLABORATIONS?
          </h3>
          <p className="body-secondary mb-6 max-w-2xl mx-auto">
            The community is growing every day. Jump back into the interest graph to discover new collaboration opportunities!
          </p>
          <a
            href="/graph"
            className="btn-primary inline-flex items-center gap-2 btn-hover"
          >
            🌊 BACK TO INTEREST GRAPH
          </a>
        </div>
      </div>
    </div>
  );
}