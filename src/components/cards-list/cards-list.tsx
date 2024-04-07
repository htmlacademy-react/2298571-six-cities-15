import Sort from '../../components/sort/sort';
import Card from '../../components/card/card';
import { useAppSelector } from '../../hooks';

type CardsListProps = {
  handleMouseEnter: (id: string | null) => void;
  handleMouseLeave: () => void;
}

export default function CardsList({ handleMouseEnter, handleMouseLeave }: CardsListProps): JSX.Element {
  const isActiveCity = useAppSelector((initialState) => initialState.activeCity);
  const sortedCityCards = useAppSelector((initialState) => initialState.sortedCityCards);

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
      handleMouseEnter={handleMouseEnter}
      handleMouseLeave = {handleMouseLeave}
      imageSize = {{
        width: 260,
        height: 200,
      }}
      className = {{
        page: 'cities',
        info: null,
        bookmark: 'place-card',
      }}
    />
  ));

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">{sortedCityCards.length} places to stay in {isActiveCity}</b>
      <Sort />
      <div className="cities__places-list places__list tabs__content">
        {offersList}
      </div>
    </section>
  );
}
