import React, { FormEvent, useState } from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import { StripeCardElementChangeEvent } from '@stripe/stripe-js';
import useAddCardForm from '../../hooks/useAddCardForm';
import styles from './styles.module.scss';
import CrossButton from '../../UI/CrossButton';

interface Props {
  onClose: () => void;
}

const AddCardForm = ({ onClose }: Props) => {
  const { handleSubmit } = useAddCardForm();
  const [disabled, setDisabled] = useState(true);

  const handleClick = (event: FormEvent) => {
    handleSubmit(event);
    onClose();
  };

  const handleChange = async (event: StripeCardElementChangeEvent) => {
    setDisabled(event.empty);
  };

  return (
    <form className={styles.form}>
      <header className={styles.header}>
        <h1 className={styles.title}>Card Info</h1>
        <CrossButton onClick={onClose} />
      </header>
      <div className={styles.cardElement}>
        <CardElement onChange={handleChange} />
      </div>
      <div className={styles.buttonWrapper}>
        <button disabled={disabled} onClick={handleClick} className={styles.button}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default AddCardForm;
