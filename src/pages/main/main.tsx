import CitiesList from '../../components/cities-list/cities-list';
import CardsList from '../../components/cards-list/cards-list';
import MainEmpty from '../../components/main-empty/main-empty';
import { PlaceType } from '../../types';

type MainProps = {
  offers: PlaceType[];
  updateFavorites: (id: string | null) => void;
}

export default function Main({ offers, updateFavorites }: MainProps): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList />
        <div className="cities">
          {offers && offers.length > 0 ? (
            <div className="cities__places-container container">
              <CardsList offers={offers} updateFavorites={updateFavorites} />
              <div className="cities__right-section">
                <section className="cities__map map"></section>
              </div>
            </div>
          ) : (
            <MainEmpty />
          )}
        </div>
      </main>
    </div>
  );
}
