import axios from 'axios';
import queryString from 'query-string';
import { SatelliteOperatorInterface, SatelliteOperatorGetQueryInterface } from 'interfaces/satellite-operator';
import { GetQueryInterface } from '../../interfaces';

export const getSatelliteOperators = async (query?: SatelliteOperatorGetQueryInterface) => {
  const response = await axios.get(`/api/satellite-operators${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createSatelliteOperator = async (satelliteOperator: SatelliteOperatorInterface) => {
  const response = await axios.post('/api/satellite-operators', satelliteOperator);
  return response.data;
};

export const updateSatelliteOperatorById = async (id: string, satelliteOperator: SatelliteOperatorInterface) => {
  const response = await axios.put(`/api/satellite-operators/${id}`, satelliteOperator);
  return response.data;
};

export const getSatelliteOperatorById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/satellite-operators/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSatelliteOperatorById = async (id: string) => {
  const response = await axios.delete(`/api/satellite-operators/${id}`);
  return response.data;
};
