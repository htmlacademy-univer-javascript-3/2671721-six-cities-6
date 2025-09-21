import { FC } from 'react';
import { Main } from './pages/Main/Main.tsx';

interface IAppProps {
  offersCount: number;
}

export const App: FC<IAppProps> = ({ offersCount }) => (
  <Main offersCount={offersCount} />
);
