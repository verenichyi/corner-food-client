import React, { MouseEvent } from 'react';
import star from '../../assets/images/star.png';
import clock from '../../assets/images/clock.png';
import styles from './styles.module.scss';
import { FoodModel } from '../../models/Food/food';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { selectAuth } from '../../redux/store/selectors';
import { addFoodToFavorite, deleteFoodFromFavorite } from '../../redux/asyncActions/food';
import icons from '../../assets/icons.svg';
import Counter from '../Counter';

interface Props {
  food: FoodModel;
  isFavorite: boolean;
  favoriteId?: string;
}

const FoodDetails = ({ food, isFavorite, favoriteId }: Props) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);

  const toggleFavorite = (foodId: string, event: MouseEvent) => {
    event.stopPropagation();

    if (isFavorite && favoriteId) {
      dispatch(deleteFoodFromFavorite(favoriteId));
      return;
    }

    dispatch(addFoodToFavorite({ user: user!._id, food: foodId }));
  };

  return (
    <figure className={styles.details}>
      <div className={styles.image}>
        <img className={styles.foodImage} src={food.image} alt="food" />
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
          </svg>
        </div>
      </div>
      <figcaption className={styles.body}>
        <div className={styles.header}>
          <h2 className={styles.title}>{food.title}</h2>
          <p className={styles.price}>
            <span>$</span>
            {food.price}
          </p>
        </div>
        <h3 className={styles.subtitle}>{food.subtitle}</h3>
        <div className={styles.otherInfo}>
          <div className={styles.ratingInfo}>
            <img className={styles.ratingImg} src={star} alt="star" />
            <span className={styles.rating}>{food.rating}</span>
          </div>
          <div className={styles.timeInfo}>
            <img className={styles.timeImg} src={clock} alt="clock" />
            <span className={styles.time}>{food.deliverTime} min</span>
          </div>
        </div>
        <h3 className={styles.descriptionTitle}>About</h3>
        <p className={styles.description}>{food.description}</p>
        <div className={styles.cartPanel}>
          <div className={styles.counter}>
            <Counter />
          </div>
          <button className={styles.button}>ADD TO CART</button>
        </div>
      </figcaption>
    </figure>
  );
};

export default FoodDetails;
