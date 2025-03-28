import { ChangeEvent } from 'react';

interface Option {
  id?: string;
  value?: string;
}

export interface SelectProps {
  id: string;
  disabled?: boolean;
  name?: string;
  label?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  width?: number;
  height?: number;
}
