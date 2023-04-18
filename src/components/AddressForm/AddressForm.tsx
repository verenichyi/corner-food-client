import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import { FormRegisterUserDto } from '../../models/User/UserDto';
import Input from '../../UI/Input';
import { useAppDispatch } from '../../hooks/redux';
import { registerUser } from '../../redux/asyncActions/auth';
import RoutesList from '../../constants/routes';
import CrossButton from '../../UI/CrossButton';
import { AddressFormDto } from '../../models/Payment/address';

interface Props {
  onClose: () => void;
}

const AddressForm = ({ onClose }: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

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
    // dispatch(registerUser({ username, email, password }));
    // const origin = location.state?.from?.pathname || RoutesList.Home;
    // navigate(origin, { replace: true });
    reset();
  };

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
