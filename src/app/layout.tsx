import React from 'react';
import { LayoutProps } from './types';
import type { Metadata } from 'next';
import '../index.css';
import { GlobalLayout } from 'shared';

export const metadata: Metadata = {
  title: 'REST API',
  description: '',
  icons: '/icon/rest.png',
};

const RootLayout = ({ children }: LayoutProps) => {
  return (
    <html lang="en">
      <body>
        <GlobalLayout>{children}</GlobalLayout>
      </body>
    </html>
  );
};

export default RootLayout;
