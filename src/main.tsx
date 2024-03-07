import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@/provider/theme-provider';

import './index.css';

import Routes from './routes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes />
    </ThemeProvider>
  </React.StrictMode>
);
