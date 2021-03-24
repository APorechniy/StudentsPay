import {handleActions, createAction} from 'redux-actions'
import {reducerMethods} from './utils'
import config from 'config'

import {
  success, warning, info, error
} from 'react-notification-system-redux'

export const replaceNotificationsCustom = createAction('REPLACE_NOTIFICATION_CUSTOM')
export const addNotificationsCustom = createAction('ADD_NOTIFICATIONS_CUSTOM')

export const addSuccessNotification = ({message, title = 'success'}) =>
  success({...config.notification, title, message})

export const addErrorNotification = ({message, title = 'error'}) =>
  error({...config.notification, title, message, autoDismiss: 0})

export const addWarningNotification = ({message, title = 'warning'}) =>
  warning({...config.notification, title, message})

export const addInfoNotification = ({message, title = 'info'}) =>
  info({...config.notification, title, message})

const defaultState = []

export const reducer = handleActions({
  [replaceNotificationsCustom]: reducerMethods.identity,
  [addNotificationsCustom]: reducerMethods.add
}, defaultState)
