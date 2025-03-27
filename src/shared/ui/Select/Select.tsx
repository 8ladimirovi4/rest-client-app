import styles from './styles.module.css';
import { Label } from '../Label/Label';
import { SelectProps } from './types';

export const Select = ({
  id,
  disabled = false,
  name,
  label,
  value,
  onChange,
  options,
}: SelectProps) => {
  return (
    <div className={styles['select-wrapper']}>
      {label && <Label label={label} id={id} />}
      <select
        className="w-full h-full block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
             outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-300
             dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
             dark:focus:ring-blue-800 dark:focus:border-blue-800"
        // className={styles['select-wrapper_select']}
        name={name}
        id={id}
        disabled={disabled}
        value={value}
        onChange={onChange}
      >
        {options ? (
          options.map((option) => (
            <option key={option.id} value={option.value}>
              {option.value}
            </option>
          ))
        ) : (
          <option value=""></option>
        )}
      </select>
    </div>
  );
};

Select.displayName = 'Select';
