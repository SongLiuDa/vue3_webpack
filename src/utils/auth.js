import Cookies from 'vue-cookies'

const TokenKey = 'skyee_token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, '1d')
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
