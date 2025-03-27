export interface ButtonProps {
  onClick?: () => void;
  title?: string;
  status?: 'success' | 'error' | 'pending' | null;
  color?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}
export type Color = 'blue' | 'red' | 'gray';
