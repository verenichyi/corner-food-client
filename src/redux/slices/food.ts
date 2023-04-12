import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FoodModel, FoodType } from '../../models/Food/food';
import {
  getUserFavoriteFood,
  getFoodTypes,
  addFoodToFavorite,
  deleteFoodFromFavorite,
  searchFood,
  searchFavoriteFood,
  getFoodById,
} from '../asyncActions/food';
import { FavoriteFoodModel } from '../../models/Food/favorite-food';

interface State {
  foodTypes: FoodType[];
  food: FoodModel[];
  foodDetails: FoodModel | null;
  userFavoriteFood: FavoriteFoodModel[];
  loading: boolean;
  error: string | null;
}

export const initialState: State = {
  foodTypes: [],
  food: [],
  foodDetails: null,
  userFavoriteFood: [],
  loading: false,
  error: null,
};

const isError = (action: AnyAction) => action.type.endsWith('rejected');

const food = createSlice({
  name: 'food',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFoodTypes.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getFoodTypes.fulfilled, (state, action: PayloadAction<FoodType[]>) => {
      state.loading = false;
      state.foodTypes = action.payload;
    });

    builder.addCase(getFoodById.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.foodDetails = null;
    });
    builder.addCase(getFoodById.fulfilled, (state, action: PayloadAction<FoodModel>) => {
      state.loading = false;
      state.foodDetails = action.payload;
    });

    builder.addCase(searchFood.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(searchFood.fulfilled, (state, action: PayloadAction<FoodModel[]>) => {
      state.loading = false;
      state.food = action.payload;
    });

    builder.addCase(searchFavoriteFood.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      searchFavoriteFood.fulfilled,
      (state, action: PayloadAction<FavoriteFoodModel[]>) => {
        state.loading = false;
        state.userFavoriteFood = action.payload;
      },
    );

    builder.addCase(getUserFavoriteFood.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      getUserFavoriteFood.fulfilled,
      (state, action: PayloadAction<FavoriteFoodModel[]>) => {
        state.loading = false;
        state.userFavoriteFood = action.payload;
      },
    );

    builder.addCase(addFoodToFavorite.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(
      addFoodToFavorite.fulfilled,
      (state, action: PayloadAction<FavoriteFoodModel>) => {
        state.loading = false;
        state.userFavoriteFood.push(action.payload);
      },
    );

    builder.addCase(deleteFoodFromFavorite.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteFoodFromFavorite.fulfilled, (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.userFavoriteFood = state.userFavoriteFood.filter(
        (favoriteFood) => favoriteFood._id !== action.payload,
      );
    });

    builder.addMatcher(isError, (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const foodActions = food.actions;
export default food.reducer;
