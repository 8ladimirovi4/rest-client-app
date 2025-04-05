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

    const headersObject = headers.reduce((acc, header) => {
      const { key, value } = header;
      if (key) acc[key] = value;
      return acc;
    }, {});

    const normalizedHeaders = Object.keys(headersObject).map((key) =>
      key.toLowerCase()
    );

    const fullUrl = `${browserUrl}${queryString}`;
    const encodedUrl = encodeURIComponent(btoa(fullUrl));

    const contentType = normalizedHeaders.includes('content-type')
      ? {}
      : { 'Content-Type': 'application/json' };

    const options = {
      method: method || 'GET',
      headers: {
        ...contentType,
        ...headersObject,
      },
    };

    if (method === 'POST' || method === 'PUT' || method === 'PATCH') {
      options.body = body || '{}';
    }

    const response = await fetch(`/api/proxy?url=${encodedUrl}`, options);
    resComplite(response);

    const data = await response.json();
    return data;
  } catch (error) {
    catchComplite(error);
  } finally {
    finnalyComplite();
  }
};
