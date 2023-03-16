/**
 * Base settings applicable across environments
 *
 * This file can include shared settings across environments
 *
 */
export default {
  ENV: process.env.NODE_ENV,
  API_TIMEOUT: 60000,
  API_MAX_RETRIES: 2,
  PRIVATE_ROOT: '/',
  PUBLIC_ROOT: '/',
  PUBLIC_ROOT_LOGIN: '/login',
  APP_ID: 'PerformanceLive_APP',
  PUSH_NOTIFICATIONS_ENABLED: true,
  MIN_BROWSER_VERSIONS: {
    msie: '>=11',
    safari: '>=10.1',
    chrome: '>=60.0',
    firefox: '>=56.0',
    opera: '>=22',
  }, // Refer to https://github.com/lancedikson/bowser for setting up browser versions
};
