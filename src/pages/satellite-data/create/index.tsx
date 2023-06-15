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
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createSatelliteData } from 'apiSdk/satellite-data';
import { Error } from 'components/error';
import { satelliteDataValidationSchema } from 'validationSchema/satellite-data';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { SatelliteOperatorInterface } from 'interfaces/satellite-operator';
import { getSatelliteOperators } from 'apiSdk/satellite-operators';
import { SatelliteDataInterface } from 'interfaces/satellite-data';

function SatelliteDataCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: SatelliteDataInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createSatelliteData(values);
      resetForm();
      router.push('/satellite-data');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<SatelliteDataInterface>({
    initialValues: {
      data: '',
      satellite_operator_id: (router.query.satellite_operator_id as string) ?? null,
    },
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
            Create Satellite Data
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
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
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'satellite_data',
  operation: AccessOperationEnum.CREATE,
})(SatelliteDataCreatePage);
