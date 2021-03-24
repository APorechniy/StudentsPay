import React from 'react'
import get from 'lodash/get'
import has from 'lodash/has'

export const handleError = error => {
  const errorData = {
    code: '',
    message: ''
  }

  if (has(error, ['response', 'data', 'code'])) {
    const {code, message} = get(error, ['response', 'data'])
    errorData.code = code
    errorData.message = message

    if (has(error, ['response', 'data', 'details'])) {
      const {details} = get(error, ['response', 'data'])

      errorData.message = (
        <>
          <div>{message}:</div>
          {details.map((error, errorIndex) => (
            <div key={errorIndex}>
              <div>{`${errorIndex + 1}) ${error.type}`}</div>
              <div>{`- ${error?.msg}`}</div>
              <div>{`- ${error.loc}`}</div>
            </div>
          ))}
        </>
      )
    }
  } else {
    errorData.code = 'error'
    errorData.message = 'upsError'
  }

  error.errorData = errorData

  throw error
}
