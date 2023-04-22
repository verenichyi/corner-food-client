import React, { useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import AddCardForm from '../../components/AddCardForm';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getCreditCards } from '../../redux/asyncActions/payments';
import { selectAuth, selectPayments } from '../../redux/store/selectors';
import OverlayingPopup from '../../UI/OverlayingPopup';
import useIsActive from '../../hooks/useIsActive';
import AddButton from '../../UI/AddButton';
import styles from './styles.module.scss';
import handleZero from '../../utils/handleZero';
import Loader from '../../UI/Loader';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!);

const Payment = () => {
  const [isActive, toggle] = useIsActive();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);
  const { cards, loading } = useAppSelector(selectPayments);

  useEffect(() => {
    dispatch(getCreditCards(user!.stripeCustomerId));
  }, []);

  return (
    <>
      <OverlayingPopup isOpened={isActive} onClose={toggle}>
        <Elements stripe={stripePromise}>
          <AddCardForm onClose={toggle} />
        </Elements>
      </OverlayingPopup>
      <h2 className={styles.cardTitle}>My Card</h2>
      {loading ? (
        <Loader />
      ) : (
        <div className={styles.cardPanel}>
          {cards.length ? (
            <div className={styles.creditCard}>
              <div className={styles.cardHolder}>{user!.username}</div>
              <div className={styles.cardNumber}>•••• •••• •••• {cards[0].card!.last4}</div>
              <div className={styles.otherInfo}>
                <div className={styles.cardExp}>
                  {handleZero(cards[0].card!.exp_month)}/{cards[0].card!.exp_year}
                </div>
                <div className={styles.cardBrand}>{cards[0].card!.brand}</div>
              </div>
            </div>
          ) : (
            <>
              <div className={styles.addCardText}>Add credit card</div>
              <AddButton onClick={toggle} />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Payment;
