import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleAxiosError } from '../../utils/handleAxiosErrors';
import { FoodModel, FoodType } from '../../models/Food/food';
import FoodService from '../../http/services/FoodService';
import { FavoriteFoodDto, FavoriteFoodModel } from '../../models/Food/favorite-food';

export const getFoodTypes = createAsyncThunk<FoodType[], void, { rejectValue: string }>(
  'food/getFoodTypes',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await FoodService.getFoodTypes();
      return data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  },
);

export const getAllFood = createAsyncThunk<FoodModel[], void, { rejectValue: string }>(
  'food/getAllFood',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await FoodService.getAllFood();
      return data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  },
);

export const getUserFavoriteFood = createAsyncThunk<
  FavoriteFoodModel[],
  string,
  { rejectValue: string }
>('food/getUserFavoriteFood', async (id, { rejectWithValue }) => {
  try {
    const { data } = await FoodService.getUserFavoriteFood(id);
    return data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export const addFoodToFavorite = createAsyncThunk<
  FavoriteFoodModel,
  FavoriteFoodDto,
  { rejectValue: string }
>('food/addFoodToFavorite', async (favoriteFoodDto, { rejectWithValue }) => {
  try {
    const { data } = await FoodService.addFoodToFavorite(favoriteFoodDto);
    return data;
  } catch (error) {
    return rejectWithValue(handleAxiosError(error));
  }
});

export const deleteFoodFromFavorite = createAsyncThunk<string, string, { rejectValue: string }>(
  'food/deleteFoodFromFavorite',
  async (id, { rejectWithValue }) => {
    try {
      await FoodService.deleteFoodFromFavorite(id);
      return id;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  },
);
