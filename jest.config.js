module.exports = {
  "verbose":true, 
  "setupFilesAfterEnv": [ '<rootDir>/node_modules/jest-enzyme/lib/index.js', '<rootDir>/test/setup.ts', '<rootDir>/test/hooks.js', '<rootDir>/test/polyfill.js' ],
  "roots": [
    "<rootDir>", 
    "<rootDir>/test"
  ],
  "modulePaths": [
    "<rootDir>/src",
  ],
  "moduleDirectories": [
    "node_modules"
  ],
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ]
}
