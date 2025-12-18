import { render } from '@testing-library/react';
import { Map } from './map';
import { useMap } from '../../hooks/use-map';
import { useAppSelector } from '../../../store/hooks/hooks';
import { getActivePlaceCardId } from '../../../store/offers/offers-selectors';
import { mockPlaceCard } from '../../utils/mocks';
import { Selector } from '../../../store/types';

vi.mock('../../hooks/use-map', () => ({
  useMap: vi.fn()
}));

vi.mock('../../../store/hooks/hooks', () => ({
  useAppSelector: vi.fn()
}));

vi.mock('leaflet', async () => {
  const actual: object = await vi.importActual('leaflet');
  return {
    ...actual,
    Map: vi.fn(() => ({
      setView: vi.fn(),
      addLayer: vi.fn(),
      remove: vi.fn(),
      removeLayer: vi.fn(),
    })),
  };
});

describe('Map Component', () => {
  const mockMap = {
    addLayer: vi.fn(),
    removeLayer: vi.fn()
  };

  const mockPlaceCards = [
    { ...mockPlaceCard, id: 'uuid-1', location: { latitude: 10, longitude: 10, zoom: 10 } },
    { ...mockPlaceCard, id: 'uuid-2', location: { latitude: 12, longitude: 12, zoom: 10 } },
    { ...mockPlaceCard, id: 'uuid-3', location: { latitude: 14, longitude: 14, zoom: 10 } }
  ];

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useMap).mockReturnValue(mockMap as unknown as ReturnType<typeof useMap>);
    vi.mocked(useAppSelector).mockImplementation((selector: Selector) => {
      if (selector === getActivePlaceCardId) {
        return null;
      }
      return null;
    });
  });

  it('should render map container for main page', () => {
    render(<Map placeCardList={mockPlaceCards} isMain />);

    expect(document.querySelector('.cities__map.map')).toBeInTheDocument();
    expect(document.querySelector('.cities__right-section')).toBeInTheDocument();
  });

  it('should render map container for offer page', () => {
    render(<Map placeCardList={mockPlaceCards} isMain={false} />);

    expect(document.querySelector('.offer__map.map')).toBeInTheDocument();
    expect(document.querySelector('.cities__right-section')).not.toBeInTheDocument();
  });
});
