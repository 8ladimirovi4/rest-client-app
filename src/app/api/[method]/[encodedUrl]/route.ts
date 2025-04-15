import { NextRequest, NextResponse } from 'next/server';

export async function handler(
  request: NextRequest,
  {
    params,
  }: {
    params: { method: string; encodedUrl: string };
  }
) {
  const { method, encodedUrl } = params;
  const decodedMethod = method.toUpperCase() as
    | 'GET'
    | 'POST'
    | 'PUT'
    | 'DELETE'
    | 'PATCH'
    | 'OPTIONS'
    | 'HEAD';

  const apiUrl = atob(decodeURIComponent(encodedUrl));
  console.log('===> apiUrl', apiUrl);

  if (!apiUrl) {
    return NextResponse.json(
      { error: 'Missing or invalid encoded URL' },
      { status: 400 }
    );
  }

  try {
    let body: BodyInit | null = null;

    if (!['GET', 'DELETE', 'OPTIONS', 'HEAD'].includes(decodedMethod)) {
      const contentType = request.headers.get('Content-Type') || '';
      if (contentType.includes('application/json')) {
        body = JSON.stringify(await request.json());
      } else {
        body = await request.text();
      }
    }

    const response = await fetch(apiUrl, {
      method: decodedMethod,
      headers: request.headers,
      body,
    });

    if (decodedMethod === 'HEAD') {
      return new NextResponse(null, {
        status: response.status,
        headers: response.headers,
      });
    }

    if (decodedMethod === 'OPTIONS') {
      return new NextResponse(null, {
        status: 204,
        headers: {
          Allow: 'GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods':
            'GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });
    }

    const text = await response.text();

    try {
      const json = JSON.parse(text);
      return NextResponse.json(json, { status: response.status });
    } catch {
      return new NextResponse(text, {
        status: response.status,
        headers: { 'Content-Type': 'text/plain' },
      });
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch data', details: `${error}` },
      { status: 500 }
    );
  }
}

export { handler as GET };
export { handler as POST };
export { handler as PUT };
export { handler as DELETE };
export { handler as PATCH };
export { handler as OPTIONS };
export { handler as HEAD };