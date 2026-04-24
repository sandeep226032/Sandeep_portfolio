
'use client';
import { useState, useEffect } from 'react';

const COOKIE_KEY = 'cookie_consent_analytics';

export default function CookieConsent({ onConsent }: { onConsent?: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_KEY);
    if (!consent) setVisible(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_KEY, 'granted');
    setVisible(false);
    if (onConsent) onConsent();
  };

  if (!visible) return null;

  return (
    <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: '#222', color: '#fff', padding: '1rem', zIndex: 1000, textAlign: 'center' }}>
      This site uses cookies for analytics. By continuing, you consent to tracking as described in our privacy policy.
      <button onClick={handleAccept} style={{ marginLeft: 16, padding: '0.5rem 1rem', background: '#fff', color: '#222', border: 'none', borderRadius: 4, cursor: 'pointer' }}>
        Accept
      </button>
    </div>
  );
}
