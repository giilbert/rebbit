import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
  Text,
} from "@chakra-ui/react";
import { trpc } from "@lib/trpc";
import { Formik, Form, Field } from "formik";
import { Community } from "@prisma/client";
import { useRouter } from "next/router";

const CreatePost: React.FC<{ community: Community }> = ({ community }) => {
  const createPost = trpc.useMutation("posts.create");
  const router = useRouter();

  return (
    <Box mt="16">
      <Formik
        initialValues={{ title: "", content: "" }}
        onSubmit={async (values, { setSubmitting }) => {
          await createPost.mutateAsync({
            ...values,
            communityId: community.id,
          });
          setSubmitting(false);
          router.back();
        }}
      >
        {(props: any) => (
          <Form>
            <Field name="title">
              {({ field, form }: any) => (
                <FormControl
                  isInvalid={form.errors.title && form.touched.title}
                >
                  <FormLabel htmlFor="title">Title</FormLabel>
                  <Input {...field} id="title" />
                  <FormErrorMessage>{form.errors.title}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="content">
              {({ field, form }: any) => (
                <FormControl
                  mt="4"
                  isInvalid={form.errors.content && form.touched.content}
                >
                  <FormLabel htmlFor="content">Content</FormLabel>
                  <Textarea {...field} id="content" />
                  <FormErrorMessage>{form.errors.content}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Text color="red.500" my="2">
              {createPost.error?.message}
            </Text>

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

export default CreatePost;
