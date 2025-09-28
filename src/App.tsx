import { FC } from 'react';
import { Main } from './pages/Main/Main.tsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Favorites } from './pages/Favorites/Favorites.tsx';
import { Login } from './pages/Login/Login.tsx';
import { Offer } from './pages/Offer/Offer.tsx';
import { NotFound } from './pages/NotFound/NotFound.tsx';
import { ProtectedRoute } from './common/components/ProtectedRoute/ProtectedRoute.tsx';

interface IAppProps {
  offersCount: number;
}

export const App: FC<IAppProps> = ({ offersCount }) => (
  <BrowserRouter>
    <Routes>
      <Route index element={<Main offersCount={offersCount} />} />
      <Route path="login" element={<Login />} />
      <Route path="offer/:id" element={<Offer />} />
      <Route element={<ProtectedRoute />}>
        <Route path="favorites" element={<Favorites />}/>
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);
