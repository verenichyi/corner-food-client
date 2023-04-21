import React, { lazy, useEffect, Suspense } from 'react';
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
import { themeLocalStorageKey, themeAttribute } from './constants/theme/theme';
import { Theme } from './models/theme';
import { authActions } from './redux/slices/auth';
import PageAnimationLayout from './layouts/PageAnimationLayout';
import useLocalStorage from './hooks/useLocalStorage';

const AppLayout = lazy(() => import('./layouts/AppLayout'));
const AuthLayout = lazy(() => import('./layouts/AuthLayout'));
const ProfileLayout = lazy(() => import('./layouts/ProfileLayout'));
const SignInForm = lazy(() => import('./components/SignInForm'));
const SignUpForm = lazy(() => import('./components/SignUpForm'));
const Home = lazy(() => import('./pages/Home'));
const Favorite = lazy(() => import('./pages/Favorite'));
const FoodDetailsPage = lazy(() => import('./pages/FoodDetailsPage'));
const NotificationsPage = lazy(() => import('./pages/NotificationsPage'));
const Account = lazy(() => import('./pages/Account'));
const Payment = lazy(() => import('./pages/Payment'));
const History = lazy(() => import('./pages/History'));

const App = () => {
  const [theme] = useLocalStorage(themeLocalStorageKey, Theme.Light);
  const { error } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
    document.documentElement.setAttribute(themeAttribute, theme);
  }, []);

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
            <Route
              path={RoutesList.SIGN_IN}
              element={
                <PageAnimationLayout>
                  <SignInForm />
                </PageAnimationLayout>
              }
            />
            <Route
              path={RoutesList.SIGN_UP}
              element={
                <PageAnimationLayout>
                  <SignUpForm />
                </PageAnimationLayout>
              }
            />
          </Route>
          <Route path={RoutesList.Home} element={<AppLayout />}>
            <Route
              index
              element={
                <PageAnimationLayout>
                  <Home />
                </PageAnimationLayout>
              }
            />
            <Route
              path={RoutesList.Favorite}
              element={
                <PageAnimationLayout>
                  <Favorite />
                </PageAnimationLayout>
              }
            />
            <Route
              path={RoutesList.Notification}
              element={
                <PageAnimationLayout>
                  <NotificationsPage />
                </PageAnimationLayout>
              }
            />
            <Route
              element={
                <PageAnimationLayout>
                  <ProfileLayout />
                </PageAnimationLayout>
              }
            >
              <Route path={RoutesList.Account} element={<Account />} />
              <Route path={RoutesList.Payment} element={<Payment />} />
              <Route path={RoutesList.History} element={<History />} />
            </Route>
            <Route
              path={`${RoutesList.FoodDetails}/:foodId`}
              element={
                <PageAnimationLayout>
                  <FoodDetailsPage />
                </PageAnimationLayout>
              }
            />
          </Route>
          <Route path={RoutesList.NOT_FOUND} element={<NotFound />} />
        </Routes>
      </Suspense>
    </GoogleOAuthProvider>
  );
};

export default App;
