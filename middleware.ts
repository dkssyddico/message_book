import { NextResponse, userAgent } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { isBot } = userAgent(req);
  if (isBot) {
    return new Response('봇 사용 금지', { status: 403 });
  }
}
