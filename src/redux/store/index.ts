import { combineReducers, configureStore } from '@reduxjs/toolkit';
import auth from '../slices/auth';
import food from '../slices/food';
import cart from '../slices/cart';
import payments from '../slices/payments';

export const rootReducer = combineReducers({
  auth,
  food,
  cart,
  payments,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
