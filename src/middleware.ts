import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);

  headers.delete('x-my-header');
  headers.delete('Host');
  headers.delete('referer');
  headers.delete('x-forwarded-host');
  headers.delete('sec-fetch-site');
  headers.delete('sec-fetch-mode');
  headers.delete('sec-fetch-dest');
  headers.delete('sec-ch-ua');
  headers.delete('sec-ch-ua-mobile');
  headers.delete('sec-ch-ua-platform');
  headers.delete('Mycustomheader');
  headers.delete('x-my-header');
  headers.delete('accept-encoding');
  headers.delete('Cookie');
  headers.delete('Sec-Ch-Prefers-Color-Scheme');
  headers.delete('User-Agent');
  headers.delete('X-Forwarded-Host');
  headers.delete('Pragma');

  return NextResponse.next({
    request: {
      headers,
    },
  });
}

export const config = {
  matcher: ['/api/proxy/:path*'],
};
