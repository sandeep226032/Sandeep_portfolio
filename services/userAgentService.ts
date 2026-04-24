

import {UAParser} from 'ua-parser-js';

export function parseUserAgent(userAgent: string) {
  // Always use the constructor pattern for UAParser
  const parser = new UAParser(userAgent);
  const result = parser.getResult();
  return {
    browser: result.browser?.name || null,
    os: result.os?.name || null,
    deviceType: result.device?.type || 'desktop',
  };
}

