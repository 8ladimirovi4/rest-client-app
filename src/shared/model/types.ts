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
