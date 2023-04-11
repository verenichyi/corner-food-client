import React from 'react';
import { pageTitles } from '../../constants/page-titles';
import FoodLayout from '../../layouts/FoodLayout';
import FavoriteFood from '../../components/FavoriteFood';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { searchFavoriteFood } from '../../redux/asyncActions/food';
import { selectAuth, selectFood } from '../../redux/store/selectors';

const Favorite = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);
  const { userFavoriteFood } = useAppSelector(selectFood);

  const search = (searchValue: string, foodType: string) => {
    if (user) {
      dispatch(searchFavoriteFood({ userId: user._id, searchValue, foodType }));
    }
  };

  return (
    <FoodLayout title={pageTitles.favorite} search={search}>
      <FavoriteFood userFavoriteFood={userFavoriteFood} />
    </FoodLayout>
  );
};

export default Favorite;
