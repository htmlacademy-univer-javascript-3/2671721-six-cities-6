import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { NotFound } from './not-found';
import { Path } from '../../utils/const';

describe('NotFound Component', () => {
  it('should render 404 message and link to main page', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('404 Not Found');
  });

  it('should render link to main page', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    const link = screen.getByRole('link', { name: /go to main page/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', Path.Main);
    expect(link.tagName).toBe('A');
  });

  it('should have correct structure', () => {
    const { container } = render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );

    const divElement = container.firstChild;
    expect(divElement?.nodeName).toBe('DIV');

    expect(divElement?.firstChild?.nodeName).toBe('H1');
    expect(divElement?.lastChild?.nodeName).toBe('A');
  });
});
