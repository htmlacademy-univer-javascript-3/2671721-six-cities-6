import { renderHook } from '@testing-library/react';
import { MutableRefObject } from 'react';
import { Map } from 'leaflet';
import { useMap } from './use-map';
import { useAppSelector } from '../../store/hooks/hooks';
import { LOCATIONS } from '../utils/const';
import { getActiveCity } from '../../store/offers/offers-selectors';
import { City } from '../types/app';

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

vi.mock('../../store/hooks/hooks', () => ({
  useAppSelector: vi.fn(),
}));

vi.mock('../../store/offers/offers-selectors', () => ({
  getActiveCity: vi.fn(),
}));

describe('useMap', () => {
  let mockMapRef: MutableRefObject<HTMLElement | null>;

  beforeEach(() => {
    vi.restoreAllMocks();

    const div = document.createElement('div');
    mockMapRef = { current: div };
  });

  it('should initialize map when mapRef contains element and not rendered before', () => {
    (useAppSelector as ReturnType<typeof vi.fn>).mockReturnValue(City.PARIS);
    (getActiveCity as unknown as ReturnType<typeof vi.fn>).mockReturnValue(City.PARIS);

    renderHook(() => useMap(mockMapRef));

    expect(Map).toHaveBeenCalled();
    expect(Map).toHaveBeenCalledWith(mockMapRef.current, {
      center: {
        lat: LOCATIONS.Paris.latitude,
        lng: LOCATIONS.Paris.longitude,
      },
      zoom: LOCATIONS.Paris.zoom,
    });
  });
});
