import { getTotalVisitors, getUniqueVisitorsToday, getTopPages, getDeviceSpread, getBrowserSpread, getCountrySpread, getPageViewsOverTime } from '../repositories/analyticsRepository';

export async function getAnalyticsData() {
  const [totalVisitors, uniqueToday, topPages, deviceSpread, browserSpread, countrySpread, pageViewsOverTime] = await Promise.all([
    getTotalVisitors(),
    getUniqueVisitorsToday(),
    getTopPages(),
    getDeviceSpread(),
    getBrowserSpread(),
    getCountrySpread(),
    getPageViewsOverTime(30), // last 30 days
  ]);
  return {
    totalVisitors,
    uniqueToday,
    topPages,
    deviceSpread,
    browserSpread,
    countrySpread,
    pageViewsOverTime,
  };
}
