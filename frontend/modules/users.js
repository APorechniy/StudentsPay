import {handleActions, createAction} from 'redux-actions'
import {reducerMethods} from './utils'
import {addErrorNotification} from './notifications'
import axios from 'axios'

export const getUsersList = () => async (dispatch) => {
    const body = {
        offset: 0,
        limit: 10
      }

      try {
        const options = {
          method: "POST",
          url: '/api/backend/users/get-users',
          data: body
        }

        const {data} = await axios(options)

        if(data && data.length > 0){
            await dispatch(replaceUsersList(data))
        }

        return data
      } catch (error) {
        dispatch(addErrorNotification({
          title: 'Внутренняя ошибка',
          message: 'Повторите действие позднее'
        }))
        return 400
      }
}

export const defaultState = {
  userssList: []
}

export const replaceUsersList = createAction('REPLACE_USERS_LIST')

export const reducer = handleActions({
  [replaceUsersList]: reducerMethods.replace('usersList')
}, defaultState)
