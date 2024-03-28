import { createReducer } from '@reduxjs/toolkit';
import { AVAILABLE_CITIES } from '../data';
import { offers } from '../mocks/offers';
import { PlaceType } from '../types/types';
import { updateCityCardsAction, updateCityAction, updateSortedCardsAction } from './actions';

const initialState = {
  activeCity: AVAILABLE_CITIES[0].name,
  offers: offers as PlaceType[],
  cityCards: [] as PlaceType[],
  sortedCityCards: [] as PlaceType[],
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateCityAction, (state, action) => {
      state.activeCity = action.payload;
    })
    .addCase(updateCityCardsAction, (state, action) => {
      state.cityCards = action.payload;
    })
    .addCase(updateSortedCardsAction, (state, action) => {
      state.sortedCityCards = action.payload;
    });
});

export { reducer };
