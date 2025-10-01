import { FC } from 'react';
import { Link } from 'react-router-dom';

export const NotFound: FC = () => (
  <div>
    <h1>404 Not Found</h1>
    <Link to="/">Go to main page</Link>
  </div>
);
