import { CustomerRequestInterface } from 'interfaces/customer-request';
import { OperationPlanInterface } from 'interfaces/operation-plan';
import { SatelliteDataInterface } from 'interfaces/satellite-data';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface SatelliteOperatorInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  customer_request?: CustomerRequestInterface[];
  operation_plan?: OperationPlanInterface[];
  satellite_data?: SatelliteDataInterface[];
  user?: UserInterface;
  _count?: {
    customer_request?: number;
    operation_plan?: number;
    satellite_data?: number;
  };
}

export interface SatelliteOperatorGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
