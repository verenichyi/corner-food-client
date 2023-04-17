import React from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { authActions } from '../../redux/slices/auth';
import styles from './styles.module.scss';
import Switch from '../../UI/Switch';
import useLocalStorage from '../../hooks/useLocalStorage';
import { themeAttribute, themeLocalStorageKey } from '../../constants/theme/theme';
import { Theme } from '../../models/theme';

const Account = () => {
  const [theme, setTheme] = useLocalStorage(themeLocalStorageKey, Theme.Light);
  const dispatch = useAppDispatch();
  const { logout } = authActions;

  const handleTheme = (state: boolean) => {
    const theme = state ? Theme.Dark : Theme.Light;
    setTheme(theme);
    document.documentElement.setAttribute(themeAttribute, theme);
  };

  return (
    <div className={styles.account}>
      <div className={styles.theme}>
        <h3 className={styles.themeTitle}>Theme</h3>
        <div className={styles.themeState}>
          <span className={styles.themeStateText}>{Theme.Light}</span>
          <div className={styles.themeSwitch}>
            <Switch defaultState={theme === Theme.Dark} getState={handleTheme} />
          </div>
          <span className={styles.themeStateText}>{Theme.Dark}</span>
        </div>
      </div>
      <button className={styles.logoutButton} onClick={() => dispatch(logout())}>
        Logout
      </button>
    </div>
  );
};

export default Account;
