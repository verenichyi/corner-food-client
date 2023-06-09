import React, { memo, PropsWithChildren, useEffect, useLayoutEffect, useState } from 'react';
import styles from './styles.module.scss';
import { useAppSelector } from '../../hooks/redux';
import { selectAuth } from '../../redux/store/selectors';
import userAvatar from '../../assets/images/user.png';
import SearchInput from '../../UI/SearchInput';
import Avatar from '../../UI/Avatar';
import Chips from '../../components/Chips';
import FilterButton from '../../UI/FilterButton';
import useIsActive from '../../hooks/useIsActive';
import ElementAnimationLayout from '../ElementAnimationLayout';

interface Props {
  title: string;
  search: (searchValue: string, foodType: string) => void;
}

const FoodLayout = memo(({ children, title, search }: PropsWithChildren<Props>) => {
  const { user } = useAppSelector(selectAuth);
  const [searchValue, setSearchValue] = useState('');
  const [activeChip, setActiveChip] = useState('');
  const [isFilterActive, toggleIsFilterActive] = useIsActive();
  const avatar = user && user.profileImage ? user.profileImage : userAvatar;

  useLayoutEffect(() => {
    search(searchValue, activeChip);
  }, []);

  useEffect(() => {
    search(searchValue, activeChip);
  }, [searchValue, activeChip]);

  return (
    <div className={styles.foodPage}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>{title}</h1>
          <div className={styles.avatar}>
            <Avatar avatar={avatar} />
          </div>
        </header>
        <div className={styles.searchFilter}>
          <div className={styles.search}>
            <SearchInput handleSearch={setSearchValue} placeholder={'Search food...'} />
          </div>
          <FilterButton handleClick={toggleIsFilterActive} />
          <ElementAnimationLayout isActive={isFilterActive}>
            <Chips activeChip={activeChip} setActiveChip={setActiveChip} />
          </ElementAnimationLayout>
        </div>
        {children}
      </div>
    </div>
  );
});

FoodLayout.displayName = 'FoodLayout';

export default FoodLayout;
