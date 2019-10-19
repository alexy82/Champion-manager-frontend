import request from "./../utils/request"
import { handleError } from "./../helpers/notify"
let handleE = handleError("nhóm quyền")
export function getAllRole() {
  return request({
    url: "/api/1.0/roles",
    method: "get"
  }).catch(error => {
    handleE(error, "Đã xảy ra lỗi khi tải danh sách nhóm quyền, nếu F5 lại không được anh/chị vui lòng liên hệ team code")
  })
}
export function deleteRoleRequest(id) {
  return request({
    url: "/api/1.0/roles?role_id=" + id,
    method: "delete"
  }).catch(error => {
    handleE(error, "Đã xảy ra lỗi khi xóa nhóm quyền, nếu F5 lại không được anh/chị vui lòng liên hệ team code")
  })
}
export function addRoleRequest(input) {
  return request({
    url: "/api/1.0/roles",
    method: "post",
    data: input
  }).catch(error => {
    handleE(error, "Đã xảy ra lỗi khi thêm nhóm quyền, nếu F5 lại không được anh/chị vui lòng liên hệ team code")
  })
}
export function getDetailRoleRequest(id) {
  return request({
    url: "/api/1.0/roles/" + id,
    method: "get"
  }).catch(error => {
    handleE(error, "Đã xảy ra lỗi khi tải chi tiết nhóm quyền, nếu F5 lại không được anh/chị vui lòng liên hệ team code")
  })
}
export function getPermissionRequest() {
  return request({
    url: "/api/1.0/permission",
    method: "get"
  }).catch(error => {
    handleE(error, "Đã xảy ra lỗi khi tải danh sách quyền, nếu F5 lại không được anh/chị vui lòng liên hệ team code")
  })
}
export function editRoleRequest(id, input) {
  return request({
    url: "/api/1.0/roles?role_id=" + id,
    method: "put",
    data: input
  }).catch(error => {
    handleE(error, "Đã xảy ra lỗi khi sửa nhóm quyền, nếu F5 lại không được anh/chị vui lòng liên hệ team code")
  })
}
