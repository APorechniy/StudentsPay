const useSelector = require('react-redux')
const Router = require('next/router').default
// const {plural} = require('pluralize')
const {queryStringify} = require('query-parser')
const config = require('config')

const supportedParameters = [
  {
    name: 'uri'
  },
  // {
  //   name: 'type',
  //   transform: plural
  // },
  {
    name: 'id'
  }
]

const createRoute = ({path, pathToPage}) => {
  return ({
    query,
    ...parameters
  } = {}) => {
    let asPathname = path
    const queryHref = {...query}

    supportedParameters.forEach(({name, transform}) => {
      if (typeof parameters[name] !== 'string') {
        return
      }

      const transformedParameter = transform ? transform(parameters[name]) : parameters[name]

      asPathname = asPathname.replace(`:${name}`, transformedParameter)
      queryHref[name] = parameters[name]
    })

    const asObject = {
      pathname: asPathname,
      query
    }
    const as = `${asObject.pathname}${queryStringify(asObject.query)}`
    const url = `${config.selfHost}${as}`

    const hrefObject = {
      pathname: pathToPage,
      query: queryHref
    }
    const href = `${hrefObject.pathname}${queryStringify(hrefObject.query)}`

    const asPath = `${asPathname}${queryStringify(query)}`

    return {
      url,
      path,
      pathToPage,
      asObject,
      as,
      hrefObject,
      href,
      goThroughClient() {
        Router.push(hrefObject, asObject)
      },
      goThroughServer() {
        if (typeof window !== 'undefined' && window.location) {
          window.location = asPath
        }
      },
      is(request) {
        if (request && request.path) {
          return request.path === as
        }

        if (typeof window !== 'undefined' && window.location) {
          return window.location.pathname === as
        }
      }
    }
  }
}

const routes = {
  index: createRoute({path: '/', pathToPage: '/'}),
  signIn: createRoute({path: '/sign-in', pathToPage: '/sign-in'}),
  dashboard: createRoute({path: '/dashboard', pathToPage: '/dashboard'}),
  statements: createRoute({path: '/statements', pathToPage: '/statements'}),
  users: createRoute({path: '/users', pathToPage: '/users'})
}

const compiledRoutes = {
  index: routes.index(),
  signIn: routes.signIn(),
  dashboard: routes.dashboard(),
  statements: routes.statements(),
  users: routes.users()
}

module.exports = {routes, compiledRoutes}
