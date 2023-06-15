import * as yup from 'yup';
import { customerRequestValidationSchema } from 'validationSchema/customer-requests';
import { operationPlanValidationSchema } from 'validationSchema/operation-plans';
import { satelliteDataValidationSchema } from 'validationSchema/satellite-data';

export const satelliteOperatorValidationSchema = yup.object().shape({
  description: yup.string(),
  image: yup.string(),
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
  customer_request: yup.array().of(customerRequestValidationSchema),
  operation_plan: yup.array().of(operationPlanValidationSchema),
  satellite_data: yup.array().of(satelliteDataValidationSchema),
});
