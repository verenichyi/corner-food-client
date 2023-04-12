import React, { useEffect, useMemo } from 'react';
import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { selectAuth, selectFood } from '../../redux/store/selectors';
import { getFoodById, getUserFavoriteFood } from '../../redux/asyncActions/food';
import { useParams } from 'react-router';
import useSwipe from '../../hooks/useSwipe';
import { useLocation, useNavigate } from 'react-router-dom';
import RoutesList from '../../constants/routes';
import FoodDetails from '../../components/FoodDetails';
import useMouseSwipe from '../../hooks/useMouseSwipe';

const FoodDetailsPage = () => {
  const { foodId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);
  const { foodDetails, userFavoriteFood } = useAppSelector(selectFood);
  const origin = location.state?.from?.pathname || RoutesList.Home;
  const { onTouchStart, onTouchMove, onTouchEnd } = useSwipe({
    onSwipedLeft: () => navigate(origin, { replace: true }),
    onSwipedRight: () => navigate(origin, { replace: true }),
  });
  const { onMouseDown, onMouseMove, onMouseUp } = useMouseSwipe({
    onSwipedLeft: () => navigate(origin, { replace: true }),
    onSwipedRight: () => navigate(origin, { replace: true }),
  });

  const foodDetailsEl = useMemo(() => {
    const favoriteFood = userFavoriteFood.find(
      (favoriteFood) =>
        user &&
        foodDetails &&
        favoriteFood.user._id === user._id &&
        favoriteFood.food._id === foodDetails._id,
    );

    if (favoriteFood) {
      return (
        foodDetails && (
          <FoodDetails food={foodDetails} isFavorite={true} favoriteId={favoriteFood._id} />
        )
      );
    }
    return foodDetails && <FoodDetails food={foodDetails} isFavorite={false} />;
  }, [foodDetails, userFavoriteFood]);

  useEffect(() => {
    dispatch(getFoodById(foodId!));
    dispatch(getUserFavoriteFood(user!._id));
  }, []);

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      className={styles.details}
    >
      <div className={styles.container}>{foodDetailsEl}</div>
    </div>
  );
};

export default FoodDetailsPage;
