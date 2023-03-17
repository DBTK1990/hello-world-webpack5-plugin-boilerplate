/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
  // add tsconfig.test.json to the root of your project
  transform: {
    '^.+\\.ts$': ['ts-jest', {
      tsconfig: 'tsconfig.tests.json',
    }],
  },
};