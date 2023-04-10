import { $authApi } from '../api';
import { AxiosResponse } from 'axios';
import { FoodModel, FoodType } from '../../models/Food/food';
import { FavoriteFoodDto, FavoriteFoodModel } from '../../models/Food/favorite-food';

const foodTypePath = '/food-type';
const foodPath = '/food';
const favoriteFoodPath = '/favorite-food';

export default class FoodService {
  static async getFoodTypes(): Promise<AxiosResponse<FoodType[]>> {
    return $authApi.get<FoodType[]>(foodTypePath);
  }

  static async getAllFood(): Promise<AxiosResponse<FoodModel[]>> {
    return $authApi.get<FoodModel[]>(foodPath);
  }

  static async getUserFavoriteFood(id: string): Promise<AxiosResponse<FavoriteFoodModel[]>> {
    return $authApi.get<FavoriteFoodModel[]>(`${favoriteFoodPath}/user/${id}`);
  }

  static async addFoodToFavorite(body: FavoriteFoodDto): Promise<AxiosResponse<FavoriteFoodModel>> {
    return $authApi.post<FavoriteFoodModel>(favoriteFoodPath, body);
  }

  static async deleteFoodFromFavorite(id: string): Promise<AxiosResponse<void>> {
    return $authApi.delete<void>(`${favoriteFoodPath}/${id}`);
  }
}
