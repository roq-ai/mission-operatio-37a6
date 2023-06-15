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
import { getCustomerRequestById, updateCustomerRequestById } from 'apiSdk/customer-requests';
import { Error } from 'components/error';
import { customerRequestValidationSchema } from 'validationSchema/customer-requests';
import { CustomerRequestInterface } from 'interfaces/customer-request';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { SatelliteOperatorInterface } from 'interfaces/satellite-operator';
import { getUsers } from 'apiSdk/users';
import { getSatelliteOperators } from 'apiSdk/satellite-operators';

function CustomerRequestEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<CustomerRequestInterface>(
    () => (id ? `/customer-requests/${id}` : null),
    () => getCustomerRequestById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: CustomerRequestInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateCustomerRequestById(id, values);
      mutate(updated);
      resetForm();
      router.push('/customer-requests');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<CustomerRequestInterface>({
    initialValues: data,
    validationSchema: customerRequestValidationSchema,
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
            Edit Customer Request
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
            <FormControl id="service" mb="4" isInvalid={!!formik.errors?.service}>
              <FormLabel>Service</FormLabel>
              <Input type="text" name="service" value={formik.values?.service} onChange={formik.handleChange} />
              {formik.errors.service && <FormErrorMessage>{formik.errors?.service}</FormErrorMessage>}
            </FormControl>
            <FormControl id="status" mb="4" isInvalid={!!formik.errors?.status}>
              <FormLabel>Status</FormLabel>
              <Input type="text" name="status" value={formik.values?.status} onChange={formik.handleChange} />
              {formik.errors.status && <FormErrorMessage>{formik.errors?.status}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<UserInterface>
              formik={formik}
              name={'customer_id'}
              label={'Select User'}
              placeholder={'Select User'}
              fetcher={getUsers}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.email}
                </option>
              )}
            />
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
  entity: 'customer_request',
  operation: AccessOperationEnum.UPDATE,
})(CustomerRequestEditPage);
