import { useAppSelector } from '../../hooks';
import Card from '../card/card';

export default function NearOffer(): JSX.Element {
  const nearByOffers = useAppSelector((initialState) => initialState.nearByOffers);
  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>
        <div className="near-places__list places__list">
          {nearByOffers && nearByOffers.map((offer) => (
            <Card
              key={offer.id}
              card={offer}
              className={{
                page: 'near-places',
                info: null,
                bookmark: 'place-card',
              }}
              imageSize={{
                width: 260,
                height: 200,
              }}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
