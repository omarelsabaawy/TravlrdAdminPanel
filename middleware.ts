import { NextResponse, NextRequest } from 'next/server';

export default function middleware(request: NextRequest) {
  const user = request.cookies.get('userData');

  if (user && request.url.includes("/signin")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!user && !request.url.includes("/signin")) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }
  
}

export const config = {
    matcher: [
        '/',
        '/signin'
    ]
}
