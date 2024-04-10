import { createAction } from '@reduxjs/toolkit';
import { CommentsType, PlaceType } from '../types/types';
import { AppRoute, AuthorizationStatus } from '../const';

export const updateCityAction = createAction<string>('city/updateCityAction');
export const updateCityCardsAction = createAction<PlaceType[]>('city/updateCityCardsAction');
export const updateSortedCardsAction = createAction<PlaceType[]>('cards/updateSortedCardsAction');
export const loadOffersAction = createAction<PlaceType[]>('offer/loadOffersAction');
export const loadOfferDetailsAction = createAction<PlaceType>('offer/loadOfferDetailsAction');
export const loadCommentsAction = createAction<CommentsType[]>('offer/loadCommentsAction');
export const updateCommentsAction = createAction<CommentsType>('offer/updateCommentsAction');
export const loadNearByOffersAction = createAction<PlaceType[]>('offer/loadNearByOffersAction');
export const requareAuthAction = createAction<AuthorizationStatus>('user/requareAuthAction');
export const redirectToRouteAction = createAction<AppRoute>('user/redirectToRouteAction');
export const loadFavoriteCardsAction = createAction<PlaceType[]>('favorites/loadFavoriteCardsAction');
export const updateFavoriteCardsAction = createAction<PlaceType>('favorites/updateFavoriteCardsAction');
export const setDataLoadingStatusAction = createAction<boolean>('setDataLoadingStatusAction');
