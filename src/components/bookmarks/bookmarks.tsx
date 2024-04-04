import { useDispatch } from 'react-redux';
import { CardType } from '../../types/types';
import { useAppSelector } from '../../hooks';
import { updateFavoriteCardsAction } from '../../store/actions';

type BookmarksProps = {
  card: CardType;
  className: {
    bookmark: string;
  };
  iconSize?: {
    width: number;
    height: number;
  };
}

export default function Bookmarks({ card, className, iconSize = { width: 18, height: 19 } }: BookmarksProps): JSX.Element {
  const dispatch = useDispatch();
  const favoriteCards = useAppSelector((initialState) => initialState.favoriteCards);
  const offers = useAppSelector((initialState) => initialState.offers);

  const updateFavorites = (id: string | null) => {

    if (id !== null) {
      const checkExistance = favoriteCards.some((item) => item.id === id);

      let updatedFavorites = [];
      if (checkExistance) {
        updatedFavorites = favoriteCards.filter((item) => item.id !== id);
      } else {
        const newCard = offers.find((offer) => offer.id === id);
        if (newCard) {
          updatedFavorites = [...favoriteCards, newCard];
        } else {
          updatedFavorites = [...favoriteCards];
        }
      }
      dispatch(updateFavoriteCardsAction(updatedFavorites));
    }
  };

  const isFavorite = favoriteCards.some((item) => item.id === card.id);

  return (
    <button className={`${className.bookmark}__bookmark-button button${isFavorite ? ' place-card__bookmark-button--active' : ''}`}
      type="button"
      onClick={() => updateFavorites(card.id)}
    >
      <svg className={`${className.bookmark}__bookmark-icon`} width={iconSize.width} height={iconSize.height}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>

      {card.isFavorite && (
        <span className="visually-hidden">To bookmarks</span>
      )}

      <span className="visually-hidden">To bookmarks</span>

    </button>
  );
}
