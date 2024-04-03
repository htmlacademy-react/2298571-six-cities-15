import { Link } from 'react-router-dom';
import { CardType } from '../../types/types';
import { capitalizeString } from '../../utils';
import { AppRoute } from '../../const';

type CardInfo = {
  card: CardType;
  updateFavorites: (id: string | null) => void;
}

export default function CardInfo({ card, updateFavorites }: CardInfo): JSX.Element {

  return (
    <div className="place-card__info">
      <div className="place-card__price-wrapper">
        <div className="place-card__price">
          <b className="place-card__price-value">&euro;{card.price}</b>
          <span className="place-card__price-text">&#47;&nbsp;night</span>
        </div>
        <button className="place-card__bookmark-button button" type="button" onClick={() => updateFavorites(card.id)}>
          <svg className="place-card__bookmark-icon" width="18" height="19">
            <use xlinkHref="#icon-bookmark"></use>
          </svg>

          {card.isFavorite && (
            <span className="visually-hidden">To bookmarks</span>
          )}

        </button>
      </div>
      <div className="place-card__rating rating">
        <div className="place-card__stars rating__stars">
          <span style={{ width: `${card.rating * 20}%` }}></span>
          <span className="visually-hidden">Rating</span>
        </div>
      </div>
      <h2 className="place-card__name">
        <Link to={`${AppRoute.Offer}/${card.id}`}>{card.title}</Link>
      </h2>
      <p className="place-card__type">{capitalizeString(card.type)}</p>
    </div>
  );
}
