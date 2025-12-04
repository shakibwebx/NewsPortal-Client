import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Middleware runs on server side, can't access localStorage
  // We'll handle auth protection on client side instead
  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: '/admin/:path*',
};
