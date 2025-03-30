import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  name: yup
    .string()
    .matches(/^[A-Z]/, 'First letter must be uppercase')
    .required('This field is required'),
  email: yup
    .string()
    .matches(
      /^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
      'Email must be valid, example@gmail.com'
    )
    .required('This field is required'),
  password: yup
    .string()
    .matches(/\p{N}/u, 'Password must contain at least one digit')
    .matches(/\p{L}/u, 'Password must contain at least one letter')
    .matches(/\p{Lu}/u, 'Password must contain at least one uppercase letter')
    .matches(/\p{Ll}/u, 'Password must contain at least one lowercase letter')
    .matches(
      /\p{P}|\p{S}/u,
      'Password must contain at least one special character'
    )
    .min(8, 'Password must be at least 8 characters long')
    .required('This field is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], "Passwords don't match")
    .required('This field is required'),
});
