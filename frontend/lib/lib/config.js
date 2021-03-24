const getConfig = require('next/config').default
const get = require('lodash/get')

const config = {
  env: process.env.NODE_ENV || 'development',
  host: process.env.HOST || '0.0.0.0',
  port: process.env.PORT || '3000',
  selfHost: process.env.SELF_HOST || 'http://localhost:3000',
  remoteHost: 'http://localhost:5000',

  notification: {
    position: 'tr',
    autoDismiss: 3,
    action: {
      label: 'Ок'
    }
  },

  hasTechnicalWork: process.env.HAS_TECHNICAL_WORK || 'false',

  debug: process.env.DEBUG || '',
}

function getSelfConfig() {
  const nextConfig = getConfig()
  return get(nextConfig, ['publicRuntimeConfig'], config)
}

module.exports = getSelfConfig()
