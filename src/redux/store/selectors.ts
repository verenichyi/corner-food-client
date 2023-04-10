import { RootState } from './index';

export const selectAuth = (state: RootState) => state.auth;
export const selectFood = (state: RootState) => state.food;
