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
  width = 100,
  height = 40,
}: SelectProps) => {
  return (
    <div className='className="flex items-center justify-center w-full mr-3'>
      {label && <Label label={label} id={id} />}
      <select
        style={{ width, height }}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        name={name}
        id={id}
        disabled={disabled}
        value={value}
        onChange={onChange}
      >
        {options ? (
          options.map((option) => (
            <option key={option.id} value={option.value}>
              {option.label}
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
