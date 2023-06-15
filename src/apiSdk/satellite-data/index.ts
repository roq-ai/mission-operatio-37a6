import axios from 'axios';
import queryString from 'query-string';
import { SatelliteDataInterface, SatelliteDataGetQueryInterface } from 'interfaces/satellite-data';
import { GetQueryInterface } from '../../interfaces';

export const getSatelliteData = async (query?: SatelliteDataGetQueryInterface) => {
  const response = await axios.get(`/api/satellite-data${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createSatelliteData = async (satelliteData: SatelliteDataInterface) => {
  const response = await axios.post('/api/satellite-data', satelliteData);
  return response.data;
};

export const updateSatelliteDataById = async (id: string, satelliteData: SatelliteDataInterface) => {
  const response = await axios.put(`/api/satellite-data/${id}`, satelliteData);
  return response.data;
};

export const getSatelliteDataById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/satellite-data/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteSatelliteDataById = async (id: string) => {
  const response = await axios.delete(`/api/satellite-data/${id}`);
  return response.data;
};
