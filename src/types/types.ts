type CardType = {
  'id': string;
  'title': string;
  'type': string;
  'price': number;
  'isFavorite': boolean;
  'isPremium': boolean;
  'rating': number;
  'previewImage': string;
}

type PlaceType = CardType & {
  'city': {
    'name': string;
    'location': {
      'latitude': number;
      'longitude': number;
      'zoom': number;
    };
  };
  'location': {
    'latitude': number;
    'longitude': number;
    'zoom': number;
  };
  'description': string;
  'bedrooms': number;
  'goods': string[];
  'host': {
    'name': string;
    'avatarUrl': string;
    'isPro': boolean;
  };
  'images': string[];
  'maxAdults': number;
}

type Point = {
  'name': string;
  'location': {
    'latitude': number;
    'longitude': number;
    'zoom': number;
  };
}

type ReviewType = {
  'id': string;
  'date': string;
  'user': {
    'name': string;
    'avatarUrl': string;
    'isPro': boolean;
  };
  'comment': string;
  'rating': number;
};

type Points = Point[];

export type { PlaceType, CardType, Point, Points, ReviewType };
