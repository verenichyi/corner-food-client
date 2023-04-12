import React, { useEffect, useRef, useState, TouchEvent } from 'react';
import styles from './styles.module.scss';
import FoodCard from '../FoodCard';
import { FoodModel } from '../../models/Food/food';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { selectAuth, selectFood } from '../../redux/store/selectors';
import { getUserFavoriteFood } from '../../redux/asyncActions/food';
import { useParams } from 'react-router';
import useSwipe from '../../hooks/useSwipe';
import { useLocation, useNavigate } from 'react-router-dom';
import RoutesList from '../../constants/routes';

const FoodDetails = () => {
  const { foodId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAppSelector(selectAuth);
  const { userFavoriteFood } = useAppSelector(selectFood);
  const dispatch = useAppDispatch();
  const origin = location.state?.from?.pathname || RoutesList.Home;
  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe({
    onSwipedLeft: () => navigate(origin, { replace: true }),
    onSwipedRight: () => navigate(origin, { replace: true }),
  });

  // const cards = useMemo(
  //   () =>
  //     food.map((food) => {
  //       const favoriteFood = userFavoriteFood.find(
  //         (favoriteFood) =>
  //           user && favoriteFood.user._id === user._id && favoriteFood.food._id === food._id,
  //       );
  //
  //       if (favoriteFood) {
  //         return (
  //           <FoodCard key={food._id} food={food} favoriteId={favoriteFood._id} isFavorite={true} />
  //         );
  //       }
  //
  //       return <FoodCard key={food._id} food={food} isFavorite={false} />;
  //     }),
  //   [food, userFavoriteFood],
  // );

  useEffect(() => {
    if (user) {
      dispatch(getUserFavoriteFood(user._id));
    }
  }, []);

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      className={styles.details}
    >
      <div className={styles.container}>details</div>
    </div>
  );
};

export default FoodDetails;
