import CitiesList from '../../components/cities-list/cities-list';
import CardsList from '../../components/cards-list/cards-list';
import MainEmpty from '../../components/main-empty/main-empty';
import Map from '../../components/map/map';
import { PlaceType } from '../../types/types';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { updateCityCardsAction } from '../../store/actions';

type MainProps = {
  updateFavorites: (id: string | null) => void;
}

type IsActiveCardType = string | null;

export default function Main({ updateFavorites }: MainProps): JSX.Element {
  const [isActiveCard, setIsActiveCard] = useState<IsActiveCardType>(null);

  const dispatch = useAppDispatch();
  const isActiveCity = useAppSelector((initialState) => initialState.activeCity);
  const offers = useAppSelector((initialState) => initialState.offers);
  const cityCards = useAppSelector((initialState) => initialState.cityCards);

  useEffect(() => {
    const cityOffers: PlaceType[] = offers.filter((offer) => offer.city.name === isActiveCity);
    dispatch(updateCityCardsAction(cityOffers));
  }, [isActiveCity, offers, dispatch]);

  // Отслеживаем наведение мыши на карту
  const handleMouseEnter = (id: string | null) => {
    setIsActiveCard(id);
  };
  const handleMouseLeave = () => {
    setIsActiveCard(null);
  };

  return (
    <div className="page page--gray page--main">
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList />
        <div className="cities">
          {cityCards && cityCards.length > 0 ? (
            <div className="cities__places-container container">
              <CardsList
                updateFavorites={updateFavorites}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
              />
              <div className="cities__right-section">
                <Map
                  className='cities__map'
                  isActiveCard={isActiveCard}
                />
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
