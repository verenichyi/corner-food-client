import { PaymentMethod } from '@stripe/stripe-js';
import { AxiosResponse } from 'axios';
import { $authApi } from '../api';
import { CreateCreditCardDto } from '../../models/Payment/credit-card';

const creditCardsPath = '/credit-cards';

export default class PaymentService {
  static async attachCreditCard(body: CreateCreditCardDto): Promise<AxiosResponse<string>> {
    return $authApi.post<string>(creditCardsPath, body);
  }

  static async getCreditCards(stripeCustomerId: string): Promise<AxiosResponse<PaymentMethod[]>> {
    return $authApi.get<PaymentMethod[]>(`${creditCardsPath}/${stripeCustomerId}`);
  }
}
