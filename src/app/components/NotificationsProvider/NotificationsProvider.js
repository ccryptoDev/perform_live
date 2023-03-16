import React from 'react';
import PropTypes from 'prop-types';

import firebase from '../../utils/firebase';
import IMG from '../../utils/images';
import config from '../../config/index.config';
import FirebaseAnalyticsUtil from '../../utils/analytics/firebaseAnalytics';

export class NotificationsProvider extends React.PureComponent {
  async componentDidMount() {
    // const messaging = firebase.messaging();
    // if (process.env.NODE_ENV === 'production') {
    //   navigator.serviceWorker.ready.then(reg =>
    //     this.initFirebaseMessaging(messaging, reg),
    //   );
    // } else {
    //   navigator.serviceWorker
    //     .register(
    //       `../../firebase-messaging-sw.js?messagingSenderId=${
    //         config.FIREBASE.WEB.messagingSenderId
    //       }`,
    //     )
    //     .then(reg => this.initFirebaseMessaging(messaging, reg));
    // }
  }

  async initFirebaseMessaging(messaging, reg) {
    messaging.useServiceWorker(reg);

    messaging.usePublicVapidKey(config.FIREBASE.FCM_VAPID_KEY);

    try {
      await messaging.requestPermission();
      console.log('Notification permission granted.');

      await this.getTokenFromFirebase(messaging);

      messaging.onTokenRefresh(async () => {
        await this.getTokenFromFirebase(messaging);
      });

      /* navigator.serviceWorker.addEventListener('message', event => {
        console.log('Got reply from service worker: ', event);
      }); */

      messaging.onMessage(payload => {
        console.log('Message received.', payload);
        this.props.onNotificationsReceived(payload);
        let visibleNotification;
        if (payload.notification) {
          visibleNotification = payload.notification;
        } else if (payload.data.notification) {
          visibleNotification = JSON.parse(payload.data.notification);
        }
        if (visibleNotification) {
          visibleNotification.icon = IMG.APP_ICON;
          FirebaseAnalyticsUtil.sendNotification(visibleNotification);
        }
      });
    } catch (err) {
      console.log(
        'Error occurred while setting up Firebase notifications',
        err,
      );
      if (!this.props.accessToken) {
        this.props.getDeviceToken({
          fcmToken: `NO_TOKEN_${Math.random()}`,
          deviceToken: this.props.deviceToken,
        });
      }
    }
  }

  async getTokenFromFirebase(messaging) {
    try {
      const token = await messaging.getToken();
      if (token) {
        console.log('Token registered/refreshed', token);
        if (!this.props.accessToken) {
          this.props.getDeviceToken({
            fcmToken: token,
            deviceToken: this.props.deviceToken,
          });
        }
      }
    } catch (err) {
      throw new Error('Unable to receive token', err);
    }
  }

  render() {
    return this.props.children;
  }
}

NotificationsProvider.propTypes = {
  children: PropTypes.any,
  getDeviceToken: PropTypes.func,
  deviceToken: PropTypes.string,
  accessToken: PropTypes.string,
  onNotificationsReceived: PropTypes.func,
};

export default NotificationsProvider;
