export interface AlertState {
  show: boolean;
}

interface Lang {
  id: string;
  value: string;
}

export interface LangState {
  lang: string;
  langs: Lang[];
}
