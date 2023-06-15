import axios from 'axios';
import queryString from 'query-string';
import { CustomerRequestInterface, CustomerRequestGetQueryInterface } from 'interfaces/customer-request';
import { GetQueryInterface } from '../../interfaces';

export const getCustomerRequests = async (query?: CustomerRequestGetQueryInterface) => {
  const response = await axios.get(`/api/customer-requests${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createCustomerRequest = async (customerRequest: CustomerRequestInterface) => {
  const response = await axios.post('/api/customer-requests', customerRequest);
  return response.data;
};

export const updateCustomerRequestById = async (id: string, customerRequest: CustomerRequestInterface) => {
  const response = await axios.put(`/api/customer-requests/${id}`, customerRequest);
  return response.data;
};

export const getCustomerRequestById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/customer-requests/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCustomerRequestById = async (id: string) => {
  const response = await axios.delete(`/api/customer-requests/${id}`);
  return response.data;
};
