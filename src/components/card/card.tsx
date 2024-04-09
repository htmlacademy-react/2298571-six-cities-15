import { Link } from 'react-router-dom';
import { CardType } from '../../types/types';
import CardInfo from '../card-info/card-info';
import { AppRoute } from '../../const';

type CardProps = {
  card: CardType;
  handleMouseEnter?: (id: string | null) => void;
  handleMouseLeave?: () => void;
  imageSize: {
    width: number;
    height: number;
  };
  className: {
    page: string;
    info: null | string;
    bookmark: string;
  };
}

export default function Card({ card, handleMouseEnter, handleMouseLeave, imageSize, className }: CardProps): JSX.Element {

  return (
    <article className={`${className.page}__card place-card`}
      onMouseEnter={handleMouseEnter ? () => handleMouseEnter(card.id) : undefined}
      onMouseLeave={handleMouseLeave}
    >

      {card.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>)}

      <div className={`${className.page}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoute.Offer}/${card.id}`}>
          <img className="place-card__image" src={card.previewImage} width={imageSize.width} height={imageSize.height} alt="Place image" />
        </Link>
      </div>
      <div className={`place-card__info ${className.info}`}>
        <CardInfo card={card} className={className} />
      </div>
    </article>
  );
}
