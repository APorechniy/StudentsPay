import {handleActions, createAction} from 'redux-actions'
import {reducerMethods} from './utils'
import {addErrorNotification} from './notifications'
import {getPermissions} from './permissions'
import axios from 'axios'

export const auth = ({login, password}) => async dispatch => {
  try {
    const options = {
      method: "POST",
      url: '/api/auth/signin',
      data: {
        login: login,
        password: password
      }
    }

    const response = await axios(options)

    if(response.data && response.data.session){
      await dispatch(replaceUserToken(response.data.session))
    } else {
      dispatch(addErrorNotification({
        title: 'Ошибка авторизации',
        message: 'Неверный логин или пароль'
      }))
      return 400
    }

    if(response && response.data && response.data.session) {
      await dispatch(replaceUserToken(response.data.session))

      const userOptions = {
        method: "GET",
        url: `/api/backend/profiles/user`,
        params: {uuid: response.data.session}
      }

      const userResponse = await axios(userOptions)
      if(userResponse && userResponse.data){
        await dispatch(replaceUserInfo(userResponse.data[0]))
        await dispatch(getPermissions(userResponse.data[0].role))
      }
    }

    return 200
  } catch (error) {
    dispatch(addErrorNotification({
      title: 'Внутренняя ошибка',
      message: 'Повторите действие позднее'
    }))
  }
}

export const registration = ({name, login, password, role}) => async dispatch => {
  try {
    const options = {
      method: "POST",
      url: '/api/auth/signup',
      data: {
        login: login,
        password: password,
        name: name,
        role: role
      }
    }

    const {token} = await axios(options)

    await dispatch(replaceUserToken(token))
    await dispatch(auth({login, password}))

    return 200
  } catch (error) {
    dispatch(addErrorNotification({
      title: 'Внутренняя ошибка',
      message: 'Повторите действие позднее'
    }))
    return 400
  }
}

export const logout = () => async dispatch => {
  try {
    await dispatch(replaceUserToken(''))
    await dispatch(replaceUserInfo({}))

    return 200
  } catch (error) {
    dispatch(addErrorNotification({
      title: 'Внутренняя ошибка',
      message: 'Повторите действие позднее'
    }))
    return 400
  }
}

export const defaultState = {
  userToken: '',
  userInfo: {}
}

export const replaceUserToken = createAction('REPLACE_USER_TOKEN')
export const replaceUserInfo = createAction('REPLACE_USER_INFO')

export const reducer = handleActions({
  [replaceUserToken]: reducerMethods.replace('userToken'),
  [replaceUserInfo]: reducerMethods.replace('userInfo')
}, defaultState)
