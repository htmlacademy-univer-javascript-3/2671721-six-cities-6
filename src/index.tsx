import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './App.tsx';
import { OFFER, PLACE_CARD_ARRAY } from './mocks/offers.ts';
import { REVIEW_ARRAY } from './mocks/reviews.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App placeCardArray={PLACE_CARD_ARRAY} offer={OFFER} reviewArray={REVIEW_ARRAY} />
  </React.StrictMode>
);
