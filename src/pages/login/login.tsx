import { Link } from 'react-router-dom';
import Logo from '../../components/header/header-logo';
import LoginForm from '../../components/login-form/login-form';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks';
import { updateCityAction } from '../../store/actions';
import { MouseEvent } from 'react';
import { getRandomCity } from '../../utils';
import { AVAILABLE_CITIES } from '../../data';

export default function Login(): JSX.Element {
  const dispatch = useAppDispatch();

  const handleLinkClick = (e: MouseEvent<HTMLAnchorElement>) => {
    const target = e.target as HTMLAnchorElement;
    const activeCity = target.textContent;
    if (activeCity) {
      dispatch(updateCityAction(activeCity));
    }
  };

  const cityNames = AVAILABLE_CITIES.map((city) => city.name);

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <LoginForm />
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link to={AppRoute.Main} onClick={handleLinkClick}className="locations__item-link">
                <span>{getRandomCity(cityNames)}</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
