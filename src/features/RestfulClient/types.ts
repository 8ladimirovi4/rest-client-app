export interface TabProps {
  label: string;
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export type TabViewProps = {
    tabs: {
      label: string;
      content: React.ReactNode;
    }[];
  };