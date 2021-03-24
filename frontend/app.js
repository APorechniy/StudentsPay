const path = require('path')
const next = require('next')
const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const {initRoutes} = require('./routes/init')
const {queryParser} = require('query-parser')
const config = require('config')

function initApp(initServer) {
  const server = express()
  const app = next({
    dev: config.env !== 'production',
    dir: process.cwd()
  })

  server.set('query parser', queryParser)

  server.use(logger('dev'))
  server.use(express.json())
  server.use(express.urlencoded({extended: false}))
  server.use(cookieParser())
  server.use(express.static(path.join(__dirname, 'public')))

  initRoutes(server, app)

  // eslint-disable-next-line1 promise/prefer-await-to-then
  app.prepare().then(
    initServer(server)
  )
}

module.exports = {initApp}
