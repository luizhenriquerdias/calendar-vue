import { api } from './axios';

export const getWeatherByCityId = id => api.get(`weather?id=${id}`);
