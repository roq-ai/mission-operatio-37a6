import * as yup from 'yup';

export const operationPlanValidationSchema = yup.object().shape({
  name: yup.string().required(),
  status: yup.string().required(),
  satellite_operator_id: yup.string().nullable().required(),
  mission_analyst_id: yup.string().nullable().required(),
});
