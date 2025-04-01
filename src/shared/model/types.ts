export interface AlertState {
  show: boolean;
}

interface Lang {
  id: string;
  value: string;
  label: string;
}

export interface LangState {
  lang: string;
  langs: Lang[];
}

export interface Route {
  id: string;
  value: string;
  label: string;
  type: string;
}

export interface RoutesState {
  routes: Route[];
  currentRoute: string;
}

type Query = {
  key: string;
  value: string;
};

type Headers = {
  ['key']: string;
};

type Variables = {
  ['key']: string;
};
export interface ApiRequestState {
  url: string;
  query: Query[];
  body: string;
  method: string;
  headers: Headers[];
  variables: Variables[];
  textMode: boolean;
  type: 'rest' | string;
  status: number | null;
  id: string;
  browserUrl: string;
  triggerFetch: boolean;
}
