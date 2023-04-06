import React, { useMemo } from 'react';
import styles from './styles.module.scss';
import FoodCard from '../FoodCard';
import { FoodType } from '../Chips/Chips';
import grilledFish from '../../assets/images/foodcards/image_grilled_fish.png';
import friedChicken from '../../assets/images/foodcards/image_fried_chicken.png';
import friedNoodle from '../../assets/images/foodcards/image_fried_noodle.png';
import friedRice from '../../assets/images/foodcards/image_fried_rice.png';

export interface FoodCardModel {
  _id: string;
  tags: FoodType[];
  title: string;
  subtitle: string;
  description: string;
  image: string;
  rating: number;
  deliverTime: number;
  price: number;
}

const foodCards: FoodCardModel[] = [
  {
    _id: '1',
    tags: ['Fast Food', 'Spicy'],
    title: 'Grilled Fish',
    subtitle: 'Spicy grilled fish',
    description:
      'Our most popular choice! A delicious mix of different meal with various ingredients like salmon, tomato, bean, potato and much more.',
    image: grilledFish,
    rating: 4.8,
    deliverTime: 25,
    price: 8.5,
  },
  {
    _id: '2',
    tags: ['Fast Food', 'Spicy'],
    title: 'Fried Chicken',
    subtitle: 'Spicy fried chicken',
    description:
      'Our most popular choice! A delicious mix of different meal with various ingredients like salmon, tomato, bean, potato and much more.',
    image: friedChicken,
    rating: 4.8,
    deliverTime: 20,
    price: 7.5,
  },
  {
    _id: '3',
    tags: ['Fast Food', 'Spicy'],
    title: 'Fried Noodle',
    subtitle: 'Spicy fried noodle',
    description:
      'Our most popular choice! A delicious mix of different meal with various ingredients like salmon, tomato, bean, potato and much more.',
    image: friedNoodle,
    rating: 4.8,
    deliverTime: 20,
    price: 6.5,
  },
  {
    _id: '4',
    tags: ['Fast Food', 'Spicy'],
    title: 'Fried Rice',
    subtitle: 'Spicy fried rice',
    description:
      'Our most popular choice! A delicious mix of different meal with various ingredients like salmon, tomato, bean, potato and much more.',
    image: friedRice,
    rating: 4.8,
    deliverTime: 15,
    price: 4.5,
  },
];

const FoodCards = () => {
  const cards = useMemo(
    () => foodCards.map((card) => <FoodCard key={card._id} card={card} />),
    [foodCards],
  );

  return <div className={styles.cards}>{cards}</div>;
};

export default FoodCards;
