import { InputProps } from './types';
import styles from './styles.module.css';
import { Label } from '../Label/Label';

interface Props extends InputProps {
  type: string;
  error?: string;
}

export const Input = ({
  id,
  disabled = false,
  name,
  placeholder,
  label,
  value,
  onChange,
  type,
  error,
  width,
  height,
}: Props) => {
  return (
    <div className={styles['input-wrapper']} style={{ width, height }}>
      {label && <Label label={label} id={id} />}
      <input
        className="text-lg w-full h-full block p-4 ps-10 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
        outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-300
        dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
        dark:focus:ring-blue-800 dark:focus:border-blue-800"
        name={name}
        id={id}
        disabled={disabled}
        placeholder={placeholder}
        type={type}
        value={value ?? ''}
        onChange={onChange}
      />
      {error && <p className={styles['error-message']}>{error}</p>}
    </div>
  );
};

Input.displayName = ' Input';
