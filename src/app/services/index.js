import EmailService from './EmailService';
import UserService from './UserService';
import AgoraService from './AgoraService';
import FileService from './FileService';
import PaymentService from './PaymentService';
import PerformerService from './PerformerService';
import StripeService from './StripeService';

export function createServices(api, stripeApi) {
  return {
    email: new EmailService(api),
    user: new UserService(api),
    agora: new AgoraService(api),
    file: new FileService(api),
    payment: new PaymentService(api),
    performer: new PerformerService(api),
    stripe: new StripeService(stripeApi),
  };
}
