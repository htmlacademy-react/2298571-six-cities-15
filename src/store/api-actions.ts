import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state';
import { AxiosInstance } from 'axios';
import { AuthData, PlaceType, UserData } from '../types/types';
import { ApiRoute, AppRoute, AuthorizationStatus } from '../const';
import { loadOffersAction, redirectToRouteAction, requareAuthAction, setDataLoadingStatusAction } from './actions';
import { deleteToken, saveToken } from '../services/token';

export const fetchOffersData = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'loadOffersAction',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setDataLoadingStatusAction(true));
    const { data } = await api.get<PlaceType[]>(ApiRoute.Offers);
    dispatch(setDataLoadingStatusAction(false));
    dispatch(loadOffersAction(data));
  });

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'requareAuthAction',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.get<PlaceType[]>(ApiRoute.Login);
      dispatch(requareAuthAction(AuthorizationStatus.Auth));
    } catch {
      dispatch(requareAuthAction(AuthorizationStatus.NoAuth));
    }
  });

export const loginAction = createAsyncThunk<void, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'loginAction',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const { data: { token } } = await api.post<UserData>(ApiRoute.Login, { email, password });
    saveToken(token);
    dispatch(requareAuthAction(AuthorizationStatus.Auth));
    dispatch(redirectToRouteAction(AppRoute.Favorites));
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'logoutAction',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete(ApiRoute.Logout);
    deleteToken();
    dispatch(requareAuthAction(AuthorizationStatus.NoAuth));
  },
);
