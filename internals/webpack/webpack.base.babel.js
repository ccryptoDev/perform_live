/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

/**
 * Uncomment below if planning to use SASS with PostCSS autoprefixer
 * instead of styled-components or other alternatives
 */
// const autoprefixer = require('autoprefixer');

// Remove this line once the following warning goes away (it was meant for webpack loader authors not users):
// 'DeprecationWarning: loaderUtils.parseQuery() received a non-string value which can be problematic,
// see https://github.com/webpack/loader-utils/issues/56 parseQuery() will be replaced with getOptions()
// in the next major version of loader-utils.'
process.noDeprecation = true;

let prodPublicPath = '/';

if (process.env.BUILD_TAG || process.env.BUILD_TAG === '') {
  const buildTag = process.env.BUILD_TAG.toLowerCase();
  const appURLNamespace = process.env.URL_NAMESPACE
    ? `${process.env.URL_NAMESPACE}/`
    : '';
  const buildURLTag = `${buildTag}/`;
  prodPublicPath = `/${appURLNamespace}${
    buildTag !== 'master' && buildTag !== '' ? buildURLTag : ''
  }`;
}

module.exports = options => ({
  mode: options.mode,
  entry: options.entry,
  output: Object.assign(
    {
      // Compile into js/build.js
      path: path.resolve(process.cwd(), 'build'),
      publicPath: prodPublicPath,
    },
    options.output,
  ), // Merge with env dependent settings
  optimization: options.optimization,
  module: {
    rules: [
      {
        test: /\.js$/, // Transform all .js files required somewhere with Babel
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: options.babelQuery,
        },
      },
      // Alternative SCSS loader with autoprefixer from PostCSS
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                autoprefixer({ Browserslist: ['> 2%', 'IE 11'] }),
              ],
            },
          },
          'sass-loader',
        ],
        // Temporarily disabling CSS modules
        // use: ['style-loader', 'css-loader?modules=true&camelCase=true', 'sass-loader']
      },
      {
        // Preprocess our own .css files
        // This is the place to add your own loaders (e.g. sass/less etc.)
        // for a list of loaders, see https://webpack.js.org/loaders/#styling
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        // Preprocess 3rd party .css files located in node_modules
        test: /\.css$/,
        include: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/,
        use: 'file-loader',
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-url-loader',
            options: {
              // Inline files smaller than 10 kB
              limit: 10 * 1024,
              noquotes: true,
            },
          },
          'svgo-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              // Inline files smaller than 10 kB
              limit: 10 * 1024,
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                enabled: false,
                // NOTE: mozjpeg is disabled as it causes errors in some Linux environments
                // Try enabling it in your environment by switching the config to:
                // enabled: true,
                // progressive: true,
              },
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 0,
              },
              pngquant: {
                quality: '65-90',
                speed: 10,
              },
            },
          },
        ],
      },
      // Old images loader using file-loader
      /* {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              progressive: true,
              optimizationLevel: 7,
              interlaced: false,
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
            },
          },
        ],
      }, */
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.(mp4|mp3|webm)$/,
        use: {
          loader: 'file-loader',
          options: {
            limit: 10000,
          },
        },
      },
    ],
  },
  plugins: options.plugins.concat([
    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; Terser will automatically
    // drop any unreachable code.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        BUILD_TAG: JSON.stringify(process.env.BUILD_TAG),
        BUILD_TAG_FE: JSON.stringify(process.env.BUILD_TAG_FE),
        SERVER_ENV: JSON.stringify(process.env.SERVER_ENV),
      },
    }),
    new webpack.WatchIgnorePlugin([/autoGenApiEndpoints.json$/]),
  ]),
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.js', '.jsx', '.react.js', '.web.js', '.web.jsx'],
    // mainFields: ['browser', 'jsnext:main', 'main'],
    mainFields: ['browser', 'main', 'jsnext:main'],
  },
  devtool: options.devtool,
  target: 'web', // Make web variables accessible to webpack, e.g. window
  performance: options.performance || {},
});
