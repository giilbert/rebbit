import * as yup from 'yup';

export const signUpFormSchema = yup.object({
  name: yup.string().required('A name is required.'),
  username: yup.string().required('An username is required.'),
  email: yup.string().required('An email is required.').email('Invalid email.'),
  password: yup.string().required('A password is required.'),
  confirmPassword: yup
    .string()
    .required('Please confirm your password.')
    .oneOf([yup.ref('password')], 'Passwords do not match.'),
});
