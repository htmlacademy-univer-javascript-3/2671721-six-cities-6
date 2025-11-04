import { FC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Path } from '../../const.ts';

export const ProtectedRoute: FC = () => {
  const isAuthenticated = false;
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={Path.LOGIN} state={{ from: location }} replace />;
  }

  return <Outlet />;
};
