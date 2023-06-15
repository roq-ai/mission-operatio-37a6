import { SatelliteOperatorInterface } from 'interfaces/satellite-operator';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface OperationPlanInterface {
  id?: string;
  satellite_operator_id: string;
  mission_analyst_id: string;
  name: string;
  status: string;
  created_at?: any;
  updated_at?: any;

  satellite_operator?: SatelliteOperatorInterface;
  user?: UserInterface;
  _count?: {};
}

export interface OperationPlanGetQueryInterface extends GetQueryInterface {
  id?: string;
  satellite_operator_id?: string;
  mission_analyst_id?: string;
  name?: string;
  status?: string;
}
