import { FC } from 'react';
import { Header } from '../../components/header/header';
import { MainContent } from '../../components/main-content/main-content';

interface IMainProps {
}

export const Main: FC<IMainProps> = () => (
  <div className="page page--gray page--main">
    <Header />
    <MainContent />
  </div>
);
