import { OrderModel } from '../Order/order';

export interface OrderNotification {
  status: string;
  order: OrderModel;
}
