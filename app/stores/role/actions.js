import * as types from "./action-types"
import * as types_app from "./../app/action-types"
import { getAllRole, addRoleRequest, getDetailRoleRequest, editRoleRequest, getPermissionRequest, deleteRoleRequest } from "./../../api/role"
export const loadingOrder = value => {
  return {
    type: types.LOADING_ORDER,
    value
  }
}
export const getDetailRole = id => {
  return async dispatch => {
    const data = await getDetailRoleRequest(id)
    if (data.status === 200) {
      dispatch({
        type: types.SET_DETAIL_ROLE,
        data: data.data.data
      })
    }
  }
}
export const deleteRole = id => {
  return async dispatch => {
    let data = await deleteRoleRequest(id, dispatch)
    if (data.status === 200) {
      dispatch({
        type: types_app.TOOGLE_SNACK,
        status: true,
        value: "Xóa quyền thành công!"
      })
    }
  }
}
export const addRole = input => {
  return async dispatch => {
    let result = await addRoleRequest(input, dispatch)
    if (result.status === 200) {
      dispatch({
        type: types_app.TOOGLE_SNACK,
        status: true,
        value: "Thêm quyền thành công!"
      })
    }
  }
}
export const editRole = () => {
  return async (dispatch, getState) => {
    let params = {
      name: getState().role.detailRole.name,
      desc: getState().role.detailRole.desc,
      permissions: getState().role.detailRole.permission
    }
    let result = await editRoleRequest(getState().role.detailRole.id, params, dispatch)
    if (result.status === 200) {
      dispatch({
        type: types_app.TOOGLE_SNACK,
        status: true,
        value: "Sửa quyền thành công!"
      })
    }
  }
}
export const changeDetailInput = (type, value) => {
  return async dispatch => {
    dispatch({
      type: types.SET_INPUT_DETAIL,
      typeInput: type,
      value: value
    })
  }
}
export const getAllPermission = () => {
  return async dispatch => {
    const data = await getPermissionRequest(dispatch)
    if (data.status === 200) {
      dispatch({
        type: types.SET_PERMISSION_LIST,
        data: data.data.data
      })
    }
  }
}
export const getAllRoleList = () => {
  return async dispatch => {
    dispatch({
      type: types.LOADING_PERMISSSION,
      value: true
    })
    let data = await getAllRole(dispatch)
    if (data.status === 200) {
      dispatch({
        type: types.SET_LIST_ROLE,
        data: data.data.data
      })
      dispatch({
        type: types.LOADING_PERMISSSION,
        value: false
      })
    }
  }
}
