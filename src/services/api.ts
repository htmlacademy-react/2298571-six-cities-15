import axios, { AxiosError, AxiosInstance } from 'axios';
import { StatusCodes } from 'http-status-codes';
import { getToken } from './token';
import { ErrorMessage } from '../types/types';
import { toast } from 'react-toastify';
import { ERROR_TIMER, Errors } from '../const';

const URL = 'https://15.design.htmlacademy.pro/six-cities';
const REQUEST_TIMEOUT = ERROR_TIMER;

const StatusCodeMapping: Record<number, boolean> = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: false,
  [StatusCodes.NOT_FOUND]: true
};

const shouldDisplayError = (error: AxiosError<ErrorMessage>) => StatusCodeMapping[error.response?.status || 0];

export const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config) => {
    const token = getToken();
    if (token && config.headers) {
      config.headers['x-token'] = token;
    }
    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ErrorMessage>) => {
      if (error.response && shouldDisplayError(error)) {
        const detailMessage = (error.response.data);
        const errorMessage = detailMessage.message || Errors.REVIEW_MESSAGE;
        const fullErrorMessage = `${errorMessage}: ${error.message}`;
        toast.error(fullErrorMessage);
      }

      throw error;
    }
  );

  return api;
};
