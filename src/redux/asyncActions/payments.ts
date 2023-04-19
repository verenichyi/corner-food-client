import { createAsyncThunk } from '@reduxjs/toolkit';
import { PaymentIntent, PaymentMethod } from '@stripe/stripe-js';
import { handleAxiosError } from '../../utils/handleAxiosErrors';
import PaymentService from '../../http/services/PaymentService';
import { CreateOrderDto } from '../../models/Payment/order';

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

export const makeOrder = createAsyncThunk<PaymentIntent, CreateOrderDto, { rejectValue: string }>(
  'payments/makeOrder',
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await PaymentService.makeOrder(body);

      return data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  },
);
