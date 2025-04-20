import { AppRoutes } from 'shared/constants/routes';

export const routes = [
  { id: '1', label: 'login', value: AppRoutes.LOGIN, type: 'public' },
  { id: '2', label: 'register', value: AppRoutes.REGISTER, type: 'public' },
  { id: '3', label: 'Home', value: AppRoutes.HOME, type: 'public' },
  {
    id: '4',
    label: 'Online Rest Tool',
    value: AppRoutes.REST,
    type: 'protected',
  },
  { id: '5', label: 'History', value: AppRoutes.HISTORY, type: 'protected' },
];
