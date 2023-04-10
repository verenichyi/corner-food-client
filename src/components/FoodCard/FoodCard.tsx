import React from 'react';
import favoriteUnselected from '../../assets/images/ic_favorite_unselected.png';
import favoriteSelected from '../../assets/images/ic_favorite_selected.png';
import styles from './styles.module.scss';
import { FoodModel } from '../../models/Food/food';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { selectAuth } from '../../redux/store/selectors';
import {
  addFoodToFavorite,
  deleteFoodFromFavorite,
  getUserFavoriteFood,
} from '../../redux/asyncActions/food';

interface Props {
  food: FoodModel;
  isFavorite: boolean;
  favoriteId?: string;
}

const FoodCard = ({ food, isFavorite, favoriteId }: Props) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);
  const favoriteImg = isFavorite ? favoriteSelected : favoriteUnselected;

  const toggleFavorite = (foodId: string) => {
    if (user) {
      if (isFavorite && favoriteId) {
        dispatch(deleteFoodFromFavorite(favoriteId));
        return;
      }

      dispatch(addFoodToFavorite({ user: user._id, food: foodId }));
    }
  };

  return (
    <figure className={styles.card}>
      <div className={styles.image}>
        <img src={food.image} alt="food card" />
        <div onClick={() => toggleFavorite(food._id)} className={styles.favorite}>
          <img className={styles.favoriteIcon} src={favoriteImg} alt="favorite" />
        </div>
      </div>
      <figcaption className={styles.body}>
        <h2 className={styles.title}>{food.title}</h2>
        <h3 className={styles.subtitle}>{food.subtitle}</h3>
        <p className={styles.price}>
          <span>$</span>
          {food.price}
        </p>
      </figcaption>
      <button className={styles.button}>Add to cart</button>
    </figure>
  );
};

export default FoodCard;
