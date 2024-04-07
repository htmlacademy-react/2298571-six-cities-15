import { useAppSelector } from '../../hooks';
import Review from '../review/review';


export default function CommentsList(): JSX.Element {
  const currentOfferComments = useAppSelector((initialState) => initialState.currentOfferComments);

  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{currentOfferComments && currentOfferComments.length}</span></h2>
      <ul className="reviews__list">
        {currentOfferComments && currentOfferComments.map((review) => (
          < Review key={review.id} review={review} />
        ))}
      </ul>
    </>
  );
}
