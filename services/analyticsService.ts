import { getTotalVisitors, getUniqueVisitorsToday, getTopPages, getDeviceSpread, getBrowserSpread, getCountrySpread, getPageViewsOverTime, getRecentDetailedViews } from '../repositories/analyticsRepository';

export async function getAnalyticsData() {
  const [totalVisitors, uniqueToday, topPages, deviceSpread, browserSpread, countrySpread, pageViewsOverTime, recentViews] = await Promise.all([
    getTotalVisitors(),
    getUniqueVisitorsToday(),
    getTopPages(),
    getDeviceSpread(),
    getBrowserSpread(),
    getCountrySpread(),
    getPageViewsOverTime(30), // last 30 days
    getRecentDetailedViews(50), // last 50 visits
  ]);
  return {
    totalVisitors,
    uniqueToday,
    topPages,
    deviceSpread,
    browserSpread,
    countrySpread,
    pageViewsOverTime,
    recentViews,
  };
}
