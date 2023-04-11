import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import styles from './styles.module.scss';
import { getFoodTypes } from '../../redux/asyncActions/food';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { selectFood } from '../../redux/store/selectors';

interface Props {
  activeChip: string;
  setActiveChip: (value: string) => void;
}

const Chips = ({ activeChip, setActiveChip }: Props) => {
  const { foodTypes } = useAppSelector(selectFood);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFoodTypes());
  }, []);

  const handleClick = (value: string) => {
    if (value === activeChip) {
      setActiveChip('');
      return;
    }

    setActiveChip(value);
  };

  return (
    <Swiper spaceBetween={12} slidesPerView={3}>
      {foodTypes.map((chip) => {
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
