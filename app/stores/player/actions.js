import * as types from "./action-types"
import { getAllPlayer, getDetailPlayerRequest } from "./../../api/player"
export const getAllPlayerList = () => {
  return async dispatch => {
    let data = await getAllPlayer(dispatch)
    if (data.status === 200) {
      dispatch({
        type: types.SET_LIST_PLAYER,
        data: data.data
      })
    }
  }
}
export const getDetailPlayer = id => {
  return async dispatch => {
    const data = await getDetailPlayerRequest(id)
    console.log("data player response", data)
    if (data.status === 200) {
      dispatch({
        type: types.SET_DETAIL_PLAYER,
        data: data.detail
      })
    }
  }
}
