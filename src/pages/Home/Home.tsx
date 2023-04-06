import React, { useState } from 'react';
import styles from './styles.module.scss';
import { pageTitles } from '../../constants/page-titles';
import { useAppSelector } from '../../hooks/redux';
import { selectAuth } from '../../redux/store/selectors';
import userAvatar from '../../assets/images/user.png';
import SearchInput from '../../UI/SearchInput';
import Avatar from '../../UI/Avatar';
import Chips from '../../components/Chips';
import FilterButton from '../../UI/FilterButton';
import useIsActive from '../../hooks/useIsActive';
import FoodCards from '../../components/FoodCards';

const Home = () => {
  const { user } = useAppSelector(selectAuth);
  const [searchValue, setSearchValue] = useState('');
  const [activeChip, setActiveChip] = useState('');
  const [isFilterActive, toggleIsFilterActive] = useIsActive();
  const avatar = user && user.profileImage ? user.profileImage : userAvatar;

  return (
    <div className={styles.homePage}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>{pageTitles.home}</h1>
          <Avatar avatar={avatar} />
        </header>
        <div className={styles.searchFilter}>
          <div className={styles.search}>
            <SearchInput handleSearch={setSearchValue} placeholder={'Search food...'} />
          </div>
          <FilterButton handleClick={toggleIsFilterActive} />
          {isFilterActive && <Chips activeChip={activeChip} setActiveChip={setActiveChip} />}
        </div>
        <FoodCards />
      </div>
    </div>
  );
};

export default Home;
