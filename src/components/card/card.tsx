import { CardType } from '../../types/types';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import CardInfo from '../card-info/card-info';

type CardProps = {
  card: CardType;
  updateFavorites: (id: string | null) => void;
  handleMouseEnter: (id: string | null) => void;
  handleMouseLeave: () => void;
}

export default function Card({ card, updateFavorites, handleMouseEnter, handleMouseLeave }: CardProps): JSX.Element {

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
        <CardInfo card={card} updateFavorites={updateFavorites} />
      </article>
    </Link>
  );
}
