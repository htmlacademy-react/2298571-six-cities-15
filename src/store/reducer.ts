import { createReducer } from '@reduxjs/toolkit';
import { AVAILABLE_CITIES } from '../data';
import { CommentsType, PlaceType } from '../types/types';
import {
  updateCityCardsAction, updateCityAction, updateSortedCardsAction, loadOffersAction, requareAuthAction,
  setDataLoadingStatusAction, updateFavoriteCardsAction, loadOfferDetailsAction, loadCommentsAction, loadNearByOffersAction
} from './actions';
import { AuthorizationStatus } from '../const';
import { sendNewComment } from './api-actions';

type InitialState = {
  activeCity: string;
  offers: PlaceType[];
  currentOfferDetails: PlaceType | null;
  cityCards: PlaceType[];
  sortedCityCards: PlaceType[];
  authStatus: AuthorizationStatus;
  loadingData: boolean;
  favoriteCards: PlaceType[] | null;
  currentOfferComments: CommentsType[];
  nearByOffers: PlaceType[];
};

const initialState: InitialState = {
  activeCity: AVAILABLE_CITIES[0].name,
  offers: [],
  currentOfferDetails: null,
  cityCards: [],
  sortedCityCards: [],
  authStatus: AuthorizationStatus.Unknown,
  loadingData: false,
  favoriteCards: [],
  currentOfferComments: [],
  nearByOffers: []
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
    .addCase(loadOfferDetailsAction, (state, action) => {
      state.currentOfferDetails = action.payload;
    })
    .addCase(loadCommentsAction, (state, action) => {
      state.currentOfferComments = action.payload;
    })
    .addCase(loadNearByOffersAction, (state, action) => {
      state.nearByOffers = action.payload;
    })
    .addCase(requareAuthAction, (state, action) => {
      state.authStatus = action.payload;
    })
    .addCase(setDataLoadingStatusAction, (state, action) => {
      state.loadingData = action.payload;
    })
    .addCase(sendNewComment.fulfilled, (state, action) => {
      state.currentOfferComments = Array.isArray(action.payload)
        ? [...state.currentOfferComments, ...action.payload]
        : [...state.currentOfferComments, action.payload];
    })
    .addCase(updateFavoriteCardsAction, (state, action) => {
      state.favoriteCards = action.payload;
    });
});

export { reducer };
