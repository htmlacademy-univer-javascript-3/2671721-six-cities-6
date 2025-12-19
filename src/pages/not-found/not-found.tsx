import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Path } from '../../common/utils/const';

export const NotFound: FC = () => (
  <div>
    <h1>404 Not Found</h1>
    <Link to={Path.MAIN}>Go to main page</Link>
  </div>
);
