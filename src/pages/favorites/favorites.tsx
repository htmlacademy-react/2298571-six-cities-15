import { PlaceType } from '../../types/types';
import Footer from '../../components/footer/footer';
import FavoritesEmpty from './favorites-empty';

type FavoritesProps = {
  offers: PlaceType[];
  updateFavorites: (id: string | null) => void;
  isFavorite: string[];
}

export default function Favorites({ offers, updateFavorites, isFavorite }: FavoritesProps): JSX.Element {
  const favoriteOffers = offers.filter((offer) => isFavorite.includes(offer.id));
  const uniqueCities = Array.from(new Set(favoriteOffers.map((offer) => offer.city.name)));

  return (
    <div className={`page ${favoriteOffers.length === 0 ? 'page--favorites-empty' : ''}`}>

      {favoriteOffers && favoriteOffers.length > 0 ? (
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">

                {uniqueCities.map((city) => (
                  <li className="favorites__locations-items" key={city}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{city}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">

                      {favoriteOffers
                        .filter((offer) => offer.city.name === city)
                        .map((offer) => (
                          <article key={offer.id} className="favorites__card place-card">

                            {offer.isPremium && (
                              <div className="place-card__mark">
                                <span>Premium</span>
                              </div>)}

                            <div className="favorites__image-wrapper place-card__image-wrapper">
                              <a href="#">
                                <img className="place-card__image" src={offer.previewImage} width="150" height="110" alt="Place image" />
                              </a>
                            </div>
                            <div className="favorites__card-info place-card__info">
                              <div className="place-card__price-wrapper">
                                <div className="place-card__price">
                                  <b className="place-card__price-value">&euro;{offer.price}</b>
                                  <span className="place-card__price-text">&#47;&nbsp;night</span>
                                </div>
                                <button className="place-card__bookmark-button place-card__bookmark-button--active button" type="button" onClick={() => updateFavorites(offer.id)}>
                                  <svg className="place-card__bookmark-icon" width="18" height="19">
                                    <use xlinkHref="#icon-bookmark"></use>
                                  </svg>
                                  <span className="visually-hidden">In bookmarks</span>
                                </button>
                              </div>
                              <div className="place-card__rating rating">
                                <div className="place-card__stars rating__stars">
                                  <span style={{ width: `${offer.rating * 20}%` }}></span>
                                  <span className="visually-hidden">Rating</span>
                                </div>
                              </div>
                              <h2 className="place-card__name">
                                <a href="#">{offer.title}</a>
                              </h2>
                              <p className="place-card__type">{offer.type}</p>
                            </div>
                          </article>
                        ))}

                    </div>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </main>
      ) : (
        <FavoritesEmpty />
      )}
      <Footer />

    </div>
  );
}
