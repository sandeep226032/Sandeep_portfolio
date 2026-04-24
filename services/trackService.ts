import { getGeoLocationFromIP } from './geoService';
import { parseUserAgent } from './userAgentService';
import { findVisitorByUUID, createVisitor, createPageView } from '../repositories/trackRepository';

export async function trackVisitor({
  visitorUUID,
  ip,
  userAgent,
  pagePath
}: {
  visitorUUID: string;
  ip: string;
  userAgent: string;
  pagePath: string;
}) {
  // 1. Get geo info (do not store IP)
  const geo = await getGeoLocationFromIP(ip);
  // 2. Parse user agent
  const ua = parseUserAgent(userAgent);
  // 3. Check if visitor exists
  let visitor = await findVisitorByUUID(visitorUUID);
  if (!visitor) {
    // 4. Create new visitor
    visitor = await createVisitor({
      visitorUUID,
      country: geo?.country || null,
      city: geo?.city || null,
      browser: ua.browser,
      os: ua.os,
      deviceType: ua.deviceType
    });
  }
  // 5. Log page view
  if (!visitor || !visitor.id) {
    throw new Error('Visitor record is missing or invalid.');
  }
  await createPageView({
    visitorId: visitor.id,
    pagePath
  });
  return { success: true };
}
