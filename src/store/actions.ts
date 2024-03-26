import { createAction } from '@reduxjs/toolkit';
import { PlaceType } from '../types/types';

export const updateCityAction = createAction<string>('updateCityAction');
export const updateCityCardsAction = createAction<PlaceType[]>('updateCityCards');
