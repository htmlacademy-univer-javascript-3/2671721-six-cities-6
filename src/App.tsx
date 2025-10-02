import { FC } from 'react';
import { Main } from './pages/Main/Main.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Favorites } from './pages/Favorites/Favorites.tsx';
import { Login } from './pages/Login/Login.tsx';
import { Offer } from './pages/Offer/Offer.tsx';
import { NotFound } from './pages/NotFound/NotFound.tsx';
import { ProtectedRoute } from './common/components/ProtectedRoute/ProtectedRoute.tsx';
import { IOffer, IPlaceCard, IReview } from './common/types.ts';

interface IAppProps {
  placeCardArray: IPlaceCard[];
  offer: IOffer;
  reviewArray: IReview[];
}

export const App: FC<IAppProps> = ({ placeCardArray, offer, reviewArray }) => (
  <BrowserRouter>
    <Routes>
      <Route index element={<Main placeCardArray={placeCardArray} />} />
      <Route path="login" element={<Login />} />
      <Route path="offer/:id" element={
        <Offer
          placeCardArray={placeCardArray}
          offer={offer}
          reviewArray={reviewArray}
        />
      }
      />
      <Route element={<ProtectedRoute />}>
        <Route path="favorites" element={<Favorites placeCardArray={placeCardArray} />}/>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
