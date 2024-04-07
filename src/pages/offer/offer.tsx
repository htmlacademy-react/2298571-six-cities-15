import NotFound from '../404/not-found';
import ReviewForm from '../../components/review-form/review-form';
import { AuthorizationStatus } from '../../const';
import Host from '../../components/host/host';
import Map from '../../components/map/map';
import { useAppSelector } from '../../hooks';
import Bookmarks from '../../components/bookmarks/bookmarks';
import NearOffer from '../../components/near-offer/near-offer';
import { capitalizeString } from '../../utils';
import CommentsList from '../../components/comments-list/comments-list';

export default function Offer(): JSX.Element {
  const currentOffer = useAppSelector((initialState) => initialState.currentOfferDetails);
  const authStatus = useAppSelector((initialState) => initialState.authStatus);
  const nearByOffers = useAppSelector((initialState) => initialState.nearByOffers);

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
                <Bookmarks
                  card={currentOffer}
                  className={{ bookmark: 'offer' }}
                  iconSize = {{ width: 31, height: 33 }}
                />
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
                  {capitalizeString(currentOffer.type)}
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
                < CommentsList />
                {authStatus === AuthorizationStatus.Auth && <ReviewForm />}
              </section>
            </div>
          </div>
          <Map
            className='offer__map'
            isActiveCard={currentOffer.id}
            mappedOffers={[currentOffer, ...nearByOffers]}
          />
        </section>

        <NearOffer />
      </main>
    </div>
  );
}
