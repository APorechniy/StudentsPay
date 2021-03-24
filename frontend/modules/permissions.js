import {handleActions, createAction} from 'redux-actions'
import {reducerMethods} from './utils'
import {addErrorNotification} from './notifications'
import axios from 'axios'

export const getPermissions = (role) => async (dispatch) => {
  const body = {
    role: role
  }

  try {
    const options = {
      method: "POST",
      url: '/api/backend/permissions/get-permissions',
      data: body
    }

    const {data} = await axios(options)

    await dispatch(replaceUserPermissions(data[0]))

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
  userPermissions: {}
}

export const replaceUserPermissions = createAction('REPLACE_USER_PERMISSIONS')

export const reducer = handleActions({
  [replaceUserPermissions]: reducerMethods.replace('userPermissions')
}, defaultState)
