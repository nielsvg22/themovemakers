module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/__tests__'],
  testMatch: ['**/*.test.ts', '**/*.test.tsx'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/__tests__/setup.ts'],
  collectCoverageFrom: [
    'lib/**/*.ts',
    'components/**/*.tsx',
    'app/**/*.ts',
    'app/**/*.tsx',
    '!**/*.d.ts',
  ],
}