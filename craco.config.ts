import path from 'path'
import { pathsToModuleNameMapper } from 'ts-jest'

import { compilerOptions } from './tsconfig.path.json'

let target = 'web'
if (process.env.REACT_APP_MODE === 'electron') {
  target = 'electron-renderer'
}
console.log(`craco.config.ts: setting webpack target to: ${target}`)

interface Paths {
  [key: string]: string[]
}
const resolveTsconfigPathsToAlias = (paths: Paths, webpackConfigBasePath = __dirname) => {
  const aliases: { [key: string]: string } = {}

  Object.keys(paths).forEach((item) => {
    const key = item.replace('/*', '')
    const value = path.resolve(
      webpackConfigBasePath,
      paths[item][0].replace('/*', '').replace('*', ''),
    )

    aliases[key] = value
  })

  return aliases
}

export default {
  webpack: {
    alias: resolveTsconfigPathsToAlias(compilerOptions.paths),
    configure: {
      target: target,
    },
  },
  jest: {
    configure: {
      preset: 'ts-jest',
      moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: '<rootDir>/',
      }),
    },
  },
}
