import React from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import useAddCardForm from '../../hooks/useAddCardForm';
import styles from './styles.module.scss';
import CrossButton from '../../UI/CrossButton';

interface Props {
  onClose: () => void;
}

const AddCardForm = ({ onClose }: Props) => {
  const { handleSubmit } = useAddCardForm();

  return (
    <form onSubmit={handleSubmit}>
      <header className={styles.header}>
        <h1 className={styles.title}>Card Info</h1>
        <CrossButton onClick={onClose} />
      </header>
      <CardElement />
      <button>Add Card</button>
    </form>
  );
};

export default AddCardForm;
