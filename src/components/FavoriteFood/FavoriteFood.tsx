import React, { memo, useMemo } from 'react';
import styles from './styles.module.scss';
import FoodCard from '../FoodCard';
import { FavoriteFoodModel } from '../../models/Food/favorite-food';

interface Props {
  userFavoriteFood: FavoriteFoodModel[];
}

const FavoriteFood = memo(({ userFavoriteFood }: Props) => {
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

  return cards.length ? (
    <div className={styles.cards}>{cards}</div>
  ) : (
    <div className={styles.noResults}>No Food</div>
  );
});

FavoriteFood.displayName = 'FavoriteFood';

export default FavoriteFood;
