import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticate } from './src/lib/session';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;  
  const session = request.cookies.get('session');
  const isAuth = await isAuthenticate();

  if ((!isAuth || !session) && pathname !== '/') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    // '/',
  ],
};