import React from 'react';
import { ErrorMessage } from '@hookform/error-message';
import { FieldErrors } from 'react-hook-form';
import styles from './style.module.scss';

interface Props {
  name: string;
  errors: FieldErrors;
}

const FormError = ({ errors, name }: Props) => (
  <ErrorMessage
    errors={errors}
    name={name}
    render={({ message }) => <span className={styles.error}>{message}</span>}
  />
);

export default FormError;
