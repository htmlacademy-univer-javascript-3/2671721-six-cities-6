import { FC, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../store/hooks.ts';
import { login } from '../../../store/user/user-api-actions.ts';
import { Path } from '../../const.ts';

interface ILoginFormProps {
}

export const LoginForm: FC<ILoginFormProps> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(login({email: email, password: password})).then(() => {
      navigate(Path.MAIN);
    });
  };

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
      <button className="login__submit form__submit button" type="submit">Sign
        in
      </button>
    </form>
  );
};
