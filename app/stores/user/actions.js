// @flow
import * as types from "./action-types"
import { searchStaff } from "./../../api/auth"
import { countDownSuccessPopup } from "./../../helpers/notify"
import { verifyGoogleTokenRequest, authTokenRequest, verifySystemRequest } from "./../../api/auth"
import { getAllUser, addUserRequest } from "./../../api/user"
import cookie from "react-cookies"
export const searchStaffSSO = input => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async resolve => {
    const response = await searchStaff(input)
    if (response && response.status == 200) {
      let data = []
      response.data.users.map(user => data.push([user.id, user.email, user.name, user.phone, false]))
      resolve(data)
    }
  })
}
export const verifyGoogleToken = token => {
  return async dispatch => {
    const response = await verifyGoogleTokenRequest(token, dispatch)
    if (response && response.status == 200) {
      // dispatch({
      //   type: types.CHECK_SSO_TOKEN,
      //   user: response
      // })
      // dispatch({
      //   type: types.LOADING_APP,
      //   status:false
      // })
      return response
    } else {
      let refeshToken = cookie.load("refreshToken")
      if (refeshToken) {
        const refreshAccess = await authTokenRequest(null, "refresh_token", refeshToken)
        if (refreshAccess && refreshAccess.status == 200) {
          cookie.save("accessToken", refreshAccess.data.access_token, { path: "/" })
          cookie.save("idToken", refreshAccess.data.id_token, { path: "/" })
          const response = await verifyGoogleTokenRequest(refreshAccess.data.access_token, dispatch)
          if (response && response.status == 200) {
            return response
          }
        } else {
          return false
        }
      } else {
        return false
      }
    }
  }
}
export const verifySystem = (token, email) => {
  return async dispatch => {
    const response = verifySystemRequest(token, email, dispatch)
    if (response && response.status == 200) {
      dispatch({
        type: types.SET_USER_DETAIL,
        data: response.data.data
      })
    }
  }
}
export const authToken = (code, grantType = "authorization_code", refresh_token = null) => {
  return async dispatch => {
    const response = await authTokenRequest(code, grantType, refresh_token, dispatch)
    if (response && response.status == 200) {
      return response.data
    }
  }
}
// export const userDetail = id => {
//   return async dispatch => {
//     let user = await getDetail(id, dispatch)
//     dispatch({
//       type: types.SET_LOADING_USER_EDIT,
//       status: true
//     })
//     if (user.status === 200) {
//       dispatch({
//         type: types.SET_USER_DETAIL,
//         data: user.data.data
//       })
//       dispatch({
//         type: types.SET_LOADING_USER_EDIT,
//         status: false
//       })
//     }
//   }
// }
export const changePageSize = pageSize => {
  return async dispatch => {
    dispatch({
      type: types.SET_PAGE_SIZE,
      pageSize
    })
  }
}
export const changePageCurrent = page => {
  return async dispatch => {
    dispatch({
      type: types.SET_CURRENT_PAGE,
      page
    })
  }
}
export const getAllUserList = () => {
  return async dispatch => {
    let data = await getAllUser(dispatch)
    if (data.status === 200) {
      dispatch({
        type: types.SET_LIST_USER,
        data: data.data.data
      })
    }
  }
}
export const addUser = input => {
  return async dispatch => {
    let result = await addUserRequest(input, dispatch)
    if (result.status === 200) {
      countDownSuccessPopup(
        () => {
          window.location.href = "/user"
        },
        "Bạn đã thêm người dùng thành công",
        {
          title: "Thêm thành công"
        }
      )
    }
  }
}
