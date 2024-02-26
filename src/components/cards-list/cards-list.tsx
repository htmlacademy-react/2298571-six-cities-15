import Sort from '../../components/sort/sort';
import Card from '../../components/card/card';
import type { PlaceType } from '../../types';


export default function CardsList({ data }: { data: PlaceType[] }): JSX.Element {

  const offers = data.map((place) => (
    <Card
      key={place.id}
      src={place.src}
      premium={place.premium}
      bookmarks={place.bookmarks}
      price={place.price}
      rating={place.rating}
      description={place.description}
      type={place.type}
    />
  ));

  return (
    <section className="cities__places places">
      <h2 className="visually-hidden">Places</h2>
      <b className="places__found">312 places to stay in Amsterdam</b>
      < Sort />
      <div className="cities__places-list places__list tabs__content">
        {offers}
      </div>
    </section>
  );
}
