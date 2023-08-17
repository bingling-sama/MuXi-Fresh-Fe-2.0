import ReactDOM from 'react-dom/client';
import React from 'react';
import Router from './routes';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
);
