import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';
import { useAppSelector } from '../../hooks';
import useMap from './use-map';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  className: string;
  isActiveCard: string | null;
}

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

export default function Map({ className, isActiveCard }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const cityCards = useAppSelector((initialState) => initialState.cityCards);

  let defaultCoordinates = { latitude: 0, longitude: 0, zoom: 0 };

  if (cityCards.length > 0) {
    const { latitude, longitude, zoom } = cityCards[0].city.location;
    defaultCoordinates = { latitude, longitude, zoom };
  }

  const map = useMap(mapRef, defaultCoordinates);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      cityCards.forEach((card) => {
        const marker = new Marker({
          lat: card.location.latitude,
          lng: card.location.longitude
        });

        marker
          .setIcon(
            isActiveCard !== undefined && card.id === isActiveCard
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, cityCards, isActiveCard]);

  return (
    <section className={`map ${className}`} ref={mapRef}></section>
  );
}
