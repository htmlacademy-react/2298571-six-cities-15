import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import { PlaceType } from '../../types';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';
import useMap from './use-map';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  className: string;
  isActiveCard: string | null;
  chosenCityCards: PlaceType[];
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

export default function Map({ className, isActiveCard, chosenCityCards }: MapProps): JSX.Element {
  const mapRef = useRef(null);

  let defaultCoordinates = { latitude: 0, longitude: 0, zoom: 0 };

  if (chosenCityCards.length > 0) {
    const { latitude, longitude, zoom } = chosenCityCards[0].city.location;
    defaultCoordinates = { latitude, longitude, zoom };
  }

  const map = useMap(mapRef, defaultCoordinates);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      chosenCityCards.forEach((card) => {
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
  }, [map, chosenCityCards, isActiveCard]);

  return (
    <section className={`map ${className}`} ref={mapRef}></section>
  );
}
