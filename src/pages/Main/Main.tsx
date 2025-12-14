import { FC } from 'react';
import { Header } from '../../common/components/Header/Header.tsx';
import { LocationList } from '../../common/widgets/LocationList/LocationList.tsx';
import { MainContent } from '../../common/widgets/MainContent/MainContent.tsx';

interface IMainProps {
}

export const Main: FC<IMainProps> = () => (
  <div className="page page--gray page--main">
    <Header />
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <LocationList />
      <MainContent />
    </main>
  </div>
);
