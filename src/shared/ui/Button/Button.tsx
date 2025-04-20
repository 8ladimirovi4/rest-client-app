import type { ButtonProps, Color } from './types';

const BUTTON_CLASSES: Record<Color, string> = {
  secondary:
    'bg-gray-500 hover:bg-gray-500 focus:ring-gray-300 dark:bg-gray-500 dark:hover:bg-gray-600',
  primary:
    'w-max bg-gray-800 hover:bg-gray-700 focus:ring-gray-300 dark:hover:bg-gray-600 dark:bg-gray-700',
  gray: 'bg-gray-500 cursor-not-allowed hover:bg-gray-500 focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-600',
};

export const Button = ({
  onClick = () => {},
  title = 'button',
  color = 'primary',
  disabled = false,
  type,
  height = 40,
  dataTestid = '',
}: ButtonProps) => {
  const buttonClass = disabled
    ? BUTTON_CLASSES.gray
    : BUTTON_CLASSES[color as Color];

  return (
    <button
      data-testid={dataTestid}
      style={{ height }}
      onClick={onClick}
      className={`h-full text-white focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 flex justify-center items-center custom-button ${buttonClass}`}
      disabled={disabled}
      type={type}
    >
      <span className="flex text-base w-max gap-1">{title}</span>
    </button>
  );
};

Button.displayName = 'Button';
