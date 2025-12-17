import { FC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Path } from '../../utils/const.ts';
import { useAppSelector } from '../../../store/hooks.ts';
import { getAuthorizationStatus } from '../../../store/user/user-selectors.ts';

export const ProtectedRoute: FC = () => {
  const isAuthenticated = useAppSelector(getAuthorizationStatus);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to={Path.LOGIN} state={{ from: location }} replace />;
  }

  return <Outlet />;
};
