import axios from 'axios'
import {handleError} from 'handle-error'

function makeRequest({method, url}) {
  if (method === 'get') {
    return parameters => (
      axios
        .get(url, {params: parameters})
    )
  }

  if (method === 'post') {
    return body => (
      axios
        .post(url, body)
        .then(response => response.data)
        .catch(handleError)
    )
  }

  if (method === 'put') {
    return (body, parameters) => (
      axios
        .put(url, body, {params: parameters})
        .then(response => response.data)
        .catch(handleError)
    )
  }
}

export const login = makeRequest({method: 'post', url: '/auth/login'})
export const register = makeRequest({method: 'post', url: '/auth/register'})
export const verifyEmail = makeRequest({method: 'post', url: '/auth/verify/email'})
export const verifyPhone = makeRequest({method: 'post', url: '/auth/verify/phone'})
export const sendEmailPin = makeRequest({method: 'post', url: '/auth/verify/email/send-pin'})
export const sendPhonePin = makeRequest({method: 'post', url: '/auth/verify/phone/send-pin'})
