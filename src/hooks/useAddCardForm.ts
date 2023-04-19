import { FormEvent } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import PaymentService from '../http/services/PaymentService';
import { useAppDispatch, useAppSelector } from './redux';
import { selectAuth } from '../redux/store/selectors';
import { getCreditCards } from '../redux/asyncActions/payments';

const useAddCardForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const getPaymentMethodId = async () => {
    const cardElement = elements?.getElement(CardElement);
    if (!stripe || !elements || !cardElement) {
      return;
    }

    const stripeResponse = await stripe?.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    const { error, paymentMethod } = stripeResponse;
    if (error || !paymentMethod) {
      return;
    }

    return paymentMethod.id;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const paymentMethodId = await getPaymentMethodId();

    if (!paymentMethodId) {
      return;
    }

    const { data: clientSecret } = await PaymentService.attachCreditCard({
      stripeCustomerId: user!.stripeCustomerId,
      paymentMethodId,
    });

    await stripe?.confirmCardSetup(clientSecret);

    dispatch(getCreditCards(user!.stripeCustomerId));
  };

  return {
    handleSubmit,
  };
};

export default useAddCardForm;
