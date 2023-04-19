import { AddressFormDto } from './address';
import { CartProduct } from '../Cart/cart';

export interface CreateOrderDto {
  stripeCustomerId: string;
  paymentMethodId: string;
  userId: string;
  totalPrice: number;
  orderItems: CartProduct[];
  shippingAddress: AddressFormDto;
}
