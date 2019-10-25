import request from "./../utils/request"
import { handleError } from "./../helpers/notify"
let handleE = handleError("nhóm user")
export function getAllUser() {
  return request({
    url: "/api/1.0/users",
    method: "get"
  }).catch(error => {
    handleE(error, "Đã xảy ra lỗi khi tải danh sách người dùng, nếu F5 lại không được anh/chị vui lòng liên hệ team code")
  })
}
export function addUserRequest(input) {
  return request({
    url: "/api/1.0/users",
    method: "post",
    data: input
  }).catch(error => {
    handleE(error, "Đã xảy ra lỗi khi thêm người dùng, nếu F5 lại không được anh/chị vui lòng liên hệ team code")
  })
}
export function getUserDetail(id) {
  return request({
    url: "/api/1.0/users/" + id,
    method: "get"
  }).catch(error => {
    handleE(error, "Đã xảy ra lỗi khi tải người dùng, nếu F5 lại không được anh/chị vui lòng liên hệ team code")
  })
}
export function editUserRequest(id, input) {
  return request({
    url: "/api/1.0/users?user_id=" + id,
    method: "put",
    data: input
  }).catch(error => {
    handleE(error, "Đã xảy ra lỗi khi sửa người dùng, nếu F5 lại không được anh/chị vui lòng liên hệ team code")
  })
}
