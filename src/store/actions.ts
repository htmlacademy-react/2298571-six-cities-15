import { createAction } from '@reduxjs/toolkit';
import { CommentsType, PlaceType } from '../types/types';
import { AppRoute, AuthorizationStatus } from '../const';

export const updateCityAction = createAction<string>('data/updateCityAction');
export const loadOffersAction = createAction<PlaceType[]>('data/loadOffersAction');
export const loadOfferDetailsAction = createAction<PlaceType>('data/loadOfferDetailsAction');
export const loadCommentsAction = createAction<CommentsType[]>('data/loadCommentsAction');
export const updateCommentsAction = createAction<CommentsType>('data/updateCommentsAction');
export const loadNearByOffersAction = createAction<PlaceType[]>('data/loadNearByOffersAction');
export const requareAuthAction = createAction<AuthorizationStatus>('user/requareAuthAction');
export const redirectToRouteAction = createAction<AppRoute>('user/redirectToRouteAction');
export const loadFavoriteCardsAction = createAction<PlaceType[]>('data/loadFavoriteCardsAction');
export const setDataLoadingStatusAction = createAction<boolean>('data/setDataLoadingStatusAction');
