import { LabelProps } from './types';
import styles from './styles.module.css';
import classNames from 'classnames';
export const Label = ({ label, id }: LabelProps) => {
  return (
    <label className={classNames(styles['label'])} htmlFor={id}>
      {label}
    </label>
  );
};

Label.displayName = 'CustomLabel';
