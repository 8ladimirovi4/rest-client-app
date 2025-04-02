//@ts-nocheck
export const apiRequest = async ({
  resComplite,
  catchComplite,
  finnalyComplite,
  browserUrl,
  method = 'GET',
  query = [],
  body = null,
  headers = [],
}) => {
  try {
    const queryString = query.length
      ? `?${query
          .map((param) => {
            const { key, value } = param;
            return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
          })
          .join('&')}`
      : '';
    const fullUrl = `${browserUrl}${queryString}`;

    const headersObject = headers.reduce((acc, header) => {
      const [key, value] = Object.entries(header)[0];
      acc[key] = value;
      return acc;
    }, {});

    const options = {
      method: method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...headersObject,
      },
    };

    if (body && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      //options.body = JSON.stringify(body);
      options.body = body;
    }

    const response = await fetch(fullUrl, options);
    resComplite(response);
    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    catchComplite(error);
  } finally {
    finnalyComplite();
  }
};
