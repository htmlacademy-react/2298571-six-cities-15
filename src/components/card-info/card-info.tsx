import { Link } from 'react-router-dom';
import { CardType } from '../../types/types';
import { capitalizeString } from '../../utils';
import { AppRoute } from '../../const';
import Bookmarks from '../bookmarks/bookmarks';
import { store } from '../../store';
import { fetchOfferComments, fetchOfferDetails, fetchOfferNearBy } from '../../store/api-actions';

type CardInfo = {
  card: CardType;
  className: {
    bookmark: string;
  };
}

export default function CardInfo({ card, className }: CardInfo): JSX.Element {

  const handleCardClick = () => {
    store.dispatch(fetchOfferDetails(card.id));
    store.dispatch(fetchOfferComments(card.id));
    store.dispatch(fetchOfferNearBy(card.id));
  };

  return (
    <>
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{card.price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <Bookmarks card={card} className={className} />
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{ width: `${card.rating * 20}%` }}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2
        onClick={handleCardClick}
        className="place-card__name"
      >
        <Link to={`${AppRoute.Offer}/${card.id}`}>{card.title}</Link>
      </h2>
      <p className="place-card__type">{capitalizeString(card.type)}</p>
    </>
  );
}
