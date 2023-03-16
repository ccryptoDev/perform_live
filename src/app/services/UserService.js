import { AbstractApiService } from './abstract-service';

export default class UserService extends AbstractApiService {
  getUserMe = () => this.api.get(`/user/me`);

  postUserSocial = body => this.api.post(`/user/social`, body);

  getUserSocialTypeUserInfo = type =>
    this.api.get(`/user/social/${type}/userInfo`);

  getUserSocialTwitterRequestToken = () =>
    this.api.get(`/user/social/twitter/requestToken`);

  postUserSignUpEmail = body => this.api.post(`/user/signUp/email`, body);

  postUserSignInEmail = body => this.api.post(`/user/signIn/email`, body);

  postUserSignUpPhone = body => this.api.post(`/user/signUp/phone`, body);

  postUserSignInPhone = body => this.api.post(`/user/signIn/phone`, body);
}
