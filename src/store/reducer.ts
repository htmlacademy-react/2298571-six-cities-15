import { createReducer } from '@reduxjs/toolkit';
import { AVAILABLE_CITIES } from '../data';
import { PlaceType } from '../types/types';
import { updateCityCardsAction, updateCityAction, updateSortedCardsAction, loadOffersAction, requareAuthAction,
  setDataLoadingStatusAction, updateFavoriteCardsAction } from './actions';
import { AuthorizationStatus } from '../const';

type InitialState = {
  activeCity: string;
  offers: PlaceType[];
  cityCards: PlaceType[];
  sortedCityCards: PlaceType[];
  authStatus: AuthorizationStatus;
  loadingData: boolean;
  favoriteCards: PlaceType[];
};

const initialState: InitialState = {
  activeCity: AVAILABLE_CITIES[0].name,
  offers: [],
  cityCards: [],
  sortedCityCards: [],
  authStatus: AuthorizationStatus.Unknown,
  loadingData: false,
  favoriteCards: [],
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
    })
    .addCase(loadOffersAction, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(requareAuthAction, (state, action) => {
      state.authStatus = action.payload;
    })
    .addCase(setDataLoadingStatusAction, (state, action) => {
      state.loadingData = action.payload;
    })
    .addCase(updateFavoriteCardsAction, (state, action) => {
      state.favoriteCards = action.payload;
    });
});

export { reducer };
