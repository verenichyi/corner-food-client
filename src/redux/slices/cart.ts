import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import currency from 'currency.js';
import { CartProduct } from '../../models/Cart/cart';

interface State {
  cart: CartProduct[];
  totalPrice: number;
}

export const initialState: State = {
  cart: [],
  totalPrice: 0,
};

const cart = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, { payload }: PayloadAction<CartProduct>) => {
      const addedProduct = state.cart.find(
        (cartProduct) => cartProduct.product._id === payload.product._id,
      );

      if (addedProduct && addedProduct.amount !== payload.amount) {
        state.totalPrice = currency(state.totalPrice)
          .subtract(currency(addedProduct.product.price).multiply(addedProduct.amount))
          .add(currency(payload.product.price).multiply(payload.amount)).value;
        addedProduct.amount = payload.amount;
        return;
      }

      if (addedProduct) {
        return;
      }

      state.cart = [...state.cart, payload];
      state.totalPrice = currency(state.totalPrice).add(
        currency(payload.product.price).multiply(payload.amount),
      ).value;
    },
    deleteFromCart: (state, { payload }: PayloadAction<CartProduct>) => {
      state.cart = state.cart.filter(
        (cartProduct) => cartProduct.product._id !== payload.product._id,
      );
      state.totalPrice = state.totalPrice = currency(state.totalPrice).subtract(
        currency(payload.product.price).multiply(payload.amount),
      ).value;
    },
    clearCart: (state) => {
      state.cart = [];
      state.totalPrice = 0;
    },
    changeProductAmount: (state, { payload }: PayloadAction<CartProduct>) => {
      state.cart = state.cart.map((cartProduct) => {
        if (cartProduct.product._id === payload.product._id) {
          state.totalPrice = currency(state.totalPrice)
            .subtract(currency(cartProduct.product.price).multiply(cartProduct.amount))
            .add(currency(payload.product.price).multiply(payload.amount)).value;
          cartProduct.amount = payload.amount;
        }

        return cartProduct;
      });
    },
  },
});

export const cartActions = cart.actions;
export default cart.reducer;
