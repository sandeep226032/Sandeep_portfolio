
import pool from '../lib/db';

// Define a type for a visitor row
export interface VisitorRow {
  id: number;
  visitor_uuid: string;
  country?: string | null;
  city?: string | null;
  browser?: string | null;
  os?: string | null;
  device_type?: string | null;
  first_visit?: Date | string;
}


export async function findVisitorByUUID(visitorUUID: string): Promise<VisitorRow | null> {
  const [rows] = await pool.query(
    'SELECT * FROM visitors WHERE visitor_uuid = ? LIMIT 1',
    [visitorUUID]
  );
  if (Array.isArray(rows) && rows.length > 0) {
    return rows[0] as VisitorRow;
  }
  return null;
}

export async function createVisitor({
  visitorUUID,
  country,
  city,
  browser,
  os,
  deviceType
}: {
  visitorUUID: string;
  country?: string | null;
  city?: string | null;
  browser?: string | null;
  os?: string | null;
  deviceType?: string | null;
}): Promise<VisitorRow | null> {
  const [result] = await pool.query(
    `INSERT INTO visitors (visitor_uuid, country, city, browser, os, device_type) VALUES (?, ?, ?, ?, ?, ?)`,
    [visitorUUID, country, city, browser, os, deviceType]
  );
  // Get the inserted visitor
  const [rows] = await pool.query(
    'SELECT * FROM visitors WHERE id = ?',
    [(result as any).insertId]
  );
  if (Array.isArray(rows) && rows.length > 0) {
    return rows[0] as VisitorRow;
  }
  return null;
}

export async function createPageView({
  visitorId,
  pagePath
}: {
  visitorId: number;
  pagePath: string;
}) {
  await pool.query(
    `INSERT INTO page_views (visitor_id, page_path) VALUES (?, ?)`,
    [visitorId, pagePath]
  );
}
