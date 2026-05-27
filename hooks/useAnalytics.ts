import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const VISITOR_KEY = 'visitor_uuid';

export function useAnalytics() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let visitorUUID = localStorage.getItem(VISITOR_KEY);
    if (!visitorUUID) {
      visitorUUID = uuidv4();
      localStorage.setItem(VISITOR_KEY, visitorUUID);
    }

    const pagePath = window.location.pathname;
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ visitorUUID, pagePath })
    }).catch(() => {
      // Analytics should never interrupt the portfolio experience.
    });
  }, []);
}
