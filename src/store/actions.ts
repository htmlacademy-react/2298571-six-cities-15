import { createAction } from '@reduxjs/toolkit';
import { CommentsType, PlaceType } from '../types/types';
import { AppRoute, AuthorizationStatus } from '../const';

export const updateCityAction = createAction<string>('updateCityAction');
export const updateCityCardsAction = createAction<PlaceType[]>('updateCityCardsAction');
export const updateSortedCardsAction = createAction<PlaceType[]>('updateSortedCardsAction');
export const loadOffersAction = createAction<PlaceType[]>('loadOffersAction');
export const loadOfferDetailsAction = createAction<PlaceType>('loadOfferDetailsAction');
export const loadCommentsAction = createAction<CommentsType[]>('loadCommentsAction');
export const updateCommentsAction = createAction<CommentsType>('updateCommentsAction');
export const loadNearByOffersAction = createAction<PlaceType[]>('loadNearByOffersAction');
export const requareAuthAction = createAction<AuthorizationStatus>('requareAuthAction');
export const setDataLoadingStatusAction = createAction<boolean>('setDataLoadingStatusAction');
export const redirectToRouteAction = createAction<AppRoute>('redirectToRouteAction');
export const loadFavoriteCardsAction = createAction<PlaceType[]>('loadFavoriteCardsAction');
export const updateFavoriteCardsAction = createAction<PlaceType>('updateFavoriteCardsAction');
