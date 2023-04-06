import React from 'react';
import { FoodCardModel } from '../FoodCards/FoodCards';
import styles from './styles.module.scss';

interface Props {
  card: FoodCardModel;
}

const FoodCard = ({ card }: Props) => {
  return (
    <figure className={styles.card}>
      <div className={styles.image}>
        <img src={card.image} alt="food card" />
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
