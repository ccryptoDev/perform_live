import baseConfig from './env/base.config';
import devConfig from './env/dev.config';
import qaConfig from './env/qa.config';
import prodConfig from './env/prod.config';

let runningEnvConfig;

switch (process.env.SERVER_ENV) {
  case 'dev':
    runningEnvConfig = devConfig;
    break;
  case 'qa':
    runningEnvConfig = qaConfig;
    break;
  case 'prod':
    runningEnvConfig = prodConfig;
    break;
  default:
    runningEnvConfig = devConfig;
    break;
}

const config = {
  ...baseConfig,
  ...runningEnvConfig,
};

export default config;
