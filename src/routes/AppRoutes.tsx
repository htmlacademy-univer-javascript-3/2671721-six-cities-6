import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks.ts';
import { fillActiveCityPlaceCards } from '../store/action.ts';
import { IOffer, IPlaceCard, IReview } from '../common/types.ts';
import { Main } from '../pages/Main/Main.tsx';
import { Login } from '../pages/Login/Login.tsx';
import { Offer } from '../pages/Offer/Offer.tsx';
import {
  ProtectedRoute
} from '../common/components/ProtectedRoute/ProtectedRoute.tsx';
import { Favorites } from '../pages/Favorites/Favorites.tsx';
import { NotFound } from '../pages/NotFound/NotFound.tsx';

interface IAppRoutesProps {
  placeCardArray: IPlaceCard[];
  offer: IOffer;
  reviewArray: IReview[];
}

export const AppRoutes: FC<IAppRoutesProps> = ({ placeCardArray, offer, reviewArray }) => {
  const dispatch = useAppDispatch();
  dispatch(fillActiveCityPlaceCards(placeCardArray));

  return (
    <Routes>
      <Route index element={<Main />} />
      <Route path="login" element={<Login />} />
      <Route path="offer/:id" element={
        <Offer
          offer={offer}
          reviewArray={reviewArray}
        />
      }
      />
      <Route element={<ProtectedRoute />}>
        <Route path="favorites" element={<Favorites />}/>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
