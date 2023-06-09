import { RootState } from './index';

export const selectAuth = (state: RootState) => state.auth;
export const selectFood = (state: RootState) => state.food;
export const selectCart = (state: RootState) => state.cart;
export const selectPayments = (state: RootState) => state.payments;
export const selectOrders = (state: RootState) => state.orders;
