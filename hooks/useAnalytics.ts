import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const COOKIE_KEY = 'cookie_consent_analytics';
const VISITOR_KEY = 'visitor_uuid';

export function useAnalytics() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const consent = localStorage.getItem(COOKIE_KEY);
    if (consent !== 'granted') return;

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
    });
  }, []);
}
