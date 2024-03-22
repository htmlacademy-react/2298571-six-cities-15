import Sort from '../../components/sort/sort';
import Card from '../../components/card/card';
import type { PlaceType } from '../../types';

type CardsListProps = {
  chosenCityCards: PlaceType[];
  updateFavorites: (id: string | null) => void;
  handleMouseEnter: (id: string | null) => void;
  handleMouseLeave: () => void;
  isActiveCity: string | null;
}

export default function CardsList({ chosenCityCards, updateFavorites, handleMouseEnter, handleMouseLeave, isActiveCity }: CardsListProps): JSX.Element {

  const offersList = chosenCityCards.map((offer) => (
    <Card
      key={offer.id}
      card={{
        id: offer.id,
        previewImage: offer.previewImage,
        isPremium: offer.isPremium,
        isFavorite: offer.isFavorite,
        price: offer.price,
        rating: offer.rating,
        title: offer.title,
        type: offer.type
      }}
      updateFavorites={updateFavorites}
      handleMouseEnter={handleMouseEnter}
      handleMouseLeave = {handleMouseLeave}
    />
  ));

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">312 places to stay in {isActiveCity}</b>
      <Sort />
      <div className="cities__places-list places__list tabs__content">
        {offersList}
      </div>
    </section>
  );
}
