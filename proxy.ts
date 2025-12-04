import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // Proxy runs on server side, can't access localStorage
  // We'll handle auth protection on client side instead
  return NextResponse.next();
}

// Configure which routes to run proxy on
export const config = {
  matcher: '/admin/:path*',
};
