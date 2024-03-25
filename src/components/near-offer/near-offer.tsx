import { CardType } from '../../types/types';
import CardInfo from '../card-info/card-info';

type NearOffersProps = {
  card: CardType;
  updateFavorites: (id: string | null) => void;
}

export default function NearOffer({ card, updateFavorites }: NearOffersProps): JSX.Element {

  return (
    <article className="near-places__card place-card" key={card.id}>
      <div className="near-places__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={card.previewImage} width="260" height="200" alt="Place image" />
        </a>
      </div>
      <CardInfo card = {card} updateFavorites={updateFavorites}/>
    </article>
  );
}
