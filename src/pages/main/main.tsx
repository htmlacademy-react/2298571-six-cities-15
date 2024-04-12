import CitiesList from '../../components/cities-list/cities-list';
import CardsList from '../../components/cards-list/cards-list';
import MainEmpty from '../../components/main-empty/main-empty';
import Map from '../../components/map/map';
import { PlaceType } from '../../types/types';
import { useState, useEffect } from 'react';
import { useAppSelector } from '../../hooks';

type IsActiveCardType = string | null;

export default function Main(): JSX.Element {
  const [isActiveCard, setIsActiveCard] = useState<IsActiveCardType>(null);
  const [cityCards, setCityCards] = useState<PlaceType[]>([]);
  const isActiveCity = useAppSelector((initialState) => initialState.activeCity);
  const offers = useAppSelector((initialState) => initialState.offers);

  useEffect(() => {
    const newCityCards: PlaceType[] = offers.filter((offer) => offer.city.name === isActiveCity);
    setCityCards(newCityCards);
  }, [isActiveCity, offers]);

  const onMouseEnter = (id: string | null) => {
    setIsActiveCard(id);
  };
  const onMouseLeave = () => {
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
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                cityCards={cityCards}
              />
              <div className="cities__right-section">
                <Map
                  className='cities__map'
                  isActiveCard={isActiveCard}
                  mappedOffers={cityCards}
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
