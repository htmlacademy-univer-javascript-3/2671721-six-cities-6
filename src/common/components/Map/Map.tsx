import { FC, memo, useEffect, useRef } from 'react';
import leaflet, { layerGroup } from 'leaflet';
import { useMap } from '../../hooks/useMap.tsx';
import { IPlaceCard } from '../../types/app.ts';
import {
  currentCustomIcon,
  defaultCustomIcon,
} from '../../utils/const.ts';
import { useAppSelector } from '../../../store/hooks.ts';
import { getActivePlaceCardId } from '../../../store/offers/offers-selectors.ts';

interface IMapProps {
  placeCardList: IPlaceCard[];
  isMain?: boolean;
}

export const Map: FC<IMapProps> = ({ placeCardList, isMain = false}) => {
  const mapRef = useRef(null);
  const map = useMap(mapRef);
  const activePlaceCardId = useAppSelector(getActivePlaceCardId);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      placeCardList.forEach((place) => {
        leaflet.marker({
          lat: place.location.latitude,
          lng: place.location.longitude,
        }, {
          icon: isMain && place.id === activePlaceCardId ? currentCustomIcon : defaultCustomIcon,
        }).addTo(map);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, placeCardList, activePlaceCardId, isMain]);

  return isMain ? (
    <div className="cities__right-section">
      <section className="cities__map map">
        <div style={{height: '100%', width: '100%'}} ref={mapRef}></div>
      </section>
    </div>
  ) : (
    <section className="offer__map map">
      <div style={{height: '100%', width: '100%'}} ref={mapRef}></div>
    </section>
  );
};

export const MemorizedMap = memo(Map,
  (prevProps, nextProps) =>
    prevProps.isMain === nextProps.isMain
    && prevProps.placeCardList === nextProps.placeCardList
);
