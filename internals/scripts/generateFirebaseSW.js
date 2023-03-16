const fs = require('fs');
const glob = require('glob');

let swOutput;
let messagingSenderId;

switch (process.env.SERVER_ENV) {
  case 'dev':
    messagingSenderId = '1080673119073';
    break;
  case 'qa':
    messagingSenderId = '1002090307851';
    break;
  case 'prod':
    messagingSenderId = '342487203541';
    break;
  default:
    messagingSenderId = '1080673119073';
    break;
}

glob('src/firebase-messaging-sw-build.js', (error, files) => {
  files.forEach(filename => {
    const contents = fs.readFileSync(filename, 'utf8');
    swOutput = contents.replace(
      'MESSAGING_SENDER_ID_FROM_SCRIPT',
      `'${messagingSenderId}'`,
    );
  });

  fs.writeFileSync('src/firebase-messaging-sw.js', swOutput);
});
