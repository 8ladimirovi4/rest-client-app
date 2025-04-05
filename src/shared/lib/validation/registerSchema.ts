import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

export const useRegisterSchema = () => {
  const { t } = useTranslation();

  const registerSchema = yup.object().shape({
    name: yup
      .string()
      .matches(/^[A-Z]/, t('Name valid'))
      .required(t('Required')),
    email: yup
      .string()
      .matches(
        /^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
        t('Email valid')
      )
      .required(t('Required')),
    password: yup
      .string()
      .matches(/\p{N}/u, t('Password valid digit'))
      .matches(/\p{L}/u, t('Password valid letter'))
      .matches(/\p{Lu}/u, t('Password valid upper letter'))
      .matches(/\p{Ll}/u, t('Password valid lower letter'))
      .matches(/\p{P}|\p{S}/u, t('Password valid special char'))
      .min(8, t('Password valid length'))
      .required(t('Required')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], t('Confirm password valid'))
      .required(t('Required')),
  });

  return registerSchema;
};
