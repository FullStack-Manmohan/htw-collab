import { getProfiles, getEvents } from './store';

export interface KPIs {
  profilesCount: number;
  eventsCount: number;
}

export function getKPIs(): KPIs {
  return {
    profilesCount: getProfiles().length,
    eventsCount: getEvents().length
  };
}