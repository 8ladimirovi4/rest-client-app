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
