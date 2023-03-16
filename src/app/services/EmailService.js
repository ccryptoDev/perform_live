import { AbstractApiService } from './abstract-service';

export default class EmailService extends AbstractApiService {
  postEmailResetPassword = body => this.api.post(`/email/resetPassword`, body);

  postEmailUpdatePassword = body =>
    this.api.post(`/email/updatePassword`, body);

  getEmailVerify = () => this.api.get(`/email/verify`);

  postEmailVerify = body => this.api.post(`/email/verify`, body);

  postEmailResend = body => this.api.post(`/email/resend`, body);

  getEmailAvailable = () => this.api.get(`/email/available`);

  postEmailNewPassword = body => this.api.post(`/email/newPassword`, body);

  postPhoneNewPassword = body => this.api.post(`/phone/newPassword`, body);

  getPhoneVerify = () => this.api.get(`/phone/verify`);

  postPhoneVerify = body => this.api.post(`/phone/verify`, body);

  postContactUs = body => this.api.post('/email/contactUs', body);

  postPhoneResetPassword = body => this.api.post(`/phone/resetPassword`, body);

  postPhoneUpdatePassword = body =>
    this.api.post(`/phone/updatePassword`, body);

  postPhoneResend = body => this.api.post(`/phone/resend`, body);

  getPhoneAvailable = () => this.api.get(`/phone/available`);
}
