import { FC, useEffect } from 'react';
import { useAppDispatch } from '../../../store/hooks.ts';
import { checkAuthorizationStatus } from '../../../store/api-actions.ts';
import { Outlet } from 'react-router-dom';

export const Layout: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthorizationStatus());
  }, [dispatch]);

  return (
    <Outlet />
  );
};
