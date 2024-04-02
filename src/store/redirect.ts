import { PayloadAction } from '@reduxjs/toolkit';
import browserHistory from '../components/history/browser-history';
import {Middleware} from 'redux';


export const redirect: Middleware<unknown> =
  () =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === 'redirectToRouteAction') {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
