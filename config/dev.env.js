'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

const devServerVersion = process.argv[7] || 'b1';

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  DEV_VERSION: `"${devServerVersion}"`,
})
