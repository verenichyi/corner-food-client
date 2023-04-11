import React from 'react';
import { pageTitles } from '../../constants/page-titles';
import Food from '../../components/Food';
import FoodLayout from '../../layouts/FoodLayout';
import { searchFood } from '../../redux/asyncActions/food';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { selectFood } from '../../redux/store/selectors';

// const foodCards: FoodModel[] = [
//   {
//     _id: '1',
//     tags: ['Fast Food', 'Spicy'],
//     title: 'Grilled Fish',
//     subtitle: 'Spicy grilled fish',
//     description:
//       'Our most popular choice! A delicious mix of different meal with various ingredients like salmon, tomato, bean, potato and much more.',
//     image: grilledFish,
//     rating: 4.8,
//     deliverTime: 25,
//     price: 8.5,
//   },
//   {
//     _id: '2',
//     tags: ['Fast Food', 'Spicy'],
//     title: 'Fried Chicken',
//     subtitle: 'Spicy fried chicken',
//     description:
//       'Our most popular choice! A delicious mix of different meal with various ingredients like salmon, tomato, bean, potato and much more.',
//     image: friedChicken,
//     rating: 4.8,
//     deliverTime: 20,
//     price: 7.5,
//   },
//   {
//     _id: '3',
//     tags: ['Fast Food', 'Spicy'],
//     title: 'Fried Noodle',
//     subtitle: 'Spicy fried noodle',
//     description:
//       'Our most popular choice! A delicious mix of different meal with various ingredients like salmon, tomato, bean, potato and much more.',
//     image: friedNoodle,
//     rating: 4.8,
//     deliverTime: 20,
//     price: 6.5,
//   },
//   {
//     _id: '4',
//     tags: ['Fast Food', 'Spicy'],
//     title: 'Fried Rice',
//     subtitle: 'Spicy fried rice',
//     description:
//       'Our most popular choice! A delicious mix of different meal with various ingredients like salmon, tomato, bean, potato and much more.',
//     image: friedRice,
//     rating: 4.8,
//     deliverTime: 15,
//     price: 4.5,
//   },
//   {
//     _id: '5',
//     tags: ['Fast Food', 'Spicy'],
//     title: 'Grilled Fish',
//     subtitle: 'Spicy grilled fish',
//     description:
//       'Our most popular choice! A delicious mix of different meal with various ingredients like salmon, tomato, bean, potato and much more.',
//     image: grilledFish,
//     rating: 4.8,
//     deliverTime: 25,
//     price: 8.5,
//   },
//   {
//     _id: '6',
//     tags: ['Fast Food', 'Spicy'],
//     title: 'Fried Chicken',
//     subtitle: 'Spicy fried chicken',
//     description:
//       'Our most popular choice! A delicious mix of different meal with various ingredients like salmon, tomato, bean, potato and much more.',
//     image: friedChicken,
//     rating: 4.8,
//     deliverTime: 20,
//     price: 7.5,
//   },
//   {
//     _id: '7',
//     tags: ['Fast Food', 'Spicy'],
//     title: 'Fried Noodle',
//     subtitle: 'Spicy fried noodle',
//     description:
//       'Our most popular choice! A delicious mix of different meal with various ingredients like salmon, tomato, bean, potato and much more.',
//     image: friedNoodle,
//     rating: 4.8,
//     deliverTime: 20,
//     price: 6.5,
//   },
//   {
//     _id: '8',
//     tags: ['Fast Food', 'Spicy'],
//     title: 'Fried Rice',
//     subtitle: 'Spicy fried rice',
//     description:
//       'Our most popular choice! A delicious mix of different meal with various ingredients like salmon, tomato, bean, potato and much more.',
//     image: friedRice,
//     rating: 4.8,
//     deliverTime: 15,
//     price: 4.5,
//   },
// ];

const Home = () => {
  const { food } = useAppSelector(selectFood);
  const dispatch = useAppDispatch();
  const search = (searchValue: string, foodType: string) => {
    dispatch(searchFood({ searchValue, foodType }));
  };

  return (
    <FoodLayout title={pageTitles.home} search={search}>
      <Food food={food} />
    </FoodLayout>
  );
};

export default Home;
