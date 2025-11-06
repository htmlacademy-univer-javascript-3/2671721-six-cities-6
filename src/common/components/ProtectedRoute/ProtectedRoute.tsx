import { FC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Path } from '../../const.ts';
import { useAppSelector } from '../../../store/hooks.ts';

export const ProtectedRoute: FC = () => {
  const isAuthenticated = useAppSelector((state) => state.authorizationStatus);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={Path.LOGIN} state={{ from: location }} replace />;
  }

  return <Outlet />;
};
