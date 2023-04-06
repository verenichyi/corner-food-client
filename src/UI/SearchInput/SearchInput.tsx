import React, { ChangeEvent, startTransition, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import icons from '../../assets/icons.svg';

interface Props {
  handleSearch: (value: string) => void;
  placeholder: string;
}

const SearchInput = ({ handleSearch, placeholder }: Props) => {
  const [value, setValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    startTransition(() => {
      setValue(event.target.value);
    });
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleSearch(value);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [value]);

  return (
    <form className={styles.form}>
      <div className={styles.wrapper}>
        <input
          className={styles.input}
          onChange={handleChange}
          value={value}
          placeholder={placeholder}
        />
        <svg className={styles.icon}>
          <use xlinkHref={`${icons}#search`} />
        </svg>
      </div>
    </form>
  );
};

export default SearchInput;
