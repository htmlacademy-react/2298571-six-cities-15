import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateCityAction } from '../../store/actions';
import { AVAILABLE_CITIES } from '../../data';
import { Link } from 'react-router-dom';

export default function CitiesList(): JSX.Element {
  const isActiveCity = useAppSelector((initialState) => initialState.activeCity);
  const dispatch = useAppDispatch();

  const cities = AVAILABLE_CITIES.map((city) => (
    <li className="locations__item" key={city.id} onClick={() => {
      dispatch(updateCityAction(city.name));
    }}
    >
      <Link to='#' className={`locations__item-link tabs__item ${city.name === isActiveCity ? 'tabs__item--active' : ''}`} >
        {city.name}
      </Link>
    </li>
  ));

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {cities}
        </ul>
      </section>
    </div>
  );
}
