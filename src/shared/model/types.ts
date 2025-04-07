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

type Headers = Query;

type Variables = Query;

export interface ApiRequestState {
  query: Query[];
  body: string;
  method: string;
  headers: Headers[];
  variables: Variables[];
  textMode: boolean;
  status: string;
  id: string;
  browserUrl: string;
}
