import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import { FormRegisterUserDto } from '../../models/User/UserDto';
import validation from '../../constants/auth-validation';
import Input from '../../UI/Input';
import Eye from '../../UI/Eye';
import { useAppDispatch } from '../../hooks/redux';
import { registerUser } from '../../redux/asyncActions/auth';
import RoutesList from '../../constants/routes';
import useIsActive from '../../hooks/useIsActive';

const SignUpForm = () => {
  const { password, email, username } = validation;
  const [isPasswordVisible, togglePassword] = useIsActive();
  const [isConfirmPasswordVisible, toggleConfirmPassword] = useIsActive();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormRegisterUserDto>({
    mode: 'all',
  });

  const onSubmit: SubmitHandler<FormRegisterUserDto> = (data: FormRegisterUserDto) => {
    const { username, email, password } = data;
    dispatch(registerUser({ username, email, password }));
    const origin = location.state?.from?.pathname || RoutesList.Home;
    navigate(origin, { replace: true });
    reset();
  };

  return (
    <form className={styles.form}>
      <div className={styles.formElementsWrapper}>
        <Input<FormRegisterUserDto>
          name={'username'}
          label={'Username'}
          register={register}
          options={{
            required: username.required,
            minLength: { value: 3, message: username.message },
          }}
          errors={errors}
        />
        <Input<FormRegisterUserDto>
          name={'email'}
          label={'Email Address'}
          register={register}
          options={{
            required: email.required,
            pattern: { value: email.pattern, message: email.message },
          }}
          errors={errors}
        />
        <Input<FormRegisterUserDto>
          name={'password'}
          label={'Password'}
          register={register}
          options={{
            required: password.required,
            minLength: { value: 4, message: password.message },
          }}
          errors={errors}
          isVisible={isPasswordVisible}
        >
          <Eye handleClick={togglePassword} />
        </Input>
        <Input<FormRegisterUserDto>
          name={'confirmPassword'}
          label={'Confirm Password'}
          register={register}
          options={{
            required: password.required,
            minLength: { value: 4, message: password.message },
            validate: (value: string) => {
              if (watch('password') !== value) {
                return password.confirm;
              }
            },
          }}
          errors={errors}
          isVisible={isConfirmPasswordVisible}
        >
          <Eye handleClick={toggleConfirmPassword} />
        </Input>
      </div>
      <div className={styles.buttonWrapper}>
        <button onClick={handleSubmit(onSubmit)} className={styles.button}>
          Signup
        </button>
      </div>
    </form>
  );
};

export default SignUpForm;
