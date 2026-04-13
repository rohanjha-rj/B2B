import { fetchData } from './apiConfig';

export const productServices = {
  getAll: () => fetchData('/products'),
};

export const reportServices = {
  getAll: () => fetchData('/reports'),
};

export const dashboardServices = {
  getAnalytics: () => fetchData('/dashboard'),
};
