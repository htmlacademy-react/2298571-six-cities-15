import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useAppSelector } from '../../hooks';

export default function Auth(): JSX.Element {
  const authStatus = useAppSelector((initialState) => initialState.authStatus);
  const favoriteCards = useAppSelector((initialState) => initialState.favoriteCards);
  let inOutTitle;

  if (authStatus === AuthorizationStatus.Auth) {
    inOutTitle = 'Sign out';
  } else {
    inOutTitle = 'Sign in';
  }

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">

        {(authStatus === AuthorizationStatus.Auth) &&
          <li className="header__nav-item user">
            <Link
              className="header__nav-link header__nav-link--profile"
              to={AppRoute.Favorites}
            >
              <div className="header__avatar-wrapper user__avatar-wrapper">
              </div>
              <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
              <span className="header__favorite-count">{favoriteCards.length}</span>
            </Link>
          </li>}

        <li className="header__nav-item">
          <Link className="header__nav-link" to={AppRoute.Login}>
            <span className="header__signout">{inOutTitle}</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
