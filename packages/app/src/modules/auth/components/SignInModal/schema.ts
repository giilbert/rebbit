import * as yup from 'yup';

export const signInFormSchema = yup.object({
  email: yup.string().required('An email is required.').email('Invalid email'),
  password: yup.string().required('A password is required.'),
});
