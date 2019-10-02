import * as types from "./action-types"
export const setKeyTab = key => {
  return {
    type: types.SET_KEY_TAB,
    key
  }
}
export const toogleLoadingApp = state => {
  return {
    type: types.TOOGLE_LOADING_APP,
    state
  }
}
export const changeStateLogin = state => {
  return {
    type: types.CHANGE_STATE_LOGIN,
    state
  }
}
