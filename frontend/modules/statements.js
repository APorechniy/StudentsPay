import {handleActions, createAction} from 'redux-actions'
import {reducerMethods} from './utils'
import {addErrorNotification} from './notifications'
import axios from 'axios'

export const getStatementsPreview = () => async (dispatch) => {
  const body = {
    offset: 0,
    limit: 3
  }

  try {
    const options = {
      method: "POST",
      url: '/api/backend/statements/get-statements',
      data: body
    }

    const {data} = await axios(options)

    return data
  } catch (error) {
    dispatch(addErrorNotification({
      title: 'Внутренняя ошибка',
      message: 'Повторите действие позднее'
    }))
    return 400
  }
}

export const getStatements = () => async (dispatch) => {
    const body = {
        offset: 0,
        limit: 10
      }

      try {
        const options = {
          method: "POST",
          url: '/api/backend/statements/get-statements',
          data: body
        }

        const {data} = await axios(options)

        if(data && data.length > 0){
            await dispatch(replaceStatementsList(data))
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

export const confirmStatement = (id) => async (dispatch) => {
      const body = {
        id: id
      }

      try {
        const options = {
          method: "PUT",
          url: '/api/backend/statements/confirm',
          data: body
        }

        const {status} = await axios(options)

        await dispatch(getStatements())

        return status
      } catch (error) {
        dispatch(addErrorNotification({
          title: 'Внутренняя ошибка',
          message: 'Повторите действие позднее'
        }))
        return 400
      }
}

export const rejectStatement = (id) => async (dispatch) => {
    const body = {
      id: id
    }

    try {
      const options = {
        method: "PUT",
        url: '/api/backend/statements/reject',
        data: body
      }

      const {status} = await axios(options)

      await dispatch(getStatements())

      return status
    } catch (error) {
      dispatch(addErrorNotification({
        title: 'Внутренняя ошибка',
        message: 'Повторите действие позднее'
      }))
      return 400
    }
}

export const defaultState = {
  statementsList: []
}

export const replaceStatementsList = createAction('REPLACE_STATEMENTS_LIST')

export const reducer = handleActions({
  [replaceStatementsList]: reducerMethods.replace('statementsList')
}, defaultState)
