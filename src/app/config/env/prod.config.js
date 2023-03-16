/**
 * Prod environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys.
 *
 */
export default {
  SERVER_URL: 'https://api.performlive.live/api/',
  AGORA_APP_ID: '0891be583877439993b6e83f568ae050',
  CLOUDFRONT_PATH: 'd3md8bzkv6us7f.cloudfront.net',
  // GOOGLE_TAG_MANAGER_ID: 'GTM-PFCS7CQ',
  FIREBASE: {
    FIREBASE_ANALYTICS_ENABLED: true,
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    WEB: {
      apiKey: 'AIzaSyDf0yYtT8lyw_MYmL-g5xV4mcUziTkuuH0',
      authDomain: 'performflive.firebaseapp.com',
      databaseURL: 'https://performlive-production-rtdb.firebaseio.com/',
      projectId: 'performflive',
      storageBucket: 'performflive.appspot.com',
      messagingSenderId: '519745589012',
      appId: '1:519745589012:web:14d062276a57d75d31bc01',
      measurementId: 'G-4YH6P6TDWY',
    },
    FCM_VAPID_KEY:
      'BCCq9CHK2wpZcjfoHj4gWD2MhRiFoDornIsqGHauHhF7DePuCd47Q6pzCf7hqHpCV4xs5MGoF0p0GhM4weIzOtU',
    DEFAULT_CHANNEL_NAME_ANDROID: 'test-live',
    DEFAULT_SUBSCRIBER_TOPIC: 'test-live',
  },
  DEBUG_MODE: false,
  CLIENT_URL: 'https://performlive.com',
  HOTJAR: {
    HOTJAR_ID: 2269493,
    HOTJAR_SV: 6,
  },
  GOOGLE_PLACE_KEY: 'AIzaSyAvgAgB_J-Z3fGdUfaP9RjvdCgrDBhVrrY',
  GOOGLE_PLACE_COUNTRY: ['us'],
  STRIPE_KEY:
    'pk_live_51IHQ2eAiZVrhDWQgSlM1XVjAABnmRXEGbu1oE2zKAAf6hP2phk2NcZrvy2i9on3JPnLrt4oO904wpmajBOzT05FU008lo1KZWL',
};
