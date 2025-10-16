import { FC } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { IOffer, IPlaceCard, IReview } from './common/types.ts';
import { Provider } from 'react-redux';
import { store } from './store';
import { AppRoutes } from './routes/AppRoutes.tsx';

interface IAppProps {
  placeCardArray: IPlaceCard[];
  offer: IOffer;
  reviewArray: IReview[];
}

export const App: FC<IAppProps> = ({ placeCardArray, offer, reviewArray }) => (
  <Provider store={store}>
    <BrowserRouter>
      <AppRoutes placeCardArray={placeCardArray} offer={offer} reviewArray={reviewArray} />
    </BrowserRouter>
  </Provider>
);
