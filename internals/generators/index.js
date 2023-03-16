/**
 * generator/index.js
 *
 * Exports the generators so plop knows them
 */

const componentGenerator = require('./component/index.js');
const hocGenerator = require('./hoc/index.js');
const containerGenerator = require('./container/index.js');
const { HOC_PREFIX } = require('./utils/constants.json');

module.exports = plop => {
  plop.setGenerator('component', componentGenerator);
  if (process.env.APP_SHORT_NAME) {
    plop.setGenerator('screen', containerGenerator);
  }
  plop.setGenerator('hoc', hocGenerator);
  plop.setWelcomeMessage(
    'Scaffold components, screens, HoC in your app. Start by choosing from the options below:',
  );
  plop.setHelper('stripPrefix', val => val.split(HOC_PREFIX)[1]);
};
