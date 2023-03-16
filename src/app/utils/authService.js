class _AuthService {
  constructor() {
    this.state = null;
  }

  isLogin() {
    const user = localStorage.getItem('user');
    if (user) {
      const { isLogin } = JSON.parse(user) || {};
      if (isLogin) {
        return true;
      }
    }

    return false;
  }

  listen(store) {
    // return () => (this.state = store.getState());
  }

  set user(user) {
    return localStorage.setItem('user', JSON.stringify(user));
  }

  get user() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  set token(token) {
    return localStorage[
      token == null || typeof token === 'undefined' ? 'removeItem' : 'setItem'
    ]('authUserToken', token);
  }

  get token() {
    return localStorage.getItem('authUserToken');
  }

  set liAuthToken(token) {
    return localStorage[
      token == null || typeof token === 'undefined' ? 'removeItem' : 'setItem'
    ]('authLIToken', token);
  }

  get liAuthToken() {
    return localStorage.getItem('authLIToken');
  }
}

const AuthService = new _AuthService();
export default AuthService;
