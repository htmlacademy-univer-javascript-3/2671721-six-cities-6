import { FC } from 'react';
import { Header } from '../../common/components/Header/Header.tsx';
import { MainContent } from '../../common/widgets/MainContent/MainContent.tsx';

interface IMainProps {
}

export const Main: FC<IMainProps> = () => (
  <div className="page page--gray page--main">
    <Header />
    <MainContent />
  </div>
);
