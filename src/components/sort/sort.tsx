import { useState, useEffect, useRef } from 'react';
import { PlaceType } from '../../types/types';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { updateSortedCardsAction } from '../../store/actions';

const sortOptions = [
  { key: 'popular', label: 'Popular' },
  { key: 'priceLowToHigh', label: 'Price: low to high' },
  { key: 'priceHighToLow', label: 'Price: high to low' },
  { key: 'topRatedFirst', label: 'Top rated first' },
];

export default function Sort(): JSX.Element {
  const cityCards = useAppSelector((initialState) => initialState.cityCards);
  const [formIsOpen, setFormIsOpen] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>(sortOptions[0].key);
  const dispatch = useAppDispatch();
  const formRef = useRef<HTMLFormElement>(null);

  const sortCityCards = (sortOption: string, offers: PlaceType[]) => {
    let sortedCityCards: PlaceType[] = [...offers];

    switch (sortOption) {
      case 'popular':
        sortedCityCards = [...offers];
        break;
      case 'priceLowToHigh':
        sortedCityCards.sort((a, b) => a.price - b.price);
        break;
      case 'priceHighToLow':
        sortedCityCards.sort((a, b) => b.price - a.price);
        break;
      case 'topRatedFirst':
        sortedCityCards.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    dispatch(updateSortedCardsAction(sortedCityCards));
  };

  useEffect(() => {
    sortCityCards(sortBy, cityCards);
  }, [cityCards, sortBy]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setFormIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [formRef]);

  const handleToggleOpen = () => {
    setFormIsOpen((prev) => !prev);
  };

  const handleSortChange = (sortOption: string) => {
    setSortBy(sortOption);
    setFormIsOpen(false);
    sortCityCards(sortOption, cityCards);
  };

  return (
    <form className="places__sorting" action="#" method="get" ref={formRef}>
      <span className="places__sorting-caption">Sort by</span>
      <span className="places__sorting-type" tabIndex={0} onClick={handleToggleOpen}>
        {sortOptions.find((option) => option.key === sortBy)?.label}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${formIsOpen ? 'places__options--opened' : ''}`}>
        {sortOptions.map((option) => (
          <li
            key={option.key}
            className={`places__option ${sortBy === option.key ? 'places__option--active' : ''}`}
            tabIndex={0}
            onClick={() => handleSortChange(option.key)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </form>
  );
}
