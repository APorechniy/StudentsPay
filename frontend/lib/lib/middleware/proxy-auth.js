/* eslint-disable */
const axios = require('axios')
const debug = require('debug')
const get = require('lodash/get')
const config = require('config')

const authRequest = /^\/api\/auth/

const authClient = axios.create({
  baseURL: `${config.remoteHost}`
})

const authDebug = debug('AUTH')
const logRequest = request => authDebug(
  'REQUEST\npath: %s\nbody:\n%O\nquery:\n%O\n',
  request.path,
  request.body,
  request.query
)
const logResponse = response => authDebug(
  'RESPONSE\nstatus: %s\npath: %s\ndata:\n%O\n',
  response.status,
  response.request.path,
  response.data
)
const logError = err => authDebug(
  'ERROR\nstatus: %s\npath: %s\ndata:\n%O\n',
  get(err, ['response', 'status']),
  get(err, ['request', 'path']),
  get(err, ['response', 'data'])
)

const proxyAuthMiddleware = app => (request, response, next) => {
  if (!authRequest.test(request.path)) {
    next()
    return
  }

  logRequest(request)
  const authPath = request.path

  const handleResolve = responseAuth => {
    logResponse(responseAuth)
    response.json(responseAuth.data)
  }

  const handleReject = err => {
    logError(err)
    response.status(err.response.status)
    response.send(err.response.data)
  }

  const headers = {
    'Content-Type': 'application/json'
  }

  if (request.method === 'GET') {
    authClient.get(authPath, {params: request.query})
      .then(handleResolve)
      .catch(handleReject)
  } else if (request.method === 'POST') {
    authClient.post(authPath, request.body, {headers: headers})
      .then(handleResolve)
      .catch(handleReject)
  } else if (request.method === 'PUT') {
    authClient.put(authPath, request.body, {params: request.query})
      .then(handleResolve)
      .catch(handleReject)
  } else {
    next()
  }
}

module.exports = {proxyAuthMiddleware}
