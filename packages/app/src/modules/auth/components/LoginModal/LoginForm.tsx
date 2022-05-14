import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { loginFormSchema } from './schema';

const LoginForm: React.FC = () => {
  return (
    <Box>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values, actions) => {
          console.log(values);

          actions.setSubmitting(false);
        }}
        validationSchema={loginFormSchema}
      >
        {(props) => (
          <Form>
            <Field name="email">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.email && form.touched.email}
                >
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input {...field} id="email" />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="password">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.password && form.touched.password}
                  mt={4}
                >
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input {...field} type="password" id="password" />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Button
              mt={4}
              colorScheme="teal"
              isLoading={props.isSubmitting}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default LoginForm;
