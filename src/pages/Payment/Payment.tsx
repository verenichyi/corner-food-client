import React, { useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import AddCardForm from '../../components/AddCardForm';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getCreditCards } from '../../redux/asyncActions/payments';
import { selectAuth, selectPayments } from '../../redux/store/selectors';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!);

const Payment = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);
  const { cards } = useAppSelector(selectPayments);

  useEffect(() => {
    dispatch(getCreditCards(user!.stripeCustomerId));
  }, []);

  return (
    <>
      <Elements stripe={stripePromise}>
        <AddCardForm />
      </Elements>
      <div>
        {cards.map((card) => (
          <p key={card.id}>{card.id}</p>
        ))}
      </div>
    </>
  );
};

export default Payment;
