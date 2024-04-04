import { createAction } from '@reduxjs/toolkit';
import { PlaceType } from '../types/types';
import { AppRoute, AuthorizationStatus } from '../const';

export const updateCityAction = createAction<string>('updateCityAction');
export const updateCityCardsAction = createAction<PlaceType[]>('updateCityCardsAction');
export const updateSortedCardsAction = createAction<PlaceType[]>('updateSortedCardsAction');
export const loadOffersAction = createAction<PlaceType[]>('loadOffersAction');
export const requareAuthAction = createAction<AuthorizationStatus>('requareAuthAction');
export const setDataLoadingStatusAction = createAction<boolean>('setDataLoadingStatusAction');
export const redirectToRouteAction = createAction<AppRoute>('redirectToRouteAction');
export const updateFavoriteCardsAction = createAction<PlaceType[]>('updateFavoriteCardsAction');
