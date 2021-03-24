const express = require('express')
const {proxyAuthMiddleware} = require('middleware/proxy-auth')
const {proxyMiddleware} = require('middleware/proxy-middleware')
const {compiledRoutes} = require('.')

function initRoutes(server, app) {
  const handle = app.getRequestHandler()
  const router = new express.Router()

  router.use(proxyAuthMiddleware(app))
  router.use(proxyMiddleware('profiles', /^\/api\/backend\/profiles/))
  router.use(proxyMiddleware('permissions', /^\/api\/backend\/permissions/))
  router.use(proxyMiddleware('statements', /^\/api\/backend\/statements/))
  router.use(proxyMiddleware('users', /^\/api\/backend\/users/))

  function setRouter(route) {
    router.get(route.path, (request, response) => {
      app.render(request, response, route.pathToPage, {...request.params, ...request.query})
    })
  }

  setRouter(compiledRoutes.index)

  router.get('*', (request, response) => {
    return handle(request, response)
  })

  server.use(router)
}

module.exports = {initRoutes}
