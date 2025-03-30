'use client'
import { TabProps } from "../types";

export const Tab = ({ label, activeTab, setActiveTab }: TabProps) => {
    return (
      <li role="presentation">
        <button
         className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === label ? 'text-blue-700 border-blue-700' : 'text-gray-500 hover:text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:text-gray-300'}`}
          onClick={() => setActiveTab(label)}
          role="tab"
          aria-controls={`styled-${label}`}
          aria-selected={activeTab === label}
        >
          {label}
        </button>
      </li>
    );
  };

  Tab.displayName = 'Tab'