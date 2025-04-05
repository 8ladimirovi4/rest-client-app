import { NextRequest, NextResponse } from 'next/server';

async function proxyRequest(
  request: NextRequest,
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS' | 'HEAD'
) {
  const searchParams = request.nextUrl.searchParams;
  const apiUrl = searchParams.get('url');

  if (!apiUrl) {
    return NextResponse.json(
      { error: 'Missing "url" parameter' },
      { status: 400 }
    );
  }

  try {
    let body = null;
    if (!['GET', 'DELETE', 'OPTIONS', 'HEAD'].includes(method)) {
      if (request.headers.get('Content-Type')?.includes('application/json')) {
        body = JSON.stringify(await request.json());
      } else {
        body = await request.text();
      }
    }

    const response = await fetch(apiUrl, {
      method,
      headers: request.headers,
      body,
    });

    if (method === 'HEAD') {
      return new NextResponse(null, {
        status: response.status,
        headers: response.headers,
      });
    }

    if (method === 'OPTIONS') {
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

    let data = null;
    const text = await response.text(); 

    try {
      data = JSON.parse(text);
    } catch (error) {
        return NextResponse.json(
        { error: 'Invalid JSON response', details: `${error}` },
        { status: response.status }
      );
    }
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch data', details: `${error}` },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return proxyRequest(request, 'GET');
}

export async function POST(request: NextRequest) {
  return proxyRequest(request, 'POST');
}

export async function PUT(request: NextRequest) {
  return proxyRequest(request, 'PUT');
}

export async function DELETE(request: NextRequest) {
  return proxyRequest(request, 'DELETE');
}

export async function PATCH(request: NextRequest) {
  return proxyRequest(request, 'PATCH');
}

export async function OPTIONS(request: NextRequest) {
  return proxyRequest(request, 'OPTIONS');
}

export async function HEAD(request: NextRequest) {
  return proxyRequest(request, 'HEAD');
}
