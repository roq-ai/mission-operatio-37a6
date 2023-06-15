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
import { createOperationPlan } from 'apiSdk/operation-plans';
import { Error } from 'components/error';
import { operationPlanValidationSchema } from 'validationSchema/operation-plans';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { SatelliteOperatorInterface } from 'interfaces/satellite-operator';
import { UserInterface } from 'interfaces/user';
import { getSatelliteOperators } from 'apiSdk/satellite-operators';
import { getUsers } from 'apiSdk/users';
import { OperationPlanInterface } from 'interfaces/operation-plan';

function OperationPlanCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: OperationPlanInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createOperationPlan(values);
      resetForm();
      router.push('/operation-plans');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<OperationPlanInterface>({
    initialValues: {
      name: '',
      status: '',
      satellite_operator_id: (router.query.satellite_operator_id as string) ?? null,
      mission_analyst_id: (router.query.mission_analyst_id as string) ?? null,
    },
    validationSchema: operationPlanValidationSchema,
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
            Create Operation Plan
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="name" mb="4" isInvalid={!!formik.errors?.name}>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" value={formik.values?.name} onChange={formik.handleChange} />
            {formik.errors.name && <FormErrorMessage>{formik.errors?.name}</FormErrorMessage>}
          </FormControl>
          <FormControl id="status" mb="4" isInvalid={!!formik.errors?.status}>
            <FormLabel>Status</FormLabel>
            <Input type="text" name="status" value={formik.values?.status} onChange={formik.handleChange} />
            {formik.errors.status && <FormErrorMessage>{formik.errors?.status}</FormErrorMessage>}
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
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'mission_analyst_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
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
  entity: 'operation_plan',
  operation: AccessOperationEnum.CREATE,
})(OperationPlanCreatePage);
