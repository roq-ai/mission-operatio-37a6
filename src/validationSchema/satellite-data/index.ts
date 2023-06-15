import * as yup from 'yup';

export const satelliteDataValidationSchema = yup.object().shape({
  data: yup.string().required(),
  satellite_operator_id: yup.string().nullable().required(),
});
