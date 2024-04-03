import { useParams } from 'react-router-dom';
import { PlaceType } from '../../types/types';
import NotFound from '../404/not-found';
import ReviewForm from '../../components/review-form/review-form';
import ReviewsList from '../../components/reviews-list/reviews-list';
import { AuthorizationStatus } from '../../const';
import Host from '../../components/host/host';
import NearOffer from '../../components/near-offer/near-offer';
import Map from '../../components/map/map';
import { useAppSelector } from '../../hooks';

type OfferProps = {
  offers: PlaceType[];
  updateFavorites: (id: string | null) => void;
}

export default function Offer({ offers, updateFavorites }: OfferProps): JSX.Element {
  const { id } = useParams();
  const currentOffer = offers.find((offer) => offer.id === id);
  const authStatus = useAppSelector((initialState) => initialState.authStatus);

  if (!currentOffer) {
    return <NotFound />;
  }

  return (
    <div className="page">
      <main className="page__main page__main--offer">
        <section className="offer">

          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {currentOffer && currentOffer.images && currentOffer.images.slice(0, 6).map((image: string) => (
                <div className="offer__image-wrapper" key={image}>
                  <img className="offer__image" src={image} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>

          <div className="offer__container container">
            <div className="offer__wrapper">

              {currentOffer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>)}

              <div className="offer__name-wrapper">
                <h1 className="offer__name">{currentOffer.title}</h1>
                <button className="offer__bookmark-button button" type="button" onClick={() => id && updateFavorites(id)}>
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>

              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${currentOffer.rating * 20}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{currentOffer.rating}</span>
              </div>

              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">
                  {currentOffer.type}
                </li>
                <li className="offer__feature offer__feature--bedrooms">
                  {currentOffer.bedrooms}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {currentOffer.maxAdults} adults
                </li>
              </ul>

              <div className="offer__price">
                <b className="offer__price-value">&euro;{currentOffer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>
              {currentOffer.goods &&
                <div className="offer__inside">
                  <h2 className="offer__inside-title">What&apos;s inside</h2>
                  <ul className="offer__inside-list">
                    {currentOffer.goods.map((good: string) => (
                      <li className="offer__inside-item" key={good}>
                        {good}
                      </li>
                    ))}
                  </ul>
                </div>}

              {currentOffer.goods &&
                <Host currentOffer={currentOffer} />}

              <section className="offer__reviews reviews">
                < ReviewsList currentOffer={currentOffer} />
                {authStatus === AuthorizationStatus.Auth && <ReviewForm />}
              </section>
            </div>
          </div>
          <Map
            className='offer__map'
            isActiveCard={currentOffer.id}
          />
        </section>

        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {offers.slice(0, 3).map((offer) => (
                <NearOffer card={offer} key={offer.id} updateFavorites={updateFavorites} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
