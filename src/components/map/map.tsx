import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import useMap from './use-map';
import 'leaflet/dist/leaflet.css';
import { PlaceType } from '../../types/types';
import { MarkerURL } from '../../const';

type MapProps = {
  className: string;
  isActiveCard: string | null;
  mappedOffers: PlaceType[];
}

const defaultCustomIcon = new Icon({
  iconUrl: MarkerURL.DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: MarkerURL.CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

export default function Map({ className, isActiveCard, mappedOffers }: MapProps): JSX.Element {
  const mapRef = useRef(null);

  let defaultCoordinates = { latitude: 0, longitude: 0, zoom: 0 };

  if (mappedOffers.length > 0) {
    const { latitude, longitude, zoom } = mappedOffers[0].city.location;
    defaultCoordinates = { latitude, longitude, zoom };
  }

  const map = useMap(mapRef, defaultCoordinates);

  const latitude = defaultCoordinates.latitude;
  const longitude = defaultCoordinates.longitude;

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      mappedOffers.forEach((card) => {
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

      map.setView([latitude, longitude]);

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, mappedOffers, isActiveCard, latitude, longitude]);

  return (
    <section className={`map ${className}`} ref={mapRef}></section>
  );
}
