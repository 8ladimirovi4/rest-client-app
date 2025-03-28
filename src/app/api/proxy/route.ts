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
        Authorization: `Bearer ${process.env.API_TOKEN}`, // Пример передачи токена
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
