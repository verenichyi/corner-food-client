import React, { memo, useEffect, useMemo } from 'react';
import styles from './styles.module.scss';
import FoodCard from '../FoodCard';
import { FoodModel } from '../../models/Food/food';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { selectAuth, selectFood } from '../../redux/store/selectors';
import { getUserFavoriteFood } from '../../redux/asyncActions/food';

interface Props {
  food: FoodModel[];
}

const Food = memo(({ food }: Props) => {
  const { user } = useAppSelector(selectAuth);
  const { userFavoriteFood } = useAppSelector(selectFood);
  const dispatch = useAppDispatch();

  const cards = useMemo(
    () =>
      food.map((food) => {
        const favoriteFood = userFavoriteFood.find(
          (favoriteFood) =>
            user && favoriteFood.user._id === user._id && favoriteFood.food._id === food._id,
        );

        if (favoriteFood) {
          return (
            <FoodCard key={food._id} food={food} favoriteId={favoriteFood._id} isFavorite={true} />
          );
        }

        return <FoodCard key={food._id} food={food} isFavorite={false} />;
      }),
    [food, userFavoriteFood],
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

Food.displayName = 'Food';

export default Food;
