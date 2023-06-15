import { SatelliteOperatorInterface } from 'interfaces/satellite-operator';
import { GetQueryInterface } from 'interfaces';

export interface SatelliteDataInterface {
  id?: string;
  satellite_operator_id: string;
  data: string;
  created_at?: any;
  updated_at?: any;

  satellite_operator?: SatelliteOperatorInterface;
  _count?: {};
}

export interface SatelliteDataGetQueryInterface extends GetQueryInterface {
  id?: string;
  satellite_operator_id?: string;
  data?: string;
}
