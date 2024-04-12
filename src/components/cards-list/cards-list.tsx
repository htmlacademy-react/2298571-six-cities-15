import Sort from '../../components/sort/sort';
import Card from '../../components/card/card';
import { useAppSelector } from '../../hooks';
import { formatWordCount } from '../../utils';
import { PlaceType } from '../../types/types';
import { useState } from 'react';

type CardsListProps = {
  onMouseEnter: (id: string | null) => void;
  onMouseLeave: () => void;
  cityCards: PlaceType[];
}

export default function CardsList({ onMouseEnter, onMouseLeave, cityCards }: CardsListProps): JSX.Element {
  const isActiveCity = useAppSelector((initialState) => initialState.activeCity);
  const [sortedCityCards, setSortedCityCards] = useState<PlaceType[]>([]);

  const onSortUpdate = (sortedCards: PlaceType[]) => {
    setSortedCityCards(sortedCards);
  };

  const offersList = sortedCityCards.map((offer) => (
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
        type: offer.type,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      imageSize={{
        width: 260,
        height: 200,
      }}
      className={{
        page: 'cities',
        info: null,
        bookmark: 'place-card',
      }}
    />
  ));

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{formatWordCount(sortedCityCards.length, 'place')} to stay in {isActiveCity}</b>
      <Sort cityCards={cityCards} onSortUpdate={onSortUpdate} />
      <div className="cities__places-list places__list tabs__content">
        {offersList}
      </div>
    </section>
  );
}
