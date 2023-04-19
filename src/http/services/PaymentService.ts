import { PaymentIntent, PaymentMethod } from '@stripe/stripe-js';
import { AxiosResponse } from 'axios';
import { $authApi } from '../api';
import { CreateOrderDto } from '../../models/Payment/order';
import { CreateCreditCardDto } from '../../models/Payment/credit-card';

const orderPath = '/order';
const creditCardsPath = '/credit-cards';

export default class PaymentService {
  static async makeOrder(body: CreateOrderDto): Promise<AxiosResponse<PaymentIntent>> {
    console.log(body);
    return $authApi.post<PaymentIntent>(orderPath, body);
  }

  static async attachCreditCard(body: CreateCreditCardDto): Promise<AxiosResponse<string>> {
    return $authApi.post<string>(creditCardsPath, body);
  }

  static async getCreditCards(stripeCustomerId: string): Promise<AxiosResponse<PaymentMethod[]>> {
    return $authApi.get<PaymentMethod[]>(`${creditCardsPath}/${stripeCustomerId}`);
  }
}
