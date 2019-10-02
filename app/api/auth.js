import request from "./../utils/request"
import googleRequest from "./../utils/googleRequest"
import * as config from "./../config"
import { handleError } from "./../helpers/notify"
let handleE = handleError("hệ thống")
export function verifyToken(token) {
  return request({
    url: "/api/1.0/auth?access_token=" + token,
    method: "get"
  }).catch(error => {
    console.log(error.response)
    handleE(error, "Tài khoản sai")
  })
}
export function verifySystemRequest() {
  return {
    status: 200,
    data: {
      code: 0,
      data: {
        id: 3,
        first_name: "Long",
        last_name: "Nguyễn Hoàng",
        email: "long.nh@teko.vn",
        active: true,
        created_at: "2019-08-30T09:27:37",
        updated_at: "2019-08-30T09:27:39",
        last_login: null,
        roles: [],
        permissions: [{ id: 5, key: "view_invoice_detail", name: "Xem chi tiết hóa đơn", desc: "View Invoice Detail" }],
        picture: "https://lh3.googleusercontent.com/a-/AAuE7mBu3MhBCe_c_kj2b_XevSl4vsUBPU6p5TiWzgG-"
      }
    }
  }
  // return request({
  //   url: "/api/v1/auth",
  //   method: "post",
  //   data: {
  //     idToken: token,
  //     email: email
  //   }
  // }).catch(error => {
  //   console.log(error.response)
  //   handleE(error, "Tài khoản sai")
  // })
}
export function verifyGoogleTokenRequest(token) {
  console.log(token, "uygtttww")
  return googleRequest({
    url: "/oauth2/v3/tokeninfo?access_token=" + token,
    method: "get"
  }).catch(error => {
    console.log(error.response)
    handleE(error, "Tài khoản sai")
  })
}
export function authTokenRequest(code, grantType, refresh_token) {
  let data = {
    grant_type: grantType,
    client_id: config.googleClientId,
    client_secret: config.googleClientSecret,
    redirect_uri: config.redirect_uri
  }
  if (code) {
    data.code = code
  }
  if (refresh_token) {
    data.refresh_token = refresh_token
  }
  return googleRequest({
    url: "/oauth2/v4/token",
    method: "post",
    data: data
  }).catch(() => {
    // dispatch({
    //   type: types_app.AUTHENTICATE_ERROR,
    //   authErrorMessage: "Không có quyền truy cập"
    // })
  })
}
