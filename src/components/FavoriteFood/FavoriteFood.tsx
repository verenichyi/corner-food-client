import React, { memo, useEffect, useMemo } from 'react';
import styles from './styles.module.scss';
import FoodCard from '../FoodCard';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { selectAuth, selectFood } from '../../redux/store/selectors';
import { getUserFavoriteFood } from '../../redux/asyncActions/food';

const FavoriteFood = memo(() => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);
  const { userFavoriteFood } = useAppSelector(selectFood);

  const cards = useMemo(
    () =>
      userFavoriteFood.map((favoriteFood) => {
        return (
          <FoodCard
            key={favoriteFood.food._id}
            food={favoriteFood.food}
            favoriteId={favoriteFood._id}
            isFavorite={true}
          />
        );
      }),
    [userFavoriteFood],
  );

  useEffect(() => {
    if (user) {
      dispatch(getUserFavoriteFood(user._id));
    }
  }, []);

  return cards.length ? (
    <div className={styles.cards}>{cards}</div>
  ) : (
    <div className={styles.noResults}>No Food</div>
  );
});

FavoriteFood.displayName = 'FavoriteFood';

export default FavoriteFood;
