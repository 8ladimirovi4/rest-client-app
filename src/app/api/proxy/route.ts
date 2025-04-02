import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const apiUrl = searchParams.get('url'); // API-адрес берётся из параметра запроса

  if (!apiUrl) {
    return NextResponse.json(
      { error: 'Missing "url" parameter' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
    });

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch data', details: error },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const apiUrl = searchParams.get('url');

  if (!apiUrl) {
    return NextResponse.json(
      { error: 'Missing "url" parameter' },
      { status: 400 }
    );
  }

  try {
    const requestBody = await request.json();
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.API_TOKEN}`,
      },
      body: JSON.stringify(requestBody),
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch data', details: error },
      { status: 500 }
    );
  }
}
