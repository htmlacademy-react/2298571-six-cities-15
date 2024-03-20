import CitiesList from '../../components/cities-list/cities-list';
import CardsList from '../../components/cards-list/cards-list';
import MainEmpty from '../../components/main-empty/main-empty';
import Map from '../../components/map/map';
import { AVAILABLE_CITIES } from '../../data';
import { PlaceType } from '../../types';
import { useState, useEffect} from 'react';

type MainProps = {
  offers: PlaceType[];
  updateFavorites: (id: string | null) => void;
}

type IsActiveCardType = string | null;

export default function Main({ offers, updateFavorites }: MainProps): JSX.Element {
  const [isActiveCity, setIsActiveCity] = useState<string | null>(AVAILABLE_CITIES[0].name);
  const [isActiveCard, setIsActiveCard] = useState<IsActiveCardType>(null);
  const [chosenCityCards, setChosenCityCards] = useState<PlaceType[]>([]);

  const CityClickHandler = (name: string | null) => {
    setIsActiveCity(name);
  };

  useEffect(() => {
    const cityOffers: PlaceType[] = offers.filter((offer) => offer.city.name === isActiveCity);
    setChosenCityCards(cityOffers);
  }, [isActiveCity, offers]);

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
        <CitiesList
          AVAILABLE_CITIES={AVAILABLE_CITIES}
          CityClickHandler={CityClickHandler}
          isActiveCity={isActiveCity}
        />
        <div className="cities">
          {chosenCityCards && chosenCityCards.length > 0 ? (
            <div className="cities__places-container container">
              <CardsList
                chosenCityCards={chosenCityCards}
                updateFavorites={updateFavorites}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
              />
              <Map
                isActiveCard={isActiveCard}
                chosenCityCards={chosenCityCards}
              />
            </div>
          ) : (
            <MainEmpty isActiveCity={isActiveCity} />
          )}
        </div>
      </main>
    </div>
  );
}
