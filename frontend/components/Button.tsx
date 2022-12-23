import React from 'react';
import styles from '../styles/button.module.css';

interface IButtonProps {
  isSubmit: boolean;
  disabled: boolean;
  label: string;
}

export const Button = ({ isSubmit, disabled, label }: IButtonProps) => {
  return (
      <button
          className={styles.button}
          disabled={disabled}
          type={isSubmit ? 'submit' : 'button'}
      >
        {label}
      </button>
  );
};