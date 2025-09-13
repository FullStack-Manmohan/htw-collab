'use client';

import { useEffect, useState } from 'react';
import { getKPIs, KPIs } from '../lib/kpis';

export default function HeaderKPIs() {
  const [kpis, setKpis] = useState<KPIs>({ profilesCount: 0, eventsCount: 0 });

  useEffect(() => {
    // Update KPIs on mount
    setKpis(getKPIs());

    // Set up interval to refresh KPIs
    const interval = setInterval(() => {
      setKpis(getKPIs());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-6 text-white/90">
      <div className="flex items-center gap-2">
        <span className="text-2xl">🌺</span>
        <span className="font-semibold">Profiles: {kpis.profilesCount}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-2xl">🤝</span>
        <span className="font-semibold">Events: {kpis.eventsCount}</span>
      </div>
    </div>
  );
}