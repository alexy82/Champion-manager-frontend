import request from "./../utils/request"
import * as types_app from "./../stores/app/action-types"
export function getAllRole(dispatch) {
  return request({
    url: "/api/1.0/roles",
    method: "get"
  }).catch(error => {
    if (error.response.data.error) {
      dispatch({
        type: types_app.SET_ERROR_RESPONSE,
        status: error.response.status,
        error: error.response.data.error.detail
      })
    } else {
      dispatch({
        type: types_app.SET_ERROR_RESPONSE,
        status: error.response.status,
        error: error.response.data
      })
    }
  })
}
export function deleteRoleRequest(id, dispatch) {
  return request({
    url: "/api/1.0/roles?role_id=" + id,
    method: "delete"
  }).catch(error => {
    if (error.response.data.error) {
      dispatch({
        type: types_app.SET_ERROR_RESPONSE,
        status: error.response.status,
        error: error.response.data.error.detail
      })
    } else {
      dispatch({
        type: types_app.SET_ERROR_RESPONSE,
        status: error.response.status,
        error: error.response.data
      })
    }
  })
}
export function addRoleRequest(input, dispatch) {
  return request({
    url: "/api/1.0/roles",
    method: "post",
    data: input
  }).catch(error => {
    if (error.response.data.error) {
      dispatch({
        type: types_app.SET_ERROR_RESPONSE,
        status: error.response.status,
        error: error.response.data.error.detail
      })
    } else {
      dispatch({
        type: types_app.SET_ERROR_RESPONSE,
        status: error.response.status,
        error: error.response.data
      })
    }
  })
}
export function getDetailRoleRequest(id, dispatch) {
  return request({
    url: "/api/1.0/roles/" + id,
    method: "get"
  }).catch(error => {
    if (error.response.data.error) {
      dispatch({
        type: types_app.SET_ERROR_RESPONSE,
        status: error.response.status,
        error: error.response.data.error.detail
      })
    } else {
      dispatch({
        type: types_app.SET_ERROR_RESPONSE,
        status: error.response.status,
        error: error.response.data
      })
    }
  })
}
export function getPermissionRequest(dispatch) {
  return request({
    url: "/api/1.0/permission",
    method: "get"
  }).catch(error => {
    if (error.response.data.error) {
      dispatch({
        type: types_app.SET_ERROR_RESPONSE,
        status: error.response.status,
        error: error.response.data.error.detail
      })
    } else {
      dispatch({
        type: types_app.SET_ERROR_RESPONSE,
        status: error.response.status,
        error: error.response.data
      })
    }
  })
}
export function editRoleRequest(id, input, dispatch) {
  return request({
    url: "/api/1.0/roles?role_id=" + id,
    method: "put",
    data: input
  }).catch(error => {
    if (error.response.data.error) {
      dispatch({
        type: types_app.SET_ERROR_RESPONSE,
        status: error.response.status,
        error: error.response.data.error.detail
      })
    } else {
      dispatch({
        type: types_app.SET_ERROR_RESPONSE,
        status: error.response.status,
        error: error.response.data
      })
    }
  })
}
