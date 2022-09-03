/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
  roots: [
    '<rootDir>/src',
    '<rootDir>/test'
  ],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!**/index.ts',
    '!src/main/**',
    '!src/domain/**'
  ],
  coverageDirectory: 'coverage',
  coverageProvider: 'babel',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@test/(.*)$': '<rootDir>/test/$1'
  },
  preset: '@shelf/jest-mongodb',
}
