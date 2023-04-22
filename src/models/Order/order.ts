import { CartProduct } from '../Cart/cart';
import { FoodModel } from '../Food/food';
import { AddressFormDto } from '../Payment/address';

export interface CreateOrderDto {
  stripeCustomerId: string;
  paymentMethodId: string;
  userId: string;
  totalPrice: number;
  orderItems: CartProduct[];
  shippingAddress: AddressFormDto;
}

interface OrderItem {
  amount: number;
  product: FoodModel;
}

export interface OrderModel {
  _id: string;
  user: string;
  orderItems: OrderItem[];
  shippingAddress: {
    city: string;
    address: string;
  };
  paymentMethod: string;
  totalPrice: number;
  orderCreatedAt: Date;
  deliveryTime: number;
}
