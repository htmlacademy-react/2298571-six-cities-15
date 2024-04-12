import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { AuthData, CommentsType, PlaceType, UserData, FavoriteCardStatusType } from '../types/types';
import { ApiRoute, AppRoute, AuthorizationStatus } from '../const';
import {
  loadOffersAction,
  redirectToRouteAction,
  requareAuthAction,
  setDataLoadingStatusAction,
  loadOfferDetailsAction,
  loadCommentsAction,
  loadNearByOffersAction,
  updateCommentsAction,
  loadFavoriteCardsAction,
} from './actions';
import { deleteToken, saveToken } from '../services/token';

export const fetchOffersData = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/loadOffersAction',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setDataLoadingStatusAction(true));
    const { data } = await api.get<PlaceType[]>(ApiRoute.Offers);
    dispatch(setDataLoadingStatusAction(false));
    dispatch(loadOffersAction(data));
  });

export const fetchOfferDetails = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/loadOfferDetailsAction',
  async (offerId, { dispatch, extra: api }) => {
    dispatch(setDataLoadingStatusAction(true));
    const { data } = await api.get<PlaceType>(`${ApiRoute.Offers}/${offerId}`);
    dispatch(setDataLoadingStatusAction(false));
    dispatch(loadOfferDetailsAction(data));
  }
);

export const fetchFavoriteOffers = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'favorites/loadFavoriteCardsAction',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<PlaceType[]>(ApiRoute.Favorite);
    dispatch(loadFavoriteCardsAction(data));
  });

export const changeFavorites = createAsyncThunk<void, FavoriteCardStatusType, {
  state: State;
  extra: AxiosInstance;
}>(
  'favorites/createNewFavorite',
  async (payload, { extra: api }) => {
    const { offerId, status } = payload;
    await api.post<PlaceType>(`${ApiRoute.Favorite}/${offerId}/${status}`, {
      status,
    });
  }
);

export const fetchOfferComments = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/loadCommentsAction',
  async (offerId, { dispatch, extra: api }) => {
    dispatch(setDataLoadingStatusAction(true));
    const { data } = await api.get<CommentsType[]>(`${ApiRoute.Comments}/${offerId}`);
    dispatch(setDataLoadingStatusAction(false));
    dispatch(loadCommentsAction(data));
  });

export const createNewComment = createAsyncThunk<
  CommentsType,
  { offerId: string; comment: string; rating: number },
  {
    state: State;
    extra: AxiosInstance;
  }
>(
  'offer/updateCommentsAction',
  async ({ offerId, comment, rating }, { extra: api, dispatch }) => {
    const response = await api.post<CommentsType>(`${ApiRoute.Comments}/${offerId}`, {
      comment,
      rating,
    });
    dispatch(updateCommentsAction(response.data));
    return response.data;
  }
);

export const fetchOfferNearBy = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/loadNearByOffersAction',
  async (offerId, { dispatch, extra: api }) => {
    dispatch(setDataLoadingStatusAction(true));
    const { data } = await api.get<PlaceType[]>(`${ApiRoute.Offers}/${offerId}/nearby`);
    dispatch(setDataLoadingStatusAction(false));
    dispatch(loadNearByOffersAction(data.slice(0, 3)));
  });

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/requareAuthAction',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get<PlaceType[]>(ApiRoute.Login);
      dispatch(requareAuthAction(AuthorizationStatus.Auth));
    } catch {
      dispatch(requareAuthAction(AuthorizationStatus.NoAuth));
    }
  });

export const loginAction = createAsyncThunk<string, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/loginAction',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data: { token } } = await api.post<UserData>(ApiRoute.Login, { email, password });
    saveToken(token);
    localStorage.setItem('user', email);
    dispatch(requareAuthAction(AuthorizationStatus.Auth));
    dispatch(redirectToRouteAction(AppRoute.Favorites));
    return email;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logoutAction',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(ApiRoute.Logout);
    deleteToken();
    localStorage.removeItem('user');
    dispatch(requareAuthAction(AuthorizationStatus.NoAuth));
  },
);
