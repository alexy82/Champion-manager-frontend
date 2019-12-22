import * as types from "./action-types"
import _ from "lodash"
const originalInitialState = JSON.parse(
  JSON.stringify({
    data: [],
    detail: {}
  })
)
export default function reduce(state = originalInitialState, action) {
  let newState = _.cloneDeep(state)
  switch (action.type) {
    case types.SET_LIST_TEAM:
      return {
        ...newState,
        data: action.data
      }
    case types.SET_DETAIL_TEAM:
      return {
        ...newState,
        detail: action.data
      }
    default:
      return newState
  }
}
