import { FormEvent, Fragment, ReactEventHandler, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { createNewComment } from '../../store/api-actions';
import { Errors, Reviews, ratingStars } from '../../const';
import { toast } from 'react-toastify';

type FormChangeHandler = ReactEventHandler<HTMLInputElement | HTMLTextAreaElement>;

export default function ReviewForm(): JSX.Element {
  const currentOffer = useAppSelector((initialState) => initialState.currentOfferDetails);
  const offerId = currentOffer ? currentOffer.id : '';
  const [review, setReview] = useState({ rating: 0, comment: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const dispatch = useAppDispatch();

  const handleFormChange: FormChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    setReview((prevReview) => ({
      ...prevReview,
      [name]: name === 'comment' ? value : parseInt(value, 10),
    }));
  };

  const handleSubmitClick = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    setIsSubmitting(true);

    dispatch(createNewComment({
      offerId,
      comment: review.comment,
      rating: Number(review.rating),
    }))
      .then(() => {
        setReview({ rating: 0, comment: '' });
        setIsSubmitting(false);
      })
      .catch(() => {
        toast.error(Errors.REVIEW_MESSAGE);
        setIsSubmitting(false);
      });
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmitClick}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {ratingStars.map(({ value, label }) => (
          <Fragment key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
              checked={review.rating === value}
              onChange={handleFormChange}
            />
            <label
              htmlFor={`${value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={label}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="comment"
        value={review.comment}
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleFormChange}
        disabled={isSubmitting}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isSubmitting ||
            review.comment.length < Reviews.MIN_COMMENT_SYMBOLS ||
            review.comment.length > Reviews.MAX_COMMENT_SYMBOLS ||
            review.rating === Reviews.DISABLE_STARS_COUNT}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
