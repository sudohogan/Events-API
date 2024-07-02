import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: ['./src/app/**'],
    coverageThreshold: {
        global: {
            lines: 50,
        },
    },
}

export default config
