type PlaceType = {
  id: number;
  city: string;
  src: string;
  premium: boolean;
  bookmarks: boolean;
  price: number;
  rating: number;
  description: string;
  type: string;
};

type CardProps = {
  src: string;
  premium: boolean;
  bookmarks: boolean;
  price: number;
  rating: number;
  description: string;
  type: string;
}

export type { PlaceType, CardProps };
