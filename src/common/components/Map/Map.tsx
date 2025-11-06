import { FC, useEffect, useRef } from 'react';
import leaflet, { layerGroup } from 'leaflet';
import { useMap } from '../../hooks/useMap.tsx';
import { IPlaceCard } from '../../types/app.ts';
import {
  currentCustomIcon,
  defaultCustomIcon,
} from '../../const.ts';
import { useAppSelector } from '../../../store/hooks.ts';

interface IMapProps {
  placeCardArray: IPlaceCard[];
}

export const Map: FC<IMapProps> = ({ placeCardArray}) => {
  const mapRef = useRef(null);
  const map = useMap(mapRef);
  const activePlaceCardId = useAppSelector((state) => state.activePlaceCardId);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      placeCardArray.forEach((place) => {
        leaflet.marker({
          lat: place.location.latitude,
          lng: place.location.longitude,
        }, {
          icon: place.id === activePlaceCardId ? currentCustomIcon : defaultCustomIcon,
        }).addTo(map);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, placeCardArray, activePlaceCardId]);

  return <div style={{ height: '100%', width: '100%' }} ref={mapRef}></div>;
};
