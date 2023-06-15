import axios from 'axios';
import queryString from 'query-string';
import { OperationPlanInterface, OperationPlanGetQueryInterface } from 'interfaces/operation-plan';
import { GetQueryInterface } from '../../interfaces';

export const getOperationPlans = async (query?: OperationPlanGetQueryInterface) => {
  const response = await axios.get(`/api/operation-plans${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createOperationPlan = async (operationPlan: OperationPlanInterface) => {
  const response = await axios.post('/api/operation-plans', operationPlan);
  return response.data;
};

export const updateOperationPlanById = async (id: string, operationPlan: OperationPlanInterface) => {
  const response = await axios.put(`/api/operation-plans/${id}`, operationPlan);
  return response.data;
};

export const getOperationPlanById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/operation-plans/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteOperationPlanById = async (id: string) => {
  const response = await axios.delete(`/api/operation-plans/${id}`);
  return response.data;
};
