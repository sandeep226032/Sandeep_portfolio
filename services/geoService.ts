// Service to get geo-location from IP using ip-api.com
export async function getGeoLocationFromIP(ip: string) {
  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,city`);
    const data = await res.json();
    if (data.status === 'success') {
      return { country: data.country, city: data.city };
    }
    return null;
  } catch (e) {
    return null;
  }
}
