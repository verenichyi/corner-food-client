import React, { createRef, useEffect, useMemo } from 'react';
import styles from './styles.module.scss';
import { pageTitles } from '../../constants/page-titles';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { selectAuth, selectCart, selectPayments } from '../../redux/store/selectors';
import currency from 'currency.js';
import CartItem from '../CartItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { MOUNT_ANIMATION_TIME } from '../../constants/animations';
import animationStyles from './animation.module.scss';
import OverlayingPopup from '../../UI/OverlayingPopup';
import useIsActive from '../../hooks/useIsActive';
import PromoCode from '../PromoCode';
import AddressForm from '../AddressForm';
import CrossButton from '../../UI/CrossButton';
import { getCreditCards } from '../../redux/asyncActions/payments';
import { toast } from 'react-toastify';

const contentAnimation = {
  enter: animationStyles.contentEnter,
  enterActive: animationStyles.contentEnterActive,
  exit: animationStyles.contentExit,
  exitActive: animationStyles.contentExitActive,
};

interface Props {
  onClose: () => void;
}

const Cart = ({ onClose }: Props) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);
  const { cards } = useAppSelector(selectPayments);
  const { cart, totalPrice } = useAppSelector(selectCart);
  const [isAddressPopupActive, toggleAddressPopup] = useIsActive();

  const cartProducts = useMemo(
    () =>
      cart.map((cartItem) => {
        const nodeRef = createRef<HTMLElement>();

        return (
          <CSSTransition
            key={cartItem.product._id}
            nodeRef={nodeRef}
            timeout={MOUNT_ANIMATION_TIME}
            classNames={contentAnimation}
          >
            <CartItem ref={nodeRef} cartProduct={cartItem} />
          </CSSTransition>
        );
      }),
    [cart],
  );

  const handleOrder = () => {
    if (!cards.length) {
      toast.warn('Please, add payment card in your profile.', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }

    toggleAddressPopup();
  };

  useEffect(() => {
    dispatch(getCreditCards(user!.stripeCustomerId));
  }, []);

  return (
    <div className={styles.cart}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>{pageTitles.order}</h1>
          <CrossButton onClick={onClose} />
        </div>
        {cart.length ? (
          <div className={styles.main}>
            <TransitionGroup className={styles.productsList}>{cartProducts}</TransitionGroup>
            <div className={styles.summary}>
              <PromoCode />
              <div className={styles.summaryPanel}>
                <div className={styles.subTotal}>
                  <span className={styles.subTotalKey}>Subtotal</span>
                  <span className={styles.subTotalValue}>
                    ${currency(totalPrice, { precision: 2, symbol: '' }).format()}
                  </span>
                </div>
                <hr className={styles.divider} />
                <div className={styles.delivery}>
                  <span className={styles.deliveryKey}>Delivery</span>
                  <span className={styles.deliveryValue}>Free</span>
                </div>
                <hr className={styles.divider} />
                <div className={styles.total}>
                  <span className={styles.totalKey}>Total</span>
                  <span className={styles.totalValue}>
                    ${currency(totalPrice, { precision: 2, symbol: '' }).format()}
                  </span>
                </div>
              </div>
              <button onClick={handleOrder} className={styles.confirmButton}>
                CONFIRM ORDER
              </button>
              <OverlayingPopup isOpened={isAddressPopupActive} onClose={toggleAddressPopup}>
                <AddressForm onClose={toggleAddressPopup} onCartClose={onClose} />
              </OverlayingPopup>
            </div>
          </div>
        ) : (
          <div className={styles.emptyCartText}>Your cart is empty</div>
        )}
      </div>
    </div>
  );
};

export default Cart;
