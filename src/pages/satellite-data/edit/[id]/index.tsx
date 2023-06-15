import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getSatelliteDataById, updateSatelliteDataById } from 'apiSdk/satellite-data';
import { Error } from 'components/error';
import { satelliteDataValidationSchema } from 'validationSchema/satellite-data';
import { SatelliteDataInterface } from 'interfaces/satellite-data';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { SatelliteOperatorInterface } from 'interfaces/satellite-operator';
import { getSatelliteOperators } from 'apiSdk/satellite-operators';

function SatelliteDataEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<SatelliteDataInterface>(
    () => (id ? `/satellite-data/${id}` : null),
    () => getSatelliteDataById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: SatelliteDataInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateSatelliteDataById(id, values);
      mutate(updated);
      resetForm();
      router.push('/satellite-data');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<SatelliteDataInterface>({
    initialValues: data,
    validationSchema: satelliteDataValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Satellite Data
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="data" mb="4" isInvalid={!!formik.errors?.data}>
              <FormLabel>Data</FormLabel>
              <Input type="text" name="data" value={formik.values?.data} onChange={formik.handleChange} />
              {formik.errors.data && <FormErrorMessage>{formik.errors?.data}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<SatelliteOperatorInterface>
              formik={formik}
              name={'satellite_operator_id'}
              label={'Select Satellite Operator'}
              placeholder={'Select Satellite Operator'}
              fetcher={getSatelliteOperators}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.name}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'satellite_data',
  operation: AccessOperationEnum.UPDATE,
})(SatelliteDataEditPage);
