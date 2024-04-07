import { CardType, FavoriteCardStatusType } from '../../types/types';
import { useAppSelector } from '../../hooks';
import { store } from '../../store';
import { fetchFavoriteOffers, sendNewFavorite } from '../../store/api-actions';

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
  const favoriteCards = useAppSelector((initialState) => initialState.favoriteCards);
  // const offers = useAppSelector((initialState) => initialState.offers);

  const updateFavorites = (id: string) => {
    const cardIsFavorite = favoriteCards.some((item) => item.id === id);
    let newCardStatus: FavoriteCardStatusType = { offerId: card.id, status: null };

    if (cardIsFavorite) {
      newCardStatus = { offerId: card.id, status: 0 };
    } else if (!cardIsFavorite) {
      newCardStatus = { offerId: card.id, status: 1 };
    }
    store.dispatch(sendNewFavorite(newCardStatus)).then(() => {
      store.dispatch(fetchFavoriteOffers());
    });
  };

  const isFavorite = favoriteCards.some((item) => item.id === card.id);

  return (
    <button className={`${className.bookmark}__bookmark-button button ${isFavorite ? `${className.bookmark}__bookmark-button--active` : ''}`}
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

// let updatedFavorites: PlaceType[] = [];
// if (cardIsFavorite) {
//   updatedFavorites = favoriteCards.filter((item) => item.id !== id);
// } else {
//   const newCard = offers.find((offer) => offer.id === id);
//   if (newCard) {
//     updatedFavorites = [...favoriteCards, newCard];
//   } else {
//     updatedFavorites = [...favoriteCards];
//   }
// }
