const {camelCase} = require('change-case');
const dotenvParseVariables = require('dotenv-parse-variables');

/**
 * Read config from env
 * @returns {any}
 */
export function parseConfig() {
  const dotenvPath = process.argv
    .slice(2)
    .map(argv => argv.split('='))
    .filter(([key, value]) => key === 'dotenv_path')
    .map(([key, value]) => value);

  const env = require('dotenv').config({
    path: dotenvPath[0],
  });

  if (env.error) {
    throw env.error;
  }

  const config = Object.keys(env.parsed).reduce((obj: any, key: string) => ({
    ...obj,
    [camelCase(key)]: process.env[key] || env[key] || '',
  }), {});

  return dotenvParseVariables(config);
}

