export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offers'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export const enum ApiRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  Favorite = '/favorite'
}

export const ratingStars = [
  { value: 5, label: 'perfect' },
  { value: 4, label: 'good' },
  { value: 3, label: 'not bad' },
  { value: 2, label: 'badly' },
  { value: 1, label: 'terribly' }
];

export const Reviews = {
  MAX_COMMENTS_COUNT: 10,
  MIN_COMMENT_SYMBOLS: 50,
  MAX_COMMENT_SYMBOLS: 300,
  DISABLE_STARS_COUNT: 0,
};

export const enum Errors {
  REVIEW_MESSAGE = 'Во время отправки отзыва произошла ошибка',
  AUTH_MESSAGE = 'Ошибка авторизации',
}

export const ERROR_TIMER = 5000;

export enum MarkerURL {
  DEFAULT = 'img/pin.svg',
  CURRENT = 'img/pin-active.svg'
}
