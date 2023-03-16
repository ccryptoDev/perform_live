import { AbstractApiService } from './abstract-service';

export default class StripeService extends AbstractApiService {
  createBankAccountToken = body =>
    this.api.post(`https://api.stripe.com/v1/tokens`, body);
}
