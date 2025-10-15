import { FC, useEffect, useRef } from 'react';
import leaflet, { layerGroup } from 'leaflet';
import { useMap } from '../../hooks/useMap.tsx';
import { ICity, IPlaceCard } from '../../types.ts';
import {
  currentCustomIcon,
  defaultCustomIcon,
  LOCATIONS
} from '../../const.ts';

interface IMapProps {
  placeCardArray: IPlaceCard[];
  activeCity: ICity['name'];
  activeOfferTitle: string | null;
}

export const Map: FC<IMapProps> = ({ placeCardArray, activeCity, activeOfferTitle }) => {
  const location = LOCATIONS[activeCity];
  const mapRef = useRef(null);
  const map = useMap(mapRef, location);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      placeCardArray.forEach((place) => {
        leaflet.marker({
          lat: place.location.latitude,
          lng: place.location.longitude,
        }, {
          icon: place.title === activeOfferTitle ? currentCustomIcon : defaultCustomIcon,
        }).addTo(map);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, placeCardArray, activeOfferTitle]);

  return <div style={{ height: '100%', width: '100%' }} ref={mapRef}></div>;
};
