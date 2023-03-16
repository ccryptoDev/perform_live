const https = require('https');

// const userData = require('./sources/user.json');
const _ = require('lodash');

const req = url =>
  new Promise((ok, rej) =>
    https
      .get(url, resp => {
        let data = '';

        // A chunk of data has been received.
        resp.on('data', chunk => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
          ok(JSON.parse(data));
        });
      })
      .on('error', err => {
        rej('Error: ' + err.message);
      }),
  );

const services = ['email', 'user', 'agora', 'file', 'payment', 'performer'];

async function main(params) {
  services.forEach(async service => {
    const userData = await req(
      `https://api-dev.performlive.live/api/${service}/swagger.json`,
    );
    let str = `import { AbstractApiService } from './abstract-service';

    export default class ${_.capitalize(
      service,
    )}Service extends AbstractApiService {`;

    Object.keys(userData.paths).forEach(path => {
      const parametersWithBraces = path.match(/\{(.*?)\}/gi);
      const parameters = parametersWithBraces
        ? parametersWithBraces.map(el => el.replace('{', '').replace('}', ''))
        : [];

      const methods = Object.keys(userData.paths[path]);
      const parts = path.split('/');
      methods.forEach(method => {
        const methodName = _.camelCase([method, ...parts].join(' '));
        const paramsString = `${parameters.join(', ')}${
          method !== 'get' ? `${parametersWithBraces ? ', ' : ''}body` : ''
        }`;
        const pathString = `\`${path.split('{').join('${')}\`${
          method !== 'get' ? `, body` : ''
        }`;
        const template = `${methodName} = (${paramsString}) => this.api.${method}(${pathString}) \n\n`;
        str += template;
      });
    });

    str += '}';

    require('fs').writeFileSync(`./${_.capitalize(service)}Service.js`, str);
  });

  //   require('fs').writeFileSync(
  //     './index.js',
  //     `${services
  //       .map(
  //         service =>
  //           `import ${_.capitalize(service)}Service from './${_.capitalize(
  //             service,
  //           )}Service'`,
  //       )
  //       .join('\n')};

  // export function createServices(api) {
  //   return {
  //     ${services
  //       .map(service => `${service}: new ${_.capitalize(service)}Service(api)`)
  //       .join(',\n')}
  //   };
  // }`,
  //   );
}
main();
