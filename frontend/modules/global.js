import {createAction, handleActions} from 'redux-actions'
import {reducerMethods} from './utils'

export const setMobile = createAction('SET_MOBILE')

export const defaultState = {
  isMobile: false
}

export const reducer = handleActions({
  [setMobile]: reducerMethods.replace('isMobile')
}, defaultState)
