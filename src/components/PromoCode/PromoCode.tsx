import React from 'react';
import styles from './styles.module.scss';
import promoCodeIcon from '../../assets/images/ic_promo_code.png';

const PromoCode = () => {
  return (
    <div className={styles.promo}>
      <img className={styles.promoCodeIcon} src={promoCodeIcon} alt="sale" />
      <input className={styles.promoInput} type="text" placeholder={'Promo code...'} />
      <button className={styles.promoButton}>Apply</button>
    </div>
  );
};

export default PromoCode;
