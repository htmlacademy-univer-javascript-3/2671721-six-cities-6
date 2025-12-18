import { render, screen } from '@testing-library/react';
import { Main } from './main';

vi.mock('../../common/components/header/header', () => ({
  Header: () => <div data-testid="mock-header">Header Component</div>
}));

vi.mock('../../common/widgets/main-content/main-content', () => ({
  MainContent: () => <div data-testid="mock-main-content">MainContent Component</div>
}));

describe('Main Component', () => {
  it('should render correctly', () => {
    const { container } = render(<Main />);

    const pageElement = container.querySelector('.page');
    expect(pageElement).toBeInTheDocument();
    expect(pageElement).toHaveClass('page--gray', 'page--main');

    expect(pageElement?.children).toHaveLength(2);
    expect(pageElement?.children[0]).toHaveAttribute('data-testid', 'mock-header');
    expect(pageElement?.children[1]).toHaveAttribute('data-testid', 'mock-main-content');
  });

  it('should render components in correct order', () => {
    render(<Main />);

    const pageElement = screen.getByTestId('mock-header').parentElement;
    const children = Array.from(pageElement?.children || []);

    expect(children[0]).toHaveAttribute('data-testid', 'mock-header');
    expect(children[1]).toHaveAttribute('data-testid', 'mock-main-content');
  });

  it('should have correct CSS classes', () => {
    const { container } = render(<Main />);

    const pageElement = container.querySelector('.page');
    expect(pageElement).toHaveClass('page--gray', 'page--main');
  });
});
