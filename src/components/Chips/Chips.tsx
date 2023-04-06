import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import styles from './styles.module.scss';

export type FoodType = 'Fast Food' | 'Vegetarian' | 'Drink' | 'Spicy' | 'Salty' | 'Sour';

type Chip = {
  _id: string;
  value: FoodType;
};

const chips: Chip[] = [
  {
    _id: '1',
    value: 'Fast Food',
  },
  {
    _id: '2',
    value: 'Vegetarian',
  },
  {
    _id: '3',
    value: 'Drink',
  },
  {
    _id: '4',
    value: 'Spicy',
  },
  {
    _id: '5',
    value: 'Salty',
  },
  {
    _id: '6',
    value: 'Sour',
  },
];

interface Props {
  activeChip: string;
  setActiveChip: (value: string) => void;
}

const Chips = ({ activeChip, setActiveChip }: Props) => {
  const handleClick = (value: string) => {
    if (value === activeChip) {
      setActiveChip('');
      return;
    }

    setActiveChip(value);
  };

  return (
    <Swiper spaceBetween={12} slidesPerView={3}>
      {chips.map((chip) => {
        const isActive = activeChip === chip.value;

        return (
          <SwiperSlide key={chip._id}>
            <span
              onClick={() => handleClick(chip.value)}
              className={isActive ? `${styles.chip} ${styles.chip_active}` : styles.chip}
            >
              {chip.value}
            </span>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Chips;
