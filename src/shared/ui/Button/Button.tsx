import type { ButtonProps, Color } from './types';

const BUTTON_CLASSES: Record<Color, string> = {
  blue: 'bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:hover:bg-blue-700 dark:focus:ring-blue-800 dark:bg-blue-600',
  red: 'bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:hover:bg-red-700 dark:focus:ring-red-800 dark:bg-red-600',
  gray: 'bg-gray-500 cursor-not-allowed hover:bg-gray-500 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-600',
};

export const Button = ({
  onClick = () => {},
  title = 'button',
  color = 'blue',
  disabled = false,
  type,
  width = 100,
  height = 40,
  dataTestid = '',
}: ButtonProps) => {
  const buttonClass = disabled
    ? BUTTON_CLASSES.gray
    : BUTTON_CLASSES[color as Color];

  return (
    <button
      data-testid={dataTestid}
      style={{ width, height }}
      onClick={onClick}
      className={`w-full h-full text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 flex justify-center items-center custom-button ${buttonClass}`}
      disabled={disabled}
      type={type}
    >
      <span className="text-base">{title}</span>
    </button>
  );
};

Button.displayName = 'Button';
