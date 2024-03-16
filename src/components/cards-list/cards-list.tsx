import Sort from '../../components/sort/sort';
import Card from '../../components/card/card';
import type { PlaceType } from '../../types';

type CardsListProps = {
  offers: PlaceType[];
  updateFavorites: (id: string | null) => void;
}

export default function CardsList({ offers, updateFavorites }: CardsListProps): JSX.Element {

  const offersList = offers.map((offer) => (
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
    />
  ));

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">312 places to stay in Amsterdam</b>
      <Sort />
      <div className="cities__places-list places__list tabs__content">
        {offersList}
      </div>
    </section>
  );
}
