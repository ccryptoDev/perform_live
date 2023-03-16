const fs = require('fs');
const glob = require('glob');

let output = {};

glob('src/**/*.api.json', (error, files) => {
  files.forEach(filename => {
    const contents = JSON.parse(fs.readFileSync(filename, 'utf8'));
    Object.assign(output, contents);
  });

  if (process.env.BUILD_TAG !== null && process.env.BUILD_TAG !== undefined) {
    let urlSuffix;
    const buildTag = process.env.BUILD_TAG.toLowerCase();
    const tagRegex = /^v(\d+)-(\d+)-(\d+)$/gi;

    if (buildTag === 'develop') {
      urlSuffix = '-develop';
    } else if (tagRegex.test(buildTag)) {
      urlSuffix = `-${buildTag}`;
    } else {
      urlSuffix = '';
    }

    output = JSON.parse(
      JSON.stringify(output).replace(/-develop/gi, urlSuffix),
    );
  }

  // The output below would show the API endpoints being used during the build process
  console.log(output);

  fs.writeFileSync(
    'src/app/config/autoGenApiEndpoints.json',
    JSON.stringify(output),
  );
});
