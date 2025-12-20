import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Main } from '../../pages/main/main';
import { Login } from '../../pages/login/login';
import { Offer } from '../../pages/offer/offer';
import {
  ProtectedRoute
} from '../protected-route/protected-route';
import { Favorites } from '../../pages/favorites/favorites';
import { NotFound } from '../../pages/not-found/not-found';
import { Path } from '../../utils/const';
import { Layout } from '../layout/layout';

interface IAppRoutesProps {
}

export const AppRoutes: FC<IAppRoutesProps> = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route index element={<Main />} />
      <Route path={Path.Login} element={<Login />} />
      <Route path={`${Path.Offer}/:id`} element={<Offer />}/>
      <Route element={<ProtectedRoute />}>
        <Route path={Path.Favorites} element={<Favorites />}/>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);
