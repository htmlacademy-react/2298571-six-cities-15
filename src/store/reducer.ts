import { createReducer } from '@reduxjs/toolkit';
import { AVAILABLE_CITIES } from '../data';
import { CommentsType, PlaceType } from '../types/types';
import {
  updateCityAction, loadOffersAction, requareAuthAction, updateCommentsAction,
  setDataLoadingStatusAction, loadFavoriteCardsAction, loadOfferDetailsAction, loadCommentsAction, loadNearByOffersAction,
} from './actions';
import { AuthorizationStatus } from '../const';
import { loginAction } from './api-actions';

type InitialState = {
  activeCity: string;
  offers: PlaceType[];
  currentOfferDetails: PlaceType | null;
  authStatus: AuthorizationStatus;
  loadingData: boolean;
  favoriteCards: PlaceType[];
  currentOfferComments: CommentsType[];
  nearByOffers: PlaceType[];
  user: string | null;
};

const initialState: InitialState = {
  activeCity: AVAILABLE_CITIES[0].name,
  offers: [],
  currentOfferDetails: null,
  authStatus: AuthorizationStatus.Unknown,
  loadingData: false,
  favoriteCards: [],
  currentOfferComments: [],
  nearByOffers: [],
  user: localStorage.getItem('user') || '',
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(updateCityAction, (state, action) => {
      state.activeCity = action.payload;
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
    .addCase(updateCommentsAction, (state, action) => {
      state.currentOfferComments = [...state.currentOfferComments, action.payload];
    })
    .addCase(loadFavoriteCardsAction, (state, action) => {
      state.favoriteCards = action.payload;
    })
    .addCase(loginAction.fulfilled, (state, action) => {
      state.user = action.payload;
    });
});

export { reducer };
