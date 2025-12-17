import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Footer } from './Footer';
import { Path } from '../../utils/const.ts';

describe('Footer Component', () => {
  it('should render logo image with correct attributes', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    const logoImage = screen.getByAltText('6 cities logo');
    expect(logoImage).toBeInTheDocument();

    expect(logoImage).toHaveAttribute('src', 'img/logo.svg');
    expect(logoImage).toHaveAttribute('width', '64');
    expect(logoImage).toHaveAttribute('height', '33');
    expect(logoImage).toHaveClass('footer__logo');
  });

  it('should contain link to main page', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    const linkElement = screen.getByRole('link', { name: /6 cities logo/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', Path.MAIN);
    expect(linkElement).toHaveClass('footer__logo-link');
  });

  it('should have correct structure', () => {
    const { container } = render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    const footer = container.querySelector('footer');
    expect(footer).toHaveClass('footer container');

    const link = footer?.querySelector('a');
    expect(link).toHaveClass('footer__logo-link');

    const img = link?.querySelector('img');
    expect(img).toHaveClass('footer__logo');
  });

  it('should trigger click event when logo is clicked', () => {
    render(
      <BrowserRouter>
        <Footer />
      </BrowserRouter>
    );

    const logoLink = screen.getByRole('link', { name: /6 cities logo/i });
    const handleClick = vi.fn();
    logoLink.addEventListener('click', handleClick);

    fireEvent.click(logoLink);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
