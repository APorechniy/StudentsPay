/* eslint-disable */
const axios = require('axios')
const debug = require('debug')
const get = require('lodash/get')
const has = require('lodash/has')
const config = require('config')

// Backend URL
const myClient = axios.create({
  baseURL: `${config.remoteHost}`
})


const proxyMiddleware = (name, myRequest) => async (request, response, next) => {

  const myDebug = debug(name.toUpperCase())
  const logRequest = request => myDebug(
    'REQUEST\npath: %s\nbody:\n%O\nquery:\n%O\n',
    request.path,
    request.body,
    request.query
  )
  const logResponse = response => myDebug(
    'RESPONSE\nstatus: %s\npath: %s\ndata:\n%O\n',
    response.status,
    response.request.path,
    response.data
  )
  const logError = err => myDebug(
    'ERROR\nstatus: %s\npath: %s\ndata:\n%O\n',
    get(err, ['response', 'status']),
    get(err, ['request', 'path']),
    get(err, ['response', 'data'])
  )

  if (!myRequest.test(request.path)) {
    next()
    return
  }

  logRequest(request)
  const myPath = request.path

  refreshTokenResolve = thisResponse => {
    logResponse(thisResponse)
    response.json(this.response.status)
  }

  const handleResolve = thisResponse => {
    logResponse(thisResponse)
    response.json(thisResponse.data)
  }

  const handleReject = error => {
    logError(error)
    response.status(error.response.status)
    response.send(error.response.data)
  }

  // Default headers
  const headers = {
    'Content-Type': 'application/json',
  }

  if (request.method === 'GET') {
    myClient.get(myPath, {headers, params: request.query})
      .then(handleResolve)
      .catch(handleReject)
  } else if (request.method === 'POST') {
    myClient.post(myPath, request.body, {headers, params: request.query})
      .then(handleResolve)
      .catch(handleReject)
  } else if (request.method === 'PUT') {
    myClient.put(myPath, request.body, {headers, params: request.query})
      .then(handleResolve)
      .catch(handleReject)
  } else if (request.method === 'DELETE') {
    myClient.delete(myPath, {data: request.body, headers})
      .then(handleResolve)
      .catch(handleReject)
  } else {
    next()
  }
}

module.exports = {proxyMiddleware}
