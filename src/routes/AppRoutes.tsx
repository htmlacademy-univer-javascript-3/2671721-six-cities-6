import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Main } from '../pages/Main/Main.tsx';
import { Login } from '../pages/Login/Login.tsx';
import { Offer } from '../pages/Offer/Offer.tsx';
import {
  ProtectedRoute
} from '../common/components/ProtectedRoute/ProtectedRoute.tsx';
import { Favorites } from '../pages/Favorites/Favorites.tsx';
import { NotFound } from '../pages/NotFound/NotFound.tsx';
import { Path } from '../common/const.ts';
import { Layout } from '../common/components/Layout/Layout.tsx';

interface IAppRoutesProps {
}

export const AppRoutes: FC<IAppRoutesProps> = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route index element={<Main />} />
      <Route path={Path.LOGIN} element={<Login />} />
      <Route path={`${Path.OFFER}/:id`} element={<Offer />}/>
      <Route element={<ProtectedRoute />}>
        <Route path={Path.FAVORITES} element={<Favorites />}/>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);
