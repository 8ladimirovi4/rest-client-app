import { ChangeEvent } from 'react';

export interface InputProps {
  id: string;
  name?: string;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
  value?: string;
  width?: number;
  height?: number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}
