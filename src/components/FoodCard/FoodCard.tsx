import React, { MouseEvent } from 'react';
import favoriteUnselected from '../../assets/images/ic_favorite_unselected.png';
import favoriteSelected from '../../assets/images/ic_favorite_selected.png';
import styles from './styles.module.scss';
import { FoodModel } from '../../models/Food/food';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { selectAuth } from '../../redux/store/selectors';
import { addFoodToFavorite, deleteFoodFromFavorite } from '../../redux/asyncActions/food';
import { useLocation, useNavigate } from 'react-router-dom';
import RoutesList from '../../constants/routes';

interface Props {
  food: FoodModel;
  isFavorite: boolean;
  favoriteId?: string;
}

const FoodCard = ({ food, isFavorite, favoriteId }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(selectAuth);
  const favoriteImg = isFavorite ? favoriteSelected : favoriteUnselected;

  const toggleFavorite = (foodId: string, event: MouseEvent) => {
    event.stopPropagation();

    if (user) {
      if (isFavorite && favoriteId) {
        dispatch(deleteFoodFromFavorite(favoriteId));
        return;
      }

      dispatch(addFoodToFavorite({ user: user._id, food: foodId }));
    }
  };

  return (
    <figure
      onClick={() =>
        navigate(`${RoutesList.FoodDetails}/${food._id}`, { state: { from: location } })
      }
      className={styles.card}
    >
      <div className={styles.image}>
        <img src={food.image} alt="food card" />
        <div
          onClick={(event: MouseEvent) => toggleFavorite(food._id, event)}
          className={styles.favorite}
        >
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
