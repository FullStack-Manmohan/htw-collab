import { Profile } from '../types/Profile';
import { CollabRequest } from '../types/Request';
import { EventDraft } from '../types/Event';
import { seedProfiles } from './seed';
import { generatedProfiles } from './generated-profiles';

// In-memory storage - combine seed profiles with generated profiles
let profiles: Profile[] = [...seedProfiles, ...generatedProfiles];
let requests: CollabRequest[] = [];
let events: EventDraft[] = [];

// Profile management
export function getProfiles(): Profile[] {
  return [...profiles];
}

export function addProfile(profile: Profile): void {
  profiles = [profile, ...profiles];
}

export function getProfileById(id: string): Profile | undefined {
  return profiles.find(p => p.id === id);
}

// Request management
export function getRequests(): CollabRequest[] {
  return [...requests];
}

export function getRequestsFor(userId: string): CollabRequest[] {
  return requests.filter(r => r.toId === userId || r.fromId === userId);
}

export function createRequest(request: CollabRequest): void {
  requests = [request, ...requests];
}

export function acceptRequest(requestId: string): void {
  const request = requests.find(r => r.id === requestId);
  if (!request) return;

  // Update request status
  request.status = 'accepted';

  // Get both profiles
  const fromProfile = getProfileById(request.fromId);
  const toProfile = getProfileById(request.toId);
  
  if (!fromProfile || !toProfile) return;

  // Auto-create event draft
  const eventDraft: EventDraft = {
    id: `event-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    title: `${fromProfile.name} & ${toProfile.name} Collaboration`,
    when: 'TBD - During Honolulu Tech Week',
    where: request.mode === 'Online' ? 'Online (Zoom/Meet)' : 'In-person (HTW)',
    description: `Collaboration between ${fromProfile.role} and ${toProfile.role} focusing on shared interests: ${getSharedInterests(fromProfile, toProfile).join(', ')}`,
    checklist: [
      'Define project scope and goals',
      'Set up communication channels',
      'Plan first milestone and timeline'
    ],
    members: [
      { id: fromProfile.id, name: fromProfile.name, role: fromProfile.role },
      { id: toProfile.id, name: toProfile.name, role: toProfile.role }
    ],
    createdAt: Date.now()
  };

  createEvent(eventDraft);
}

// Event management
export function getEvents(): EventDraft[] {
  return [...events];
}

export function createEvent(event: EventDraft): void {
  events = [event, ...events];
}

// Helper functions
function getSharedInterests(profile1: Profile, profile2: Profile): string[] {
  const set1 = new Set(profile1.interests);
  const set2 = new Set(profile2.interests);
  return [...set1].filter(interest => set2.has(interest));
}

// Get all unique interests from all profiles
export function getAllInterests(): string[] {
  const allInterests = new Set<string>();
  profiles.forEach(profile => {
    profile.interests.forEach(interest => allInterests.add(interest));
  });
  return Array.from(allInterests).sort();
}

// Get profiles by interest
export function getProfilesByInterest(interest: string): Profile[] {
  return profiles.filter(profile => 
    profile.interests.some(i => i.toLowerCase() === interest.toLowerCase())
  );
}