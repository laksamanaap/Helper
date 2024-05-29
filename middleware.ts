
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;    
  if (accessToken) {

    // Clone the request headers and add the Authorization header
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('Authorization', `Bearer ${accessToken}`);

    // Clone the request and set the new headers
    const modifiedRequest = new Request(request, {
      headers: requestHeaders,
    });

    return NextResponse.next({
      request: modifiedRequest,
    });
  } else {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}

// Protected Routes
export const config = {
    // Adjust it to your route
    matcher: ['/'],
};
