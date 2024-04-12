import Footer from '../../components/footer/footer';
import FavoritesEmpty from './favorites-empty';
import { useAppSelector } from '../../hooks';
import Card from '../../components/card/card';
import { Link } from 'react-router-dom';

export default function Favorites(): JSX.Element {
  const favoriteCards = useAppSelector((initialState) => initialState.favoriteCards);
  const uniqueCities = Array.from(new Set(favoriteCards.map((offer) => offer.city.name)));

  return (
    <div className={`page ${favoriteCards.length === 0 ? 'page--favorites-empty' : ''}`}>

      {favoriteCards && favoriteCards.length > 0 ? (
        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">

                {uniqueCities.map((city) => (
                  <li className="favorites__locations-items" key={city}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <Link className="locations__item-link" to="#">
                          <span>{city}</span>
                        </Link>
                      </div>
                    </div>
                    <div className="favorites__places">

                      {favoriteCards
                        .filter((offer) => offer.city.name === city)
                        .map((offer) => (
                          < Card
                            key={offer.id}
                            card={{
                              id: offer.id,
                              previewImage: offer.previewImage,
                              isPremium: offer.isPremium,
                              isFavorite: offer.isFavorite,
                              price: offer.price,
                              rating: offer.rating,
                              title: offer.title,
                              type: offer.type,
                            }}
                            imageSize={{
                              width: 150,
                              height: 110,
                            }}
                            className={{
                              page: 'favorites',
                              info: 'favorites__card-info',
                              bookmark: 'place-card',
                            }}
                          />
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
