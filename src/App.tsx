import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import './styles/main.scss';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './components/NotFound';
import ProtectedLayout from './layouts/ProtectedLayout';
import AuthLayout from './layouts/AuthLayout';
import Loader from './UI/Loader';
import SignInForm from './components/SignInForm';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { selectAuth } from './redux/store/selectors';
import { checkAuth } from './redux/asyncActions/auth';
import RoutesList from './constants/routes';
import { themeAttribute } from './constants/theme';
import { Theme } from './models/theme';
import SignUpForm from './components/SignUpForm';
import { authActions } from './redux/slices/auth';

const App = () => {
  const [theme, setTheme] = useState(Theme.Light);
  const { loading, error } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute(themeAttribute, theme);
  }, [theme]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
        onOpen: () => {
          dispatch(authActions.resetError());
        },
      });
    }
  }, [error]);

  if (loading) {
    return (
      <div className={'loaderContainer'}>
        <Loader />
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path={RoutesList.Home} element={<AuthLayout />}>
          <Route path={RoutesList.SIGN_IN} element={<SignInForm />} />
          <Route path={RoutesList.SIGN_UP} element={<SignUpForm />} />
        </Route>
        <Route path={RoutesList.Home} element={<ProtectedLayout />}>
          <Route index element={'main'} />
        </Route>
        <Route path={RoutesList.NOT_FOUND} element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
