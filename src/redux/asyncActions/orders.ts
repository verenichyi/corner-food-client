import { createAsyncThunk } from '@reduxjs/toolkit';
import { PaymentIntent } from '@stripe/stripe-js';
import { handleAxiosError } from '../../utils/handleAxiosErrors';
import { CreateOrderDto, OrderModel } from '../../models/Order/order';
import OrderService from '../../http/services/OrderService';

export const makeOrder = createAsyncThunk<PaymentIntent, CreateOrderDto, { rejectValue: string }>(
  'orders/makeOrder',
  async (body, { rejectWithValue }) => {
    try {
      const { data } = await OrderService.makeOrder(body);

      return data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  },
);

export const getInactiveOrders = createAsyncThunk<OrderModel[], string, { rejectValue: string }>(
  'orders/getInactiveOrders',
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await OrderService.getInactiveOrders(userId);

      return data;
    } catch (error) {
      return rejectWithValue(handleAxiosError(error));
    }
  },
);
