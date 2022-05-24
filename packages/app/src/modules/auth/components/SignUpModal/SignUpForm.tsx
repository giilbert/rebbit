import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { trpc } from '@lib/trpc';
import { Field, Form, Formik } from 'formik';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { signUpFormSchema } from './schema';

const SignUpForm: React.FC = () => {
  const createUser = trpc.useMutation('users.create');
  const router = useRouter();

  return (
    <Box>
      <Formik
        initialValues={{
          name: '',
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={async (values, actions) => {
          await createUser.mutateAsync(values);
          await signIn('credentials', values);
          actions.setSubmitting(false);
          router.push('/');
        }}
        validationSchema={signUpFormSchema}
      >
        {(props) => (
          <Form>
            <Field name="name">
              {({ field, form }: any) => (
                <FormControl isInvalid={form.errors.name && form.touched.name}>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input {...field} type="name" id="name" />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="username">
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.username && form.touched.username}
                  mt={4}
                >
                  <FormLabel htmlFor="username">Username</FormLabel>
                  <Input {...field} type="username" id="username" />
                  <FormErrorMessage>{form.errors.username}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="email">
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.email && form.touched.email}
                  mt={4}
                >
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <Input {...field} id="email" />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="password">
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.password && form.touched.password}
                  mt={4}
                >
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <Input {...field} id="password" />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="confirmPassword">
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={
                    form.errors.confirmPassword && form.touched.confirmPassword
                  }
                  mt={4}
                >
                  <FormLabel htmlFor="confirm-password">
                    Confirm Password
                  </FormLabel>
                  <Input {...field} type="password" id="confirm-password" />
                  <FormErrorMessage>
                    {form.errors.confirmPassword}
                  </FormErrorMessage>
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

export default SignUpForm;
