import React, { createRef, useMemo } from 'react';
import styles from './styles.module.scss';
import { pageTitles } from '../../constants/page-titles';
import promoCodeIcon from '../../assets/images/ic_promo_code.png';
import { useAppSelector } from '../../hooks/redux';
import { selectCart } from '../../redux/store/selectors';
import currency from 'currency.js';
import CartItem from '../CartItem';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { MOUNT_ANIMATION_TIME } from '../../constants/animations';
import animationStyles from './animation.module.scss';

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
  const { cart, totalPrice } = useAppSelector(selectCart);

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

  return (
    <div className={styles.cart}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>{pageTitles.order}</h1>
          <button onClick={onClose} className={styles.closeButton} />
        </div>
        {cart.length ? (
          <div className={styles.main}>
            <TransitionGroup className={styles.productsList}>{cartProducts}</TransitionGroup>
            <div className={styles.summary}>
              <div className={styles.promo}>
                <img className={styles.promoCodeIcon} src={promoCodeIcon} alt="sale" />
                <input className={styles.promoInput} type="text" placeholder={'Promo code...'} />
                <button className={styles.promoButton}>Apply</button>
              </div>
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
              <button className={styles.confirmButton}>CONFIRM ORDER</button>
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
