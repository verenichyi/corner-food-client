import React from 'react';
import { pageTitles } from '../../constants/page-titles';
import Food from '../../components/Food';
import FoodLayout from '../../layouts/FoodLayout';
import { searchFood } from '../../redux/asyncActions/food';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { selectFood } from '../../redux/store/selectors';
import Loader from '../../UI/Loader';

const Home = () => {
  const { food, isFoodLoading } = useAppSelector(selectFood);
  const dispatch = useAppDispatch();
  const search = (searchValue: string, foodType: string) => {
    dispatch(searchFood({ searchValue, foodType }));
  };

  return (
    <FoodLayout title={pageTitles.home} search={search}>
      {isFoodLoading ? <Loader /> : <Food food={food} />}
    </FoodLayout>
  );
};

export default Home;
