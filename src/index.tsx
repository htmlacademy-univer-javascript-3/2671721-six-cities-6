import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import { OFFER_COUNT } from './common/const.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offersCount={OFFER_COUNT} />
  </React.StrictMode>
);
