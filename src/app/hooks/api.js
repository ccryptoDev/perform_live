import React, { createContext, useContext } from 'react';
import axios from 'axios';
import globalConfig from 'app/config/index.config';
import { createServices } from '../services';

export const api = axios.create({
  baseURL: globalConfig.SERVER_URL,
});

api.interceptors.request.use(
  config => {
    // config.responseType = 'json';
    const token = localStorage.getItem('token');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  },
);
api.interceptors.response.use(
  resp => resp.data,
  error => {
    if (process.env.NODE_ENV !== 'production') {
      console.groupCollapsed(
        '%c<= RESPONSE ERROR' + ` %c${error.response.status}\n`,
        'color:red',
        'color:purple',
      );
      console.error(error);
      console.error(error.response);
      console.groupEnd();
    }

    if (!error.response) {
      return Promise.reject(null);
    }
    return Promise.reject({ ...error.response });
  },
);

export const stripeApi = axios.create({
  baseURL: globalConfig.SERVER_URL,
});

stripeApi.interceptors.request.use(
  config => {
    // config.responseType = 'json';
    config.headers.Authorization = `Bearer ${globalConfig.STRIPE_KEY}`;
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  },
);
stripeApi.interceptors.response.use(
  resp => resp.data,
  error => {
    if (process.env.NODE_ENV !== 'production') {
      console.groupCollapsed(
        '%c<= RESPONSE ERROR' + ` %c${error.response}\n`,
        'color:red',
        'color:purple',
      );
      console.error(error);
      console.error(error.response);
      console.groupEnd();
    }

    if (!error.response) {
      return Promise.reject(null);
    }
    return Promise.reject({ ...error.response });
  },
);

export const ApiContext = createContext({});

const services = createServices(api, stripeApi);

export function ApiProvider({ children }) {
  return <ApiContext.Provider value={services}>{children}</ApiContext.Provider>;
}

export function useApi(service) {
  const ctx = useContext(ApiContext);
  if (service) {
    return ctx[service];
  }
  return ctx;
}

export default useApi;
