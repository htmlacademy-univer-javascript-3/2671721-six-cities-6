import { render, screen } from '@testing-library/react';
import { Spinner } from './spinner';

describe('Spinner Component', () => {
  it('should render loading text', () => {
    render(<Spinner />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });
});
