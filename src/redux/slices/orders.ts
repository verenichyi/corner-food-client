import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { OrderNotification } from '../../models/Notifications/order-notification';
import { OrderModel } from '../../models/Order/order';
import { getInactiveOrders } from '../asyncActions/orders';

interface State {
  activeOrders: OrderNotification[];
  inactiveOrders: OrderModel[];
  isInactiveLoading: boolean;
  isActiveLoading: boolean;
  error: string | null;
}

export const initialState: State = {
  activeOrders: [],
  inactiveOrders: [],
  isInactiveLoading: false,
  isActiveLoading: false,
  error: null,
};

const isError = (action: AnyAction) => action.type.endsWith('rejected');

const orders = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    setActiveOrders(state, action: PayloadAction<OrderNotification[]>) {
      state.isActiveLoading = false;
      state.activeOrders = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getInactiveOrders.pending, (state) => {
      state.isInactiveLoading = true;
      state.error = null;
    });
    builder.addCase(getInactiveOrders.fulfilled, (state, action: PayloadAction<OrderModel[]>) => {
      state.isInactiveLoading = false;
      state.inactiveOrders = action.payload;
    });

    builder.addMatcher(isError, (state, action: PayloadAction<string>) => {
      state.isInactiveLoading = false;
      state.isActiveLoading = false;
      state.error = action.payload;
    });
  },
});

export const ordersActions = orders.actions;
export default orders.reducer;
