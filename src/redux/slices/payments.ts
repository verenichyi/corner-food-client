import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaymentMethod } from '@stripe/stripe-js';
import { getCreditCards } from '../asyncActions/payments';

interface State {
  cards: PaymentMethod[];
  loading: boolean;
  error: string | null;
}

export const initialState: State = {
  cards: [],
  loading: false,
  error: null,
};

const isError = (action: AnyAction) => action.type.endsWith('rejected');

const payments = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCreditCards.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(getCreditCards.fulfilled, (state, action: PayloadAction<PaymentMethod[]>) => {
      state.loading = false;
      state.cards = action.payload;
    });

    builder.addMatcher(isError, (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const paymentsActions = payments.actions;
export default payments.reducer;
