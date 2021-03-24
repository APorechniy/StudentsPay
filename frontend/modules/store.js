import {combineReducers, createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly'
import {reducer as notifications} from 'react-notification-system-redux'

import * as Global from './global'
import * as Auth from './auth'
import * as Notifications from './notifications'
import * as Permissions from './permissions'
import * as Statements from './statements'
import * as Users from './users'

const defaultState = {
  global: Global.defaultState,
  auth: Auth.defaultState,
  permissions: Permissions.defaultState,
  statements: Statements.defaultState,
  users: Users.defaultState
}

const rootReducer = combineReducers({
  global: Global.reducer,
  auth: Auth.reducer,
  permissions: Permissions.reducer,
  statements: Statements.reducer,
  users: Users.reducer,
  notifications,
  notificationsCustom: Notifications.reducer,
})

export const makeStore = (initialState = defaultState) => {
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )

  return store
}

// const wrapper = createWrapper(
//   makeStore,
//   {debug: config.debug.includes('redux')}
// )

// export const {withRedux} = wrapper
