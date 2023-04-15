import { FoodModel } from '../Food/food';

export interface CartProduct {
  product: FoodModel;
  amount: number;
}
