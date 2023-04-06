import React from 'react';
import { FoodCardModel } from '../FoodCards/FoodCards';
import favoriteUnselected from '../../assets/images/ic_favorite_unselected.png';
import favoriteSelected from '../../assets/images/ic_favorite_selected.png';
import styles from './styles.module.scss';

interface Props {
  card: FoodCardModel;
  isFavorite: boolean;
}

const FoodCard = ({ card, isFavorite }: Props) => {
  const favoriteImg = isFavorite ? favoriteSelected : favoriteUnselected;

  return (
    <figure className={styles.card}>
      <div className={styles.image}>
        <img src={card.image} alt="food card" />
        <div className={styles.favorite}>
          <img className={styles.favoriteIcon} src={favoriteImg} alt="favorite" />
        </div>
      </div>
      <figcaption className={styles.body}>
        <h2 className={styles.title}>{card.title}</h2>
        <h3 className={styles.subtitle}>{card.subtitle}</h3>
        <p className={styles.price}>
          <span>$</span>
          {card.price}
        </p>
      </figcaption>
      <button className={styles.button}>Add to cart</button>
    </figure>
  );
};

export default FoodCard;
