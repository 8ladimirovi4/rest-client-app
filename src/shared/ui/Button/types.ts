import { ReactNode } from 'react';

export interface ButtonProps {
  onClick?: () => void;
  title?: string | ReactNode;
  status?: 'success' | 'error' | 'pending' | null;
  color?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  width?: number;
  height?: number;
  dataTestid?: string;
}
export type Color = 'blue' | 'red' | 'gray';
