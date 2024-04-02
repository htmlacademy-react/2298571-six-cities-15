import { useState, useEffect, useRef } from 'react';
import { PlaceType } from '../../types/types';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { updateSortedCardsAction } from '../../store/actions';
import { useOutsideClick } from '../../hooks/custom-hook';

type SortOption = {
  key: string;
  label: string;
  sortFunction: (a: PlaceType, b: PlaceType) => number;
};

const sortOptions: SortOption[] = [
  { key: 'popular', label: 'Popular', sortFunction: () => 0 },
  { key: 'priceLowToHigh', label: 'Price: low to high', sortFunction: (a, b) => a.price - b.price },
  { key: 'priceHighToLow', label: 'Price: high to low', sortFunction: (a, b) => b.price - a.price },
  { key: 'topRatedFirst', label: 'Top rated first', sortFunction: (a, b) => b.rating - a.rating },
];

export default function Sort(): JSX.Element {
  const cityCards = useAppSelector((initialState) => initialState.cityCards);
  const [formIsOpen, setFormIsOpen] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>(sortOptions[0].key);
  const dispatch = useAppDispatch();
  const formRef = useRef<HTMLFormElement>(null);

  const sortCityCards = (sortOption: string, offers: PlaceType[]) => {
    const selectedSortOption = sortOptions.find((option) => option.key === sortOption);
    if (selectedSortOption) {
      const sortedCityCards = [...offers].sort(selectedSortOption.sortFunction);
      dispatch(updateSortedCardsAction(sortedCityCards));
    }
  };

  useEffect(() => {
    sortCityCards(sortBy, cityCards);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cityCards, sortBy]);

  const handleSortChange = (sortOption: string) => {
    setSortBy(sortOption);
    setFormIsOpen(false);
    sortCityCards(sortOption, cityCards);
  };

  useOutsideClick(formRef, () => {
    setFormIsOpen(false);
  });

  const handleToggleOpen = () => {
    setFormIsOpen((prev) => !prev);
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
