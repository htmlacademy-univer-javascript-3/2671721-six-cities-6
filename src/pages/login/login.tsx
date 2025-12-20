import { FC, useMemo } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Path } from '../../utils/const';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { getAuthorizationStatus } from '../../store/user/user-selectors';
import { Header } from '../../components/header/header';
import { LoginForm } from '../../components/login-form/login-form';
import { getRandomCity } from '../../utils/utils';
import { setActiveCity } from '../../store/offers/offers-actions';

interface ILoginProps {
}

export const Login: FC<ILoginProps> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useAppSelector(getAuthorizationStatus);
  const city = useMemo(() => getRandomCity(), []);

  const handleCityClick = () => {
    dispatch(setActiveCity(city));
    navigate('/');
  };

  if (isAuthenticated) {
    return <Navigate to={Path.Main} state={{ from: location }} replace />;
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
              <a
                className="locations__item-link"
                href="#"
                onClick={handleCityClick}
              >
                <span>{city}</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
