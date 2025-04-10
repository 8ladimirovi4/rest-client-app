export interface TabProps {
  label: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}
export interface TabViewProps {
  tabs: {
    label: string;
    content: React.ReactNode;
  }[];
}

export type QueryParam = {
  key: string;
  value: string;
};

export type VariableType = QueryParam;
export type HeadersType = QueryParam;

export interface QueryTabProps {
  setQueryParams: React.Dispatch<React.SetStateAction<QueryParam[]>>;
  queryParams: QueryParam[];
}


