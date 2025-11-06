import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Path } from '../../const.ts';
import { useAppDispatch, useAppSelector } from '../../../store/hooks.ts';
import { logout } from '../../../store/api-actions.ts';

interface IHeaderProps {
}

export const Header: FC<IHeaderProps> = () => {
  const isAuthenticated = useAppSelector((state) => state.authorizationStatus);
  const userData = useAppSelector((state) => state.userData);
  const dispatch = useAppDispatch();

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to={Path.MAIN}>
              <img
                className="header__logo" src="img/logo.svg" alt="6 cities logo"
                width="81" height="41"
              />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {isAuthenticated && (
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to={Path.FAVORITES}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">
                      {userData?.email}
                    </span>
                    <span className="header__favorite-count">3</span>
                  </Link>
                </li>
              )}
              <li className="header__nav-item">
                <Link
                  className="header__nav-link"
                  to={isAuthenticated ? Path.MAIN : Path.LOGIN}
                  onClick={isAuthenticated ? () => dispatch(logout()) : undefined}
                >
                  <span className="header__signout">{isAuthenticated ? 'Sign out' : 'Sign in'}</span>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
