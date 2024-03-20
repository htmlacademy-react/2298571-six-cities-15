import { useState, useEffect, useRef, MutableRefObject } from 'react';
import { Map, TileLayer } from 'leaflet';

type CityUseMap = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export default function useMap(
  mapRef: MutableRefObject<HTMLElement | null>, city: CityUseMap): Map | null {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef(false);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: city.latitude,
          lng: city.longitude
        },
        zoom: city.zoom
      });

      const layer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        },
      );

      instance.addLayer(layer);

      setMap(instance);

      isRenderedRef.current = true;
    }
  }, [mapRef, city]);

  return map;
}
