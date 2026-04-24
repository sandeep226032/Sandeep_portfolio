import { NextRequest, NextResponse } from 'next/server';
import { getAnalyticsData } from '../../../services/analyticsService';

export async function GET(req: NextRequest) {
  // Admin ID check (from env and url param)
  const url = new URL(req.url!);
  const adminId = url.searchParams.get('id');
  const allowedId = process.env.ADMIN_DASHBOARD_ID;
  if (!adminId || adminId !== allowedId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const data = await getAnalyticsData();
  return NextResponse.json(data);
}
