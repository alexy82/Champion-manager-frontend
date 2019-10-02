import * as types from "./action-types"
import { cloneDeep } from "lodash"
const initialState = {
  communes: [],
  districts: [],
  provinces: []
}
export default function reduce(state = initialState, action = {}) {
  let newState = cloneDeep(state)
  switch (action.type) {
    case types.SYNC_CONSTANTS:
      if (action.data && action.data.communes) {
        let communes = action.data.communes.map(c => ({
          value: c.id,
          label: c.name,
          district_id: c.district_id
        }))
        newState.communes = communes
      }
      if (action.data && action.data.districts) {
        let districts = action.data.districts.map(c => ({
          value: c.id,
          label: c.name,
          province_id: c.province_id
        }))
        newState.districts = districts
      }
      if (action.data && action.data.provinces) {
        let provinces = action.data.provinces.map(c => ({
          value: c.id,
          label: c.name
        }))
        newState.provinces = provinces
      }
      break
    default:
      return state
  }
  return newState
}
