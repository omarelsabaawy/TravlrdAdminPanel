import { NextResponse, NextRequest } from 'next/server';

export default async function middleware(request: NextRequest) {
  const user = request.cookies.get('userData');

  if (!user && request.url.includes("rest-password")){
    return;
  }

  if (!user && request.url.includes("confirm-email")){
    return;
  }

  if (!user && request.url.includes("/admins")) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  if (!user && request.url.includes("/businesses")) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

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
    '/admins',
    '/businesses',
    '/settings',
    '/signin'
  ]
};
