import { FC, useEffect } from 'react';
import { useAppDispatch } from '../../../store/hooks.ts';
import { Outlet } from 'react-router-dom';
import {
  checkAuthorizationStatus
} from '../../../store/user/user-api-actions.ts';

export const Layout: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuthorizationStatus());
  }, [dispatch]);

  return (
    <Outlet />
  );
};
