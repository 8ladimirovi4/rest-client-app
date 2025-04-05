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

type QueryParam = {
  key: string;
  value: string;
};

export type Variable = QueryParam
export type Headers = QueryParam

export interface QueryTabProps {
  setQueryParams: React.Dispatch<React.SetStateAction<QueryParam[]>>;
  queryParams: QueryParam[];
}
