import { createAsyncThunk } from '@reduxjs/toolkit';
import { PaymentMethod } from '@stripe/stripe-js';
import { handleAxiosError } from '../../utils/handleAxiosErrors';
import PaymentService from '../../http/services/PaymentService';

export const getCreditCards = createAsyncThunk<PaymentMethod[], string, { rejectValue: string }>(
  'payments/getCreditCards',
  async (stripeCustomerId, { rejectWithValue }) => {
    try {
      const { data } = await PaymentService.getCreditCards(stripeCustomerId);
      return data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  },
);
