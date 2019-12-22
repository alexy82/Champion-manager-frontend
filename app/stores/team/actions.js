import * as types from "./action-types"
import { getAllTeam, getDetailTeamRequest } from "./../../api/team"
export const getAllTeamList = () => {
  return async dispatch => {
    let data = await getAllTeam(dispatch)
    if (data.status === 200) {
      dispatch({
        type: types.SET_LIST_TEAM,
        data: data.data
      })
    }
  }
}
export const getDetailTeam = id => {
  return async dispatch => {
    const data = await getDetailTeamRequest(id)
    console.log("data team response", data)
    if (data.status === 200) {
      dispatch({
        type: types.SET_DETAIL_TEAM,
        data: data.detail
      })
    }
  }
}
