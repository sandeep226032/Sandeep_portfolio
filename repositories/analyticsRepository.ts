import pool from '../lib/db';

export async function getTotalVisitors() {
  const [rows] = await pool.query('SELECT COUNT(*) as count FROM visitors');
  return (rows as any)[0]?.count || 0;
}

export async function getUniqueVisitorsToday() {
  const [rows] = await pool.query("SELECT COUNT(*) as count FROM visitors WHERE DATE(first_visit) = CURDATE()");
  return (rows as any)[0]?.count || 0;
}

export async function getTopPages() {
  const [rows] = await pool.query("SELECT page_path, COUNT(*) as views FROM page_views GROUP BY page_path ORDER BY views DESC LIMIT 10");
  return rows as any[];
}

export async function getDeviceSpread() {
  const [rows] = await pool.query("SELECT device_type, COUNT(*) as count FROM visitors GROUP BY device_type");
  return rows as any[];
}

export async function getBrowserSpread() {
  const [rows] = await pool.query("SELECT browser, COUNT(*) as count FROM visitors GROUP BY browser");
  return rows as any[];
}

export async function getCountrySpread() {
  const [rows] = await pool.query("SELECT country, COUNT(*) as count FROM visitors GROUP BY country");
  return rows as any[];
}

export async function getPageViewsOverTime(days: number) {
  const [rows] = await pool.query(`
    SELECT DATE(visited_at) as date, COUNT(*) as views
    FROM page_views
    WHERE visited_at >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
    GROUP BY DATE(visited_at)
    ORDER BY date ASC
  `, [days]);
  return rows as any[];
}
