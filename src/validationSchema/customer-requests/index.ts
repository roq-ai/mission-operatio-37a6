import * as yup from 'yup';

export const customerRequestValidationSchema = yup.object().shape({
  service: yup.string().required(),
  status: yup.string().required(),
  customer_id: yup.string().nullable().required(),
  satellite_operator_id: yup.string().nullable().required(),
});
