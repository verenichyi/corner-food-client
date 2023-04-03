import { combineReducers, configureStore } from '@reduxjs/toolkit';
import auth from '../slices/auth';

export const rootReducer = combineReducers({
  auth,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
