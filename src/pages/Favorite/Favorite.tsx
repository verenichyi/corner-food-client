import React from 'react';
import { pageTitles } from '../../constants/page-titles';
import FoodLayout from '../../layouts/FoodLayout';
import FavoriteFood from '../../components/FavoriteFood';

const Favorite = () => {
  const searchFood = (searchValue: string, foodType: string) => {
    console.log({ searchValue }, { foodType });
  };

  return (
    <FoodLayout title={pageTitles.favorite} search={searchFood}>
      <FavoriteFood />
    </FoodLayout>
  );
};

export default Favorite;
