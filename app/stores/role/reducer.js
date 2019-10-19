// @flow
import _ from "lodash"
import * as types from "./action-types"
const originalInitialState = JSON.parse(
  JSON.stringify({
    loading: false,
    data: [],
    detailRole: {},
    permission: [],
    inputDetail: {}
  })
)
export default function reduce(state = originalInitialState, action) {
  let newState = _.cloneDeep(state)
  let permission = []
  switch (action.type) {
    case types.LOADING_PERMISSSION:
      return {
        ...newState,
        loading: action.value
      }
    case types.SET_LIST_ROLE:
      return {
        ...newState,
        data: action.data.items
      }
    case types.SET_INPUT_DETAIL:
      newState.detailRole = {
        ...newState.detailRole,
        [action.typeInput]: action.value
      }
      return newState
    case types.SET_PERMISSION_LIST:
      newState.permission = action.data.items.map(ele => {
        return {
          value: String(ele.id),
          label: ele.desc
        }
      })
      return newState
    case types.SET_DETAIL_ROLE:
      action.data.permissions.map(ele => {
        permission.push(String(ele.id))
      })
      action.data.permission = permission
      return {
        ...newState,
        detailRole: action.data
      }
    default:
      return newState
  }
}
