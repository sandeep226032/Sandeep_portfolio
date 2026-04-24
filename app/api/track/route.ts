import { NextRequest, NextResponse } from 'next/server';
import { trackVisitor } from '../../../services/trackService';

export async function POST(req: NextRequest) {
  try {
    const { visitorUUID, pagePath } = await req.json();
    // Get IP address
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      (req as any).ip ||
      (req as any).socket?.remoteAddress ||
      '';
    // Get user-agent
    const userAgent = req.headers.get('user-agent') || '';
    if (!visitorUUID || !pagePath) {
      return NextResponse.json({ error: 'Missing visitorUUID or pagePath' }, { status: 400 });
    }
    await trackVisitor({ visitorUUID, ip, userAgent, pagePath });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Server error', details: (error as Error).message }, { status: 500 });
  }
}
