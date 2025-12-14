import { MutableRefObject, useEffect, useRef, useState } from 'react';
import leaflet, { Map } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useAppSelector } from '../../store/hooks.ts';
import { LOCATIONS } from '../const.ts';
import { getActiveCity } from '../../store/offers/offers-selectors.ts';

export function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);
  const activeCity = useAppSelector(getActiveCity);
  const location = LOCATIONS[activeCity];

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: location.latitude,
          lng: location.longitude,
        },
        zoom: location.zoom,
      });

      leaflet.tileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        }
      ).addTo(instance);

      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, location]);

  useEffect(() => {
    if (map) {
      map.setView([location.latitude, location.longitude], location.zoom);
    }
  }, [map, location]);

  return map;
}
