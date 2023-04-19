import React from 'react';
import { CardElement } from '@stripe/react-stripe-js';
import useAddCardForm from '../../hooks/useAddCardForm';

const AddCardForm = () => {
  const { handleSubmit } = useAddCardForm();

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button>Add Card</button>
    </form>
  );
};

export default AddCardForm;
