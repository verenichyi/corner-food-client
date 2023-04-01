import React, { PropsWithChildren } from 'react';
import { FieldErrors, Path, UseFormRegister, RegisterOptions, FieldValues } from 'react-hook-form';
import styles from './styles.module.scss';
import FormError from '../FormError';

interface Props<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  options?: RegisterOptions;
  label: string;
  isVisible?: boolean;
  errors: FieldErrors;
  isNumber?: boolean;
}

function Input<T extends FieldValues>({
  name,
  register,
  options = {},
  label,
  isVisible = true,
  errors,
  children,
  isNumber,
}: PropsWithChildren<Props<T>>) {
  const getInputType = () => {
    let inputType;

    inputType = isVisible ? 'text' : 'password';

    if (isNumber) {
      inputType = 'number';
    }

    return inputType;
  };

  return (
    <div className={styles.inputWrapper}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        {...register(name, options)}
        type={getInputType()}
        className={styles.input}
      />
      {children}
      <div className={styles.error}>
        <FormError errors={errors} name={name} />
      </div>
    </div>
  );
}

export default Input;
