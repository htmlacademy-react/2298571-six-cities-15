import { MAX_COMMENTS_COUNT } from '../../const';
import { useAppSelector } from '../../hooks';
import Review from '../review/review';


export default function CommentsList(): JSX.Element {
  const currentOfferComments = useAppSelector((initialState) => initialState.currentOfferComments);
  const sortedComments = [...currentOfferComments].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const slicedComments = sortedComments.slice(0, MAX_COMMENTS_COUNT);

  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{currentOfferComments && currentOfferComments.length}</span></h2>
      <ul className="reviews__list">
        {slicedComments && slicedComments.map((review) => (
          < Review key={review.id} review={review} />
        ))}
      </ul>
    </>
  );
}
