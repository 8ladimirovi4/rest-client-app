export enum HttpMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
  OPTIONS = 'OPTIONS',
  HEAD = 'HEAD',
}

export const METHODS = [
  { id: '1', label: 'GET', value: HttpMethods.GET },
  { id: '2', label: 'POST', value: HttpMethods.POST },
  { id: '3', label: 'PUT', value: HttpMethods.PUT },
  {
    id: '4',
    label: 'DELETE',
    value: HttpMethods.DELETE,
  },
  { id: '5', label: 'PATCH', value: HttpMethods.PATCH },
  { id: '7', label: 'OPRIONS', value: HttpMethods.OPTIONS },
  { id: '8', label: 'HEAD', value: HttpMethods.HEAD },
];
