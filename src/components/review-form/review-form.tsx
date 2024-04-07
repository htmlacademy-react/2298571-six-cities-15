import { FormEvent, Fragment, ReactEventHandler, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { sendNewComment } from '../../store/api-actions';

type FormChangeHandler = ReactEventHandler<HTMLInputElement | HTMLTextAreaElement>;

export default function ReviewForm(): JSX.Element {
  const currentOffer = useAppSelector((initialState) => initialState.currentOfferDetails);
  const offerId = currentOffer ? currentOffer.id : '';
  const [review, setReview] = useState({ rating: 0, comment: '' });

  const dispatch = useAppDispatch();

  const ratingStars = [
    { value: 5, label: 'perfect' },
    { value: 4, label: 'good' },
    { value: 3, label: 'not bad' },
    { value: 2, label: 'badly' },
    { value: 1, label: 'terribly' }
  ];

  const formChangeHandler: FormChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    setReview({ ...review, [name]: value });
  };

  const submitHandler = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(sendNewComment({
      offerId,
      comment: review.comment,
      rating: Number(review.rating),
    }));
    setReview({ rating: 0, comment: '' });
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={submitHandler}>
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
              onChange={formChangeHandler}
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
        onChange={formChangeHandler}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={review.comment.length < 50 || review.rating === 0}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
