import { render } from '@testing-library/react';
import { App } from './app';
import { ReactNode } from 'react';
import { AppRootStateType, Selector } from '../../store/types';
import { mockInitialState } from '../../utils/mocks';

const mockUseSelector = vi.fn((selector: Selector) =>
  selector(mockInitialState)
);

vi.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }: { children: ReactNode }) => (
    <div data-testid="mock-browser-router">{children}</div>
  )
}));

vi.mock('react-redux', () => ({
  Provider: ({ children, store }: { children: ReactNode; store: AppRootStateType }) => (
    <div data-testid="mock-provider" data-store={store ? 'store-present' : 'store-missing'}>
      {children}
    </div>
  ),
  useSelector: (selector: Selector) => mockUseSelector(selector),
}));

vi.mock('../store', () => ({
  store: {
    dispatch: vi.fn(),
    getState: vi.fn(),
    subscribe: vi.fn(),
    replaceReducer: vi.fn(),
    [Symbol.observable]: vi.fn()
  }
}));

vi.mock('../routes/app-routes', () => ({
  AppRoutes: () => <div data-testid="mock-app-routes">AppRoutes Component</div>
}));

describe('App Component', () => {
  it('should render all providers and components in correct order', () => {
    const { container } = render(<App />);

    const rootElement = container.firstChild;
    expect(rootElement).toBeInTheDocument();

    const providerElement = container.querySelector('[data-testid="mock-provider"]');
    expect(providerElement).toBeInTheDocument();
    expect(providerElement).toHaveAttribute('data-store', 'store-present');

    const browserRouterElement = providerElement?.querySelector('[data-testid="mock-browser-router"]');
    expect(browserRouterElement).toBeInTheDocument();

    const appRoutesElement = browserRouterElement?.querySelector('[data-testid="mock-app-routes"]');
    expect(appRoutesElement).toBeInTheDocument();
    expect(appRoutesElement).toHaveTextContent('AppRoutes Component');
  });
});
