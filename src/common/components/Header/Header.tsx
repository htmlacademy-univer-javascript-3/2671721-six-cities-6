import { FC } from 'react';

interface IHeaderProps {
  isLogin: boolean;
}

export const Header: FC<IHeaderProps> = ({ isLogin }) => (
  <header className="header">
    <div className="container">
      <div className="header__wrapper">
        <div className="header__left">
          <a className="header__logo-link" href="main.html">
            <img
              className="header__logo" src="img/logo.svg" alt="6 cities logo"
              width="81" height="41"
            />
          </a>
        </div>
        {isLogin && (
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <a
                  className="header__nav-link header__nav-link--profile" href="#"
                >
                  <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                  <span className="header__user-name user__name">
                    Oliver.conner@gmail.com
                  </span>
                  <span className="header__favorite-count">3</span>
                </a>
              </li>
              <li className="header__nav-item">
                <a className="header__nav-link" href="#">
                  <span className="header__signout">{isLogin ? 'Sign out' : 'Sign in'}</span>
                </a>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  </header>
);
