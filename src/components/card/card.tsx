import { useState } from 'react';
import { CardType } from '../../types';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';

type CardProps = {
  card: CardType;
  updateFavorites: (id: string | null) => void;
}

type IsActiveCardType = string | null;

export default function Card({ card, updateFavorites }: CardProps): JSX.Element {
  const [isActiveCard, setIsActiveCard] = useState<IsActiveCardType>(null);

  // Отслеживаем наведение мыши на карту
  const handleMouseEnter = (id: string | null) => {
    setIsActiveCard(id);
  };
  const handleMouseLeave = () => {
    setIsActiveCard(null);
  };

  return (
    <Link to={`${AppRoute.Offer}/${card.id}`}>
      <article className="cities__card place-card"
        onMouseEnter={() => handleMouseEnter(card.id)}
        onMouseLeave={handleMouseLeave}
      >

        {card.isPremium && (
          <div className="place-card__mark">
            <span>Premium</span>
          </div>)}

        <div className="cities__image-wrapper place-card__image-wrapper">
          <a href="#">
            <img className="place-card__image" src={card.previewImage} width="260" height="200" alt="Place image" />
          </a>
        </div>
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
            <a href="#">{card.title}</a>
          </h2>
          <p className="place-card__type">{card.type}</p>
        </div>
      </article>
    </Link>
  );
}
