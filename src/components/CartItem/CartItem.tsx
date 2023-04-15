import React from 'react';
import currency from 'currency.js';
import styles from './styles.module.scss';
import { useAppDispatch } from '../../hooks/redux';
import { cartActions } from '../../redux/slices/cart';
import { minProductAmountInCart } from '../../constants/cart';
import { CartProduct } from '../../models/Cart/cart';
import Counter from '../Counter';
import RoutesList from '../../constants/routes';
import { useLocation, useNavigate } from 'react-router-dom';
import useSwipe from '../../hooks/useSwipe';
import useMouseSwipe from '../../hooks/useMouseSwipe';

interface Props {
  cartProduct: CartProduct;
}

const CartItem = ({ cartProduct }: Props) => {
  const { changeProductAmount, deleteFromCart } = cartActions;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe({
    onSwipedLeft: () => dispatch(deleteFromCart(cartProduct)),
    onSwipedRight: () => dispatch(deleteFromCart(cartProduct)),
  });
  const { onMouseDown, onMouseMove, onMouseUp } = useMouseSwipe({
    onSwipedLeft: () => dispatch(deleteFromCart(cartProduct)),
    onSwipedRight: () => dispatch(deleteFromCart(cartProduct)),
  });
  const { product, amount } = cartProduct;

  const handleValue = (amount: number) => {
    dispatch(changeProductAmount({ product, amount }));
  };

  return (
    <figure
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onClick={() =>
        navigate(`${RoutesList.FoodDetails}/${product._id}`, { state: { from: location } })
      }
      className={styles.card}
    >
      <div className={styles.image}>
        <img src={product.image} alt="food card" />
      </div>
      <figcaption className={styles.body}>
        <h2 className={styles.title}>{product.title}</h2>
        <h3 className={styles.subtitle}>{product.subtitle}</h3>
        <div className={styles.amountCounter}>
          <p className={styles.price}>
            <span>$</span>
            {currency(product.price, { precision: 2, symbol: '' }).format()}
          </p>
          <div className={styles.counter}>
            <Counter
              getValue={handleValue}
              minValue={minProductAmountInCart}
              initialValue={amount}
            />
          </div>
        </div>
      </figcaption>
    </figure>
  );
};

export default CartItem;
