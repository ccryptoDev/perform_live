module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/**/*.test.{js,jsx}',
    '!src/*.js',
    '!src/schemas/*.*',
    '!src/lib/*/*.*',
    '!src/*/RbGenerated*/*.{js,jsx}',
    '!src/index.js',
    '!src/*/config/*.*',
    '!src/*/config/*/*.*',
    '!src/*/styles/*.*',
    '!src/**/*.routes.js',
    '!src/**/*.styles.js',
    '!src/**/*.actions.js',
    '!src/**/*.saga.js',
    '!src/**/*.types.js',
    '!src/**/*.constants.js',
    '!src/**/index.js',
    '!src/**/*.dependencies.js',
    '!src/*/global-styles.js',
    '!src/*/*/Loadable.{js,jsx}',
  ],
  coverageThreshold: {
    global: {
      statements: 50,
      branches: 50,
      functions: 50,
      lines: 50,
    },
  },
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '.*\\.(css|less|styl|scss|sass)$': '<rootDir>/internals/mocks/cssModule.js',
    '.*\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/internals/mocks/image.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|react-navigation|@react-navigation|react-native-gesture-handler|react-native-chart-kit|react-native-svg/.*))',
  ],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  setupFiles: ['./internals/testing/enzyme-setup.js'],
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
  },
};
