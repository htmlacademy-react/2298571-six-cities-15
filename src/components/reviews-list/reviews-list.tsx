import { reviews } from '../../mocks/reviews';
import { PlaceType, ReviewType } from '../../types/types';
import Review from '../review/review';


type ReviewsListProps = {
  currentOffer: PlaceType;
}

export default function ReviewsList({ currentOffer }: ReviewsListProps): JSX.Element {
  const offerReview: ReviewType[] = reviews.filter((review) => review.id === currentOffer.id);

  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{offerReview.length}</span></h2>
      <ul className="reviews__list">
        {offerReview.map((review) => (
          < Review key={review.id} review={review} />
        ))}
      </ul>
    </>
  );
}
