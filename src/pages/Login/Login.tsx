import { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Path } from '../../common/utils/const.ts';
import { useAppSelector } from '../../store/hooks.ts';
import { getAuthorizationStatus } from '../../store/user/user-selectors.ts';
import { Header } from '../../common/components/Header/Header.tsx';
import { LoginForm } from '../../common/components/LoginForm/LoginForm.tsx';

interface ILoginProps {
}

export const Login: FC<ILoginProps> = () => {
  const location = useLocation();
  const isAuthenticated = useAppSelector(getAuthorizationStatus);

  if (isAuthenticated) {
    return <Navigate to={Path.MAIN} state={{ from: location }} replace />;
  }

  return (
    <div className="page page--gray page--login">
      <Header />

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <LoginForm />
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
