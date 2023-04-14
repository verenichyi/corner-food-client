import React, { MouseEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import currency from 'currency.js';
import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { cartActions } from '../../redux/slices/cart';
import { minProductAmountInCart } from '../../constants/cart';
import { CartProduct } from '../../models/Cart/cart';

interface Props {
  cartProduct: CartProduct;
}

const CartItem = ({ cartProduct }: Props) => {
  const { product, amount } = cartProduct;
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { addToCart } = cartActions;

  return (
    <figure className={styles.card}>
      <div className={styles.image}>
        <img src={product.image} alt="food card" />
      </div>
      <figcaption className={styles.body}>
        <h2 className={styles.title}>{product.title}</h2>
        <h3 className={styles.subtitle}>{product.subtitle}</h3>
        <p className={styles.price}>
          <span>$</span>
          {currency(product.price, { precision: 2, symbol: '' }).format()}
        </p>
      </figcaption>
    </figure>
  );
};

export default CartItem;
