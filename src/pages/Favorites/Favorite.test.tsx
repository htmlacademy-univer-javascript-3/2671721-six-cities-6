import { render, screen } from '@testing-library/react';
import { Favorites } from './Favorites';

vi.mock('../../common/components/Header/Header', () => ({
  Header: () => <div data-testid="mock-header">Header Component</div>
}));

vi.mock('../../common/components/Footer/Footer', () => ({
  Footer: () => <div data-testid="mock-footer">Footer Component</div>
}));

vi.mock('../../common/widgets/FavoriteContent/FavoriteContent', () => ({
  FavoriteContent: () => <div data-testid="mock-favorite-content">FavoriteContent Component</div>
}));

describe('Favorites Component', () => {
  it('should render correctly', () => {
    const { container } = render(<Favorites />);

    const pageElement = container.querySelector('.page');
    expect(pageElement).toBeInTheDocument();
    expect(pageElement).toHaveClass('page');

    expect(pageElement?.children).toHaveLength(3);
    expect(pageElement?.children[0]).toHaveAttribute('data-testid', 'mock-header');
    expect(pageElement?.children[1]).toHaveAttribute('data-testid', 'mock-favorite-content');
    expect(pageElement?.children[2]).toHaveAttribute('data-testid', 'mock-footer');
  });

  it('should render components in correct order', () => {
    render(<Favorites />);

    const pageElement = screen.getByTestId('mock-header').parentElement;
    const children = Array.from(pageElement?.children || []);

    expect(children[0]).toHaveAttribute('data-testid', 'mock-header');
    expect(children[1]).toHaveAttribute('data-testid', 'mock-favorite-content');
    expect(children[2]).toHaveAttribute('data-testid', 'mock-footer');
  });
});
