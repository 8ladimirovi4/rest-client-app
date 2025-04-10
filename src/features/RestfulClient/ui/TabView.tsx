'use client';
import { useState } from 'react';
import { TabViewProps } from '../types';
import { Tab } from './Tab';

export const TabView = ({ tabs }: TabViewProps) => {
  const [activeTab, setActiveTab] = useState(tabs[0].label); // по умолчанию активен первый таб

  return (
    <>
      <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center"
          role="tablist"
        >
          {tabs.map((tab) => (
            <Tab
              key={tab.label}
              label={tab.label}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          ))}
        </ul>
      </div>
      <div id="default-styled-tab-content">
        {tabs.map((tab) => {
          return (
            <div
              key={tab.label}
              className={`p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${activeTab !== tab.label ? 'hidden' : ''}`}
              id={`styled-${tab.label}`}
              role="tabpanel"
              aria-labelledby={`${tab.label}-tab`}
            >
              {tab.content}
            </div>
          );
        })}
      </div>
    </>
  );
};

TabView.displayName = 'TabView';
