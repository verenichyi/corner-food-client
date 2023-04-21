import { PaymentIntent } from '@stripe/stripe-js';
import { AxiosResponse } from 'axios';
import { $authApi } from '../api';
import { CreateOrderDto, OrderModel } from '../../models/Order/order';

const orderPath = '/order';

export default class OrderService {
  static async makeOrder(body: CreateOrderDto): Promise<AxiosResponse<PaymentIntent>> {
    return $authApi.post<PaymentIntent>(orderPath, body);
  }

  static async getInactiveOrders(userId: string): Promise<AxiosResponse<OrderModel[]>> {
    return $authApi.get<OrderModel[]>(`${orderPath}/${userId}`);
  }
}
