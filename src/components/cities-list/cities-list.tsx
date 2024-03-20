import { City } from '../../types';

type CitiesListProps = {
  AVAILABLE_CITIES: City[];
  CityClickHandler: (name: string | null) => void;
  isActiveCity: string | null;
}

export default function CitiesList({ AVAILABLE_CITIES, CityClickHandler, isActiveCity}: CitiesListProps): JSX.Element {
  const cities = AVAILABLE_CITIES.map((city) => (
    <li className="locations__item" key={city.id} onClick ={() => CityClickHandler(city.name)}>
      <a className={`locations__item-link tabs__item ${city.name === isActiveCity ? 'tabs__item--active' : ''}`} href="#" >
        {city.name}
      </a>
    </li>
  ));

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          { cities }
        </ul>
      </section>
    </div>
  );
}
