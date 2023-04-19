import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './styles.module.scss';
import Input from '../../UI/Input';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import CrossButton from '../../UI/CrossButton';
import { AddressFormDto } from '../../models/Payment/address';
import { makeOrder } from '../../redux/asyncActions/payments';
import { selectAuth, selectCart, selectPayments } from '../../redux/store/selectors';
import { toast } from 'react-toastify';
import { cartActions } from '../../redux/slices/cart';
import { paymentsActions } from '../../redux/slices/payments';

interface Props {
  onClose: () => void;
  onCartClose: () => void;
}

const AddressForm = ({ onClose, onCartClose }: Props) => {
  const { user } = useAppSelector(selectAuth);
  const { cart, totalPrice } = useAppSelector(selectCart);
  const { cards, error } = useAppSelector(selectPayments);
  const dispatch = useAppDispatch();
  const { clearCart } = cartActions;
  const { resetError } = paymentsActions;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AddressFormDto>({
    mode: 'all',
  });

  const onSubmit: SubmitHandler<AddressFormDto> = (data: AddressFormDto) => {
    const { address, city } = data;
    dispatch(
      makeOrder({
        paymentMethodId: cards[0].id,
        stripeCustomerId: user!.stripeCustomerId,
        shippingAddress: { address, city },
        orderItems: cart,
        totalPrice,
        userId: user!._id,
      }),
    );
    dispatch(clearCart());
    onClose();
    onCartClose();
    reset();
  };

  useEffect(() => {
    toast.error(error, {
      position: toast.POSITION.TOP_RIGHT,
      onOpen: () => {
        dispatch(resetError());
      },
    });
  }, [error]);

  return (
    <form className={styles.form}>
      <header className={styles.header}>
        <h1 className={styles.title}>Address Info</h1>
        <CrossButton onClick={onClose} />
      </header>
      <div className={styles.formElementsWrapper}>
        <Input<AddressFormDto>
          name={'city'}
          label={'City'}
          register={register}
          options={{
            required: 'This field is required',
          }}
          errors={errors}
        />
        <Input<AddressFormDto>
          name={'address'}
          label={'Street Address'}
          register={register}
          options={{
            required: 'This field is required',
          }}
          errors={errors}
        />
      </div>
      <div className={styles.buttonWrapper}>
        <button onClick={handleSubmit(onSubmit)} className={styles.button}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
