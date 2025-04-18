'use client';
import React from 'react';
import { CheckBoxProps } from './types';
import { Label } from '../Label/Label';
import styles from './styles.module.css';
import classNames from 'classnames';

export const CheckBox = ({ onChange, checked, id, label }: CheckBoxProps) => {
  return (
    <div
      className={classNames(
        styles['checkbox-container'],
        'flex items-center mb-4'
      )}
    >
      <input
        data-testid={`qatype-checkbox`}
        onChange={onChange}
        checked={checked}
        id="default-checkbox"
        type="checkbox"
        value=""
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
      />
      <Label id={id} label={label} />
    </div>
  );
};

CheckBox.displayName = 'CheckBox ';
