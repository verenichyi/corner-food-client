import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './styles.module.scss';
import { LoginUserDto } from '../../models/User/UserDto';
import validation from '../../constants/auth-validation';
import Input from '../../UI/Input';
import Eye from '../../UI/Eye';
import { useAppDispatch } from '../../hooks/redux';
import { loginUser } from '../../redux/asyncActions/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import RoutesList from '../../constants/routes';
import useIsActive from '../../hooks/useIsActive';

const SignInForm = () => {
  const { password, email } = validation;
  const [isVisible, toggle] = useIsActive();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginUserDto>({
    mode: 'all',
  });

  const onSubmit: SubmitHandler<LoginUserDto> = (data: LoginUserDto) => {
    dispatch(loginUser(data));
    const origin = location.state?.from?.pathname || RoutesList.Home;
    navigate(origin, { replace: true });
    reset();
  };

  return (
    <form className={styles.form}>
      <div className={styles.formElementsWrapper}>
        <Input<LoginUserDto>
          name={'email'}
          label={'Email Address'}
          register={register}
          options={{
            required: email.required,
            pattern: { value: email.pattern, message: email.message },
          }}
          errors={errors}
        />
        <Input<LoginUserDto>
          name={'password'}
          label={'Password'}
          register={register}
          options={{
            required: password.required,
            minLength: { value: 4, message: password.message },
          }}
          errors={errors}
          isVisible={isVisible}
        >
          <Eye handleClick={toggle} />
        </Input>
      </div>
      <div className={styles.buttonWrapper}>
        <button onClick={handleSubmit(onSubmit)} className={styles.button}>
          Login
        </button>
      </div>
    </form>
  );
};

export default SignInForm;
