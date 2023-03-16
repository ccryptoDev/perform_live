/**
 * QA environment settings
 *
 * This file can include shared settings for a development team,
 * such as API keys.
 *
 */
export default {
  SERVER_URL: 'https://api-staging.performlive.live/api/',
  AGORA_APP_ID: 'eaf76ef4c10f483b9299bdbb4f318031',
  CLOUDFRONT_PATH: 'd1yekshr1m81nq.cloudfront.net',
  // AGORA_APP_ID: 'eafcc54367ed4727a37e92c65cb02961',
  FIREBASE: {
    FIREBASE_ANALYTICS_ENABLED: true,
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    WEB: {
      apiKey: 'AIzaSyDf0yYtT8lyw_MYmL-g5xV4mcUziTkuuH0',
      authDomain: 'performflive.firebaseapp.com',
      databaseURL: 'https://performflive-default-rtdb.firebaseio.com',
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
  DEBUG_MODE: true,
  CLIENT_URL: 'https://web-staging.performlive.live',
  HOTJAR: {
    HOTJAR_ID: 2269493,
    HOTJAR_SV: 6,
  },
  GOOGLE_PLACE_KEY: 'AIzaSyAvgAgB_J-Z3fGdUfaP9RjvdCgrDBhVrrY',
  GOOGLE_PLACE_COUNTRY: ['us'],
  STRIPE_KEY:
    'pk_test_51IHQ2eAiZVrhDWQgVRmnTFnDI8WwmnzX1ENaNZK4CiWu6abnTLcvft8z00fh3mwenpupOwCHEqU88FVwWeAJmFQH00CNTi8VyC',
};
