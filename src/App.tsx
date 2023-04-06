import React, { lazy, useEffect, useState, Suspense } from 'react';
import { Route, Routes } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './styles/main.scss';
import 'react-toastify/dist/ReactToastify.css';
import NotFound from './components/NotFound';
import Loader from './UI/Loader';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { selectAuth } from './redux/store/selectors';
import { checkAuth } from './redux/asyncActions/auth';
import RoutesList from './constants/routes';
import { themeAttribute } from './constants/theme';
import { Theme } from './models/theme';
import { authActions } from './redux/slices/auth';
const AppLayout = lazy(() => import('./layouts/AppLayout'));
const AuthLayout = lazy(() => import('./layouts/AuthLayout'));
const SignInForm = lazy(() => import('./components/SignInForm'));
const SignUpForm = lazy(() => import('./components/SignUpForm'));
const Home = lazy(() => import('./pages/Home'));
const Profile = lazy(() => import('./pages/Profile'));

const App = () => {
  const [theme, setTheme] = useState(Theme.Light);
  const { error } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());

    window.document.addEventListener('dblclick', () => {
      setTheme(theme === Theme.Light ? Theme.Dark : Theme.Light);
    });
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

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}>
      <ToastContainer />
      <Suspense
        fallback={
          <div className={'loaderContainer'}>
            <Loader />
          </div>
        }
      >
        <Routes>
          <Route path={RoutesList.Home} element={<AuthLayout />}>
            <Route path={RoutesList.SIGN_IN} element={<SignInForm />} />
            <Route path={RoutesList.SIGN_UP} element={<SignUpForm />} />
          </Route>
          <Route path={RoutesList.Home} element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path={RoutesList.Favorite} element={'Favorite'} />
            <Route path={RoutesList.Notification} element={'Notification'} />
            <Route path={RoutesList.Profile} element={<Profile />} />
          </Route>
          <Route path={RoutesList.NOT_FOUND} element={<NotFound />} />
        </Routes>
      </Suspense>
    </GoogleOAuthProvider>
  );
};

export default App;
