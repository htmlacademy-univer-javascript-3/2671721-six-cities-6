import { FC, FormEvent, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { login } from '../../store/user/user-api-actions';
import { isValidPassword } from '../../utils/utils';
import { getIsUserError } from '../../store/user/user-selectors';
import { setUserError } from '../../store/user/user-actions';

interface ILoginFormProps {
}

export const LoginForm: FC<ILoginFormProps> = () => {
  const dispatch = useAppDispatch();
  const isUserError = useAppSelector(getIsUserError);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setError] = useState(false);

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isValidPassword(password)) {
      setError(false);
      dispatch(login({email: email, password: password}));
    } else {
      setError(true);
    }
  };

  useEffect(() => () => {
    dispatch(setUserError(false));
  }, [dispatch]);

  return (
    <form className="login__form form" onSubmit={handleLogin}>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input
          className="login__input form__input"
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input
          className="login__input form__input"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      {isError && (
        <p>Password must contain 1 letter and 1 number</p>
      )}
      {isUserError && (
        <p>Error login!</p>
      )}
      <button className="login__submit form__submit button" type="submit">Sign
        in
      </button>
    </form>
  );
};
