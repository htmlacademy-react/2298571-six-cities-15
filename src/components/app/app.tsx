import Main from '../../pages/main/main';

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

export default function App() {
  const DATA: PlaceType[] = [
    {
      id: 1,
      city: 'Amsterdam',
      src: 'img/apartment-01.jpg',
      premium: true,
      bookmarks: false,
      price: 120,
      rating: 80,
      description: 'Beautiful & luxurious apartment at great location',
      type: 'Apartment'
    },
    {
      id: 2,
      city: 'Amsterdam',
      src: 'img/room.jpg',
      premium: false,
      bookmarks: true,
      price: 80,
      rating: 80,
      description: 'Wood and stone place',
      type: 'Room'
    },
    {
      id: 3,
      city: 'Amsterdam',
      src: 'img/apartment-02.jpg',
      premium: false,
      bookmarks: false,
      price: 132,
      rating: 80,
      description: 'Canal View Prinsengracht',
      type: 'Apartment'
    },
    {
      id: 4,
      city: 'Amsterdam',
      src: 'img/apartment-03.jpg',
      premium: true,
      bookmarks: false,
      price: 180,
      rating: 100,
      description: 'Nice, cozy, warm big bed apartment',
      type: 'Apartment'
    },
    {
      id: 5,
      city: 'Amsterdam',
      src: 'img/room.jpg',
      premium: false,
      bookmarks: true,
      price: 80,
      rating: 80,
      description: 'Wood and stone place',
      type: 'Room'
    }
  ];
  return (
    <Main DATA = {DATA}/>
  );
}
