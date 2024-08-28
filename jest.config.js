module.exports = {
  roots: ['<rootDir>/__tests__'],
  collectCoverageFrom: [
    '<rootDir>/src/**',
    '!<rootDir>/src/main/**'
  ],
  coverageDirectory: 'coverage',
  testMatch: ['**/*.spec.ts', '**/*.test.ts', '**/*.e2e.ts'],
  moduleNameMapper: {
    '@/(.+)': '<rootDir>/src/$1'
  },
  preset: 'ts-jest',
  transform: {
    '.*\\.ts$': ['ts-jest', { isolatedModules: true }]
  }
}
