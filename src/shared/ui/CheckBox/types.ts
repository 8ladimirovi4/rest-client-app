import { ChangeEvent } from 'react';

export interface CheckBoxProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  id: string;
  label?: string;
}
