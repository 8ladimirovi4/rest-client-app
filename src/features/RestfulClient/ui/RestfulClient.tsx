'use client'
import React from 'react';
import { TabView } from './TabView';
import styles from './styles.module.css'
import Search from './Search';

export const RestfulClient = () => {

  return (
    <div className={styles["restful-wrapper"]}>
    <Search/>
    <div className={styles["restful-wrapper_tabview-container"]}>
    <TabView
      tabs={[
        {
          label: 'QYERY',
          content: <p>This is the Profile tab content.</p>,
        },
        {
          label: 'BODY',
          content: <p>This is the Dashboard tab content.</p>,
        },
        {
          label: 'HEADERS',
          content: <p>This is the Settings tab content.</p>,
        },
        {
          label: 'VARIABLES',
          content: <p>This is the Contacts tab content.</p>,
        },
      ]}
    />
    </div>
    </div>
  );
};

RestfulClient.displayName = 'RestfulClient';
