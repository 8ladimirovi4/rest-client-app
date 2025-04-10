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
        className={`text-base w-full h-full block ps-10 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 
           outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-300
           dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
           dark:focus:ring-blue-800 dark:focus:border-blue-800`}
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
