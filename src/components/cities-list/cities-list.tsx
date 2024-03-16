import { AVAILABLE_CITIES } from '../../data';

export default function CitiesList(): JSX.Element {
  const cities = AVAILABLE_CITIES.map((city) => (
    <li className="locations__item" key={city.id}>
      <a className="locations__item-link tabs__item" href="#" >
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
