import { render } from '@testing-library/react';
import { Favorites } from './favorites';

vi.mock('../../common/components/header/header', () => ({
  Header: () => <div data-testid="mock-header">Header Component</div>
}));

vi.mock('../../common/components/footer/footer', () => ({
  Footer: () => <div data-testid="mock-footer">Footer Component</div>
}));

vi.mock('../../common/widgets/favorite-content/favorite-content', () => ({
  FavoriteContent: () => <div data-testid="mock-favorite-content">FavoriteContent Component</div>
}));

describe('Favorites Component', () => {
  it('should render correctly', () => {
    const { container } = render(<Favorites />);

    const pageElement = container.querySelector('.page');
    expect(pageElement).toBeInTheDocument();
    expect(pageElement).toHaveClass('page');

    expect(pageElement?.children).toHaveLength(3);
    expect(pageElement?.children[0]).toHaveTextContent('Header Component');
    expect(pageElement?.children[1]).toHaveTextContent('FavoriteContent Component');
    expect(pageElement?.children[2]).toHaveTextContent('Footer Component');
  });
});
