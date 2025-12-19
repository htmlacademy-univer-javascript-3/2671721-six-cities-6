import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Main } from '../pages/main/main';
import { Login } from '../pages/login/login';
import { Offer } from '../pages/offer/offer';
import {
  ProtectedRoute
} from '../common/components/protected-route/protected-route';
import { Favorites } from '../pages/favorites/favorites';
import { NotFound } from '../pages/not-found/not-found';
import { Path } from '../common/utils/const';
import { Layout } from '../common/components/layout/layout';

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
