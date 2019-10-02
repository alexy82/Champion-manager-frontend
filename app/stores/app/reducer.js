// @flow
import * as types from "./action-types"
import _ from "lodash"
const originalInitialState = JSON.parse(
  JSON.stringify({
    visible: false,
    message: "",
    openMenu: false,
    statusError: "",
    authError: false,
    authErrorMessage: "",
    orderNotFound: false,
    constant: {},
    visiblePresence: false,
    snackOpen: false,
    snackContent: "",
    loading: false,
    keyTab: "",
    isLogin: true
  })
)
export default function reduce(state = originalInitialState, action) {
  const newState = _.cloneDeep(state)
  switch (action.type) {
    case types.SET_ERROR_RESPONSE:
      return {
        ...newState,
        visible: true,
        message: action.error,
        statusError: action.status
      }
    case types.CLOSE_DIALOG_ERROR:
      return { ...newState, visible: false }
    case types.TOOGLE_DRAWER_APP:
      return { ...newState, openMenu: action.status }
    case types.AUTHENTICATE_ERROR:
      return {
        ...newState,
        authError: true,
        authErrorMessage: action.authErrorMessage
      }
    case types.CHANGE_STATE_LOGIN:
      newState.isLogin = action.state
      return newState
    case types.TOOGLE_LOADING_APP:
      newState.loading = action.state
      return newState
    case types.PRESENCE_DIALOG:
      newState.visiblePresence = true
      return newState
    case types.TOOGLE_SNACK:
      newState.snackOpen = action.open
      newState.snackStatus = action.status
      newState.snackContent = action.value
      return newState
    case types.SET_KEY_TAB:
      newState.keyTab = action.key
      return newState
    case types.SET_ORDER_ERROR:
      return { ...newState, orderNotFound: action.status }
    case types.SYNC_CONSTANTS:
      if (action.data && action.data.communes) {
        const communes = action.data.communes.map(c => ({
          value: c.id,
          label: c.name,
          district_id: c.district_id
        }))
        newState.constant.communes = communes
      }
      if (action.data && action.data.districts) {
        const districts = action.data.districts.map(c => ({
          value: c.id,
          label: c.name,
          province_id: c.province_id
        }))
        newState.constant.districts = districts
      }
      if (action.data && action.data.provinces) {
        const provinces = action.data.provinces.map(c => ({
          value: c.id,
          label: c.name
        }))
        newState.constant.provinces = provinces
      }
      return newState
    default:
      return newState
  }
}
