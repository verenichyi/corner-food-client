import { User } from '../User/User';
import { FoodModel } from './food';

export interface FavoriteFoodModel {
  _id: string;
  user: User;
  food: FoodModel;
}

export interface FavoriteFoodDto {
  user: string;
  food: string;
}
