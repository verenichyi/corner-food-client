import React, { MouseEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import currency from 'currency.js';
import styles from './styles.module.scss';
import { FoodModel } from '../../models/Food/food';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { selectAuth } from '../../redux/store/selectors';
import { addFoodToFavorite, deleteFoodFromFavorite } from '../../redux/asyncActions/food';
import RoutesList from '../../constants/routes';
import icons from '../../assets/icons.svg';
import { cartActions } from '../../redux/slices/cart';
import { minProductAmountInCart } from '../../constants/cart';

interface Props {
  food: FoodModel;
  isFavorite: boolean;
  favoriteId?: string;
}

const FoodCard = ({ food, isFavorite, favoriteId }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { addToCart } = cartActions;
  const { user } = useAppSelector(selectAuth);

  const toggleFavorite = (foodId: string, event: MouseEvent) => {
    event.stopPropagation();

    if (isFavorite && favoriteId) {
      dispatch(deleteFoodFromFavorite(favoriteId));
      return;
    }

    dispatch(addFoodToFavorite({ user: user!._id, food: foodId }));
  };

  const handleAddToCart = (event: MouseEvent) => {
    event.stopPropagation();
    dispatch(addToCart({ product: food, amount: minProductAmountInCart }));
  };

  return (
    <figure
      onClick={() =>
        navigate(`${RoutesList.FoodDetails}/${food._id}`, { state: { from: location } })
      }
      className={styles.card}
    >
      <div className={styles.image}>
        <img src={food.image} alt="food card" />
        <div
          onClick={(event: MouseEvent) => toggleFavorite(food._id, event)}
          className={styles.favorite}
        >
          <svg
            className={
              isFavorite
                ? `${styles.favoriteIcon} ${styles.favoriteIcon_selected}`
                : styles.favoriteIcon
            }
          >
            <use xlinkHref={`${icons}#heart`} />
          </svg>{' '}
        </div>
      </div>
      <figcaption className={styles.body}>
        <h2 className={styles.title}>{food.title}</h2>
        <h3 className={styles.subtitle}>{food.subtitle}</h3>
        <p className={styles.price}>
          <span>$</span>
          {currency(food.price, { precision: 2, symbol: '' }).format()}
        </p>
      </figcaption>
      <button onClick={handleAddToCart} className={styles.button}>
        Add to cart
      </button>
    </figure>
  );
};

export default FoodCard;
