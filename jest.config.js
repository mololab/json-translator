module.exports = {
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  moduleNameMapper: {
    'fs/promises': '<rootDir>/node_modules/fs-extra/lib/fs',
    '^axios$': require.resolve('axios'),
  },
};
