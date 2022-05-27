import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Textarea,
  Text,
} from '@chakra-ui/react';
import { trpc } from '@lib/trpc';
import { Form, Field, Formik } from 'formik';

const CreateCommunityForm: React.FC = () => {
  const createCommunity = trpc.useMutation('communities.create');

  return (
    <Formik
      initialValues={{ name: '', description: '', slug: '' }}
      onSubmit={async (values, { setSubmitting }) => {
        await createCommunity.mutateAsync(values);
        setSubmitting(false);
      }}
    >
      {(props) => (
        <Form>
          <Field name="name">
            {({ field, form }: any) => (
              <FormControl isInvalid={form.errors.name && form.touched.name}>
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input {...field} id="name" />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="description">
            {({ field, form }: any) => (
              <FormControl
                isInvalid={form.errors.description && form.touched.description}
                mt={4}
              >
                <FormLabel htmlFor="description">Description</FormLabel>
                <Textarea {...field} type="description" id="description" />
                <FormErrorMessage>{form.errors.description}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="slug">
            {({ field, form }: any) => (
              <FormControl
                isInvalid={form.errors.slug && form.touched.slug}
                mt={4}
              >
                <FormLabel htmlFor="slug">Slug</FormLabel>
                <InputGroup>
                  <InputLeftAddon>r/</InputLeftAddon>
                  <Input {...field} type="slug" id="slug" />
                </InputGroup>
                <FormErrorMessage>{form.errors.slug}</FormErrorMessage>
              </FormControl>
            )}
          </Field>

          <Text color="red.500" my="2">
            {createCommunity.error?.message}
          </Text>

          <Button
            mt={4}
            colorScheme="teal"
            isLoading={props.isSubmitting}
            type="submit"
          >
            Create
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateCommunityForm;
