import * as types from "./action-types"
import { Toast } from "./../../utils/constant"
import { countDownSuccessPopup } from "./../../helpers/notify"
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
      Toast.fire({
        type: "success",
        title: "Bạn đã xóa quyền thành công"
      })
    }
  }
}
export const addRole = input => {
  return async dispatch => {
    let result = await addRoleRequest(input, dispatch)
    if (result.status === 200) {
      countDownSuccessPopup(
        () => {
          window.location.href = "/role"
        },
        "Bạn đã thêm nhóm quyền  thành công",
        {
          title: "Thêm thành công"
        }
      )
    }
  }
}
export const editRole = input => {
  return async (dispatch, getState) => {
    let params = {
      name: input.name,
      desc: input.desc,
      permissions: input.permission
    }
    let result = await editRoleRequest(getState().role.detailRole.id, params, dispatch)
    if (result.status === 200) {
      countDownSuccessPopup(
        () => {
          window.location.href = "/role"
        },
        "Sửa nhóm quyền thành công",
        {
          title: "Sửa thành công"
        }
      )
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
