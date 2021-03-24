const qs = require('qs')

const queryParser = string =>
  qs.parse(string, {
    decoder: s => decodeURIComponent(s)
  })

const queryStringify = object =>
  qs.stringify(object, {
    addQueryPrefix: true
  })

module.exports = {queryParser, queryStringify}
