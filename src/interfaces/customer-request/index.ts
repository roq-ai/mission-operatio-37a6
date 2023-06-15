import { UserInterface } from 'interfaces/user';
import { SatelliteOperatorInterface } from 'interfaces/satellite-operator';
import { GetQueryInterface } from 'interfaces';

export interface CustomerRequestInterface {
  id?: string;
  customer_id: string;
  satellite_operator_id: string;
  service: string;
  status: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  satellite_operator?: SatelliteOperatorInterface;
  _count?: {};
}

export interface CustomerRequestGetQueryInterface extends GetQueryInterface {
  id?: string;
  customer_id?: string;
  satellite_operator_id?: string;
  service?: string;
  status?: string;
}
