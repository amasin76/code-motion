import React from 'react';
import ReactDOM from 'react-dom/client';
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from '@/provider/theme-provider';

import './index.css';

import Routes from './routes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes />
      <Analytics />
    </ThemeProvider>
  </React.StrictMode>,
);
